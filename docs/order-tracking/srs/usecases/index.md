# Tổng Quan Đặc Tả Use Cases - Theo Dõi Đơn Hàng

Thư mục này chứa đặc tả chi tiết của 9 Use Cases thuộc phân hệ Theo dõi Đơn hàng của hệ thống VietMec.

## Danh sách Use Cases

| Mã UC | Tên Use Case | Tác nhân chính | Mô tả mục tiêu nghiệp vụ | Độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| **[UC-order-01](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-01_place-order-web.md)** | Đặt hàng tự động từ Website VietMec | Khách hàng | Đồng bộ đơn hàng từ website ngay khi đặt hàng thành công (mặc định SHIP COD, tự động gửi SMS), phân công Sales, khấu trừ kho và gọi API đối tác 247Express. | Cao (P0) |
| **[UC-order-02](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-02_create-order-manual.md)** | Tạo đơn hàng thủ công (Maker) | Sales phụ trách | Sales tạo đơn Offline/B2B trên hệ thống nội bộ và tải chứng từ CO/CQ tùy chọn. Đơn hàng chuyển sang trạng thái **Chờ Phê Duyệt**. | Cao (P0) |
| **[UC-order-03](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-03_approve-reject-order.md)** | Duyệt hoặc từ chối đơn hàng (Checker) | Admin (Checker) | Admin duyệt đơn (trừ kho và gọi API đối tác 247Express lấy mã vận đơn) hoặc từ chối đơn (nhập lý do từ chối, khóa đơn và giải phóng tồn kho). | Cao (P0) |
| **[UC-order-04](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-04_view-order-details.md)** | Xem chi tiết đơn hàng và theo dõi hành trình | Tất cả vai trò | Hiển thị chi tiết đơn hàng, timeline hành trình (cập nhật qua Webhook của 247Express) và tab Lịch sử thay đổi. Hỗ trợ Thủ kho in Phiếu xuất/Nhãn dán, Kế toán bấm xuất hóa đơn VAT. | Cao (P0) |
| **[UC-order-05](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-05_edit-pending-order.md)** | Chỉnh sửa đơn hàng Chờ Duyệt | Sales phụ trách | Cho phép bất kỳ Sales nào (Maker) chỉnh sửa thông tin đơn đang ở trạng thái **Chờ Phê Duyệt** qua popup và lưu ghi nhận lịch sử thay đổi (Old/New values). | Cao (P0) |
| **[UC-order-06](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-06_handle-delivery-failure.md)** | Xử lý sự cố giao hàng thất bại | Sales phụ trách | Tiếp nhận cảnh báo Telegram giao lỗi lần 1 để chọn hành động Yêu cầu Giao lại lần 2 hoặc Xác nhận Hoàn hàng hoàn toàn bộ. | Cao (P0) |
| **[UC-order-07](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-07_issue-vat-invoice.md)** | Phát hành hóa đơn VAT | Kế toán | Kế toán phát hành hóa đơn VAT điện tử cho đơn hàng giao thành công trong vòng 24 giờ kể từ khi đơn chuyển sang **Thành Công** (**Giao Thành Công**). | Cao (P0) |
| **[UC-order-08](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-08_reconcile-cod.md)** | Đối soát COD & Tất toán | Kế toán | Đối soát chênh lệch tiền thực nhận COD từ đối tác 247Express qua việc tải lên tệp Excel bảng kê để tất toán công nợ đơn hoặc gắn cờ lệch đối soát. | Cao (P0) |
| **[UC-order-09](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-09_replenish-inventory.md)** | Nhập bổ sung tồn kho | Thủ kho | Cho phép Thủ kho nhập thêm số tồn kho khả dụng (>0) cho các mặt hàng trực tiếp trên Portal nội bộ và tải lên tệp đính kèm CO/CQ chứng từ. | Cao (P0) |
