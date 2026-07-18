# Thay thế Activity Diagram bằng BPMN 2.0 (Luồng tạo đơn hàng)

Dựa trên yêu cầu vẽ BPMN cho "Luồng tạo đơn hàng", tôi sẽ áp dụng skill `/bpmn` để tạo file BPMN chuẩn OMG bằng engine nội bộ.

## Đề xuất quy trình BPMN

- **Tên quy trình**: Luồng tạo đơn hàng (create-order)
- **3 vai trò (Lanes)**:
  1. Maker (Sales)
  2. Checker (Admin)
  3. Hệ thống

- **Các bước và Rẽ nhánh (Dự kiến)**:
  1. Sales tạo đơn (nhập thông tin, đính kèm).
  2. Hệ thống kiểm tra dữ liệu:
     - *Thất bại*: Báo lỗi, Sales sửa lại.
     - *Thành công*: Khởi tạo đơn (Chờ duyệt), Tạm giữ tồn kho.
  3. Quá trình Chờ duyệt (Ở giai đoạn này Sales có quyền sửa đơn):
     - Hệ thống kiểm tra đơn đã bị xử lý chưa.
     - *Chưa xử lý*: Sales lưu chỉnh sửa thành công, quay lại chờ.
     - *Đã xử lý*: Báo lỗi từ chối sửa.
  4. Admin xem danh sách và quyết định duyệt:
     - *Từ chối*: Giải phóng tồn kho, chuyển trạng thái Từ chối, Auto Refund.
     - *Phê duyệt*: Sinh Bản ghi xuất kho, gọi API 247Express.
  5. Hệ thống gọi API 247Express:
     - *Thất bại*: Cảnh báo gửi lại API thủ công.
     - *Thành công*: Lưu Tracking ID, đơn sang Đã tiếp nhận.

- **Kết cục (End Events)**:
  - Thành công (Đơn Đã tiếp nhận).
  - Thất bại (Tạo đơn lỗi, hoặc Admin Từ chối).
  - Lỗi API 247 (COURIER_Thất bại).

## User Review Required

> [!NOTE]
> Engine BPMN tự động của dự án sẽ chuyển hóa cấu trúc này thành sơ đồ BPMN chuẩn (kéo thả được). Biểu đồ `flows.md` cũ sử dụng cú pháp `fork` (chạy song song 2 luồng Sửa và Duyệt), trong BPMN tôi sẽ cấu trúc lại thành luồng kiểm tra logic để đảm bảo tương thích hoàn hảo với engine nội bộ mà vẫn giữ nguyên nghiệp vụ thực tế.

Bạn có đồng ý với cấu trúc BPMN này để tôi tiến hành generate ra file `.bpmn` và chèn vào tài liệu không?
