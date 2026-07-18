# Tổng Quan Đặc Tả Use Cases - Phân hệ Theo Dõi Đơn Hàng B2B

Thư mục này chứa đặc tả chi tiết của các Use Cases thuộc phân hệ Theo dõi Đơn hàng của hệ thống VietMec (Bao gồm Quản lý Hợp đồng B2B).

## Danh sách Use Cases

| Mã UC | Tên Use Case | Tác nhân chính | Mô tả mục tiêu nghiệp vụ | Độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| **[UC-contract-01](UC-contract-01_manage-customers.md)** | Quản lý Khách hàng | Sales / Admin | Quản lý thông tin hồ sơ Khách hàng để thiết lập hợp đồng. | Cao (P0) |
| **[UC-contract-02](UC-contract-02_manage-contracts-addendums.md)** | Quản lý Hợp đồng & Phụ lục | Sales / Admin | Khởi tạo Hợp đồng B2B và thêm Phụ lục nới số lượng. | Cao (P0) |
| **[UC-delivery-01](UC-delivery-01_create-delivery-request.md)** | Tạo Yêu cầu giao hàng | Admin | Cắt số lượng từ Hợp đồng để tạo Yêu cầu giao hàng cho Sales chạy đơn. | Cao (P0) |
| **[UC-order-01](UC-order-01_create-order-manual.md)** | Tạo đơn hàng (Từ Yêu cầu) | Sales phụ trách | Sales chọn Yêu cầu giao hàng để tạo đơn. Hệ thống tự trừ số lượng khả dụng của Yêu cầu giao hàng. | Cao (P0) |
| **[UC-order-02](UC-order-02_approve-reject-order.md)** | Duyệt / Từ chối đơn hàng | Admin (Checker) | Admin duyệt đơn để xuất kho, gọi 247Express. Hoặc từ chối để Auto Refund số lượng Yêu cầu giao hàng. | Cao (P0) |
| **[UC-order-03](UC-order-03_view-order-details.md)** | Xem chi tiết & Tracking | Tất cả vai trò | Hiển thị hành trình đơn hàng từ 247Express (chiều đi & chiều về). In Phiếu/Nhãn. | Cao (P0) |
| **[UC-order-04](UC-order-04_edit-pending-order.md)** | Sửa đơn hàng Chờ Duyệt | Sales phụ trách | Sales sửa thông tin đơn đang Chờ Duyệt và lưu version. | Cao (P0) |
| **[UC-order-05](UC-order-05_handle-delivery-failure.md)** | Xử lý Hoàn hàng | System / Sales | Tự động cập nhật hoàn hàng từ Webhook. Hoặc Sales chủ động Hoàn 1 phần (Tự động cộng Phí chuyển hoàn). | Cao (P0) |
| **[UC-order-06](UC-order-06_replenish-inventory.md)** | Nhập bổ sung tồn kho | Thủ kho | Thủ kho nhập bổ sung tồn kho vật lý sau khi đơn hàng Hoàn về kho. | Cao (P0) |
