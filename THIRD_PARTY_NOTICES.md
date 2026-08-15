# Third-party notices

## i-have-adhd

This package is a port of `ayghri/i-have-adhd`. The upstream source is used under the MIT License.

| | |
|---|---|
| Repository | [`ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd) |
| Author | Ayoub Ghriss |
| License | MIT |
| Pinned commit | `2ed064090711586e0c97a2fbbf15465fe8f1808b` (2026-08-10, main) |
| Upstream shape | git-only (no npm package, no tags) |

### Verifying the verbatim claim yourself

The README states that the upstream files are byte-identical. You do not have to take that
on trust — clone the upstream repo, check out the pinned commit, and compare:

```bash
git clone https://github.com/ayghri/i-have-adhd /tmp/i-have-adhd-upstream
git -C /tmp/i-have-adhd-upstream checkout 2ed064090711586e0c97a2fbbf15465fe8f1808b
cd <this repo>
git diff --no-index --stat /tmp/i-have-adhd-upstream/skills/i-have-adhd/SKILL.md skills/i-have-adhd/SKILL.md
```

or compare every verbatim file in one pass:

```bash
cd <this repo>
for f in $(git ls-files | grep -vE '^(README\.md|package\.json|LICENSE|\.gitignore|THIRD_PARTY_NOTICES\.md|cordis\.patch\.yml|src/|test/)'); do
  [ -f "/tmp/i-have-adhd-upstream/$f" ] || continue
  cmp -s "/tmp/i-have-adhd-upstream/$f" "$f" || echo "DIFF: $f"
done
# prints nothing = every upstream file is byte-identical
```

Expected SHA-256 of the byte-identical files (all 42 upstream files shipped in this repo,
out of 46 tracked upstream files — the other four, `README.md`, `package.json`, `LICENSE`
and `.gitignore`, are the adapted files listed below):

```
776b5c4738b6dbc3e37a26e45cb8726d7d29e45682b46666c85807351af5a74b  .agents/plugins/marketplace.json
3c6a93bff7491685591677f6fcbcc3c4a5e4e1c7a4ef2d6d492673b9395d5eed  .claude-plugin/marketplace.json
690afa460d5d0d6aca1f41452e59a974b007b497e2620bdacfa0eff831fe6a25  .claude-plugin/plugin.json
3de4f976d1331ec3ac2ce8b85662658691597cc6d8047e87d2168c6274e35537  .codex-plugin/plugin.json
938d0e350a0c2b0e2e6c3a9032542e062846d108e0f89dd27c798ba5b436397e  .cursor/skills/i-have-adhd/SKILL.md
f0bae8598bafcefbc671c3309fb1d94cf802ed48203f64da3282e0f8e9dfbede  .github/install/INSTALL.ja.md
57fd3e9cad8a9a3254edda565904b285d368f4bd727b9a501c33bbe33243d18c  .github/install/INSTALL.ko.md
817352f36f97555d414a895d0d8ff9cf0ee3b7e89fed03e9e5cb26d47497ded9  .github/install/INSTALL.pt-BR.md
b845becfeb8a6553f0d2a3617646a445a0b6a493364995428696f9d06a26ae97  .github/install/INSTALL.vi.md
67b7ddfd8e41814b1a16f795ef0f96a00619603b7025345b9f49977129f5c1fd  .github/install/INSTALL.zh-CN.md
a5eedb40184184435f2d2f35e34c12c9db5541d795d04c95a1a3e68bafa41217  .github/readme/README.ja.md
df58f55c7f6d0172491d0b8960694e47946dbcc6e4d34496430b05125063a065  .github/readme/README.ko.md
2186194dee8de4133bb44ca99a835c6bd8ebf24910ce827c5ed8c820945b7a71  .github/readme/README.pt-BR.md
8430d5d92f1f29bebf0d18742df6b035c61f5a7f6fce4a7c0b51b98e9e322430  .github/readme/README.vi.md
03bca6531175a661bdc69d3ec9953a4cd71cddc3029cf7bb5b77993a89d9a5b4  .github/readme/README.zh-CN.md
029d8a7f85b716f60dd76ed1275a9b30b35f2804647842c6bd061d0dd0238093  .github/workflows/claude.yml
964dd66419f3cabcdc4984f67cce24e828ce620de275350092f78afc8f717a76  .github/workflows/cursor-skill-sync.yml
2be3f763fe1ae4790a57c6e0aff16ecb3fff9e947949a8c73e27dca82f52281e  .github/workflows/pi-load-check.yml
e53f5147240b2911d9032b04b301b0c3873d4e747a1732cd61944c017fc1a9e2  .github/workflows/plugin-load-check.yml
0b4f944b67b3e2467ccc2c3941fe23e7f819ad7a5b0bc46313f15b58cb840f35  GEMINI.md
53e6f0660e35c49c5c69fb011cc5006461c9deaa98f1a4914ad5cfa13b3d80c3  INSTALL.md
30942e8076aedb25fa544e1c5f15348f7e116c3866a27b6efa2cf9fbf4c21bb6  evals/README.md
05ba81a77bca9165c4a364f7ddb03ddc74dcf76428de3fc87a6e2d649c7d850d  evals/cases.jsonl
1251e6441feaf9c27c3fd3475aee51dfbad073b3a0d531f39f77cce1f723e768  evals/rubric.md
f3ced9855ab3416e7d56614cd56c663042f1a206e3a1cad9aa5c676a8927d7d1  evals/runners.example.json
d350f588f11ac7f5fcdb79d99676de6aeddef0f3755a6412ca93fc32933eb3d0  extensions/i-have-adhd.ts
d0e615d3988a25d2ea261697aa97cc56499c5377e3c47623dc1e85a25abaf15a  gemini-extension.json
3b973593b0e3519bca47541f705aff953b63f4515bbb864503e8b0a3a2d06140  kimi.plugin.json
e362f93783ab179e610762c9c022debc31d460d5d3cff2259d9dbd61278fd3d9  plugin.json
b73e663afc03a92f0c762d7d362af978fa10212d0662889d3cce24a3510dcba0  qwen-extension.json
2339a4d50ec99c68d90e63b5a2f8b45b524f696765e370c5088eb37678e26442  hooks/always-on.mjs
657563ab147358487b1a71aeacd9a548a1032425a32e2a1de34211f6fc67a52c  hooks/always-on.ps1
2cb2c461968fe5d59b474ee7419fbce057935fe06b6dd594bccafda531c38c87  hooks/always-on.sh
cf9275338e49a5871d3c73fa9404986432b5dbed7200ee8bd7471cbf322e91a9  hooks/hooks.json
c462e2b2feb5c03b413edf95f8ca41256cef7d49f88ecef004809980e2904441  logo.png
9ec82a1f5ec72e8f4e59194444d447c0651aecd8fdc710d594c41b8d6dada9fd  scripts/check_pi_extension.py
b12f7d83c64904541f9957f6851ab3f03751e433f1fa6807a67ab3f9fbff8308  scripts/run_evals.py
938d0e350a0c2b0e2e6c3a9032542e062846d108e0f89dd27c798ba5b436397e  skills/i-have-adhd/SKILL.md
c35d2c2afd463cfc772bcc98bf45e1c549f1a62529477f9e7e204b1276a40c5c  skills/i-have-adhd/agents/gemini.toml
2c51291283dcefdca43ca6b0c08172f225c7c26a9783ec444d6bdfa51ca96f8f  skills/i-have-adhd/agents/openai.yaml
e9c25391912c32903b384065cfbbec1b9447d4d35ddfe80a29b4b2e9599d7820  tests/test_always_on_hooks.py
4940f2a102e78f3699cb8e4c698653bf31751e079ca181d3ef64b0a8f2888ef5  tests/test_run_evals.py
```

### Files that are not byte-identical (adapted for the dsh port)

| File | What changed | Why it had to change |
|---|---|---|
| `package.json` | name → `dsh-i-have-adhd`; added `dsh.bundle.patch`, `main`, `files`, `scripts.test`, `peerDependencies`/`devDependencies` (`@deepseek-ai/dsh-llm` pinned `0.1.0-rc.6`), `repository`/`homepage`/`bugs`/`keywords`/`author`; kept the upstream `pi` key and `private: true` | the ticket mandates the dsh name; the dsh plugin loader needs the cordis patch and main entry; the other fields are the port production-line requirements (missing license/repository/keywords breaks npm discoverability) |
| `README.md` | replaced with the port's own bilingual (CN-default) README | the port production-line convention (issue #27, A-report) requires the port template — attribution, features/effects, install at the 3rd heading, and a "what changed" section. The upstream README is the upstream's own face (its install instructions target six other agents and say nothing about dsh); shipping it verbatim would hide the port |
| `LICENSE` | added `Copyright (c) 2026 GongYuanCaiJi (dsh port)` line | dual-copyright convention; role marked in parentheses so GitHub still detects MIT |
| `.gitignore` | merged upstream entries (`__pycache__/`, `*.py[cod]`, `evals/results/`) into the production-line `.gitignore` | the production-line `.gitignore` is required (`.upstream/`, `.serena/`, `*.log`, …) |
| `src/index.js`, `cordis.patch.yml`, `test/*.test.js` | new files, no upstream counterpart | DeepSeek Harness has no skill service; the port exposes the skill through the harness's command seam (`/i-have-adhd` injects the SKILL.md body verbatim via `agent.followup`) |

### Why the command seam — the evidence that the skill cannot ship as a skill

The adaptation trigger is "the harness cannot load a skill", not a preference. Evidence, gathered
from the pinned dsh runtime (`@deepseek-ai/dsh-agent` and `@deepseek-ai/dsh-llm` at `0.1.0-rc.6`,
installed under `~/.dsh/profiles/node_modules/@deepseek-ai/`):

- a case-insensitive grep for `skill` across the two packages' `lib/` returns zero hits — there
  is no `skills` service, no `ctx.skills`, no skill registration API;
- the established pattern for delivering skill content in dsh is therefore a command that
  injects the content into the session: the fleet pilot `dsh-simplify` registers `/simplify`
  and sends its prompt via `agent.followup(createUserMessage(...))`, the exact seam used here;
- `zimai233/dsh-adhd-copilot` (the existing ADHD-domain dsh skill pack) documents the same
  conclusion: "DSH ships no confirmed `skills` service in the reference agent, so this plugin
  deliberately registers ONLY the tool (safer)".

`/i-have-adhd` is the direct mapping of the upstream's own invocation surface (the skill's
frontmatter description: "Invoke with /i-have-adhd; stays on until `stop adhd mode`").

The injected skill body is the upstream `skills/i-have-adhd/SKILL.md` with the YAML
frontmatter block and the single blank separator line after it removed; every other byte
is identical to the pinned commit. The file itself is untouched and hash-listed above.
