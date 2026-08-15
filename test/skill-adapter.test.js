import test from "node:test";
import assert from "node:assert/strict";
import { extractSkillBody } from "../src/index.js";

test("extractSkillBody strips the YAML frontmatter block and keeps the body verbatim", () => {
  const md = [
    "---",
    "name: i-have-adhd",
    "description: 'Shape output for a reader with ADHD'",
    "---",
    "",
    "# i-have-adhd",
    "",
    "Body line one.",
    "",
    "Body line two.",
  ].join("\n");
  assert.equal(extractSkillBody(md), "# i-have-adhd\n\nBody line one.\n\nBody line two.");
});

test("extractSkillBody returns input unchanged when there is no frontmatter", () => {
  const md = "# i-have-adhd\n\nNo frontmatter here.\n";
  assert.equal(extractSkillBody(md), md);
});

test("extractSkillBody handles empty input", () => {
  assert.equal(extractSkillBody(""), "");
});

test("extractSkillBody returns input unchanged when the closing fence is missing", () => {
  const md = "---\nname: i-have-adhd\nno closing fence\n";
  assert.equal(extractSkillBody(md), md);
});
