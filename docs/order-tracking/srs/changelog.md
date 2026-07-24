---
type: changelog
feature: order-tracking
owner: "@nlchis"
created: 2026-07-02
updated: 2026-07-03
---

# Nhật Ký Thay Đổi (Changelog) - SRS Theo Dõi Đơn Hàng

Tài liệu ghi lại lịch sử cập nhật cấu trúc và nội dung của bộ tài liệu đặc tả yêu cầu phần mềm (SRS).

| Phiên bản | Ngày | Người thực hiện | Nội dung thay đổi | Nhãn định tuyến |
| :--- | :--- | :--- | :--- | :--- |
| **v1.0.0** | 2026-07-02 | @nlchis | Khởi tạo cấu trúc thư mục đóng gói SRS và biên dịch tài liệu SRS chính thức bao gồm đầy đủ spec, 8 use cases, sơ đồ luồng (flows.md), sơ đồ trạng thái (states.md), phác thảo giao diện (wireframes) và bản thử nghiệm (prototypes). | `[initial]` |
| **v1.0.1** | 2026-07-02 | @nlchis | Cập nhật bổ sung bước tự động tạo và lưu trữ Phiếu đặt hàng (PO) nội bộ cho cả luồng đơn đặt hàng website và đơn tạo tay. | `[spec]`, `[usecases]` |
| **v1.0.2** | 2026-07-02 | @nlchis | Cập nhật sơ đồ Use Case và phân làn lại tác nhân chính của UC-05 thành Hệ thống 247Express (Webhook). | `[diagram]` |
| **v1.0.3** | 2026-07-02 | @nlchis | Khởi tạo tệp tin HTML xem trước tài liệu SRS (srs-preview.html) tích hợp sidebar navigation và bộ nén PlantUML động. | `[prototype]` |
| **v1.0.4** | 2026-07-03 | @nlchis | Hoàn thiện đặc tả chi tiết UC-07 và bổ sung đầy đủ đặc tả UC-08 trong tệp HTML xem trước tài liệu SRS (srs-preview.html). | `[prototype]` |
| **v1.1.0** | 2026-07-03 | @nlchis | Tái cấu trúc 9 UCs chính thức (Gộp UC-04, tạo mới UC-05); Cập nhật nghiệp vụ đồng bộ Web mặc định SHIP COD; Cập nhật quy tắc cộng tồn kho hoàn trả tại trạng thái Đã chuyển hoàn Hàng; Khóa nút sửa đơn (disabled thay vì ẩn); Loại bỏ mã lỗi E-002/003 và NFR-003/004/005; Gộp Validation Rules trực tiếp vào bảng trường thông tin của các Use Case tương ứng. Căn chỉnh biên dọc ASCII wireframes 62 ký tự chuẩn xác. | `[srs]`, `[spec]`, `[usecases]` |
| **v1.2.0** | 2026-07-03 | @nlchis | Chuẩn hóa định dạng UC-07 (bỏ số thứ tự 4.1/4.2, đổi ký hiệu toán học $>\ 0$ thành $> 0$); Khôi phục và đổ đầy dữ liệu Phụ lục 8.1 (Business Error Codes) & 8.2 (Business Rules), loại bỏ cột Nguồn gốc; Đồng bộ hóa và làm mịn thanh sidebar navigation với các mục nhỏ đa cấp (1.1-1.3, 6.1-6.13, 8.1-8.4); Hợp nhất đưa Glossary 1.3 về đồng cấp với 1.1 và 1.2; Tích hợp Screen 6.11 của UC-07 trực tiếp vào danh sách phác thảo giao diện. | `[srs]`, `[prototype]` |
| **v1.3.0** | 2026-07-23 | @nlchis | Cập nhật đồng bộ 6 quy tắc nghiệp vụ & luồng trạng thái mới: (1) Hoàn hàng trả 1 phần hoặc toàn bộ đơn; (2) Trạng thái Đã duyệt chờ 247Express trả mã vận đơn; (3) Sửa rule Auto Refund (không trừ đơn Từ Chối/Hủy); (4) Thêm tính năng Xóa mềm đơn Chờ duyệt; (5) Luồng Đã duyệt -> 247 trả Mã vận đơn -> Đã tiếp nhận; (6) Số lần giao lại tối đa X dựa theo quy định 247Express. | `[spec]`, `[states]`, `[flows]`, `[wireframe]`, `[prototype]` |
| **v1.3.1** | 2026-07-23 | @nlchis | Cập nhật phân định quyền thao tác đơn: (1) Cho phép [Hủy đơn] ở cả 2 trạng thái Đã duyệt và Đã tiếp nhận (trước khi bưu tá lấy hàng), trong khi [Xóa đơn] chỉ dành cho đơn Chờ duyệt; (2) Làm rõ luồng đơn Chờ xử lý bị chuyển hoàn tự động (giao thất bại quá hạn) KHÔNG trừ số lượng Yêu cầu giao hàng do chưa từng đạt Phát thành công. | `[spec]`, `[states]`, `[flows]` |
| **v1.3.2** | 2026-07-24 | @nlchis | Cập nhật đồng bộ 100% tài liệu srs.md: Chuẩn hóa BR-001 (Maker/Checker & Đã duyệt -> 247 trả mã -> Đã tiếp nhận), BR-003 (Hoàn 1 phần hoặc cả đơn), BR-004 (Auto Refund), Xóa mềm/Hủy đơn, đính kèm tệp Hợp đồng/Phụ lục trong Hồ sơ Khách hàng và liên kết 9 Use Cases (`UC-order-01` đến `09`). | `[srs]`, `[usecases]` |
| **v1.3.3** | 2026-07-24 | @nlchis | Loại bỏ yêu cầu phi chức năng hạ tầng kỹ thuật (TLS/HTTPS encryption); Cập nhật lại Section 6 (NFR) theo 100% góc nhìn nghiệp vụ IT-BA (Tốc độ phản hồi thao tác 2s, Tính toàn vẹn lưu vết nhật ký Maker log/Tracking history, và Độ chính xác đối soát hạn mức Hợp đồng/Yêu cầu). | `[srs]` |
| **v1.3.4** | 2026-07-24 | @nlchis | Nâng cấp giao diện xem trước `srs-preview.html`: Tích hợp thẻ giao diện (UC cards), bộ đếm thứ tự các bước (flex step badges), tối ưu font chữ Outfit/Inter, cập nhật Live Search Filter và đồng bộ xuất bản GitHub Pages (`DVM-SRS`). | `[prototype]`, `[srs]` |
| **v1.3.5** | 2026-07-24 | @nlchis | Cập nhật cấu trúc `srs-preview.html`: Ẩn Section 5 (Đặc tả Giao diện) và chuẩn hóa Section 7 (Tài liệu đi kèm) hiển thị danh sách đường dẫn tham chiếu đến tên tệp thay vì nhúng nội dung chi tiết. | `[srs]`, `[prototype]` |
| **v1.3.6** | 2026-07-24 | @nlchis | Đổ đầy 100% nội dung Mục 7 (Tài liệu Nghiệp vụ Đi kèm): Đổ trực tiếp các bảng chi tiết Mã lỗi (Error Codes E-001/002), Quy tắc Nghiệp vụ (BR-001 đến BR-017), Chu kỳ chuyển đổi trạng thái (STR-001 & STR-002) và Phân tích Nhu cầu Người dùng (Capabilities Breakdown) ra ngoài giao diện `srs-preview.html`. | `[srs]`, `[prototype]` |
| **v1.3.7** | 2026-07-24 | @nlchis | Loại bỏ hoàn toàn khối Mục 5 (Đặc tả Giao diện Wireframes) khỏi tệp `srs-preview.html` để tập trung 100% vào nội dung nghiệp vụ SRS. | `[srs]`, `[prototype]` |
| **v1.3.8** | 2026-07-24 | @nlchis | Chuẩn hóa Mục 5 của UC-05 (Duyệt/Từ chối đơn) và UC-09 (Quản lý Nhập/Xuất kho thủ công) thành bảng Mô tả Trường dữ liệu Màn hình (Data Field Tables) gồm STT, Tên trường, Định dạng, Bắt buộc và Ràng buộc chi tiết. | `[usecases]`, `[prototype]` |









