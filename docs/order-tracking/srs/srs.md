---
type: srs
feature: order-tracking
status: approved
created: 2026-07-02
updated: 2026-07-02
owner: "@nlchis"
changelog:
  - date: 2026-07-02
    author: "@nlchis"
    note: "Biên dịch và đóng gói tài liệu đặc tả yêu cầu phần mềm (SRS) chính thức cho phân hệ Theo dõi Đơn hàng."
---

# Tài Liệu Đặc Tả Yêu Cầu Phần Mềm (SRS) - Hệ Thống Theo Dõi Đơn Hàng

Tài liệu Đặc tả Yêu cầu Phần mềm (Software Requirements Specification - SRS) này quy định chi tiết các chức năng, phi chức năng, quy tắc nghiệp vụ và hành vi hệ thống cho phân hệ Theo dõi Đơn hàng (Order Tracking System) thuộc dự án VietMec.

---

## 1. Giới Thiệu (Introduction)

### 1.1 Mục đích (Purpose)
Tài liệu này đóng vai trò là nguồn tài liệu đặc tả nghiệp vụ duy nhất và chính thức (Single Source of Truth), làm cơ sở để đội ngũ Lập trình viên triển khai mã nguồn và đội ngũ Đảm bảo chất lượng (QA/Tester) thiết kế kịch bản kiểm thử (Test Cases).

### 1.2 Phạm vi hệ thống (Scope)
Phân hệ chịu trách nhiệm tiếp nhận đơn đặt hàng đơn hàng bán sỉ/trực tiếp Offline (nhập tay bởi Sales) rồi đẩy tự động sang hãng vận chuyển đối tác 247Express, quản lý gán kệ kho xuất hàng, đồng bộ trạng thái tự động qua cổng webhook, điều phối giao lại hoặc hoàn trả hàng. Tính năng xuất hóa đơn giá trị gia tăng (VAT) điện tử và đối soát chênh lệch COD chưa được phát triển trong sprint hiện tại và nằm ngoài phạm vi tài liệu này.

### 1.3 Thuật ngữ & Từ viết tắt (Glossary)
Bảng dưới đây định nghĩa chi tiết các thuật ngữ viết tắt và nghiệp vụ được sử dụng xuyên suốt bộ tài liệu:

| Thuật ngữ | Tên đầy đủ tiếng Anh | Định nghĩa nghiệp vụ thực tế |
| :--- | :--- | :--- |
| **SMS Brandname** | Short Message Service Brandname | Tin nhắn thương hiệu tự động (gửi tên đại diện VietMec đến SĐT khách). |
| **API** | Application Programming Interface | Phương thức kết nối kỹ thuật giúp đồng bộ dữ liệu giữa VietMec và đối tác. |
| **Webhook** | Webhook | Cổng nhận thông báo tự động thời gian thực từ hãng vận chuyển 247Express. |
| **Maker/Checker** | Maker / Checker | Quy trình kiểm soát 2 bước: Người lập thao tác (Maker) và Người phê duyệt thao tác đó (Checker). |
| **Hệ thống quản lý nội bộ** | Portal / Dashboard | Giao diện quản trị Web dành riêng cho nhân viên và quản lý VietMec. |

---

## 2. Mô Tả Tổng Quan (Overall Description)

### 2.1 Các Tác nhân Hệ thống (Actors)
* **Khách hàng (Cá nhân/Doanh nghiệp):** Ký kết hợp đồng mua bán với Sales, thanh toán tiền hàng cho Kế toán, và nhận tin nhắn thương hiệu (SMS) thông báo cập nhật hành trình đơn hàng.
* **Sales phụ trách (Maker):** Tạo đơn hàng thủ công trên hệ thống quản lý nội bộ; chỉnh sửa đơn hàng đang ở trạng thái **Chờ Duyệt**; tiếp nhận cảnh báo Telegram giao lỗi để điều phối giao lại hoặc hoàn hàng.
* **Admin (Checker):** Phê duyệt hoặc Từ chối (bắt buộc nhập lý do) các đơn hàng thủ công do Sales tạo.
* **Thủ kho:** Xem đơn ở trạng thái **Đã tiếp nhận**, in Phiếu xuất kho & Nhãn vận đơn, lấy hàng, đóng gói và bàn giao bưu tá; thực hiện quản lý tồn kho và nhập bổ sung số lượng cho từng mặt hàng.
* **Hệ thống 247Express (Hệ thống đối tác):** Tiếp nhận thông tin đơn giao hàng từ hệ thống quản lý nội bộ; đẩy Webhook cập nhật trạng thái hành trình thực tế.

### 2.2 Quy tắc Nghiệp vụ cốt lõi (Business Rules - BR)
* **BR-001 (Maker/Checker bắt buộc):** Tất cả đơn hàng đều được tạo thủ công bởi Sales và bắt buộc phải qua bước phê duyệt của Admin trước khi chuyển sang trạng thái **Đã tiếp nhận**.
* **BR-003 (Giao nhận nhị phân):** Hệ thống không hỗ trợ giao hàng/hoàn hàng một phần. Khách hàng chỉ có thể nhận toàn bộ đơn hàng (trạng thái **Thành Công**) hoặc hoàn trả toàn bộ (trạng thái **Chờ Hoàn**).
* **BR-004 (Trừ/Cộng kho thực tế):** Hệ thống trừ kho thực tế khi bản ghi xuất kho chuyển sang **Đã duyệt** (khi bưu tá **Đã lấy hàng**). Hệ thống tự động cộng lại tồn kho thực tế khi đơn hàng cập nhật trạng thái **Đã chuyển hoàn** (đơn vị vận chuyển đã hoàn lại hàng thành công cho nhà cung cấp) hoặc bị **Từ Chối**.

### 2.3 Danh sách yêu cầu chức năng (Functional Requirements - FR)

| ID | Tên yêu cầu chức năng | Mô tả nghiệp vụ | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| **FR-customer-001** | Quản lý Khách hàng | Sales tạo và quản lý hồ sơ Khách hàng ở màn quản lý khách hàng. | P0 |
| **FR-contract-001** | Quản lý Hợp đồng & Phụ lục | Sales tạo Hợp đồng và Phụ lục ở màn quản lý hợp đồng. Tự cập nhật trạng thái không cần duyệt. | P0 |
| **FR-delivery-001** | Tạo Yêu cầu giao hàng | Admin tạo Yêu cầu giao hàng trực tiếp từ màn hình Hợp đồng. Không cần duyệt. | P0 |
| **FR-order-tracking-001** | Tạo đơn hàng từ Yêu cầu | Sales chọn Yêu cầu giao hàng để hệ thống tự điền SP. Sales tự nhập số lượng muốn giao (validate không vượt quota). Upload Hóa đơn bắt buộc. | P0 |
| **FR-order-tracking-002** | Phê duyệt đơn hàng thủ công | Admin phê duyệt đơn hàng (Chờ Duyệt -> Đã tiếp nhận) và sinh Bản ghi xuất kho (Chờ duyệt). | P0 |
| **FR-order-tracking-003** | Từ chối đơn hàng thủ công | Admin từ chối đơn hàng, hệ thống tự động giải phóng số lượng tồn kho khả dụng đã tạm giữ. | P0 |
| **FR-order-tracking-004** | Đồng bộ hành trình từ 247Express | Tự động nhận Webhook từ 247Express để cập nhật trạng thái: Đã lấy hàng, Đang vận chuyển, Đang đi phát, Chờ xử lý, Phát thành công, Chờ chuyển hoàn, Đã chuyển hoàn. | P0 |
| **FR-order-tracking-005** | Hoàn hàng do Khách yêu cầu | Cho phép Sales bấm [Hoàn hàng 1 phần] khi đơn đã Phát thành công. Validate số lượng trả lại. Tính thêm phí vận chuyển hoàn. | P0 |
| **FR-order-tracking-006** | Quản lý Nhập/Xuất kho thủ công | Thủ kho tạo bản ghi Nhập/Xuất kho (Chờ duyệt). Cho phép sửa ghi đè kèm audit log. Quản lý kho duyệt để chính thức biến động tồn kho và sinh Phiếu tự động. | P0 |
| **FR-order-tracking-007** | Xuất kho tự động và In chứng từ | Admin duyệt đơn tự động sinh Bản ghi Xuất kho (Chờ duyệt) kèm Phiếu Xuất Kho. Bản ghi tự chuyển sang Đã duyệt (trừ kho) khi bưu tá Đã lấy hàng. Hỗ trợ in Mã vận đơn. | P0 |
| **FR-order-tracking-008** | Gửi SMS tự động cho khách hàng | Tự động gửi SMS Brandname thông báo đặt hàng thành công, đang giao hàng, và giao hàng thành công tới số điện thoại của người nhận. | P0 |
| **FR-order-tracking-009** | Gửi cảnh báo Telegram Group | Tự động gửi tin nhắn cảnh báo sự cố giao lỗi hoặc hành trình cập nhật tới group Telegram của bộ phận Sales phụ trách. | P0 |

---

## 3. Bản Đồ Sơ Đồ Hệ Thống (System Diagrams)

Toàn bộ sơ đồ luồng dữ liệu nghiệp vụ và trạng thái thực thể của phân hệ Theo dõi Đơn hàng được mô tả chi tiết tại các tài liệu sơ đồ chuyên biệt dưới đây:

1. **Sơ đồ Use Case tổng thể:** Đặc tả chi tiết mối quan hệ giữa 5 Actor với 6 Use Cases cốt lõi tại [diagram.md](file:///d:/VietMec/docs/order-tracking/usecases/diagram.md).
2. **Sơ đồ Tuần tự (Sequence Diagram):** Biểu diễn chi tiết chuỗi tương tác thời gian thực toàn hệ thống từ lúc Đặt hàng đến lúc Đối soát tất toán tại [flows.md (Mục Sequence)](file:///d:/VietMec/docs/order-tracking/srs/flows.md#flow-luong-tuong-tac-toan-he-thong-sequence-diagram).
3. **Sơ đồ Hoạt động (Activity Diagrams):** Các sơ đồ hoạt động (Flowchart/Activity Diagram) đặc tả chi tiết luồng nghiệp vụ được hiển thị trực tiếp tại mục mô tả của từng tài liệu đặc tả Use Case tương ứng.
4. **Sơ đồ Trạng thái (State Diagrams):** Biểu diễn chu kỳ vòng đời trạng thái của thực thể **Đơn hàng** và **Tồn kho** tại [states.md](file:///d:/VietMec/docs/order-tracking/srs/states.md).

---

## 4. Đặc Tả Chi Tiết Ca Sử Dụng (Use Cases)

Chi tiết về tiền điều kiện, hậu điều kiện, luồng sự kiện chính, luồng thay thế/ngoại lệ, sơ đồ Flowchart luồng xử lý và mô tả trường dữ liệu màn hình được cấu trúc thành các tệp tin đặc tả Use Case độc lập dưới đây:

* [UC-order-01: Tạo đơn hàng thủ công (Maker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-01_create-order-manual.md)
* [UC-order-02: Duyệt hoặc từ chối đơn hàng (Checker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-02_approve-reject-order.md)
* [UC-order-03: Xem chi tiết đơn hàng và theo dõi hành trình (Tất cả vai trò)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-03_view-order-details.md)
* [UC-order-04: Chỉnh sửa đơn hàng Chờ Duyệt (Sales - Maker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-04_edit-pending-order.md)
* [UC-order-05: Xử lý sự cố giao hàng thất bại (Sales)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-05_handle-delivery-failure.md)
* [UC-order-06: Nhập bổ sung tồn kho (Thủ kho)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-06_replenish-inventory.md)

Danh mục tổng hợp Use Cases được theo dõi tại tệp [index.md](file:///d:/VietMec/docs/order-tracking/srs/usecases/index.md).

---

## 5. Đặc Tả Giao Diện Người Dùng (Wireframes & Prototypes)

### 5.1 Phác thảo giao diện ASCII (Wireframes)
Các màn hình phác thảo giao diện hệ thống quản lý nội bộ bao gồm:
1. Dashboard tổng quan thống kê theo tuần.
2. Quản lý danh sách đơn hàng lọc theo trạng thái.
3. Form tạo đơn vận chuyển mới dành cho Sales (Maker).
4. Chi tiết đơn hàng và timeline tracking hành trình dọc.
5. Form báo lỗi nhập liệu inline và banner lỗi kết nối API.
6. Trang chi tiết xử lý đơn giao thất bại (Giao lại / Hoàn hàng).
7. Màn hình duyệt đơn hàng kèm popup nhập lý do từ chối dành cho Admin (Checker).
8. Định dạng in Phiếu xuất kho và nhãn dán vận đơn K80 của Thủ kho.

Toàn bộ các phác thảo được tài liệu hóa chi tiết tại tệp [order-management-dashboard.md](file:///d:/VietMec/docs/order-tracking/srs/wireframes/order-management-dashboard.md).

### 5.2 Bản mẫu thử nghiệm tương tác (Prototype)
Bản mẫu tương tác Front-end Premium (sử dụng Tailwind CSS, HSL palette, Chart.js, in thử nghiệm và giả lập các kịch bản Edge Cases) được triển khai hoàn chỉnh tại tệp [order-tracking-prototype.html](file:///d:/VietMec/docs/order-tracking/srs/prototypes/order-tracking-prototype.html).

---

## 6. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)
* **NFR-001 (Bảo mật):** Tất cả kết nối API truyền nhận thông tin bắt buộc sử dụng HTTPS/TLS 1.2 trở lên. Thông tin mật khẩu và mã token API của đối tác phải được mã hóa lưu trữ.


---

## 7. Tài Liệu Nghiệp Vụ Đi Kèm (Appendix)
* Toàn bộ bảng mã lỗi nghiệp vụ Wordings, các giới hạn thông số nghiệp vụ (Limits & Quotas) và các phân tích rủi ro hệ thống chi tiết được lưu trữ nguyên bản tại tệp đặc tả kỹ thuật nghiệp vụ [spec.md](file:///d:/VietMec/docs/order-tracking/srs/spec.md).
* Quá trình tư duy, brainstorm phân tích các Edge cases nghiệp vụ thực tế được lưu trữ tại [order-tracking-brainstorm.md](file:///d:/VietMec/docs/order-tracking/srs/brainstorms/order-tracking-brainstorm.md).
