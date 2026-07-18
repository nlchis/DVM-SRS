# 05 — Câu hỏi thường gặp + xử lý sự cố

---

## FAQ

**Hỏi: Tôi phải chạy `/user-flow` trước không?**
Không cần chạy tay. `/wireframe-html` tự gọi `/user-flow` khi chưa có `srs/{feature}-userflow.md`. Nếu đã có sẵn userflow (đã duyệt), skill dùng luôn.

**Hỏi: Wireframe HTML khác gì prototype HTML?**
Wireframe = đen trắng, tĩnh, không JS — review layout/scope nhanh. Prototype (`/prototype-html`, không kèm gói này) = có màu + click-through để demo. Xem thang fidelity ở `04-cach-hoat-dong.md`.

**Hỏi: Vì sao skill cứ hỏi device dù `design.md` đã ghi rõ?**
Bề rộng khung là quyết định thiết kế. Theo approval-gate, skill **không tự chốt im lặng** — chỉ *đề xuất* rồi để bạn xác nhận. Bạn chốt 1 giây là xong.

**Hỏi: Có cần cài npm/Playwright/mmdc không?**
Phần vẽ wireframe: **không cần gì**. `mmdc` chỉ tùy chọn để `/user-flow` tự kiểm mermaid có compile — thiếu vẫn chạy. Xem `01-cai-dat-cong-cu.md`.

**Hỏi: Vẽ bằng tiếng Anh được không?**
Được — nói "viết bằng tiếng Anh" khi chạy. Mặc định tiếng Việt.

**Hỏi: Chỉ muốn vẽ lại 1 flow?**
`/wireframe-html {feature} --flow {flow-slug}` hoặc nói "chỉ vẽ lại flow quên mật khẩu".

**Hỏi: Gói này có `/wireframe-ascii` không?**
Không — gói này gồm `/wireframe-html` + `/user-flow`. `/wireframe-html` chạy độc lập tốt (tự suy luận element từ tài liệu). Nếu workspace bạn có sẵn `/wireframe-ascii`, `/wireframe-html` sẽ đọc lại kết quả ASCII làm nguồn.

---

## Xử lý sự cố

**Skill báo "không tìm thấy skill /wireframe-html".**
Chưa copy skill vào workspace. Kiểm: `ls <workspace>/.claude/skills/wireframe-html/SKILL.md` và `.../user-flow/SKILL.md`. Copy lại theo Bước 1 của `00-bat-dau-nhanh.md`.

**Skill vẽ nhưng thiếu template / lỗi placeholder `{{SCREENS}}`.**
Chưa copy template. Kiểm: `ls <workspace>/_templates/wireframe-html-template.html` và `wireframe-html-nav-template.html`. Copy `claude-code/_templates/*` vào `<workspace>/_templates/`.

**`/user-flow` báo lỗi mermaid-verify / không tìm thấy `mmdc`.**
Bình thường nếu chưa cài `mmdc` — skill bỏ qua verify, vẫn ghi userflow. Muốn tắt cảnh báo thì cài `mmdc` (`01-cai-dat-cong-cu.md`).

**Skill nhắc `@flow-reviewer` không có.**
Copy `claude-code/.claude/agents/flow-reviewer.md` vào `<workspace>/.claude/agents/`. Thiếu agent này thì `/user-flow` vẫn dựng flow được nhưng bỏ bước review tự động.

**Cột Description trong bảng 5 cột bị mỏng / trống.**
Feature thiếu `srs/{feature}-spec.md` nên không có nguồn validation/error. Chạy `/srs {feature}` để có FR/BR/Error Matrix, rồi vẽ lại — hoặc trả lời các câu Gap check skill hỏi.

**Wireframe trông sai tỉ lệ / form kéo dài hết màn desktop.**
Kiểm device đã chốt có đúng ý không. Form/auth nên nằm trong box căn giữa (`wf-form`) — nếu bị trải rộng, nói skill "màn login là form, bọc box căn giữa" rồi vẽ lại.

**Các file flow trong ví dụ có `data-device` khác nhau.**
Bộ ví dụ `authentication` được sinh trước khi convention "chốt device một lần" hoàn thiện, nên có màn để mobile, màn để desktop. Khi bạn chạy mới, skill hỏi device một lần và áp nhất quán.

---

## Vẫn kẹt?

Xem lại `02-luong-user-flow-truoc.md` (hiểu pipeline) và `03-huong-dan-chi-tiet.md` (từng tình huống). Bản thân `SKILL.md` trong `claude-code/.claude/skills/wireframe-html/` là nguồn hành vi đầy đủ nhất.
