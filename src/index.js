import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createUserMessage } from "@deepseek-ai/dsh-llm";

/**
 * dsh-i-have-adhd — port of `ayghri/i-have-adhd` (MIT) to DeepSeek Harness.
 *
 * Upstream is an output-style skill: one SKILL.md whose rules shape every
 * response for a reader with ADHD. DeepSeek Harness has no skill service,
 * so the port exposes the same surface through the harness's command seam:
 * the user types `/i-have-adhd`, and the plugin injects the skill body
 * verbatim into the session as a user message. The skill's own persistence
 * contract then holds — it applies for the rest of the session until the
 * reader says "stop adhd mode" or "normal mode".
 *
 * The injected text is the upstream SKILL.md body byte-for-byte (frontmatter
 * stripped). Nothing is rewritten, distilled, or translated; see
 * THIRD_PARTY_NOTICES.md for the pinned upstream commit and SHA-256 hashes.
 */

export const name = "dsh-i-have-adhd";

const PLUGIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_PATH = join(PLUGIN_ROOT, "skills", "i-have-adhd", "SKILL.md");

/** Strip the leading YAML frontmatter block (`---` ... `---`) from a SKILL.md,
 * including the blank separator line that follows the closing fence.
 * Returns the input unchanged when there is no frontmatter. */
export function extractSkillBody(markdown) {
  if (!markdown.startsWith("---\n")) return markdown;
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return markdown;
  return markdown.slice(end + 4).replace(/^\n+/, "");
}

/** Read the packaged i-have-adhd SKILL.md and return its body verbatim. */
export function readSkillBody(skillPath = SKILL_PATH) {
  return extractSkillBody(readFileSync(skillPath, "utf8"));
}

/** Build the followup user message that injects the ruleset into the session. */
export function buildAdhdModeMessage(skillBody) {
  return createUserMessage({
    content: [{ type: "text", text: skillBody }],
    source: { kind: "plugin", plugin: "dsh-i-have-adhd" },
  });
}

/** `/i-have-adhd` handler: inject the verbatim skill body and confirm in one line. */
export async function handleIHaveAdhdCommand(_rawInput, agent) {
  agent.followup(buildAdhdModeMessage(readSkillBody()));
  return {
    kind: "success",
    text: 'ADHD mode on: the i-have-adhd ruleset now shapes every response. Say "stop adhd mode" to turn it off.',
  };
}

export function apply(ctx) {
  ctx.inject(["commands"], (cmdCtx) => {
    cmdCtx.commands.register({
      name: "i-have-adhd",
      description:
        'Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. Invoke with /i-have-adhd; stays on until "stop adhd mode".',
      handler: async (invocation) =>
        handleIHaveAdhdCommand(invocation.rawInput, invocation.agent),
    });
  });
}
