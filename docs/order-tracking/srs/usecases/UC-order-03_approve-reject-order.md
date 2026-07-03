# Đặc Tả Use Case: UC-order-03 - Duyệt hoặc từ chối đơn hàng (Checker)

## 1. Thông tin chung (General Information)

| Thuộc tính | Mô tả chi tiết |
| :--- | :--- |
| **Mã Use Case (UC ID):** | UC-order-03 |
| **Tên Use Case:** | Duyệt hoặc từ chối đơn hàng (Checker) |
| **Người tạo:** | @nlchis |
| **Cập nhật lần cuối bởi:** | @nlchis |
| **Ngày tạo:** | 2026-07-02 |
| **Ngày cập nhật:** | 2026-07-02 |
| **Tác nhân (Actor):** | Admin / Người phê duyệt (Tác nhân chính), Hệ thống, Hệ thống đối tác 247Express (Tác nhân phụ) |
| **Độ ưu tiên:** | Cao (P0) |
| **Tần suất sử dụng:** | Diễn ra thường xuyên trong ngày khi có đơn hàng thủ công chờ duyệt. |
| **Bao gồm (Includes):** | Không có. |
| **Giả định:** | Không có. |

---

## 2. Mô tả & Điều kiện

### Mô tả nghiệp vụ
Quản trị viên Admin (Checker) kiểm tra thông tin các đơn hàng thủ công đang ở trạng thái **Chờ Phê Duyệt** và thực hiện Phê duyệt hoặc Từ chối đơn hàng.

### Điều kiện tiên quyết (Preconditions)
1. Admin đăng nhập thành công vào hệ thống quản lý nội bộ và có quyền "Phê duyệt đơn hàng".
2. Có đơn hàng đang ở trạng thái **Chờ Phê Duyệt** trên hệ thống.

### Điều kiện sau khi hoàn thành (Postconditions)
1. *Nếu duyệt:* Đơn chuyển sang trạng thái **Chờ Giao Hàng**, tồn kho bị trừ thực tế, gán vị trí xuất kệ, hệ thống gọi API đối tác 247Express lấy mã vận đơn thành công và gửi SMS đặt hàng thành công cho khách hàng.
2. *Nếu từ chối:* Đơn chuyển sang trạng thái **Từ Chối Duyệt** (khóa đơn vĩnh viễn), tồn kho khả dụng được giải phóng, ghi nhận lý do từ chối và báo động cho Sales phụ trách.

---

## 3. Sơ đồ Flowchart luồng xử lý

```plantuml
@startuml
start
:Xem đơn hàng Chờ Duyệt;
if (Quyết định của Admin?) then (Duyệt)
  :Trừ tồn kho thực tế & Gán vị trí kệ xuất;
  :Sinh Phiếu đặt hàng (PO) lưu nội bộ;
  :Gửi SMS Đặt hàng thành công cho Khách hàng;
  :Gọi API 247Express tạo đơn vận chuyển;
  if (Kết nối API thành công?) then (Có)
    :Nhận Tracking ID & Đổi đơn sang Chờ Giao Hàng;
  else (Không)
    :Cập nhật trạng thái kết nối Lỗi đồng bộ đối tác;
    :Báo lỗi kết nối cho Sales để gửi lại API thủ công;
  endif
else (Từ chối)
  :Nhập lý do từ chối duyệt đơn (10-200 ký tự);
  :Hủy giữ kho, cộng lại tồn kho khả dụng;
  :Chuyển trạng thái đơn sang Từ Chối Duyệt (khóa đơn);
  :Thông báo lý do từ chối cho Sales phụ trách;
endif
stop
@enduml
```

---

## 4. Luồng sự kiện (Course of Events)

### Luồng sự kiện thông thường (Normal Course)
1. Admin truy cập trang Danh sách Đơn hàng Chờ Duyệt trên hệ thống quản lý nội bộ.
2. Admin chọn một đơn hàng cần duyệt để xem thông tin chi tiết.
3. Admin nhấn nút [Phê Duyệt] đơn hàng.
4. Hệ thống thực hiện khấu trừ tồn kho thực tế và gán vị trí kệ kho xuất dự kiến theo nguyên tắc.
5. Hệ thống tự động tạo tệp Phiếu đặt hàng (PO) lưu nội bộ.
6. Hệ thống gửi tin nhắn thương hiệu (SMS) đặt hàng thành công cho Khách hàng.
7. Hệ thống gọi API đối tác 247Express tạo đơn giao hàng.
8. Đối tác 247Express phản hồi mã vận đơn (Tracking ID) thành công.
9. Hệ thống lưu mã vận đơn và cập nhật trạng thái đơn hàng sang **Chờ Giao Hàng**.

### Luồng thay thế (Alternative Courses)
**UC-order-03.AC.1: Admin từ chối phê duyệt đơn hàng**
1. Tại bước 3 của luồng chính, Admin nhấn nút [Từ Chối].
2. Hệ thống hiển thị popup yêu cầu nhập lý do từ chối duyệt đơn.
3. Admin nhập lý do từ chối nghiệp vụ và nhấn [Xác nhận từ chối].
4. Hệ thống chuyển trạng thái đơn sang **Từ Chối Duyệt** (khóa đơn vĩnh viễn, cấm sửa).
5. Hệ thống giải phóng tồn kho khả dụng đã tạm giữ.
6. Hệ thống gửi thông báo từ chối kèm lý do cho Sales phụ trách qua Telegram.

### Luồng ngoại lệ (Exceptions)
* **UC-order-03.EX.1: Xung đột thao tác đồng thời (Maker/Checker Race Condition)**
  * Tại bước 3 của luồng chính, khi Admin nhấn Phê duyệt đúng lúc Sales đang thực hiện Lưu chỉnh sửa đơn hàng đó.
  * Hệ thống đối chiếu phiên bản dữ liệu (Kiểm soát phiên bản ghi) và phát hiện phiên bản đã bị thay đổi.
  * Hệ thống chặn hành động phê duyệt của Admin, hiển thị thông báo lỗi: *"Đơn hàng đã được duyệt hoặc thay đổi bởi người khác. Vui lòng tải lại trang"* và rollback giao dịch.
* **UC-order-03.EX.2: Lỗi API đối tác 247Express khi duyệt đơn**
  * Tại bước 7 của luồng chính, API kết nối đối tác 247Express gặp sự cố mất mạng hoặc sập hệ thống.
  * Đơn hàng vẫn chuyển sang trạng thái **Chờ Giao Hàng** nhưng trạng thái kết nối vận chuyển là *Lỗi đồng bộ đối tác*. Tồn kho thực tế vẫn bị trừ.
  * Hệ thống cảnh báo lỗi trên giao diện của Sales phụ trách để xử lý thủ công (nhấn Thử lại).

---

## 5. Yêu cầu đặc biệt & Giao diện

### Yêu cầu đặc biệt
Popup nhập lý do từ chối bắt buộc Admin phải gõ tối thiểu 10 ký tự.

### Mô tả trường dữ liệu màn hình

| STT | Tên trường dữ liệu | Định dạng | Bắt buộc? | Mô tả chi tiết ràng buộc |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Nút Phê duyệt | Button | Y | Nhấn để chuyển trạng thái sang **Chờ Giao Hàng**. |
| 2 | Nút Từ chối | Button | Y | Nhấn để mở popup từ chối duyệt đơn. |
| 3 | Lý do từ chối | Textarea | Y (khi từ chối) | Nhập lý do từ chối nghiệp vụ, từ 10 đến 200 ký tự. |
| 4 | Nút Xác nhận từ chối | Button | Y (trong popup) | Hoàn tất lưu lý do và cập nhật đơn sang **Từ Chối Duyệt**. |

---

## 7. Giao diện Phác thảo (Wireframe)

### Màn hình 7: Giao diện duyệt đơn hàng & Popup nhập lý do từ chối (Checker)
```text
┌────────────────────────────────────────────────────────────┐
│ DANH SÁCH ĐƠN HÀNG CHỜ PHÊ DUYỆT (Checker)                 │
├────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [ Nhập mã đơn...         ]                       │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Mã Đơn    | Khách Hàng      | Người Tạo   | Thao tác   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 247-00132 | Nguyễn Thị K    | Sales A     | [Duyệt][X] │ │
│ │ 247-00133 | Phạm Minh L     | Sales B     | [Duyệt][X] │ │
│ └────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ popup: TỪ CHỐI PHÊ DUYỆT ĐƠN HÀNG #247-00132               │
├────────────────────────────────────────────────────────────┤
│ Lý do từ chối (*) (Tối thiểu 10 ký tự):                    │
│ [ Địa chỉ nhận hàng không cụ thể, thiếu số nhà.          ] │
│                                                            │
│                     [ HUỶ BỎ ]    [ Xác Nhận Từ Chối ]     │
└────────────────────────────────────────────────────────────┘
```

## 8. Vấn đề chưa giải quyết (Notes & Issues)
Không có.
