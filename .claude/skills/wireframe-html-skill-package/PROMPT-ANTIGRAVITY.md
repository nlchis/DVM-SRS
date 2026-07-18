# Prompt cài skill /wireframe-html vào Antigravity IDE

> **Cách dùng:** mở thư mục gói này (`wireframe-html-skill-package/`) trong Google Antigravity IDE → mở chat agent → copy NGUYÊN khối prompt dưới đây → dán → gửi. Agent tự đọc file trong gói, sao chép và chuyển skill vào đúng chỗ. Muốn hiểu cơ chế, xem `INSTALL-ANTIGRAVITY.md`.

---

````text
Đây là bộ skill /wireframe-html + /user-flow — vẽ wireframe HTML đen trắng cho từng luồng của
một feature, từ bản đồ luồng người dùng. Viết ban đầu cho Claude Code. Bạn là agent của Google
Antigravity IDE. Nhiệm vụ: SAO CHÉP bộ skill này sang Antigravity và CHUYỂN ĐỔI đúng chuẩn
Antigravity, không cài trực tiếp cấu trúc Claude Code.

Bám tài liệu Antigravity mới nhất khoảng 06/2026 khi thực hiện: antigravity.google/docs/skills,
antigravity.google/docs/rules-workflows và codelab Authoring Antigravity Skills. Nếu có thể đọc
web, hãy đối chiếu trực tiếp; nếu không, làm theo INSTALL-ANTIGRAVITY.md trong gói này vì file
đã cập nhật theo tài liệu khoảng 06/2026. Path và format có thể khác giữa các bản Antigravity,
nên không được đoán theo bản cũ.

══════════ BƯỚC 0 — CHỌN PHẠM VI VÀ XÁC MINH CẤU HÌNH ══════════
TRƯỚC KHI sao chép, hỏi tôi và chờ câu trả lời: cài cho workspace hiện tại hay cài global cho
mọi project. Không được tự chọn phạm vi.

- Workspace: xác minh thư mục cấu hình thực tế là .agents/ hay .agent/ (tạo thử 1 skill rỗng
  qua UI để xem IDE đẻ ra tên gì).
- Global: dùng phạm vi global dưới ~/.gemini/ theo đúng cấu trúc phiên bản Antigravity hiện tại.

NGUỒN (đọc trước khi làm):
- Skill:      wireframe-html-skill-package/claude-code/.claude/skills/wireframe-html/  (SKILL.md)
              wireframe-html-skill-package/claude-code/.claude/skills/user-flow/       (SKILL.md)
- Rules:      wireframe-html-skill-package/claude-code/.claude/rules/*.md
- Agent:      wireframe-html-skill-package/claude-code/.claude/agents/flow-reviewer.md
- Script:     wireframe-html-skill-package/claude-code/.claude/scripts/mermaid-verify.mjs
- Templates:  wireframe-html-skill-package/claude-code/_templates/  (wireframe-html-template.html + wireframe-html-nav-template.html)
- Ví dụ mẫu:  wireframe-html-skill-package/example/authentication/  (userflow nguồn + wireframe output đúng trông thế nào)

CÁC BƯỚC:

1. Copy 2 skill sang .agents/skills/ (wireframe-html + user-flow). Sửa frontmatter SKILL.md:
   GIỮ name + description; BỎ allowed-tools / user-invocable / disable-model-invocation /
   argument-hint; đưa cú pháp tham số xuống mục "Inputs / Cách gọi" trong body.
   XÓA dòng ghi chú cũ "context: fork" trong body SKILL.md wireframe-html.

2. Copy rules sang .agents/rules/ (giữ nội dung). Bộ gồm: approval-gate, ba-conventions,
   naming-conventions, changelog, feature-bootstrap, kg-usage, resolve-oqs, diagram-selection,
   review-format.

3. Copy templates sang _templates/ GIỮ NGUYÊN (wireframe-html-template.html +
   wireframe-html-nav-template.html) — SKILL.md tham chiếu 2 file này để render.

4. (Tùy chọn) Copy .claude/scripts/mermaid-verify.mjs sang .agents/scripts/. Sửa path trong
   SKILL.md user-flow. Nếu SKILL.md nhắc kg-query.mjs mà project không có KG, để nguyên —
   skill fallback "KG-ERROR → đọc trực tiếp tài liệu".

5. AGENT REVIEW flow-reviewer: nhúng INLINE nội dung flow-reviewer.md thành mục "Tiêu chí tự
   review flow" trong SKILL.md user-flow (thiếu nhánh, dead-end, màn thiếu, case happy/error/edge
   chưa phủ, chia flow sai). Hoặc dùng subagent nếu bản Antigravity của bạn hỗ trợ.

6. (Tùy chọn) Tạo Workflow mỏng để gõ /wireframe-html như lệnh.

RÀNG BUỘC:
- Chạy cả 2 skill ở luồng CÓ KÊNH CHAT (không chạy nền). /user-flow có clarify loop + HARD STOP
  duyệt flow; /wireframe-html hỏi device (Mobile/Tablet/Desktop/Responsive) + L1 preview. Chạy
  nền = mất kênh trả lời = các chốt này bị bỏ qua.
- GIỮ quy tắc: /wireframe-html KHÔNG tự chia flow — luôn đọc srs/{feature}-userflow.md. Chưa có
  → tự gọi /user-flow trước.
- GIỮ approval gate: hỏi device + xem trước (L1) rồi mới ghi; cập nhật thì xem diff (L2).
- GIỮ đen trắng nghiêm ngặt (chỉ #000/#fff/#f0f0f0/#888/#ccc), element HTML thật (không ASCII),
  khung đúng bề rộng device, form không trải rộng hết khung desktop, một màn = một trạng thái.
- KHÔNG bịa: field thiếu chi tiết validation → hỏi user, không tự chế rule.
- Vietnamese-first (user nói "viết bằng tiếng Anh" để đổi).

BÁO CÁO sau khi xong:
1. Phạm vi đã chọn (workspace/global) + thư mục cấu hình thực tế (.agents/ hay .agent/).
2. Cây thư mục đã tạo.
3. Cách đã xử lý flow-reviewer (inline/subagent).
4. Path đã sửa (script + template).
Rồi chạy thử: /wireframe-html <feature bất kỳ đã có srs/{feature}-userflow.md> và xác nhận skill
HỎI device + hiện L1 preview trước khi ghi, không vẽ im lặng.
````
