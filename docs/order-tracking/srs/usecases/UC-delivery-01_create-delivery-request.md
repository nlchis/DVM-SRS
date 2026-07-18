# Đặc Tả Use Case: UC-delivery-01 - Tạo Yêu cầu giao hàng

## 1. Thông tin chung (General Information)

| Thuộc tính | Mô tả chi tiết |
| :--- | :--- |
| **Mã Use Case (UC ID):** | UC-delivery-01 |
| **Tên Use Case:** | Tạo Yêu cầu giao hàng |
| **Người tạo:** | System |
| **Ngày tạo:** | 2026-07-16 |
| **Tác nhân (Actor):** | Admin |
| **Độ ưu tiên:** | Cao (P0) |
| **Tần suất sử dụng:** | Khi Khách hàng báo lấy hàng theo từng đợt dựa trên Hợp đồng tổng. |
| **Bao gồm (Includes):** | UC-contract-02 |

---

## 2. Mô tả & Điều kiện

### Mô tả nghiệp vụ
Admin tiếp nhận thông tin yêu cầu xuất hàng đợt mới từ Khách hàng. Admin truy cập vào Hợp đồng và khởi tạo "Yêu cầu giao hàng" (Delivery Request). Hệ thống không yêu cầu Duyệt (No Maker/Checker) đối với Yêu cầu giao hàng. Khi tạo xong, Sales có thể dùng Yêu cầu này để tách thành các Đơn giao hàng thực tế. Admin có quyền Hủy yêu cầu giao hàng với những điều kiện chặt chẽ.

### Điều kiện tiên quyết (Preconditions)
1. Hợp đồng đang ở trạng thái "Còn hiệu lực".

### Điều kiện sau khi hoàn thành (Postconditions)
1. Yêu cầu giao hàng được tạo ở trạng thái **Chờ xử lý**.
2. Sales có thể tìm thấy Yêu cầu này khi tạo Đơn giao hàng.

---

## 3. Luồng sự kiện (Course of Events)

### Luồng sự kiện thông thường (Normal Course: Tạo Yêu cầu giao hàng)
1. Admin truy cập màn hình Chi tiết Hợp đồng, chuyển sang tab "Yêu cầu giao hàng".
2. Admin nhấn nút [Tạo Yêu cầu mới].
3. Hệ thống load danh sách sản phẩm từ Hợp đồng.
4. Admin nhập số lượng cần giao cho đợt này. Hệ thống validate đảm bảo số lượng nhập <= (Số lượng tổng của HĐ - Số lượng đã giao của HĐ).
5. Admin nhấn [Lưu].
6. Hệ thống tạo thành công Yêu cầu giao hàng trạng thái **Chờ xử lý** (Pending).

### Luồng thay thế (Alternative Courses)
**UC-delivery-01.AC.1: Admin hủy Yêu cầu giao hàng**
1. Admin xem chi tiết Yêu cầu giao hàng đang ở trạng thái **Chờ xử lý**.
2. Admin nhấn nút [Hủy Yêu cầu].
3. Hệ thống kiểm tra điều kiện (Validate): Yêu cầu này chưa có Đơn giao hàng nào, HOẶC tất cả Đơn giao hàng thuộc Yêu cầu đều mang trạng thái Từ chối/Đã chuyển hoàn/Đã hủy.
4. Nếu thỏa mãn, hệ thống chuyển trạng thái Yêu cầu thành **Đã hủy**.

### Luồng ngoại lệ (Exceptions)
**UC-delivery-01.EX.1: Hủy thất bại do vướng Đơn giao hàng**
1. Tại bước 3 của AC.1, hệ thống phát hiện vẫn còn Đơn giao hàng đang ở trạng thái Chờ Duyệt / Đã tiếp nhận / Đang đi phát / Phát thành công.
2. Hệ thống báo lỗi: *"Yêu cầu hủy đơn giao hàng trước"*.
3. Hủy thất bại, Yêu cầu giữ nguyên trạng thái cũ.

---

## 4. Mô tả trường dữ liệu màn hình

| STT | Tên trường dữ liệu | Định dạng | Bắt buộc? | Mô tả chi tiết ràng buộc |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Số lượng yêu cầu | Số | Y | Phải <= Số lượng còn lại của Hợp đồng. |
| 2 | Trạng thái | N/A | Y | Auto-compute (Chờ xử lý / Hoàn thành / Đã hủy). |

---

## 5. Giao diện Phác thảo (Wireframe)
Xem chi tiết tại: [contract-management-dashboard.md](../../wireframes/contract-management-dashboard.md)
