# Đặc Tả Use Case: UC-order-04 - Xem chi tiết đơn hàng và theo dõi hành trình

## 1. Thông tin chung (General Information)

| Thuộc tính | Mô tả chi tiết |
| :--- | :--- |
| **Mã Use Case (UC ID):** | UC-order-04 |
| **Tên Use Case:** | Xem chi tiết đơn hàng và theo dõi hành trình |
| **Người tạo:** | @nlchis |
| **Cập nhật lần cuối bởi:** | @nlchis |
| **Ngày tạo:** | 2026-07-02 |
| **Ngày cập nhật:** | 2026-07-03 |
| **Tác nhân (Actor):** | Tất cả vai trò (Tác nhân chính: Sales, Checker, Thủ kho, Kế toán; Tác nhân phụ: Hệ thống, 247Express) |
| **Độ ưu tiên:** | Cao (P0) |
| **Tần suất sử dụng:** | Diễn ra liên tục hàng ngày để kiểm tra vận đơn và xử lý hàng hóa. |
| **Bao gồm (Includes):** | Không có. |
| **Giả định:** | Không có. |

---

## 2. Mô tả & Điều kiện

### Mô tả nghiệp vụ
Cho phép tất cả các vai trò truy cập xem thông tin chi tiết của một đơn hàng, lịch trình vận chuyển (timeline) thời gian thực và lịch sử thay đổi của đơn hàng đó. Đồng thời, Thủ kho có thể thực hiện in Phiếu xuất kho / Nhãn vận đơn, Kế toán có thể bấm Xuất hóa đơn VAT cho đơn hàng giao thành công, và Hệ thống tự động đồng bộ hành trình thực tế qua Webhook từ đối tác.

### Điều kiện tiên quyết (Preconditions)
1. Người dùng đăng nhập thành công vào Portal nội bộ và được phân quyền truy cập danh sách đơn hàng.

### Điều kiện sau khi hoàn thành (Postconditions)
1. Thông tin chi tiết đơn hàng, timeline hành trình, và lịch sử thay đổi được hiển thị chính xác.
2. Với Thủ kho: In thành công chứng từ xuất kho và nhãn vận đơn 247Express để đóng gói.
3. Với Kế toán: Kích hoạt màn hình xuất hóa đơn VAT đối với đơn hàng có trạng thái **Giao Thành Công**.
4. Với Hệ thống: Nhận webhook từ đối tác 247Express và cập nhật tức thời hành trình lên giao diện.

---

## 3. Sơ đồ Flowchart luồng xử lý

```plantuml
@startuml
start
:Chọn đơn hàng trong danh sách;
:Hiển thị màn hình chi tiết đơn hàng;
fork
  :Xem thông tin chung và timeline hành trình;
  if (Nhận Webhook từ 247Express?) then (Có)
    :Cập nhật hành trình lên timeline;
  endif
fork again
  :Xem tab Lịch sử thay đổi đơn hàng;
fork again
  if (Role là Thủ kho và có mã vận đơn?) then (Có)
    :Bấm [In Phiếu và Nhãn Vận Đơn];
    :In Phiếu xuất kho và Nhãn dán;
  endif
fork again
  if (Role là Kế toán và đơn giao thành công Giao Thành Công?) then (Có)
    :Bấm [Xuất hoá đơn VAT];
    :Chuyển sang màn hình tạo hoá đơn;
  endif
end fork
stop
@enduml
```

---

## 4. Luồng sự kiện (Course of Events)

### Luồng sự kiện thông thường (Normal Course)
1. Người dùng chọn một đơn hàng từ trang Danh sách Đơn hàng.
2. Hệ thống hiển thị giao diện Chi tiết Đơn hàng gồm các khu vực chính:
   * **Thông tin chung:** Họ tên khách, SĐT, Địa chỉ, Sản phẩm, Khối lượng, Tiền COD, Trạng thái hiện tại.
   * **Timeline hành trình:** Nhật ký bưu tá lấy hàng, đang trung chuyển, giao hàng...
   * **Tab Lịch sử thay đổi:** Ghi nhận nhật ký chỉnh sửa của Sales đối với đơn.
3. Người dùng chuyển đổi giữa các tab để xem thông tin chi tiết tương ứng.

### Luồng phụ 1: Thủ kho in phiếu & dán nhãn vận đơn
1. Thủ kho xem chi tiết đơn hàng có trạng thái **Chờ Giao Hàng** (đơn đã có mã vận đơn 247Express).
2. Thủ kho nhấn nút **[In Phiếu & Nhãn Vận Đơn]**.
3. Hệ thống sinh file in chứa Phiếu xuất kho (ghi rõ sản phẩm, vị trí kệ xuất đã gán) và Nhãn dán vận đơn của 247Express.
4. Thủ kho thực hiện in ấn ra máy in nhiệt chuyên dụng, nhặt hàng từ kệ và đóng gói kiện hàng vật lý.

### Luồng phụ 2: Kế toán kích hoạt xuất hóa đơn VAT
1. Kế toán xem chi tiết đơn hàng có trạng thái **Thành Công** (**Giao Thành Công**).
2. Kế toán nhấn nút **[Xuất hóa đơn VAT]** (Nút này chỉ khả dụng cho vai trò Kế toán, đối với các vai trò khác sẽ hiển thị trạng thái disabled).
3. Hệ thống điều hướng Kế toán sang giao diện phát hành hóa đơn VAT điện tử (Màn hình 9).

### Luồng phụ 3: Hệ thống đồng bộ Webhook hành trình
1. Khi bưu tá 247Express quét nhận hàng hoặc cập nhật trạng thái trên đường đi, hệ thống của 247Express gửi Webhook chứa mã vận đơn và mô tả trạng thái về cổng tiếp nhận của VietMec.
2. Hệ thống kiểm tra tính hợp lệ của Webhook, cập nhật trạng thái đơn hàng tương ứng (ví dụ: sang **Đang Giao Hàng**, **Giao Thành Công**, hoặc **Giao Thất Bại**) và ghi thêm dòng trạng thái mới vào Timeline hành trình chi tiết của đơn.

---

## 5. Đặc tả dữ liệu giao diện (Screen Data Fields)

### Bảng trường thông tin chi tiết đơn hàng và timeline:

| STT | Trường thông tin | Loại dữ liệu | Thao tác | Mô tả chi tiết ràng buộc |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Mã đơn hàng | String | Chỉ đọc | Mã đơn hàng nội bộ VietMec (ví dụ: `247-00123`). |
| 2 | Mã vận đơn | String | Chỉ đọc | Mã vận đơn do 247Express cấp (ví dụ: `247XYZ123`). |
| 3 | Họ tên & SĐT | String | Chỉ đọc | Thông tin khách nhận hàng. |
| 4 | Địa chỉ nhận | String | Chỉ đọc | Địa chỉ chi tiết nhận hàng của khách. |
| 5 | Sản phẩm & Khối lượng | String | Chỉ đọc | Chi tiết tên sản phẩm, số lượng và cân nặng. |
| 6 | Số tiền thu hộ COD | Number | Chỉ đọc | Tiền thu hộ, định dạng VNĐ. |
| 7 | Nút In Phiếu & Nhãn | Button | Click | Chỉ khả dụng cho Thủ kho khi đơn ở trạng thái **Chờ Giao Hàng**. |
| 8 | Nút Xuất hóa đơn VAT | Button | Click | Chỉ khả dụng cho Kế toán khi đơn ở trạng thái **Thành Công** (**Giao Thành Công**). |
| 9 | Timeline hành trình | List | Chỉ đọc | Nhật ký chi tiết gồm: Thời gian / Trạng thái / Mô tả thực tế từ bưu tá. |

---

## 6. Giao diện Phác thảo (Wireframes)

### Màn hình 4: Chi tiết Đơn hàng & Tracking Hành trình (Tab thông tin chung & Timeline)
```text
┌────────────────────────────────────────────────────────────┐
│ CHI TIẾT ĐƠN HÀNG: #247-00123  Trạng thái: ĐANG VẬN CHUYỂN │
├────────────────────────────────────────────────────────────┤
│ [ Thông tin chung & Hành trình ]      [ Lịch sử thay đổi ] │
├────────────────────────────────────────────────────────────┤
│ KHÁCH HÀNG: Nguyen Van A - 0901234567                      │
│ ĐỊA CHỈ:    Số 10 Đường số 4, Thủ Đức, TP. Hồ Chí Minh     │
│ HÀNG HOÁ:   Macbook Pro M3 (1.5 kg)                        │
│ THU HỘ COD: 0 đ                                            │
├────────────────────────────────────────────────────────────┤
│ HÀNH TRÌNH VẬN ĐƠN (247Express):                           │
│ [x] 29/06 10:00 - Đồng bộ vận đơn thành công (Tracking ID) │
│ [x] 29/06 14:00 - Bưu tá đã lấy hàng                       │
│ [>] 30/06 08:30 - Đang trung chuyển tại bưu cục Quận 9     │
│                                                            │
│ [ SỬA ĐƠN HÀNG ] [ IN PHIẾU & NHÃN ] [ XUẤT HÓA ĐƠN VAT ]  │
└────────────────────────────────────────────────────────────┘
```
*(Lưu ý: Nút [ SỬA ĐƠN HÀNG ] bị disable vì trạng thái đơn đã chuyển sang Đang Vận Chuyển, nút [ XUẤT HÓA ĐƠN VAT ] bị disable vì chưa chuyển sang Thành Công).*

### Màn hình 5: Phiếu xuất kho vật lý (Thủ kho)
```text
┌────────────────────────────────────────────────────────────┐
│ PHIẾU XUẤT KHO KIÊM NHẶT HÀNG                              │
├────────────────────────────────────────────────────────────┤
│ Mã đơn hàng: #247-00123                Ngày in: 29/06/2026 │
│ Người phụ trách: Vũ Văn Kho           Mã vận đơn: 247XYZ123│
├────────────────────────────────────────────────────────────┤
│ DANH SÁCH HÀNG HOÁ CẦN LẤY:                                │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Mã SP    | Tên Sản Phẩm      | Vị Trí Kệ | Số lượng    │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ SP-001   | Macbook Pro M3    | KỆ-A01    | 01 chiếc    │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ XÁC NHẬN CỦA THỦ KHO XUẤT:            XÁC NHẬN CỦA BƯU TÁ: │
│   (Ký và ghi rõ họ tên)               (Ký và ghi rõ họ tên)│
└────────────────────────────────────────────────────────────┘
```

### Màn hình 6: Nhãn dán vận đơn 247Express (In nhiệt K80/A6)
```text
┌────────────────────────────────────────────────────────────┐
│ ĐỐI TÁC VẬN CHUYỂN: 247EXPRESS                             │
├────────────────────────────────────────────────────────────┤
│ MÃ VẬN ĐƠN: 247XYZ123                 Khối lượng: 1.5 kg   │
│ ĐƠN HÀNG:   #247-00123                Thu hộ COD:  0 đ     │
├────────────────────────────────────────────────────────────┤
│ NGƯỜI GỬI:  Công ty Cổ phần Dược phẩm VietMec              │
│ NGƯỜI NHẬN: Nguyen Van A - 0901234567                      │
│             Số 10 Đường số 4, Hiệp Bình Chánh, Thủ Đức     │
├────────────────────────────────────────────────────────────┤
│ Mã vạch barcode quét nhanh:                                │
│ [||||||||||||||||||||||||||||||||||||||||||||||||||||||||] │
└────────────────────────────────────────────────────────────┘
```
