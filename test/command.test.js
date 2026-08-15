import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAdhdModeMessage,
  handleIHaveAdhdCommand,
  readSkillBody,
} from "../src/index.js";

const PLUGIN_NAME = "dsh-i-have-adhd";

/** Stub agent that records everything handed to followup. Not an identity
 * stub: the tests assert on the exact injected payload, so a handler that
 * feeds rawInput or a distilled prompt instead of the verbatim skill body
 * fails loudly. */
function recordingAgent() {
  const calls = [];
  return {
    calls,
    followup(message) {
      calls.push(message);
    },
  };
}

test("buildAdhdModeMessage wraps the body in a plugin-sourced user message", () => {
  const body = "# rules\n\n1. Lead with the action.\n";
  const message = buildAdhdModeMessage(body);
  assert.equal(message.role, "user");
  assert.deepEqual(message.content, [{ type: "text", text: body }]);
  assert.deepEqual(message.source, { kind: "plugin", plugin: PLUGIN_NAME });
  assert.equal(typeof message.id, "string");
});

test("handleIHaveAdhdCommand injects the verbatim skill body via followup", async () => {
  const agent = recordingAgent();
  const result = await handleIHaveAdhdCommand("", agent);
  assert.equal(agent.calls.length, 1);
  assert.equal(agent.calls[0].content[0].type, "text");
  assert.equal(agent.calls[0].content[0].text, readSkillBody());
  assert.equal(agent.calls[0].source.plugin, PLUGIN_NAME);
  assert.equal(result.kind, "success");
  assert.ok(result.text.length > 0, "returns a confirmation text");
});

test("handleIHaveAdhdCommand ignores trailing arguments", async () => {
  const agent = recordingAgent();
  await handleIHaveAdhdCommand("--whatever extra", agent);
  assert.equal(agent.calls.length, 1);
  assert.equal(agent.calls[0].content[0].text, readSkillBody());
});

test("handleIHaveAdhdCommand propagates followup failures", async () => {
  const agent = { followup() { throw new Error("disposed"); } };
  await assert.rejects(handleIHaveAdhdCommand("", agent), /disposed/);
});
