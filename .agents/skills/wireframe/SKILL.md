---
name: wireframe
description: Sử dụng khi Business Analyst muốn phác thảo sơ bộ giao diện (UI/UX) dạng ASCII wireframe để minh họa nhanh các màn hình nghiệp vụ cho một tính năng. Kích hoạt bằng lệnh `/wireframe <yêu cầu>` hoặc `/wireframe @<tệp>` hoặc `/wireframe` (tương tác trực tiếp). Kết quả lưu tại `docs/{feature}/wireframes/{wireframe-slug}.md`.
---

# /wireframe — Phác thảo Giao diện ASCII Wireframe (IT-BA)

## Mục tiêu (Goal)

Phát triển yêu cầu giao diện từ ý tưởng thô hoặc tài liệu nghiệp vụ có sẵn (brainstorm, URD, BRD) thành bộ phác thảo giao diện trực quan bằng ký tự ASCII dạng monospace. Bộ phác thảo phải thể hiện rõ bố cục màn hình, các trường nhập liệu, nút bấm, thông báo lỗi/thành công, trạng thái validate thông tin và luồng thao tác của người dùng theo đúng trình tự User Story. Kết quả được lưu trữ có cấu trúc theo mẫu `_templates/wireframe.md`.

## Ràng buộc (Constraints)

- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các tài liệu tạo ra và phản hồi trong chat.
- **IT-BA Framing**: TUÂN THỦ CỨNG quy tắc không bàn về thiết kế kỹ thuật cấp thấp (như CSS framework, React component name, API payload structure, hay cấu trúc DB). Chỉ tập trung vào ngôn ngữ nghiệp vụ BA (tên nhãn, loại dữ liệu hiển thị, nút bấm, thông báo nghiệp vụ).
- **Quy tắc No-re-ask**: Trước khi bắt đầu, quét bối cảnh tệp tin được tag hoặc lịch sử chat để tận dụng thông tin đã có, không hỏi lại những gì user đã trả lời.
- **Duyệt Danh sách Màn hình (Screen Gate)**: Trước khi vẽ, BẮT BUỘC liệt kê danh sách các màn hình dự kiến phác thảo kèm theo chức năng/rule hiển thị chính để người dùng phê duyệt. Chỉ tiến hành phác thảo khi người dùng đồng ý.
- **Vòng lặp L3 Iterate (Phác thảo ASCII)**: Phác thảo ASCII phải được in trực tiếp trong chat box bằng khối mã monospace. Cho phép người dùng phản hồi chỉnh sửa tối đa 3 vòng để tinh chỉnh bố cục trước khi chốt.
- **Duyệt kế hoạch L1**: Trước khi ghi file, in bản xem trước kế hoạch L1 dạng chữ tự nhiên của BA. Chờ phản hồi phê duyệt của người dùng (`Y`/`Sửa`/`Hủy`).
- **Chất lượng vẽ ASCII**: Ưu tiên sử dụng các ký tự vẽ hộp chuẩn (`┌`, `─`, `┐`, `│`, `└`, `┘`, `┼`, `+`, `-`, `|`) để tạo khung nhìn gọn gàng, cân đối, dễ đọc trên môi trường monospace font.

## Đầu vào (Inputs)

```
/wireframe                                         # Tương tác trực tiếp: hỏi yêu cầu màn hình cần phác thảo
/wireframe <yêu cầu hoặc tên tính năng>            # Nhận trực tiếp văn bản yêu cầu
/wireframe @<đường dẫn tệp>                        # Đọc yêu cầu hoặc đặc tả nghiệp vụ từ tệp tin được tag
```

## Các bước thực hiện (Approach)

### Phase A — Phân tích bối cảnh & Trích xuất từ khóa (silent)

1. Đọc văn bản yêu cầu từ người dùng hoặc tệp tin được tag (ví dụ: file brainstorm hoặc URD liên quan).
2. Tự động xác định `feature` slug (kebab-case, ví dụ: `user-authentication`) và `wireframe-slug` (ví dụ: `gmail-login`).
3. Trích xuất các user story, business rules, và danh sách chức năng (Function List) liên quan đến tính năng màn hình đang phân tích.

### Phase B — Đề xuất danh sách màn hình (Screen Gate)

1. Phân tích các trường hợp sử dụng (Use Cases) để xác định danh sách các màn hình cần minh họa bao gồm:
   - Màn hình nhập liệu/tương tác chính (Happy Path).
   - Màn hình/trạng thái validate thông tin (các trường hợp thông báo nhập sai định dạng, thiếu trường bắt buộc).
   - Màn hình/trạng thái trả kết quả (Thành công/Thất bại/Lỗi hệ thống).
2. **Checkpoint 1 (Screen Gate)**: In ra danh sách các màn hình đề xuất và các rule hiển thị chính đi kèm. Dừng lại hỏi người dùng:
   > Em đề xuất danh sách màn hình phác thảo cho tính năng `{feature}` gồm:
   > - Màn hình A: {Chức năng chính, các trường và nút tương tác}
   > - Màn hình B: {Các case validate thông tin và popup thông báo}
   > - Màn hình C: {Màn hình kết quả thành công/thất bại}
   > 
   > Anh/chị có đồng ý với danh sách này hoặc muốn thêm/bớt màn hình nào không? (Y/Sửa/Hủy)

### Phase C — Gợi ý tính năng mở rộng & Làm rõ yêu cầu

1. Tham khảo các giải pháp nguồn mở hoặc thiết kế phổ biến của đối thủ cạnh tranh để đề xuất thêm các tính năng/yếu tố giao diện nên có (ví dụ: Đăng nhập Gmail nên có thêm checkbox "Ghi nhớ đăng nhập", nút "Quên mật khẩu", liên kết hỗ trợ kỹ thuật, hoặc cơ chế chống brute-force như captcha).
2. Nhắc nhở và hỏi ý kiến người dùng nếu cần làm rõ các rule hiển thị đặc thù.

### Phase D — Phác thảo ASCII Wireframes & Tinh chỉnh (L3 Iterate)

1. Thực hiện phác thảo các màn hình bằng ký tự ASCII dạng monospace theo đúng luồng User Story đã thống nhất.
2. Thiết kế giao diện rõ ràng, có căn lề, hiển thị trực quan các placeholder `[ input ]`, nút tương tác `[ Button ]`, trạng thái lỗi/cảnh báo `(!)` hoặc `(x)`.
3. **Checkpoint 2 (L3 Gate - Tinh chỉnh giao diện)**: In bản vẽ ASCII trực tiếp trong chat. Dừng lại hỏi:
   > **[/wireframe] Phiên bản {N}:**
   > 
   > <Bản vẽ ASCII>
   > 
   > Đồng ý / Sửa: <mô tả thay đổi giao diện> / Hủy:
   - Hỗ trợ tối đa 3 vòng lặp tinh chỉnh. Đến vòng thứ 3, nếu người dùng vẫn muốn sửa, in thông báo đạt giới hạn vòng lặp, chốt phiên bản hiện tại và hướng dẫn người dùng tự chỉnh sửa file sau khi ghi.

### Phase E — Phê duyệt L1 & Ghi tài liệu

1. **L1 Plan Preview**: Hiển thị kế hoạch ghi tệp bằng ngôn ngữ BA tự nhiên:
   > Em sẽ tạo mới tệp `docs/{feature}/wireframes/{wireframe-slug}.md` với các nội dung:
   > - Luồng màn hình {Danh sách các màn hình}.
   > - Phác thảo giao diện ASCII đã được duyệt cho các màn.
   > - Các quy tắc giao diện UI-Rules và đề xuất UX.
   > - Đóng lại các câu hỏi mở; ghi nhận changelog "{note}".
   >
   > Đồng ý triển khai kế hoạch này? (Y/Sửa/Hủy)
2. **Ghi tệp**: Ghi nội dung vào tệp tin theo mẫu cấu trúc tại `_templates/wireframe.md`.

### Phase F — Giải quyết câu hỏi mở (Resolve OQs)

1. Thu thập các câu hỏi mở UI/UX (`OQ-UI`) phát sinh trong quá trình thiết kế.
2. Hỏi ý kiến người dùng để giải quyết ngay hoặc lưu lại trạng thái chờ phản hồi trong tài liệu.

## Những điều cần lưu ý (Gotchas)

- **Độ phân giải màn hình**: Bản vẽ ASCII không nên quá rộng (khuyên dùng chiều ngang tối đa 60-70 ký tự) để tránh bị vỡ dòng khi hiển thị trong khung chat của IDE hoặc Obsidian.
- **Nhất quán mã ký tự**: Sử dụng các ký tự vẽ hộp có cùng độ rộng hiển thị (monospace font friendly) để khung viền không bị lệch.

## Tài liệu tham chiếu (References)

- @.agents/rules/ba-conventions.md
- @.agents/rules/approval-gate.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/resolve-oqs.md
- @.agents/rules/changelog.md
- @_templates/wireframe.md

