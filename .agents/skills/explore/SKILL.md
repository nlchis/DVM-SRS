---
name: explore
description: Sử dụng khi Business Analyst muốn nghiên cứu nghiệp vụ, phân tích từ khóa, đối thủ cạnh tranh, dự án tương tự trên GitHub và đề xuất tính năng (P0/P1/P2) cho hệ thống Đối soát Tự động (ARS). Kích hoạt bằng lệnh `/explore <yêu cầu>` hoặc `/explore @<tệp>` hoặc `/explore` (tương tác trực tiếp). Bản vẽ lưu tại `docs/{feature}/explores/{topic-slug}.md`.
author: Phúc NT & Antigravity @ BA Zone
source: https://github.com/ba-zone
---

# /explore — Nghiên cứu Nghiệp vụ & Phân tích Đối thủ (IT-BA)

## Mục tiêu (Goal)

Phát triển yêu cầu thô từ người dùng thành một tài liệu nghiên cứu nghiệp vụ có cấu trúc rõ ràng theo định dạng mẫu `_templates/explore.md`. Tài liệu này bao gồm bối cảnh nghiệp vụ, thuật ngữ chính, chi tiết phân tích đối thủ cạnh tranh (giao diện, luồng xử lý, quy tắc đối soát), khảo sát dự án tương tự trên GitHub, bảng so sánh tính năng, đề xuất bộ tính năng cho hệ thống ARS (phân cấp P0/P1/P2), luồng nghiệp vụ happy path đi kèm sơ đồ ASCII, phân tích giả định/rủi ro nghiệp vụ, và danh sách các câu hỏi mở được đánh ID.

## Ràng buộc (Constraints)

- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các tài liệu tạo ra và phản hồi trong chat.
- **IT-BA Framing**: TUÂN THỦ CỨNG quy tắc không hỏi hoặc ghi nhận thông tin kỹ thuật cấp thấp (như DB schema, column name, JWT/Session, API endpoint cụ thể, SDK). Tập trung 100% vào ngôn ngữ nghiệp vụ BA (cách hệ thống vận hành, thông tin nghiệp vụ cần lưu, luồng trao đổi dữ liệu).
- **Quy tắc No-re-ask**: Trước khi hỏi bất kỳ câu nào, quét bối cảnh tệp tin hiện tại để loại bỏ các câu hỏi mà người dùng đã trả lời hoặc đã có sẵn thông tin.
- **Quy tắc Hỏi lại (Clarification Gate)**: Ở Phase C, nếu yêu cầu nghiệp vụ của người dùng có điểm mâu thuẫn hoặc quá mơ hồ, skill BẮT BUỘC phải dừng lại để đặt câu hỏi làm rõ trước khi chuyển sang bước viết tài liệu.
- **Duyệt kế hoạch L1**: Trước khi ghi tệp tin, in bản xem trước kế hoạch L1 dạng chữ tự nhiên của BA (không dùng bảng kỹ thuật). Chờ phản hồi phê duyệt của người dùng (`Y`/`Sửa`/`Hủy`).
- **Chất lượng sơ đồ ASCII**: Sử dụng ký tự vẽ hộp (box-drawing characters) để vẽ luồng, không sử dụng sơ đồ Mermaid trong chat hoặc tệp `/explore` đầu ra (Mermaid chỉ lưu cho `/sequence` hoặc các tài liệu kỹ thuật).
- **Vòng lặp giải quyết câu hỏi mở Phase E**: Chạy ngay sau khi ghi tài liệu thành công. Cho phép người dùng chọn trả lời từng câu hỏi mở để hệ thống tự động quét và cập nhật cascade thay đổi sang các tài liệu liên quan khác thông qua L2 Diff.

## Đầu vào (Inputs)

```
/explore                                         # Tương tác trực tiếp: hỏi yêu cầu nghiệp vụ
/explore <yêu cầu tính năng>                     # Nhận trực tiếp văn bản yêu cầu
/explore @<đường dẫn tệp>                        # Đọc yêu cầu từ tệp tin được tag
/explore <yêu cầu tính năng> --shallow           # Chạy nhanh, bỏ qua một số phân tích sâu
/explore <yêu cầu tính năng> --lang vi|en        # Chỉ định ngôn ngữ đầu ra (mặc định vi)
```

## Các bước thực hiện (Approach)

### Phase A — Phân tích & Trích xuất từ khóa (silent)

1. Phân tích văn bản yêu cầu đầu vào từ người dùng hoặc tệp tin được tag.
2. Tự động sinh `feature` slug (kebab-case tối đa 30 ký tự, ví dụ: `bank-reconciliation`) và `topic-slug` (ví dụ: `daily-matching`).
3. Trích xuất danh sách các từ khóa nghiệp vụ (cả tiếng Việt và tiếng Anh) làm cơ sở tìm kiếm.
4. Đánh giá các tín hiệu độ phức tạp nghiệp vụ (tích hợp cổng thanh toán bên thứ ba, luồng xử lý nền bất đồng bộ, nhiều vai trò hệ thống, máy trạng thái của trạng thái giao dịch).

### Phase B — Nghiên cứu Nghiệp vụ & Đối thủ

1. Thực hiện tìm kiếm web để thu thập tài liệu nghiệp vụ, tài liệu tích hợp API của đối tác (ví dụ: tài liệu IPN/Query cổng thanh toán Momo) và các chuẩn mực kế toán đối soát.
2. Tìm kiếm thêm trên GitHub hoặc các mã nguồn mở các dự án tương tự đã có tính năng liên quan để tham khảo thiết kế nghiệp vụ của họ (ví dụ: cách thiết kế bảng cơ sở dữ liệu đối soát nghiệp vụ, cách lưu vết giao dịch, cơ chế đối chiếu tự động 2 chiều hoặc 3 chiều).
3. Phân tích kỹ cách làm của các đối thủ cạnh tranh chính (ví dụ: Stripe, Odoo Accounting, QuickBooks, Xero) về quy tắc đối soát (matching rules), cơ chế xử lý chênh lệch (mismatch handling), giao diện đối soát thủ công và tự động, cùng cách xử lý giao dịch trễ/lỗi.
4. **Checkpoint Nghiên cứu (Research Gate)**: Ngay sau khi tìm kiếm xong, in một bản tóm tắt kết quả tìm kiếm gồm: danh sách nghiệp vụ có thể tham khảo từ nguồn mở, điểm mạnh, điểm yếu và gap của đối thủ cạnh tranh. Dừng lại hỏi người dùng: `Bạn có muốn sử dụng các dữ liệu này để làm cơ sở tham khảo cho đề xuất không? (Y/n/Sửa)`. Chỉ đi tiếp Phase C khi người dùng đồng ý hoặc phản hồi hướng điều chỉnh nghiên cứu.

### Phase C — Tổng hợp đề xuất & Phỏng vấn làm rõ

1. Đóng vai trò là một IT-BA chuyên nghiệp để tổng hợp toàn bộ thông tin tìm kiếm được.
2. Phác thảo bộ đề xuất ưu tiên P0 (luồng cốt lõi bắt buộc), P1 (vận hành tối ưu), P2 (trải nghiệm nâng cao) dành riêng cho hệ thống ARS.
3. **Clarification Gate**: Kiểm tra xem yêu cầu của người dùng có điểm nào chưa rõ hoặc mâu thuẫn hay không. Nếu có:
   - In ra câu hỏi ngắn gọn làm rõ nghiệp vụ (tối đa 3 câu hỏi) và dừng lại chờ người dùng nhập câu trả lời.
   - Sau khi có câu trả lời, cập nhật lại đề xuất. Nếu người dùng gõ `skip`, các điểm chưa rõ sẽ được đánh dấu là `TBD` và chuyển thành Câu hỏi mở (Open Questions).

### Phase D — Phê duyệt L1 & Ghi tài liệu

1. **L1 Plan Preview**: Hiển thị kế hoạch ghi tệp bằng ngôn ngữ BA tự nhiên:
   > Em sẽ tạo mới tệp `docs/{feature}/explores/{topic-slug}.md` với các nội dung:
   > - Phân tích đối thủ {Đối thủ A} và {Đối thủ B} về nghiệp vụ {tên nghiệp vụ}.
   > - Đề xuất bộ tính năng P0/P1/P2 cho ARS.
   > - Sơ đồ luồng ASCII happy path và 2 rủi ro nghiệp vụ.
   > - Đóng lại {N} câu hỏi mở; ghi nhận changelog "{note}".
   >
   > Đồng ý triển khai kế hoạch này? (Y/Sửa)
2. **Đợi người dùng phê duyệt**:
   - Nếu nhập `Y` hoặc `Đồng ý`: Tiến hành ghi tệp vào workspace `d:\AI4BA` theo đúng cấu trúc `_templates/explore.md`.
   - Nếu nhập `Sửa: <ý kiến>`: Quay lại Phase C điều chỉnh nội dung theo góp ý và tạo lại preview L1 mới.
   - Nếu nhập `n` hoặc `Hủy`: Dừng tiến trình, không thực hiện ghi file.
3. **Quality Checklist**: Tự động chạy bộ kiểm tra chất lượng đảm bảo cấu trúc tệp đầu ra đủ 10 phần, các câu hỏi mở được đánh ID chính xác dạng `OQ-1`, `OQ-2`, v.v.

### Phase E — Giải quyết các câu hỏi mở (Resolve OQs)

1. Sau khi ghi tệp thành công, collect toàn bộ OQ trong tệp hiện tại.
2. Hỏi người dùng có muốn giải quyết các câu hỏi mở ngay không. Nếu có, thực hiện vòng lặp giải quyết từng câu một.
3. Khi 1 OQ được giải quyết, tự động chạy **Cascade Scan** quét qua tài liệu hiện tại và các tài liệu downstream liên quan trong cùng feature folder để đề xuất cập nhật thay đổi qua L2 Diff.
4. Ghi changelog và hoàn tất tài liệu.

## Những điều cần lưu ý (Gotchas)

- **Tránh Jargon kỹ thuật**: Tuyệt đối không hỏi hay viết về cấu trúc DB, RESTful API endpoint, thư viện SDK lập trình, JWT/Session. Luôn sử dụng từ ngữ nghiệp vụ kế toán/BA.
- **Tên Slug**: Slug tự động sinh có thể không chính xác, luôn hiển thị trong L1 Plan Preview để người dùng có thể ghi đè (override) khi cần.
- **Quy tắc No-re-ask**: Bắt buộc phải đọc bối cảnh phiên chat và tệp có sẵn để tránh lặp câu hỏi.

## Tài liệu tham chiếu (References)

- @.agents/rules/ba-conventions.md
- @.agents/rules/approval-gate.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/keyword-detection.md
- @.agents/rules/resolve-oqs.md
- @.agents/rules/changelog.md
- @_templates/explore.md
- @.agents/skills/explore/references/example-explore.md

