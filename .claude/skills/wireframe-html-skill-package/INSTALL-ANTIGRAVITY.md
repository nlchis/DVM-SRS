# Port skill /wireframe-html sang Google Antigravity IDE

> Đưa skill `/wireframe-html` + `/user-flow` (vốn viết cho Claude Code) sang **Google Antigravity IDE**. Gồm: (A) cấu trúc cấu hình Antigravity, (B) ánh xạ Claude Code → Antigravity, (C) prompt copy-paste ở `PROMPT-ANTIGRAVITY.md`.
>
> Cập nhật theo tài liệu Antigravity tới ~6/2026. Path có thể đổi giữa các bản — luôn đối chiếu cây thư mục thật trong IDE (xem cảnh báo A.3).

---

## A. Antigravity cấu hình thế nào

### A.1 — Vị trí (workspace / project scope)

| Loại | Đường dẫn | Vai trò |
|---|---|---|
| **Skills** | `<project-root>/.agents/skills/{name}/SKILL.md` | "Sổ tay" agent nạp khi liên quan. Tương đương skill Claude Code. |
| **Rules** | `<project-root>/.agents/rules/*.md` | Như system instruction — luôn áp dụng. |
| **Workflows** | `<project-root>/.agent/workflows/*.md` | Prompt lưu sẵn, gọi bằng `/<tên>` trong chat. |
| **AGENTS.md** | `<project-root>/AGENTS.md` | Nền tảng chung (Antigravity + Cursor + Claude Code đều đọc). |

### A.2 — Global scope (mọi project)

| Loại | Đường dẫn |
|---|---|
| Skills | `~/.gemini/config/skills/` |
| Rules | `~/.gemini/GEMINI.md` |

### A.3 — ⚠️ Cảnh báo tên thư mục (`.agent` vs `.agents`)

Điểm dễ sai nhất — nguồn tài liệu lẫn số ít/số nhiều:
- **Skills/Rules:** đa số dùng **`.agents/`** (số nhiều).
- **Workflows:** có nguồn ghi `.agent/workflows/`, có nguồn `.agents/workflows/`; Antigravity còn cho tạo workflow qua UI.

👉 **Trước khi copy, tạo thử 1 skill rỗng qua UI/lệnh của Antigravity để xem nó đẻ ra thư mục tên gì.** Dùng đúng tên đó. Hướng dẫn dưới mặc định `.agents/`.

### A.4 — SKILL.md của Antigravity

Frontmatter tối giản:
```yaml
---
name: wireframe-html
description: <trigger phrase NGỮ NGHĨA, càng cụ thể càng dễ kích hoạt đúng>
---
```
- `description` là **bắt buộc** và là "trigger phrase" — mô tả cụ thể ("Vẽ wireframe HTML đen trắng cho từng luồng của một feature từ bản đồ user flow, element HTML thật, đúng bề rộng thiết bị") mới được nạp đúng.
- Kích hoạt qua ngôn ngữ tự nhiên; muốn gõ `/wireframe-html` thì tạo thêm Workflow mỏng (B.4).

---

## B. Ánh xạ Claude Code → Antigravity

| Thành phần Claude Code | Trong gói | → Antigravity |
|---|---|---|
| `.claude/skills/wireframe-html/SKILL.md` | `claude-code/.claude/skills/wireframe-html/` | `.agents/skills/wireframe-html/SKILL.md` (sửa frontmatter, B.1) |
| `.claude/skills/user-flow/SKILL.md` | `claude-code/.claude/skills/user-flow/` | `.agents/skills/user-flow/SKILL.md` (sửa frontmatter, B.1) |
| `.claude/agents/flow-reviewer.md` | `claude-code/.claude/agents/` | nhúng inline vào skill user-flow (B.2) hoặc subagent Antigravity 2.0 |
| `.claude/scripts/mermaid-verify.mjs` | `claude-code/.claude/scripts/` | `.agents/scripts/mermaid-verify.mjs` (giữ nguyên, Node — tùy chọn) |
| `.claude/rules/*.md` | `claude-code/.claude/rules/` | `.agents/rules/*.md` (giữ nội dung) |
| `_templates/wireframe-html-*.html` | `claude-code/_templates/` | `_templates/wireframe-html-*.html` (giữ nguyên) |

### B.1 — Frontmatter SKILL.md

- **Giữ:** `name`, `description`.
- **Bỏ:** `allowed-tools`, `user-invocable`, `disable-model-invocation`, `argument-hint`.
- Cú pháp tham số (`/wireframe-html <feature>`) → chuyển xuống mục "Inputs / Cách gọi" trong body.
- **Xóa dòng ghi chú cũ "context: fork"** trong body SKILL.md wireframe-html — skill có HITL thật, KHÔNG được chạy fork/nền.

### B.2 — Agent review (`flow-reviewer`)

Claude Code spawn qua Task tool ở `/user-flow`; Antigravity không có y hệt. Hai cách:
1. **Inline (khuyến nghị khi mới port):** nhúng nội dung `flow-reviewer.md` thành mục "Tiêu chí tự review flow" trong SKILL.md user-flow, để agent tự soi flow (thiếu nhánh, dead-end, màn thiếu, case happy/error/edge chưa phủ, chia flow sai) TRƯỚC khi in ra chat cho user duyệt.
2. **Subagent (Antigravity 2.0):** nếu bản của bạn hỗ trợ subagents, tách thành subagent và gọi ở bước review flow.

### B.3 — Path script + template trong SKILL.md

Rà chuỗi `.claude/scripts/mermaid-verify.mjs` (trong user-flow) → đổi cho khớp vị trí mới trong `.agents/`. Nếu SKILL.md nhắc `.claude/skills/kg/engine/kg-query.mjs` mà project không có KG, cứ để nguyên — skill fallback "KG-ERROR → đọc trực tiếp tài liệu". Reference `@../../rules/...` → bỏ (rule ở `.agents/rules/` auto-load) hoặc sửa path. Kiểm SKILL.md trỏ đúng `_templates/wireframe-html-template.html` + `wireframe-html-nav-template.html`.

### B.4 — (Tùy chọn) Lệnh `/wireframe-html`

Muốn gõ lệnh như Claude Code: tạo Workflow mỏng `.agent/workflows/wireframe-html.md` (frontmatter có `description`) trỏ về skill.

---

## C. Điểm cần chú ý

- **HITL không chạy nền.** Cả `/user-flow` (clarify loop + HARD STOP duyệt flow) và `/wireframe-html` (hỏi device + L1/L2) cần luồng có kênh chat. Chạy nền = các chốt bị bỏ qua → skill tự đoán/vẽ im lặng.
- **Không cần cài gì để vẽ wireframe** — HTML tĩnh tự-chứa. `mermaid-verify.mjs` chỉ tùy chọn (cần `mmdc` ở máy) để `/user-flow` kiểm mermaid; thiếu vẫn chạy.
- **Template render** (`wireframe-html-template.html` + nav) là file tĩnh — Antigravity chỉ thay lớp điều phối AI, không thay template.

---

## D. Prompt tự động

Không cần làm tay từng bước — mở gói này trong Antigravity IDE, **mở `PROMPT-ANTIGRAVITY.md` và dán toàn bộ prompt trong đó vào chat agent**. AI sẽ tự sao chép + chuyển đổi skill sang chuẩn Antigravity IDE (prompt đã dặn agent bám tài liệu Antigravity mới nhất ~06/2026).

---

## E. Checklist sau khi port

- [ ] `.agents/skills/wireframe-html/` + `.agents/skills/user-flow/` có SKILL.md (frontmatter chỉ còn `name` + `description`).
- [ ] `.agents/rules/` có đủ rule.
- [ ] Path script + template trong SKILL.md đã trỏ đúng vị trí `.agents/`.
- [ ] Tiêu chí `flow-reviewer` nằm inline trong SKILL.md user-flow (hoặc subagent).
- [ ] Dòng ghi chú "context: fork" trong SKILL.md wireframe-html đã xóa; skill chạy ở luồng có chat.
- [ ] Chạy thử `/wireframe-html <feature>` → skill hỏi device + L1 preview trước khi ghi, KHÔNG vẽ im lặng.

---

## Nguồn tham khảo (Antigravity, tới ~6/2026)

- [Getting Started with Google Antigravity — Codelabs](https://codelabs.developers.google.com/getting-started-google-antigravity)
- [Authoring Antigravity Skills — Codelabs](https://codelabs.developers.google.com/getting-started-with-antigravity-skills)
- [Antigravity Docs — Skills](https://antigravity.google/docs/skills) · [Rules & Workflows](https://antigravity.google/docs/rules-workflows)
