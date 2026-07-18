# Prompt cài skill /wireframe-html vào Codex CLI

> **Cách dùng:** mở thư mục gói này trong project của bạn (hoặc copy gói vào project) → mở Codex CLI tại project → copy NGUYÊN khối prompt dưới đây → dán vào chat → gửi. Codex sẽ tự copy + chuyển đổi skill. Muốn hiểu cơ chế, xem `INSTALL-CODEX.md`.

---

````text
Đây là bộ skill /wireframe-html + /user-flow — vẽ wireframe HTML đen trắng cho từng luồng của
một feature, từ bản đồ luồng người dùng. Viết ban đầu cho Claude Code. Bạn là Codex CLI. Hãy
SAO CHÉP bộ skill này có sẵn trong thư mục gói "wireframe-html-skill-package/" sang .codex/ của
project này và CHUYỂN ĐỔI cấu trúc, path và cơ chế cho tương thích với Codex.

NGUỒN (đọc trước khi làm):
- Skill:      wireframe-html-skill-package/claude-code/.claude/skills/wireframe-html/  (SKILL.md)
              wireframe-html-skill-package/claude-code/.claude/skills/user-flow/       (SKILL.md)
- Rules:      wireframe-html-skill-package/claude-code/.claude/rules/*.md
- Agent:      wireframe-html-skill-package/claude-code/.claude/agents/flow-reviewer.md
- Script:     wireframe-html-skill-package/claude-code/.claude/scripts/mermaid-verify.mjs
- Templates:  wireframe-html-skill-package/claude-code/_templates/  (wireframe-html-template.html + wireframe-html-nav-template.html)
- Ví dụ mẫu:  wireframe-html-skill-package/example/authentication/  (userflow nguồn + wireframe output đúng trông thế nào)

CÁC BƯỚC:

1. Copy skill + templates GIỮ NGUYÊN:
   cp -R wireframe-html-skill-package/claude-code/.claude/skills/wireframe-html  .codex/skills/
   cp -R wireframe-html-skill-package/claude-code/.claude/skills/user-flow        .codex/skills/
   cp    wireframe-html-skill-package/claude-code/_templates/*                    _templates/
   (tạo .codex/skills/ và _templates/ nếu chưa có; SKILL.md tham chiếu
    _templates/wireframe-html-template.html + wireframe-html-nav-template.html)

2. Copy rules + script GIỮ NGUYÊN:
   cp    wireframe-html-skill-package/claude-code/.claude/rules/*.md      .codex/rules/
   mkdir -p .codex/scripts
   cp    wireframe-html-skill-package/claude-code/.claude/scripts/*.mjs   .codex/scripts/

3. SỬA PATH trong SKILL.md: đổi mọi chuỗi ".claude/" thành ".codex/"
   (đặc biệt: node .codex/scripts/mermaid-verify.mjs trong user-flow).
   Nếu SKILL.md nhắc .claude/skills/kg/engine/kg-query.mjs mà project không có KG, cứ để nguyên —
   skill tự fallback "KG-ERROR → đọc trực tiếp tài liệu", không hỏng.
   Nếu Codex báo lỗi parse frontmatter SKILL.md, chỉ giữ name + description và đưa cú pháp
   tham số (argument-hint) xuống mục "Inputs / Cách gọi" trong body.

4. CHUYỂN AGENT REVIEW sang TOML:
   - Tạo .codex/agents/flow-reviewer.toml với:
       description = '<dòng description trong frontmatter của flow-reviewer.md>'
       developer_instructions = """<toàn bộ body của flow-reviewer.md>"""

RÀNG BUỘC:
- Chạy cả 2 skill ở main conversation (KHÔNG chạy nền/fork). /user-flow có clarify loop + HARD
  STOP duyệt flow; /wireframe-html hỏi device (Mobile/Tablet/Desktop/Responsive) + L1 preview.
  Fork = mất kênh trả lời = các chốt này bị bỏ qua. (SKILL.md wireframe-html có 1 dòng ghi chú
  cũ "context: fork" — BỎ QUA / xóa dòng đó, không làm theo.)
- GIỮ quy tắc: /wireframe-html KHÔNG tự chia flow — luôn đọc srs/{feature}-userflow.md. Chưa có
  → tự gọi /user-flow trước.
- GIỮ approval gate: hỏi device + xem trước (L1) rồi mới ghi; cập nhật thì xem diff (L2).
- GIỮ đen trắng nghiêm ngặt (chỉ #000/#fff/#f0f0f0/#888/#ccc), element HTML thật (không ASCII),
  khung đúng bề rộng device, form không trải rộng hết khung desktop, một màn = một trạng thái.
- KHÔNG bịa: field thiếu chi tiết validation → hỏi user, không tự chế rule.
- Vietnamese-first (user nói "viết bằng tiếng Anh" để đổi).

BÁO CÁO sau khi xong:
1. Cây thư mục .codex/ đã tạo.
2. Danh sách path đã sửa (.claude → .codex).
3. Agent flow-reviewer đã chuyển TOML.
Rồi chạy thử: /wireframe-html <feature bất kỳ đã có srs/{feature}-userflow.md> và xác nhận skill
HỎI device + hiện L1 preview trước khi ghi, không vẽ im lặng.
````
