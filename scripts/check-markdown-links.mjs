import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules"]);
const markdownFiles = [];

function collectMarkdownFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      markdownFiles.push(fullPath);
    }
  }
}

function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\n]*`/g, "");
}

function parseDestination(rawDestination) {
  const trimmed = rawDestination.trim();
  if (trimmed.startsWith("<")) {
    const close = trimmed.indexOf(">");
    return close === -1 ? trimmed : trimmed.slice(1, close);
  }

  return trimmed.split(/\s+/u, 1)[0] ?? "";
}

function isExternalOrAnchor(destination) {
  return (
    destination === "" ||
    destination.startsWith("#") ||
    destination.startsWith("/") ||
    destination.startsWith("//") ||
    /^[a-z][a-z0-9+.-]*:/iu.test(destination)
  );
}

function normalizeLocalTarget(destination) {
  const withoutFragment = destination.split("#", 1)[0] ?? "";
  const withoutQuery = withoutFragment.split("?", 1)[0] ?? "";
  try {
    return decodeURIComponent(withoutQuery);
  } catch {
    return withoutQuery;
  }
}

function reportMissing(sourceFile, rawTarget, issues) {
  const destination = normalizeLocalTarget(rawTarget);
  if (isExternalOrAnchor(destination)) {
    return;
  }

  const resolved = path.resolve(path.dirname(sourceFile), destination);
  const relativeToRoot = path.relative(root, resolved);
  const outsideRoot =
    relativeToRoot === ".." || relativeToRoot.startsWith(`..${path.sep}`);

  if (outsideRoot || !fs.existsSync(resolved)) {
    const displaySource = path
      .relative(root, sourceFile)
      .split(path.sep)
      .join("/");
    issues.push(`${displaySource}: missing local Markdown target "${rawTarget}"`);
  }
}

collectMarkdownFiles(root);

const issues = [];
for (const file of markdownFiles) {
  const text = stripCode(fs.readFileSync(file, "utf8"));

  const inlineLinks = /!?\[[^\]]*\]\(([^)\n]+)\)/gu;
  for (const match of text.matchAll(inlineLinks)) {
    reportMissing(file, parseDestination(match[1] ?? ""), issues);
  }

  const referenceDefinitions =
    /^\s{0,3}\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gmu;
  for (const match of text.matchAll(referenceDefinitions)) {
    reportMissing(file, match[1] ?? match[2] ?? "", issues);
  }
}

if (issues.length > 0) {
  console.error("Broken repository-local Markdown links:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${markdownFiles.length} Markdown files: local links are valid.`,
  );
}
