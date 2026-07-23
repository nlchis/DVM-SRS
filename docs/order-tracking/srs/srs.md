---
type: srs
feature: order-tracking
status: approved
created: 2026-07-02
updated: 2026-07-24
owner: "@nlchis"
changelog:
  - date: 2026-07-02
    author: "@nlchis"
    note: "Biên dịch và đóng gói tài liệu đặc tả yêu cầu phần mềm (SRS) chính thức cho phân hệ Theo dõi Đơn hàng."
  - date: 2026-07-24
    author: "@nlchis"
    note: "Cập nhật đồng bộ các quy tắc nghiệp vụ BR-001 (Đã duyệt -> Đã tiếp nhận khi có mã 247), BR-003 (Hoàn 1 phần hoặc cả đơn), BR-004 (Auto Refund chỉ áp dụng khi Phát thành công rồi trả lại), Xóa mềm/Hủy đơn, đính kèm Hợp đồng/Phụ lục trong Hồ sơ Khách hàng và chuẩn hóa 9 Use Cases."
---

# Tài Liệu Đặc Tả Yêu Cầu Phần Mềm (SRS) - Hệ Thống Theo Dõi Đơn Hàng

Tài liệu Đặc tả Yêu cầu Phần mềm (Software Requirements Specification - SRS) này quy định chi tiết các chức năng, phi chức năng, quy tắc nghiệp vụ và hành vi hệ thống cho phân hệ Theo dõi Đơn hàng (Order Tracking System) thuộc dự án VietMec.

---

## 1. Giới Thiệu (Introduction)

### 1.1 Mục đích (Purpose)
Tài liệu này đóng vai trò là nguồn tài liệu đặc tả nghiệp vụ duy nhất và chính thức (Single Source of Truth), làm cơ sở để đội ngũ Lập trình viên triển khai mã nguồn và đội ngũ Đảm bảo chất lượng (QA/Tester) thiết kế kịch bản kiểm thử (Test Cases).

### 1.2 Phạm vi hệ thống (Scope)
Phân hệ chịu trách nhiệm tiếp nhận đơn đặt hàng bán sỉ/trực tiếp Offline (nhập tay bởi Sales) rồi đẩy tự động sang hãng vận chuyển đối tác 247Express, quản lý gán kệ kho xuất hàng, đồng bộ trạng thái tự động qua cổng webhook, điều phối giao lại hoặc hoàn trả hàng. Tính năng xuất hóa đơn giá trị gia tăng (VAT) điện tử và đối soát chênh lệch COD chưa được phát triển trong sprint hiện tại và nằm ngoài phạm vi tài liệu này.

### 1.3 Thuật ngữ & Từ viết tắt (Glossary)
Bảng dưới đây định nghĩa chi tiết các thuật ngữ viết tắt và nghiệp vụ được sử dụng xuyên suốt bộ tài liệu:

| Thuật ngữ | Tên đầy đủ tiếng Anh | Định nghĩa nghiệp vụ thực tế |
| :--- | :--- | :--- |
| **SMS Brandname** | Short Message Service Brandname | Tin nhắn thương hiệu tự động (gửi tên đại diện VietMec đến SĐT khách). |
| **API** | Application Programming Interface | Phương thức kết nối kỹ thuật giúp đồng bộ dữ liệu giữa VietMec và đối tác. |
| **Webhook** | Webhook | Cổng nhận thông báo tự động thời gian thực từ hãng vận chuyển 247Express. |
| **Maker/Checker** | Maker / Checker | Quy trình kiểm soát 2 bước: Người lập thao tác (Maker) và Người phê duyệt thao tác đó (Checker). |
| **Auto Refund** | Automatic Quantity Refund | Tự động trừ bớt số lượng đã giao khỏi Yêu cầu giao hàng khi Khách hàng trả hàng thành công. |
| **Hệ thống quản lý nội bộ** | Portal / Dashboard | Giao diện quản trị Web dành riêng cho nhân viên và quản lý VietMec. |

---

## 2. Mô Tả Tổng Quan (Overall Description)

### 2.1 Các Tác nhân Hệ thống (Actors)
* **Khách hàng (Cá nhân/Doanh nghiệp):** Ký kết Hợp đồng mua bán với Sales/Admin (có tệp Hợp đồng/Phụ lục đính kèm), thanh toán tiền hàng cho Kế toán, và nhận tin nhắn thương hiệu (SMS) thông báo cập nhật hành trình đơn hàng.
* **Sales phụ trách (Maker):** Quản lý hồ sơ Khách hàng; tạo đơn hàng thủ công trên hệ thống quản lý nội bộ từ Yêu cầu giao hàng; chỉnh sửa đơn hàng đang ở trạng thái **Chờ Duyệt**; chủ động tạo yêu cầu Hoàn hàng (1 phần hoặc cả đơn); tiếp nhận cảnh báo Telegram giao lỗi để điều phối giao lại.
* **Admin (Checker):** Phê duyệt hoặc Từ chối (bắt buộc nhập lý do) các đơn hàng thủ công do Sales tạo; thực hiện Xóa mềm đơn Chờ duyệt hoặc Hủy đơn Đã duyệt / Đã tiếp nhận trước khi shipper lấy hàng; khởi tạo Yêu cầu giao hàng từ Hợp đồng.
* **Thủ kho:** Xem đơn ở trạng thái **Đã tiếp nhận**, in Phiếu xuất kho & Nhãn vận đơn K80, lấy hàng, đóng gói và bàn giao bưu tá; thực hiện Quản lý Nhập / Xuất kho thủ công (Maker/Checker) và nhập bổ sung số lượng tồn kho vật lý.
* **Hệ thống 247Express (Hệ thống đối tác):** Tiếp nhận thông tin đơn giao hàng từ hệ thống quản lý nội bộ; phản hồi mã vận đơn (Tracking ID); đẩy Webhook cập nhật trạng thái hành trình thực tế (chiều đi & chiều về).

### 2.2 Quy tắc Nghiệp vụ cốt lõi (Business Rules - BR)
* **BR-001 (Maker/Checker & Vòng đời Phê duyệt):** Tất cả đơn hàng đều được tạo thủ công bởi Sales (trạng thái **Chờ Duyệt**) và bắt buộc phải qua bước phê duyệt của Admin. Khi Admin phê duyệt, đơn chuyển sang trạng thái **Đã duyệt**, hệ thống sinh Bản ghi Xuất kho (Chờ duyệt) và gửi đơn sang 247Express. Khi 247Express trả mã vận đơn (Tracking ID), đơn tự chuyển sang **Đã tiếp nhận**. Đơn ở trạng thái Chờ duyệt được phép **Xóa mềm**; đơn ở trạng thái Đã duyệt / Đã tiếp nhận được phép **Hủy đơn** (trước khi shipper lấy hàng).
* **BR-003 (Hoàn hàng 1 phần hoặc toàn bộ đơn):** Hệ thống hỗ trợ Sales chủ động khởi tạo hoàn hàng cho đơn đã **Phát thành công** (cho phép hoàn 1 phần hoặc toàn bộ 100% đơn hàng). Tự động cộng Phí vận chuyển hoàn vào đơn. Đơn giao thất bại do shipper chuyển hoàn (tối đa X lần giao lại theo quy định 247Express) được tự động nhận Webhook cập nhật về kho (**Chờ chuyển hoàn** -> **Đã chuyển hoàn**).
* **BR-004 (Auto Refund & Trừ/Cộng kho):** Hệ thống trừ kho thực tế khi bản ghi xuất kho chuyển sang Đã duyệt (khi bưu tá Đã lấy hàng). **Auto Refund trừ số lượng của Yêu cầu giao hàng CHỈ áp dụng cho luồng Khách trả hàng sau khi đã Phát thành công**. Luồng giao thất bại tự động chuyển hoàn về kho (đơn từ Chờ xử lý) KHÔNG trừ số lượng Yêu cầu giao hàng (do chưa từng đạt Phát thành công để cộng vào Yêu cầu giao hàng).

### 2.3 Danh sách yêu cầu chức năng (Functional Requirements - FR)

| ID | Tên yêu cầu chức năng | Mô tả nghiệp vụ | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| **FR-customer-001** | Quản lý Khách hàng | Sales/Admin tạo và quản lý hồ sơ Khách hàng, đính kèm tệp Hợp đồng/Phụ lục (PDF/DOCX/PNG max 10MB) và khai báo danh sách sản phẩm cam kết. | P0 |
| **FR-contract-001** | Quản lý Hợp đồng & Phụ lục | Sales tạo Hợp đồng và Phụ lục ở màn quản lý hợp đồng. Tự cập nhật trạng thái không cần duyệt. | P0 |
| **FR-delivery-001** | Tạo Yêu cầu giao hàng | Admin tạo Yêu cầu giao hàng trực tiếp từ màn hình Hợp đồng. Không cần duyệt. | P0 |
| **FR-order-tracking-001** | Tạo đơn hàng từ Yêu cầu | Sales chọn Yêu cầu giao hàng để hệ thống tự điền SP. Sales tự nhập số lượng muốn giao (validate không vượt quota). Upload Hóa đơn bắt buộc. | P0 |
| **FR-order-tracking-002** | Phê duyệt đơn hàng thủ công | Admin phê duyệt đơn hàng (Chờ Duyệt -> Đã duyệt -> 247Express trả mã -> Đã tiếp nhận). Hỗ trợ Xóa mềm đơn Chờ duyệt và Hủy đơn Đã duyệt / Đã tiếp nhận. | P0 |
| **FR-order-tracking-003** | Từ chối đơn hàng thủ công | Admin từ chối đơn hàng (bắt buộc nhập lý do >= 10 ký tự), hệ thống tự động giải phóng số lượng tồn kho khả dụng đã tạm giữ. | P0 |
| **FR-order-tracking-004** | Đồng bộ hành trình từ 247Express | Tự động nhận Webhook từ 247Express để cập nhật trạng thái: Đã lấy hàng, Đang vận chuyển, Đang đi phát, Chờ xử lý, Phát thành công, Chờ chuyển hoàn, Đã chuyển hoàn. | P0 |
| **FR-order-tracking-005** | Hoàn hàng do Khách yêu cầu | Cho phép Sales bấm [Hoàn hàng] khi đơn đã Phát thành công (hỗ trợ hoàn 1 phần hoặc toàn bộ 100% đơn). Cộng Phí vận chuyển hoàn và kích hoạt Auto Refund trừ SL Yêu cầu. | P0 |
| **FR-order-tracking-006** | Quản lý Nhập/Xuất kho thủ công | Thủ kho tạo bản ghi Nhập/Xuất kho thủ công (Chờ duyệt). Cho phép sửa ghi đè kèm audit log. Quản lý kho duyệt để chính thức biến động tồn kho và sinh Phiếu tự động. | P0 |
| **FR-order-tracking-007** | Xuất kho tự động và In chứng từ | Admin duyệt đơn tự động sinh Bản ghi Xuất kho (Chờ duyệt) kèm Phiếu Xuất Kho. Bản ghi tự chuyển sang Đã duyệt (trừ kho) khi bưu tá Đã lấy hàng. Hỗ trợ in Mã vận đơn. | P0 |
| **FR-order-tracking-008** | Gửi SMS tự động cho khách hàng | Tự động gửi SMS Brandname thông báo đặt hàng thành công, đang giao hàng, và giao hàng thành công tới số điện thoại của người nhận. | P0 |
| **FR-order-tracking-009** | Gửi cảnh báo Telegram Group | Tự động gửi tin nhắn cảnh báo sự cố giao lỗi hoặc hành trình cập nhật tới group Telegram của bộ phận Sales phụ trách. | P0 |

---

## 3. Bản Đồ Sơ Đồ Hệ Thống (System Diagrams)

Toàn bộ sơ đồ luồng dữ liệu nghiệp vụ và trạng thái thực thể của phân hệ Theo dõi Đơn hàng được mô tả chi tiết tại các tài liệu sơ đồ chuyên biệt dưới đây:

1. **Sơ đồ Use Case tổng thể:** Đặc tả chi tiết mối quan hệ giữa các Actor với các Use Cases cốt lõi tại [diagram.md](../usecases/diagram.md).
2. **Sơ đồ Tuần tự (Sequence Diagram):** Biểu diễn chi tiết chuỗi tương tác thời gian thực toàn hệ thống từ lúc Đặt hàng đến lúc Đối soát tất toán tại [flows.md (Mục Sequence)](flows.md#flow-luong-tuong-tac-toan-he-thong-sequence-diagram).
3. **Sơ đồ Hoạt động (Activity Diagrams):** Các sơ đồ hoạt động (Flowchart/Activity Diagram) đặc tả chi tiết luồng nghiệp vụ được hiển thị trực tiếp tại mục mô tả của từng tài liệu đặc tả Use Case tương ứng.
4. **Sơ đồ Trạng thái (State Diagrams):** Biểu diễn chu kỳ vòng đời trạng thái của thực thể **Đơn hàng** và **Tồn kho** tại [states.md](states.md).

---

## 4. Đặc Tả Chi Tiết Ca Sử Dụng (Use Cases)

Chi tiết về tiền điều kiện, hậu điều kiện, luồng sự kiện chính, luồng thay thế/ngoại lệ, sơ đồ Flowchart luồng xử lý và mô tả trường dữ liệu màn hình được cấu trúc thành các tệp tin đặc tả Use Case độc lập dưới đây:

* [UC-order-01: Quản lý Khách hàng (Sales/Admin)](../usecases/UC-order-01_manage-customers.md)
* [UC-order-02: Quản lý Hợp đồng & Phụ lục (Sales/Admin)](../usecases/UC-order-02_manage-contracts-addendums.md)
* [UC-order-03: Tạo Yêu cầu giao hàng (Admin)](../usecases/UC-order-03_create-delivery-request.md)
* [UC-order-04: Tạo đơn hàng thủ công (Maker)](../usecases/UC-order-04_create-order-manual.md)
* [UC-order-05: Duyệt hoặc từ chối đơn hàng (Checker)](../usecases/UC-order-05_approve-reject-order.md)
* [UC-order-06: Xem chi tiết đơn hàng và theo dõi hành trình (Tất cả vai trò)](../usecases/UC-order-06_view-order-details.md)
* [UC-order-07: Chỉnh sửa đơn hàng Chờ Duyệt (Sales - Maker)](../usecases/UC-order-07_edit-pending-order.md)
* [UC-order-08: Xử lý sự cố giao hàng thất bại (Sales)](../usecases/UC-order-08_handle-delivery-failure.md)
* [UC-order-09: Quản lý Nhập / Xuất kho thủ công (Thủ kho / Quản lý kho)](../usecases/UC-order-09_replenish-inventory.md)

Danh mục tổng hợp Use Cases được theo dõi tại tệp [index.md](../usecases/index.md).

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

Toàn bộ các phác thảo được tài liệu hóa chi tiết tại tệp [order-management-dashboard.md](../wireframes/order-management-dashboard.md).

### 5.2 Bản mẫu thử nghiệm tương tác (Prototype)
Bản mẫu tương tác Front-end Premium (sử dụng Tailwind CSS, HSL palette, Chart.js, in thử nghiệm và giả lập các kịch bản Edge Cases) được triển khai hoàn chỉnh tại tệp [order-tracking-prototype.html](../prototypes/order-tracking-prototype.html).

---

## 6. Yêu Cầu Phi Chức Năng Nghiệp Vụ (Business Non-Functional Requirements - NFR)
* **NFR-001 (Tốc độ phản hồi thao tác nghiệp vụ):** Thời gian phản hồi tìm kiếm, tra cứu vận đơn và cập nhật trạng thái trên giao diện Portal không quá 2 giây để đảm bảo thao tác liên tục cho Sales và Admin.
* **NFR-002 (Tính toàn vẹn & Lưu vết nhật ký nghiệp vụ):** 100% lịch sử chỉnh sửa đơn hàng (Maker log), lịch sử lý do từ chối và nhật ký hành trình vận chuyển (Tracking history) phải được lưu vết vĩnh viễn, không cho phép xóa đè dữ liệu quá khứ.
* **NFR-003 (Độ chính xác đối soát hạn mức Hợp đồng & Yêu cầu):** Hệ thống đảm bảo tính toán chính xác tuyệt đối (100%) số lượng đã giao, số lượng hoàn trả (Auto Refund) và quota còn lại của Hợp đồng / Yêu cầu giao hàng, cấm tuyệt đối tình trạng âm số lượng hoặc vượt hạn mức cam kết.

---

## 7. Tài Liệu Nghiệp Vụ Đi Kèm (Appendix)
* Toàn bộ bảng mã lỗi nghiệp vụ Wordings, các giới hạn thông số nghiệp vụ (Limits & Quotas) và các phân tích rủi ro hệ thống chi tiết được lưu trữ nguyên bản tại tệp đặc tả kỹ thuật nghiệp vụ [spec.md](../spec/spec.md).
* Quá trình tư duy, brainstorm phân tích các Edge cases nghiệp vụ thực tế được lưu trữ tại [order-tracking-brainstorm.md](../brainstorms/order-tracking-brainstorm.md).
