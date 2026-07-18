# Đặc Tả Use Case: UC-contract-01 - Quản lý Khách hàng

## 1. Thông tin chung (General Information)

| Thuộc tính | Mô tả chi tiết |
| :--- | :--- |
| **Mã Use Case (UC ID):** | UC-contract-01 |
| **Tên Use Case:** | Quản lý Khách hàng |
| **Người tạo:** | System |
| **Ngày tạo:** | 2026-07-16 |
| **Tác nhân (Actor):** | Sales phụ trách, Admin |
| **Độ ưu tiên:** | Cao (P0) |
| **Tần suất sử dụng:** | Khi có khách hàng mới phát sinh giao dịch hoặc cần tra cứu. |
| **Bao gồm (Includes):** | Không có. |

---

## 2. Mô tả & Điều kiện

### Mô tả nghiệp vụ
Cho phép Sales và Admin thêm mới, chỉnh sửa, và tra cứu thông tin Hồ sơ Khách hàng (Bao gồm Doanh nghiệp B2B và Cá nhân). Đây là bước đầu tiên để có thể khởi tạo Hợp đồng. 

### Điều kiện tiên quyết (Preconditions)
1. Người dùng (Sales/Admin) đăng nhập thành công vào hệ thống.

### Điều kiện sau khi hoàn thành (Postconditions)
1. Thông tin khách hàng được lưu trữ thành công vào Database.
2. Hồ sơ khách hàng sẵn sàng để liên kết với các Hợp đồng.

---

## 3. Luồng sự kiện (Course of Events)

### Luồng sự kiện thông thường (Normal Course: Thêm Khách hàng)
1. Tác nhân truy cập menu "Quản lý Khách hàng" và nhấn nút [Thêm mới].
2. Hệ thống hiển thị Form điền thông tin Khách hàng.
3. Tác nhân điền các thông tin: Tên khách hàng (Cá nhân/Doanh nghiệp), SĐT, Mã số thuế, Email, Địa chỉ.
4. Tác nhân nhấn nút [Lưu].
5. Hệ thống kiểm tra trùng lặp Số điện thoại hoặc Mã số thuế.
6. Hệ thống lưu Khách hàng và hiển thị thông báo thành công.

### Luồng thay thế (Alternative Courses)
**UC-contract-01.AC.1: Chỉnh sửa thông tin Khách hàng**
1. Tác nhân tìm kiếm Khách hàng trên danh sách.
2. Tác nhân chọn Khách hàng và nhấn [Sửa].
3. Hệ thống hiển thị Form thông tin hiện tại.
4. Tác nhân cập nhật thông tin và nhấn [Lưu].
5. Hệ thống cập nhật bản ghi thành công.

### Luồng ngoại lệ (Exceptions)
**UC-contract-01.EX.1: Trùng lặp thông tin**
1. Tại bước 5 luồng chính, hệ thống phát hiện SĐT hoặc MST đã tồn tại.
2. Hệ thống báo lỗi và chặn việc lưu dữ liệu, yêu cầu tác nhân kiểm tra lại.

---

## 4. Mô tả trường dữ liệu màn hình

| STT | Tên trường dữ liệu | Định dạng | Bắt buộc? | Mô tả chi tiết ràng buộc |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Tên Khách hàng | Text | Y | Tên Công ty hoặc Cá nhân. Tối đa 255 ký tự. |
| 2 | Số điện thoại | Số | Y | Độ dài 10 số, bắt đầu bằng số 0. Không được trùng lặp. |
| 3 | Mã số thuế | Text | N | Dành cho KH doanh nghiệp. |
| 4 | Email | Text | N | Định dạng Email chuẩn. |
| 5 | Địa chỉ | Text | Y | Địa chỉ chi tiết để sử dụng làm mặc định khi giao hàng. |

---

## 5. Giao diện Phác thảo (Wireframe)
Xem chi tiết tại: [customer-management-dashboard.md](../../wireframes/customer-management-dashboard.md)
