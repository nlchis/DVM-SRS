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
Phân hệ Theo dõi Đơn hàng chịu trách nhiệm:
1. Tiếp nhận và đồng bộ tự động các đơn hàng được đặt hàng thành công (mặc định thanh toán SHIP COD, tự động gửi SMS) từ Website VietMec.
2. Cung cấp giao diện hệ thống quản lý nội bộ cho nhân viên Sales tạo đơn hàng B2B/Offline thủ công và Quản trị viên thực hiện phê duyệt/từ chối đơn hàng (Quy trình Maker/Checker).
3. Quản lý việc trừ tồn kho thực tế, tự động gán vị trí kệ hàng vật lý theo vị trí kệ xuất kho khi chuẩn bị xuất kho.
4. Tự động kết nối giao diện lập trình ứng dụng (API) với đối tác vận chuyển 247Express để khởi tạo vận đơn, in phiếu xuất kho và in nhãn dán vận đơn.
5. Tiếp nhận trạng thái hành trình vận chuyển từ đối tác qua cổng nhận dữ liệu tự động (Webhook) để tự động cập nhật và kích hoạt hệ thống gửi tin nhắn thương hiệu (SMS Brandname) cho khách hàng, bắn cảnh báo Telegram cho nhóm Sales phụ trách.
6. Hỗ trợ kế toán phát hành hóa đơn giá trị gia tăng (VAT) điện tử và đối soát tiền thu hộ (COD) bán tự động (nạp tệp Excel thủ công và so khớp tự động).

### 1.3 Thuật ngữ & Từ viết tắt (Glossary)
Bảng dưới đây định nghĩa chi tiết các thuật ngữ viết tắt và nghiệp vụ được sử dụng xuyên suốt bộ tài liệu:

| Thuật ngữ | Tên đầy đủ tiếng Anh | Định nghĩa nghiệp vụ thực tế |
| :--- | :--- | :--- |
| **PO** | Purchase Order | Phiếu đặt hàng (chứng từ lưu trữ nội bộ hệ thống). |

| **VAT** | Value Added Tax | Hóa đơn giá trị gia tăng (thuế giá trị gia tăng phát hành cho khách hàng). |
| **COD** | Cash on Delivery | Thu hộ tiền mặt (hình thức bưu tá thu tiền mặt của khách khi giao hàng). |
| **SMS Brandname** | Short Message Service Brandname | Tin nhắn thương hiệu tự động (gửi tên đại diện VietMec đến SĐT khách). |
| **API** | Application Programming Interface | Phương thức kết nối kỹ thuật giúp đồng bộ dữ liệu giữa VietMec và đối tác. |
| **Webhook** | Webhook | Cổng nhận thông báo tự động thời gian thực từ hãng vận chuyển 247Express. |
| **TBD** | To Be Decided | Vấn đề chưa quyết định, cần được thống nhất và làm rõ thêm. |
| **Maker/Checker** | Maker / Checker | Quy trình kiểm soát 2 bước: Nhân viên Sales tạo đơn (Maker), Admin duyệt đơn (Checker). |
| **Hệ thống quản lý nội bộ** | Portal / Dashboard | Giao diện quản trị Web dành riêng cho nhân viên và quản lý VietMec. |

---

## 2. Mô Tả Tổng Quan (Overall Description)

### 2.1 Các Tác nhân Hệ thống (Actors)
* **Khách hàng:** Đặt mua hàng trên Website VietMec, nhận tin nhắn thương hiệu (SMS) thông báo cập nhật hành trình đơn hàng.
* **Sales phụ trách (Maker):** Tạo đơn hàng thủ công trên hệ thống quản lý nội bộ; chỉnh sửa đơn hàng đang ở trạng thái **Chờ Phê Duyệt**; tiếp nhận cảnh báo Telegram giao lỗi để điều phối giao lại hoặc hoàn hàng.
* **Admin (Checker):** Phê duyệt hoặc Từ chối (bắt buộc nhập lý do) các đơn hàng thủ công do Sales tạo.
* **Thủ kho:** Xem đơn ở trạng thái **Chờ Giao Hàng**, in Phiếu xuất kho & Nhãn vận đơn, lấy hàng theo vị trí kệ xuất kho, đóng gói và bàn giao bưu tá; thực hiện quản lý tồn kho và nhập bổ sung số lượng cho từng mặt hàng.
* **Kế toán:** Phát hành hóa đơn VAT cho đơn hàng thành công; nạp tệp đối soát COD và tất toán công nợ đơn hàng.
* **Hệ thống 247Express (Hệ thống đối tác):** Tiếp nhận thông tin đơn giao hàng từ hệ thống quản lý nội bộ; đẩy Webhook cập nhật trạng thái hành trình thực tế.

### 2.2 Quy tắc Nghiệp vụ cốt lõi (Business Rules - BR)
* **BR-001 (Khấu trừ tồn kho tự động):** Đối với đơn hàng đặt từ Website VietMec (thanh toán SHIP COD), hệ thống thực hiện trừ tồn kho thực tế và gán vị trí xuất kho dự kiến ngay khi đơn hàng chuyển sang trạng thái **Chờ Giao Hàng** (bỏ qua bước tạm giữ kho 10 phút).
* **BR-002 (Maker/Checker chọn lọc):** Đơn hàng đồng bộ từ website VietMec được đặt hàng thành công (hình thức thanh toán mặc định là SHIP COD) sẽ bỏ qua bước duyệt và tự động chuyển sang trạng thái **Chờ Giao Hàng**. Đơn tạo tay bởi Sales bắt buộc phải qua bước duyệt của Admin.
* **BR-004 (Giao nhận nhị phân):** Hệ thống không hỗ trợ giao hàng/hoàn hàng một phần. Khách hàng chỉ có thể nhận toàn bộ đơn hàng (trạng thái **Giao Thành Công**) hoặc hoàn trả toàn bộ (trạng thái **Chờ Hoàn Hàng**).
* **BR-005 (Trừ/Cộng kho thực tế):** Hệ thống trừ kho thực tế và gán vị trí kệ xuất kho khi đơn chuyển sang trạng thái **Chờ Giao Hàng**. Hệ thống tự động cộng lại tồn kho thực tế ở vị trí kệ xuất cũ khi đơn hàng cập nhật trạng thái **Đã Hoàn Hàng** (đơn vị vận chuyển đã hoàn lại hàng thành công cho nhà cung cấp) hoặc bị **Từ Chối Duyệt**.
* **BR-006 (Đối soát công nợ):** Nếu số tiền COD thực thu từ 247Express lệch so với hóa đơn hàng > 0 đ, hệ thống tự động chuyển sang trạng thái **Lệch Đối Soát**, gắn cờ cảnh báo đỏ và khóa tính năng tất toán tự động.

---

## 3. Bản Đồ Sơ Đồ Hệ Thống (System Diagrams)

Toàn bộ sơ đồ luồng dữ liệu nghiệp vụ và trạng thái thực thể của phân hệ Theo dõi Đơn hàng được mô tả chi tiết tại các tài liệu sơ đồ chuyên biệt dưới đây:

1. **Sơ đồ Use Case tổng thể:** Đặc tả chi tiết mối quan hệ giữa 6 Actor với 8 Use Cases cốt lõi tại [diagram.md](file:///d:/VietMec/docs/order-tracking/usecases/diagram.md).
2. **Sơ đồ Tuần tự (Sequence Diagram):** Biểu diễn chi tiết chuỗi tương tác thời gian thực toàn hệ thống từ lúc Đặt hàng đến lúc Đối soát tất toán tại [flows.md (Mục Sequence)](file:///d:/VietMec/docs/order-tracking/srs/flows.md#flow-luong-tuong-tac-toan-he-thong-sequence-diagram).
3. **Sơ đồ Hoạt động (Activity Diagrams):** Các sơ đồ hoạt động (Flowchart/Activity Diagram) đặc tả chi tiết luồng nghiệp vụ được hiển thị trực tiếp tại mục mô tả của từng tài liệu đặc tả Use Case tương ứng.
4. **Sơ đồ Trạng thái (State Diagrams):** Biểu diễn chu kỳ vòng đời trạng thái của thực thể **Đơn hàng** và **Tồn kho** tại [states.md](file:///d:/VietMec/docs/order-tracking/srs/states.md).

---

## 4. Đặc Tả Chi Tiết Ca Sử Dụng (Use Cases)

Chi tiết về tiền điều kiện, hậu điều kiện, luồng sự kiện chính, luồng thay thế/ngoại lệ, sơ đồ Flowchart luồng xử lý và mô tả trường dữ liệu màn hình được cấu trúc thành các tệp tin đặc tả Use Case độc lập dưới đây:

* [UC-order-01: Đặt hàng tự động từ Website VietMec](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-01_place-order-web.md)
* [UC-order-02: Tạo đơn hàng thủ công (Maker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-02_create-order-manual.md)
* [UC-order-03: Duyệt hoặc từ chối đơn hàng (Checker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-03_approve-reject-order.md)
* [UC-order-04: Xem chi tiết đơn hàng và theo dõi hành trình (Tất cả vai trò)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-04_view-order-details.md)
* [UC-order-05: Chỉnh sửa đơn hàng Chờ Duyệt (Sales - Maker)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-05_edit-pending-order.md)
* [UC-order-06: Xử lý sự cố giao hàng thất bại (Sales)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-06_handle-delivery-failure.md)
* [UC-order-07: Phát hành hóa đơn VAT (Kế toán)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-07_issue-vat-invoice.md)
* [UC-order-08: Đối soát COD & Tất toán (Kế toán)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-08_reconcile-cod.md)
* [UC-order-09: Nhập bổ sung tồn kho (Thủ kho)](file:///d:/VietMec/docs/order-tracking/srs/usecases/UC-order-09_replenish-inventory.md)

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
9. Form thông tin và phát hành hóa đơn điện tử VAT của Kế toán.
10. Giao diện nạp tệp đối soát COD và bảng kê chênh lệch công nợ của Kế toán.

Toàn bộ các phác thảo được tài liệu hóa chi tiết tại tệp [order-management-dashboard.md](file:///d:/VietMec/docs/order-tracking/srs/wireframes/order-management-dashboard.md).

### 5.2 Bản mẫu thử nghiệm tương tác (Prototype)
Bản mẫu tương tác Front-end Premium (sử dụng Tailwind CSS, HSL palette, Chart.js, in thử nghiệm và giả lập các kịch bản Edge Cases) được triển khai hoàn chỉnh tại tệp [order-tracking-prototype.html](file:///d:/VietMec/docs/order-tracking/srs/prototypes/order-tracking-prototype.html).

---

## 6. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)
* **NFR-001 (Hiệu năng):** API kết nối đồng bộ đơn hàng từ Website VietMec sang hệ thống quản lý nội bộ phải phản hồi trong thời gian ≤ 2 giây.
* **NFR-002 (Bảo mật):** Tất cả kết nối API truyền nhận thông tin bắt buộc sử dụng HTTPS/TLS 1.2 trở lên. Thông tin mật khẩu và mã token API của đối tác phải được mã hóa lưu trữ.


---

## 7. Tài Liệu Nghiệp Vụ Đi Kèm (Appendix)
* Toàn bộ bảng mã lỗi nghiệp vụ Wordings, các giới hạn thông số nghiệp vụ (Limits & Quotas) và các phân tích rủi ro hệ thống chi tiết được lưu trữ nguyên bản tại tệp đặc tả kỹ thuật nghiệp vụ [spec.md](file:///d:/VietMec/docs/order-tracking/srs/spec.md).
* Quá trình tư duy, brainstorm phân tích các Edge cases nghiệp vụ thực tế được lưu trữ tại [order-tracking-brainstorm.md](file:///d:/VietMec/docs/order-tracking/srs/brainstorms/order-tracking-brainstorm.md).
