<p align="center">
  <img src="./logo.png" alt="dsh-i-have-adhd" width="140" />
</p>

# dsh-i-have-adhd

简体中文 | [English](#english)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![DSH](https://img.shields.io/badge/DSH-DeepSeek%20Harness-blue.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![上游](https://img.shields.io/badge/移植自-i--have--adhd-orange.svg)](https://github.com/ayghri/i-have-adhd)

> **一句话：打一句 `/i-have-adhd`，让 agent 从此先给行动、多步编号、砍掉寒暄 —— 输出为 ADHD 读者而塑造，不需要任何诊断。**

移植自 [`i-have-adhd`](https://github.com/ayghri/i-have-adhd)（MIT，20k+★），
上游的 `SKILL.md` 逐字保留、未翻译，只适配 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
的插件接口：dsh 没有 skill 服务，所以 `/i-have-adhd` 注册成一条命令，把 SKILL.md 正文按字节注入当前会话。

## ✨ 功能

- 🧠 **先给行动** —— 第一行就是能做的事：命令、路径、代码片段在前，散文靠后
- 🔢 **多步任务编号** —— 每步一个动作、步数最少，没有“然后然后”
- 🎯 **结尾一个具体下一步** —— 还开着的事，给一件两分钟内能做完的
- ✂️ **抑制离题** —— 先收尾当前问题，第二件事单独再问
- 🔁 **每轮重述状态** —— “第 3/5 步完成”，不让读者自己记住
- ⏱ **具体时间估计** —— 分钟数，不是“一会儿”
- ✅ **让完成可见** —— 直接展示现在能跑的东西，不把成果埋进总结
- 🤐 **完整 10 条规则** —— 全文见 `skills/i-have-adhd/SKILL.md`（逐字保留）

## 📸 效果

<table>
<tr>
<td width="50%">

## Before

> Great question! Let me think about this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at `src/auth.ts`, the `verifyToken` function (around lines 42-58) seems to be using an older `jsonwebtoken` API. One approach would be to update the package and rewrite that function. After making the change, you'd want to run the auth tests to confirm nothing breaks. By the way, you might also want to look at your dependency versions overall. Hope this helps! Let me know if you want to dig deeper.

</td>

<td width="50%">

## After

> Run `npm install jsonwebtoken@latest`, then edit `src/auth.ts:42`.
>
> 1. Open `src/auth.ts`
> 2. Replace `verifyToken` (lines 42–58) with the snippet below
> 3. Run `npm test -- auth.spec.ts`
>
> Next: paste the first failing line if any test fails.

</td>
</tr>
</table>

## 📦 安装

```bash
dsh plugin --profile <你的 profile> add github:GongYuanCaiJi/dsh-i-have-adhd
```

本包零构建、零运行时依赖（仅 peer `@deepseek-ai/dsh-llm`，由 profile 提供）。若 pnpm 拦下依赖
安装，在 profile 的 `pnpm-workspace.yaml` 里把本包加进 `allowBuilds`。

从本地目录安装：

```bash
git clone https://github.com/GongYuanCaiJi/dsh-i-have-adhd.git
cd dsh-i-have-adhd
dsh plugin --profile <你的 profile> add .
```

## 🚀 用法

```
/i-have-adhd                    # 打开 ADHD 模式，规则注入当前会话
stop adhd mode 或 normal mode    # 关闭（SKILL.md 原文规定的关法）
```

规则对会话内后续每一轮生效，话题切换也不会失效；不确定时，仍然生效。

<details>
<summary>移植说明（对上游 <code>ayghri/i-have-adhd</code>，commit <code>2ed0640</code>）</summary>

逐字保留（`cmp` 验证一致，42 个文件）：`skills/i-have-adhd/SKILL.md` 与 `agents/*`、
`extensions/i-have-adhd.ts`、`hooks/*`、`evals/*`、`scripts/*`、`tests/*`、
各平台 manifest（`.claude-plugin/` `.codex-plugin/` `.cursor/` `.agents/` gemini/kimi/qwen/plugin.json）、
`GEMINI.md`、`INSTALL.md`、`.github/*`（4 个 workflow + 5 种语言的 README/INSTALL 翻译）。

**这一点你可以自己验，不必信我们** —— [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
钉住了上游 commit 与每个逐字文件的 SHA-256，附可直接复制的比对命令。

有限适配（dsh 与上游分发机制不同，逐条见 NOTICES）：
- `package.json`：改名 `dsh-i-have-adhd`（本票要求）、新增 `dsh.bundle.patch` 与 `main`/`files`/`scripts.test`；上游 `pi` 键原样保留
- 新增 `src/index.js` + `cordis.patch.yml`：dsh 没有 skill 服务，`/i-have-adhd` 以命令形式注册，把 SKILL.md 正文按字节注入会话
- 新增 `test/*.test.js`：转接层测试（node:test）
- `README.md` 换成移植品门面（中文优先双语）；`LICENSE` 加移植行；`.gitignore` 并入上游条目

**已知限制：** dsh 侧没有与上游 always-on hook（`~/.claude/.i-have-adhd-always`）等价的
SessionStart 机制，本移植只提供 `/i-have-adhd` 按需开启；上游 `scripts/check_pi_extension.py`
与 `pi-load-check.yml` 是 pi 语境的校验，包名按本票改为 `dsh-i-have-adhd` 后无法运行，按「全搬」规则保留未改。

</details>

## 🛠 开发

```bash
npm install      # 装 devDep（@deepseek-ai/dsh-llm，钉死 0.1.0-rc.6）
npm test         # node --test，跑转接层单测
```

## 📄 License

MIT。上游 [`i-have-adhd`](https://github.com/ayghri/i-have-adhd)
`Copyright (c) 2026 Ayoub Ghriss`，本移植 `Copyright (c) 2026 GongYuanCaiJi`。见 [LICENSE](./LICENSE)。

感谢 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) 的原作者 ——
如果这个插件对你有用，**也请去给[上游仓库](https://github.com/ayghri/i-have-adhd)点个 star**。

---

# English

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![DSH](https://img.shields.io/badge/DSH-DeepSeek%20Harness-blue.svg)](https://github.com/deepseek-ai/deepseek-harness)

> **One line: type `/i-have-adhd` and the agent shapes every response for an ADHD reader — action first, numbered steps, no preamble. No diagnosis needed.**

A port of [`i-have-adhd`](https://github.com/ayghri/i-have-adhd) (MIT, 20k+★) to
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). The upstream `SKILL.md` is
kept byte-identical and untranslated; DeepSeek Harness has no skill service, so `/i-have-adhd`
is registered as a command that injects the skill body verbatim into the current session.

## ✨ Features

- 🧠 **Lead with the action** — the first line is something you can do: command, path, or snippet first, prose after
- 🔢 **Number multi-step work** — one bounded action per step, the fewest steps that still work
- 🎯 **End with one concrete next step** — one thing doable in under two minutes
- ✂️ **Suppress tangents** — finish the first issue, offer the second separately
- 🔁 **Restate state every turn** — “step 3 of 5 done”, never make the reader hold it
- ⏱ **Specific time estimates** — minutes, not “a bit”
- ✅ **Make wins visible** — show what now works, don't bury it in a recap
- 🤐 **Full 10-rule text** — see `skills/i-have-adhd/SKILL.md` (verbatim)

## 📸 Before / After

<table>
<tr>
<td width="50%">

## Before

> Great question! Let me think about this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at `src/auth.ts`, the `verifyToken` function (around lines 42-58) seems to be using an older `jsonwebtoken` API. One approach would be to update the package and rewrite that function. After making the change, you'd want to run the auth tests to confirm nothing breaks. By the way, you might also want to look at your dependency versions overall. Hope this helps! Let me know if you want to dig deeper.

</td>

<td width="50%">

## After

> Run `npm install jsonwebtoken@latest`, then edit `src/auth.ts:42`.
>
> 1. Open `src/auth.ts`
> 2. Replace `verifyToken` (lines 42–58) with the snippet below
> 3. Run `npm test -- auth.spec.ts`
>
> Next: paste the first failing line if any test fails.

</td>
</tr>
</table>

## 📦 Install

```bash
dsh plugin --profile <your-profile> add github:GongYuanCaiJi/dsh-i-have-adhd
```

Zero build, zero runtime dependencies (only peer `@deepseek-ai/dsh-llm`, provided by the profile).
If pnpm blocks dependency installation, add this package to `allowBuilds` in the profile's
`pnpm-workspace.yaml`.

From a local checkout:

```bash
git clone https://github.com/GongYuanCaiJi/dsh-i-have-adhd.git
cd dsh-i-have-adhd
dsh plugin --profile <your-profile> add .
```

## 🚀 Usage

```
/i-have-adhd                    # turn ADHD mode on; rules injected into the current session
stop adhd mode or normal mode    # turn it off (the off switch defined by the upstream SKILL.md)
```

The rules apply to every response for the rest of the session and do not lapse when the
topic changes; when in doubt, they still apply.

<details>
<summary>Port notes (vs upstream <code>ayghri/i-have-adhd</code> @ <code>2ed0640</code>)</summary>

Byte-identical (`cmp`-verified, 42 files): `skills/i-have-adhd/SKILL.md` and `agents/*`,
`extensions/i-have-adhd.ts`, `hooks/*`, `evals/*`, `scripts/*`, `tests/*`,
per-agent manifests (`.claude-plugin/` `.codex-plugin/` `.cursor/` `.agents/` gemini/kimi/qwen/plugin.json),
`GEMINI.md`, `INSTALL.md`, `.github/*` (4 workflows + README/INSTALL translations in 5 languages).

**You do not have to take that on trust** — [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
pins the upstream commit and the SHA-256 of every verbatim file, with copy-paste comparison commands.

Bounded adaptation (dsh vs the upstream distribution mechanism differs; itemized in NOTICES):
- `package.json`: renamed to `dsh-i-have-adhd` (required by the ticket), added `dsh.bundle.patch` and `main`/`files`/`scripts.test`; the upstream `pi` key is kept as-is
- Added `src/index.js` + `cordis.patch.yml`: dsh has no skill service, so `/i-have-adhd` registers as a command that injects the SKILL.md body byte-for-byte
- Added `test/*.test.js`: adapter tests (node:test)
- `README.md` replaced with the port's own bilingual (CN-first) README; `LICENSE` gained the port line; `.gitignore` merged with the upstream entries

**Known limitations:** dsh has no SessionStart mechanism equivalent to the upstream always-on
hook (`~/.claude/.i-have-adhd-always`), so this port ships the `/i-have-adhd` on-demand route only;
upstream `scripts/check_pi_extension.py` and `pi-load-check.yml` are pi-context checks that cannot
run once the package is renamed per this ticket — kept verbatim per the move-everything rule.

</details>

## 🛠 Development

```bash
npm install      # installs devDep (@deepseek-ai/dsh-llm, pinned 0.1.0-rc.6)
npm test         # node --test, adapter unit tests
```

## 📄 License

MIT. Upstream [`i-have-adhd`](https://github.com/ayghri/i-have-adhd)
`Copyright (c) 2026 Ayoub Ghriss`; this port `Copyright (c) 2026 GongYuanCaiJi`. See [LICENSE](./LICENSE).

Thanks to the authors of [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) — if this
plugin is useful to you, **please also star the
[upstream repository](https://github.com/ayghri/i-have-adhd)**.
