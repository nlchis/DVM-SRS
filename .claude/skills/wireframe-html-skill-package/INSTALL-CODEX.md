# Port skill /wireframe-html sang Codex CLI

> Đưa skill `/wireframe-html` + `/user-flow` (vốn viết cho Claude Code) sang **Codex CLI**. Codex đọc thư mục `.codex/` ở gốc project (song song với `.claude/` của Claude Code) và file nền `AGENTS.md`. Gồm: (A) cấu trúc Codex, (B) ánh xạ Claude Code → Codex, (C) prompt copy-paste ở `PROMPT-CODEX.md`.

---

## A. Codex đọc cấu hình thế nào

| Loại | Claude Code | Codex CLI |
|---|---|---|
| Skill | `.claude/skills/{wireframe-html,user-flow}/SKILL.md` | `.codex/skills/{wireframe-html,user-flow}/SKILL.md` |
| Rules | `.claude/rules/*.md` | `.codex/rules/*.md` |
| Agent | `.claude/agents/flow-reviewer.md` (Markdown + frontmatter) | `.codex/agents/flow-reviewer.toml` (`description` + `developer_instructions`) |
| Script | `.claude/scripts/mermaid-verify.mjs` | `.codex/scripts/mermaid-verify.mjs` (giữ nguyên, Node) |
| Templates | `_templates/wireframe-html-*.html` | `_templates/wireframe-html-*.html` (giữ nguyên) |
| File nền | `CLAUDE.md` | `AGENTS.md` |

Điểm khác chính: **skill/rule/script/template gần như giữ nguyên**; chỉ **agent** đổi định dạng (Markdown → TOML). Wireframe là HTML tĩnh nên không có build step.

---

## B. Ánh xạ chi tiết

### B.1 — Skill + templates (giữ nguyên)

```bash
mkdir -p <project>/.codex/skills <project>/_templates
cp -R claude-code/.claude/skills/wireframe-html  <project>/.codex/skills/
cp -R claude-code/.claude/skills/user-flow        <project>/.codex/skills/
cp    claude-code/_templates/*                     <project>/_templates/
```

> `wireframe-html-template.html` + `wireframe-html-nav-template.html` được SKILL.md tham chiếu (`@../../../_templates/...`). Copy đủ, nếu không skill thiếu khung render + template cửa vào điều hướng.

SKILL.md frontmatter của Claude Code (`allowed-tools`, `user-invocable`, `argument-hint`, `disable-model-invocation`) — Codex chủ yếu dùng `name` + `description` để kích hoạt. Field thừa Codex bỏ qua; nếu Codex báo lỗi parse frontmatter, chỉ giữ `name` + `description` và đưa cú pháp tham số xuống mục "Inputs / Cách gọi" trong body.

> **Lưu ý `context: fork` trong body SKILL.md wireframe-html:** có 1 dòng ghi chú cũ nói skill chạy `context: fork`. **Bỏ / bỏ qua dòng này** — skill có HITL thật (hỏi device qua AskUserQuestion, L1/L2). Chạy fork/nền = mất kênh trả lời. Đảm bảo Codex chạy skill ở main conversation.

### B.2 — Rules (giữ nguyên)

```bash
mkdir -p <project>/.codex/rules
cp claude-code/.claude/rules/*.md  <project>/.codex/rules/
```

Bộ rule gồm: `approval-gate`, `ba-conventions`, `naming-conventions`, `changelog`, `feature-bootstrap`, `kg-usage` (cho wireframe-html) + `resolve-oqs`, `diagram-selection`, `review-format` (thêm cho user-flow).

Sửa reference trong SKILL.md nếu trỏ `@.claude/rules/...` → `.codex/rules/...` (hoặc để nguyên tương đối `../../rules/...` nếu Codex resolve được — kiểm thử).

### B.3 — Script verify (tùy chọn, giữ nguyên)

```bash
mkdir -p <project>/.codex/scripts
cp claude-code/.claude/scripts/mermaid-verify.mjs  <project>/.codex/scripts/
```

`/user-flow` gọi script này sau khi ghi userflow để kiểm mermaid compile. Chỉ dùng Node built-in + gọi `mmdc` bên ngoài — không cần `npm install`. Thiếu `mmdc` → skill bỏ qua verify, vẫn chạy.

### B.4 — Agent review (đổi Markdown → TOML)

Agent `flow-reviewer` (soi flow ở `/user-flow`) cần chuyển sang `.toml`:

```toml
# .codex/agents/flow-reviewer.toml
description = '<copy dòng description trong frontmatter của flow-reviewer.md>'
developer_instructions = """
<copy TOÀN BỘ nội dung body của flow-reviewer.md vào đây>
"""
```

Nội dung review (thiếu nhánh, dead-end, màn thiếu, case happy/error/edge chưa phủ, chia flow sai) giữ nguyên, chỉ đổi vỏ. Thiếu agent này thì `/user-flow` vẫn dựng flow nhưng bỏ bước review tự động.

---

## C. Điểm cần xử lý tay

- **Path trong SKILL.md:** rà mọi chuỗi `.claude/` → `.codex/` (đặc biệt `.claude/scripts/mermaid-verify.mjs` trong user-flow, và `.claude/skills/kg/engine/kg-query.mjs` — nếu project không có KG thì cứ để skill fallback `KG-ERROR → flow cũ`).
- **HITL không fork:** cả `/user-flow` (clarify loop + HARD STOP) và `/wireframe-html` (hỏi device) cần chạy ở main conversation. KHÔNG chạy nền/fork.
- **Template resolve:** kiểm SKILL.md trỏ đúng `_templates/wireframe-html-template.html` + `wireframe-html-nav-template.html`.

---

## D. Prompt tự động

Không cần làm tay từng bước — mở project trong Codex CLI, **mở `PROMPT-CODEX.md` và dán toàn bộ prompt trong đó vào chat**. Codex sẽ tự sao chép + chuyển đổi skill sang `.codex/` đúng chuẩn.

---

## E. Checklist sau khi port

- [ ] `.codex/skills/wireframe-html/` + `.codex/skills/user-flow/` có SKILL.md.
- [ ] `.codex/rules/` có đủ 9 rule (approval-gate, ba-conventions, naming-conventions, changelog, feature-bootstrap, kg-usage, resolve-oqs, diagram-selection, review-format).
- [ ] `_templates/wireframe-html-template.html` + `wireframe-html-nav-template.html` có; path trong SKILL.md đúng.
- [ ] `.codex/scripts/mermaid-verify.mjs` có (nếu dùng verify mermaid).
- [ ] Agent `flow-reviewer` thành `.codex/agents/flow-reviewer.toml`.
- [ ] Path `.claude/` trong SKILL.md đã đổi `.codex/`.
- [ ] Chạy thử `/wireframe-html <feature>` → skill hỏi device + hiện L1 preview trước khi ghi, KHÔNG vẽ im lặng.
