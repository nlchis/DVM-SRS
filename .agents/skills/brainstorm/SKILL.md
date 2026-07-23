---
name: brainstorm
description: Sử dụng khi Business Analyst muốn brainstorm tính năng hoặc chỉnh sửa tính năng mới. Kích hoạt bằng lệnh `/brainstorm <yêu cầu>` hoặc `/brainstorm` (tương tác trực tiếp). Kết quả lưu tại `docs/{feature}/brainstorms/{idea-slug}.md`.
---

# /brainstorm — Brainstorm Nghiệp vụ & Tư duy Tính năng (IT-BA)

## Mục tiêu (Goal)

Phát triển ý tưởng thô từ người dùng thành một tài liệu brainstorm chi tiết có cấu trúc rõ ràng theo định dạng mẫu `_templates/brainstorm.md`. Tài liệu này giúp BA tư duy đa chiều: nghĩ theo mục tiêu (Cockburn Goal Levels), hỏi đúng vấn đề cần giải quyết (5W1H), thiết kế hành trình người dùng/hệ thống, liệt kê tính năng qua CRUD, thiết lập Business Rules, tập trung vào Exception Flows và nhận diện rủi ro.

## Ràng buộc (Constraints)

- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các tài liệu tạo ra và phản hồi trong chat.
- **IT-BA Framing**: TUÂN THỦ CỨNG quy tắc không hỏi hoặc ghi nhận thông tin kỹ thuật cấp thấp (như DB schema, column name, JWT/Session, API endpoint cụ thể, SDK). Tập trung 100% vào ngôn ngữ nghiệp vụ BA.
- **Quy tắc No-re-ask**: Trước khi hỏi bất kỳ câu nào, quét bối cảnh tệp tin hiện tại và lịch sử chat để loại bỏ các câu hỏi mà người dùng đã trả lời hoặc đã có sẵn thông tin.
- **Human-in-the-Loop Gate (Xác nhận sau mỗi bước)**: Bắt buộc dừng lại và hỏi xác nhận từ người dùng sau mỗi Phase (A, B, C, D, E) trước khi chuyển sang Phase tiếp theo. Người dùng có thể chỉnh sửa thông tin, yêu cầu phân tích lại hoặc gõ `Y` để đồng ý tiếp tục.
- **Duyệt kế hoạch L1**: Trước khi ghi tệp tin, in bản xem trước kế hoạch L1 dạng chữ tự nhiên của BA. Chờ phản hồi phê duyệt của người dùng (`Y`/`Sửa`/`Hủy`).
- **Tài liệu hóa**: Tất cả các sơ đồ hành trình cần được vẽ dưới dạng sơ đồ PlantUML (nhằm cho phép sao chép trực tiếp vào PlantUML Live Editor để dựng lại sơ đồ).

## Đầu vào (Inputs)

```
/brainstorm                                         # Tương tác trực tiếp: hỏi ý tưởng cần brainstorm
/brainstorm <yêu cầu tính năng>                     # Nhận trực tiếp văn bản yêu cầu
/brainstorm @<đường dẫn tệp>                        # Đọc yêu cầu từ tệp tin được tag
```

## Các bước thực hiện (Approach)

### Phase A — Nhận yêu cầu & Xác định từ khóa (silent)

1. Phân tích văn bản yêu cầu đầu vào từ người dùng hoặc tệp tin được tag.
2. Tự động sinh `feature` slug (ví dụ: `automated-reconciliation`) và `idea-slug` (ví dụ: `matching-rules-config`).
3. Trích xuất danh sách các từ khóa nghiệp vụ.
4. **Checkpoint 1 (Xác nhận Phase A)**: In ra:
   > - Feature Slug đề xuất: `{feature}`
   > - Idea Slug đề xuất: `{idea-slug}`
   > - Từ khóa nghiệp vụ chính: `{keywords}`
   > 
   > Bạn có đồng ý với thông tin này hoặc muốn chỉnh sửa gì không? (Y/Sửa)

### Phase B — Phỏng vấn làm rõ Cockburn Goal Level & 5W1H

1. Sử dụng phương pháp **Cockburn Goal Level** để làm rõ mục tiêu:
   - **Summary Level (Cloud/Kite)**: Mục tiêu chiến lược / Quy trình dài hạn.
   - **User Goal Level (Sea Level)**: Các tác vụ nghiệp vụ cơ bản mà người dùng có thể thực hiện xong trong 1 phiên làm việc để tạo ra giá trị rõ ràng (Coffee Break test).
   - **Subfunction Level (Fish/Clam)**: Các bước logic / chức năng hỗ trợ chi tiết.
2. Sử dụng framework **5W1H** để làm rõ nhu cầu:
   - **Who**: Xác định rõ các bên liên quan (Stakeholders) và người dùng cuối (End-users).
   - **Why**: Lý do cần tính năng, vấn đề nghiệp vụ nào đang cần giải quyết.
   - **What / When / Where / How**: Mô tả bối cảnh và cách thức hoạt động ở mức nghiệp vụ.
3. **Checkpoint 2 (Xác nhận Phase B)**: In tóm tắt kết quả phỏng vấn Cockburn Goal Levels và 5W1H. Dừng lại hỏi người dùng:
   > Bạn có đồng ý với bảng tóm tắt mục tiêu và nhu cầu nghiệp vụ này không? (Y/Sửa)

### Phase C — Phác thảo Hành trình (User & System Journey)

1. Lựa chọn loại sơ đồ phù hợp nhất để mô tả chi tiết hành trình (Sequence Diagram hoặc User Journey hoặc Activity Diagram).
2. Vẽ sơ đồ bằng cú pháp PlantUML (định dạng tương thích với PlantUML Live Editor) để mô tả chi tiết hành trình hệ thống và người dùng.
3. **Checkpoint 3 (Xác nhận Phase C)**: Render mã nguồn PlantUML trong khối mã và mô tả ngắn gọn từng bước hành trình. Dừng lại hỏi người dùng:
   > Bạn có đồng ý với sơ đồ hành trình nghiệp vụ này không? (Y/Sửa)

### Phase D — Brainstorm CRUD & Business Rules

1. Thực hiện brainstorm danh sách tính năng (Function List) bằng cách áp dụng lăng kính CRUD (Tạo, Đọc, Sửa, Xóa) cho các thực thể nghiệp vụ cốt lõi.
2. Thiết lập các quy tắc nghiệp vụ (Business Rules) cần thiết để đảm bảo tính toàn vẹn của nghiệp vụ, đánh ID dạng `BR-{feature}-{NNN}`.
3. **Checkpoint 4 (Xác nhận Phase D)**: In bảng tóm tắt danh sách tính năng và quy tắc nghiệp vụ. Dừng lại hỏi người dùng:
   > Bạn có đồng ý với đề xuất tính năng và quy tắc nghiệp vụ này không? (Y/Sửa)

### Phase E — Xác định Exception Flows & Risks

1. Phân tích các luồng lỗi nghiệp vụ, trường hợp biên, và luồng ngoại lệ (Exception Flows).
2. Xác định các rủi ro nghiệp vụ có thể xảy ra và đề xuất phương án phòng ngừa (Mitigations).
3. **Checkpoint 5 (Xác nhận Phase E)**: In danh sách luồng ngoại lệ và rủi ro. Dừng lại hỏi người dùng:
   > Bạn có đồng ý với các luồng ngoại lệ và rủi ro được liệt kê không? (Y/Sửa)

### Phase F — Duyệt L1 & Ghi tài liệu & Resolve OQs

1. **L1 Plan Preview**: Hiển thị kế hoạch ghi tệp bằng ngôn ngữ BA tự nhiên:
   > Em sẽ tạo mới tệp `docs/{feature}/brainstorms/{idea-slug}.md` với các nội dung đã được duyệt qua các bước.
   > 
   > Đồng ý triển khai kế hoạch này? (Y/Sửa)
2. **Ghi tệp**: Ghi nội dung vào tệp tin theo mẫu cấu trúc tại `_templates/brainstorm.md`.
3. **Resolve OQs (Phase E của Resolve OQs)**: Chạy vòng lặp phỏng vấn giải quyết câu hỏi mở nếu có và Cascade Scan cập nhật downstream docs.

## Những điều cần lưu ý (Gotchas)

- **Tránh Jargon kỹ thuật**: Tuyệt đối không bàn luận về DB schema, RESTful API endpoint, JWT/Session. Luôn sử dụng từ ngữ nghiệp vụ BA.
- **Nguyên tắc HITL**: Không bao giờ bỏ qua các Checkpoint phê duyệt của từng Phase. Phản hồi của người dùng ở mỗi Checkpoint là bắt buộc để đi tiếp.

## Tài liệu tham chiếu (References)

- @.agents/rules/ba-conventions.md
- @.agents/rules/approval-gate.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/resolve-oqs.md
- @.agents/rules/changelog.md
- @_templates/brainstorm.md
- @.agents/skills/brainstorm/references/example-brainstorm.md

