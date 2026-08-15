import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readSkillBody } from "../src/index.js";

const SKILL_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "skills",
  "i-have-adhd",
  "SKILL.md",
);

test("readSkillBody returns the packaged SKILL.md body verbatim", () => {
  const body = readSkillBody();
  assert.ok(body.startsWith("# i-have-adhd\n"), "body starts with the H1 heading");
  assert.ok(body.includes("### 1. Lead with the next action"), "rule 1 present");
  assert.ok(
    body.includes("### 10. No preamble, no recap, no closing pleasantries"),
    "rule 10 present",
  );
  assert.ok(body.includes('says "stop adhd mode" or "normal mode"'), "persistence section present");
});

test("readSkillBody strips frontmatter and the separator blank line", () => {
  const raw = readFileSync(SKILL_PATH, "utf8");
  const body = readSkillBody();
  assert.ok(raw.startsWith("---\n"), "the packaged file has frontmatter");
  assert.ok(!body.includes("disable-model-invocation: true"), "frontmatter key stripped");
  assert.ok(!body.includes("name: i-have-adhd"), "frontmatter name stripped");
  assert.ok(!body.includes("metadata:"), "frontmatter metadata stripped");
  assert.ok(!body.startsWith("---"), "body does not start with the fence");
  assert.ok(body.length < raw.length, "body is shorter than the raw file");
});
