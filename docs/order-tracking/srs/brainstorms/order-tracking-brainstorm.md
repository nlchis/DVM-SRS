---
type: brainstorm
feature: order-tracking
idea_slug: order-tracking-brainstorm
status: approved
mode: deep
lang: vi
owner: "@nlchis"
created: 2026-06-30
updated: 2026-07-02
complexity_flags: [has_external_redirect, has_state_machine, has_multi_role, has_async_flow, has_throttle_rules]
links:
  - "[order-management-dashboard.md](file:///d:/VietMec/docs/order-tracking/wireframes/order-management-dashboard.md)"
  - "[order-tracking-prototype.html](file:///d:/VietMec/docs/order-tracking/prototypes/order-tracking-prototype.html)"
tags: [brainstorm, order-tracking]
stale_reason: ""
changelog:
  - date: 2026-07-02
    author: "@nlchis"
  - date: 2026-07-01
    author: "@nlchis"
    note: "Bổ sung các màn hình edge case (lỗi tạo đơn, giao hàng thất bại/hoàn hàng, lỗi notification)."
  - date: 2026-06-30
    author: "@nlchis"
    note: "Khởi tạo bản phác thảo brainstorm lần đầu cho hệ thống theo dõi đơn hàng."
---

# Giải pháp Hệ thống Theo dõi Đơn hàng (Order Tracking System)

> Feature: order-tracking | Idea: order-tracking-brainstorm
> Tài liệu brainstorm khép kín quy trình vận hành và kiểm soát nghiệp vụ theo dõi đơn hàng VietMec.

## 1. Idea Seed

Hệ thống theo dõi đơn hàng khép kín: Hệ thống theo dõi đơn hàng khép kín: Áp dụng quy trình kiểm soát Maker/Checker (Sales tạo đơn chọn phương thức vận chuyển, Admin duyệt hoặc từ chối kèm lý do). Tự động quản lý xuất/nhập/tồn kho vật lý theo sơ đồ vị trí. Gọi API tự động đẩy đơn sang 247Express, Thủ kho in phiếu xuất kho và dán nhãn vận đơn vật lý. Gửi SMS cập nhật cho Khách hàng và cảnh báo Telegram sự cố cho Sales.

## 2. Context

Nhằm tối ưu hóa chuỗi vận hành giao nhận của VietMec, giảm thiểu sai sót nhập liệu thủ công của Sales, kiểm soát chặt chẽ số lượng và vị trí hàng tồn kho thực tế, tránh thất thoát tài sản và nâng cao trải nghiệm mua sắm của khách hàng.

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|---|---|---|
| **Khách hàng (Cá nhân/Doanh nghiệp)** | Không rõ đơn hàng đã được gửi đi chưa, khi nào nhận được hàng. | Ký kết hợp đồng mua bán với Sales, thanh toán tiền hàng cho Kế toán, và nhận thông báo theo dõi hành trình đơn hàng qua SMS. |
| **Sales phụ trách** | Phải quản lý và tạo đơn hàng thủ công B2B/Offline, theo dõi thủ công trạng thái vận chuyển để xử lý sự cố. | Nhận cảnh báo Telegram ngay lập tức khi đơn hàng gặp sự cố giao lỗi để xử lý nhanh. |
| **Admin (Checker)** | Thiếu công cụ kiểm soát chất lượng thông tin đơn hàng B2B/Offline do Sales tạo. | Phê duyệt hoặc từ chối đơn hàng thủ công kèm lý do rõ ràng trước khi gửi sang hãng vận chuyển. |
| **Thủ kho** | Gặp khó khăn trong định vị vị trí sản phẩm trong kho khi chuẩn bị hàng, mất thời gian viết bill. | In phiếu xuất kho và in nhãn dán vận đơn 247Express để dán trực tiếp. |

## 4. Capabilities Breakdown

### P0 — must have
* Quy trình Maker/Checker kiểm soát đơn thủ công (Sales tạo, Admin duyệt/từ chối kèm lý do).
* Tự động giữ kho tạm thời 10 phút khi thanh toán; trừ kho thực tế và gán vị trí xuất kho khi đơn chuyển trạng thái `Đã tiếp nhận`.
* Tự động hoàn trả tồn kho khả dụng về vị trí cũ khi đơn hàng bị từ chối duyệt hoặc bị chuyển hoàn (`Đã chuyển hoàn`).
* Tích hợp API 247Express tạo mã vận đơn tự động ngay khi đơn sang trạng thái `Đã tiếp nhận`.
* Gửi SMS Brandname tự động: Ngay sau khi đơn chuyển sang trạng thái Đã tiếp nhận.
* Cảnh báo Telegram Group cho Sales phụ trách khi có sự cố giao lỗi (`Thất bại`) để lựa chọn giao lại lần 2 hoặc hoàn hàng.
* Giao nhận nhị phân: Chỉ cho phép nhận toàn bộ đơn hoặc hoàn trả toàn bộ (không giao nhận một phần).
* Tự động sinh và lưu trữ Phiếu xuất kho (Phiếu xuất kho) trên Portal nội bộ làm chứng từ đối chiếu.
* Tính năng "Hủy đơn hàng" đối với các đơn ở trạng thái đã tiếp nhận.
* Quản lý tạo yêu cầu Nhập kho / Xuất kho thủ công.

### P1 — should have
* Tính năng "Thử lại" gửi API vận đơn 247Express khi gặp lỗi đường truyền.
* Tính năng "Gửi lại" tin nhắn SMS thủ công trong trang chi tiết đơn hàng khi nhật ký báo gửi lỗi.
* Quản lý danh mục sơ đồ kệ/hàng/ô trong kho hàng.

### P2 — nice to have
* Tích hợp đa nhà vận chuyển dự phòng (Multi-carrier).
* Dashboard thống kê hiệu suất giao hàng của đối tác và tỷ lệ hoàn hàng theo từng Sales.

## 5. Core Flows (Happy Path)

### 5.1 Luồng tạo đơn hàng thủ công (Maker, Checker & Hệ thống)

1. Maker (Sales) điền thông tin đơn hàng thủ công trên Portal (import Hóa đơn, chọn phương thức vận chuyển) và bấm gửi duyệt.
2. Hệ thống tạm giữ tồn kho khả dụng của sản phẩm và tạo đơn hàng ở trạng thái `Chờ duyệt`.
3. Checker (Admin) xem xét và bấm Phê duyệt đơn hàng.
4. Hệ thống thực hiện trừ tồn kho thực tế, gán vị trí xuất kho, sinh Phiếu xuất kho lưu nội bộ, gửi SMS xác nhận cho khách hàng và gọi API 247Express lấy mã vận đơn (Tracking ID) chuyển trạng thái sang `Đã tiếp nhận`.

```
[Maker (Sales)] --- Tạo đơn (Upload Hóa đơn) ---> [Hệ thống Portal] (Trạng thái: Chờ duyệt)
                                                     |
                                            (Tạm giữ kho khả dụng)
                                                     v
[Checker (Admin)] <-- Xem thông tin & Duyệt --- [Hệ thống Portal]
                                                     |
                                           (Trừ kho thực tế + Gán kệ)
                                           (Sinh Phiếu xuất kho PO)
                                                     v
[Hệ thống Portal] ----- Gọi API tạo đơn -----> [247Express]
                                                     |
                                            (Nhận Tracking ID)
                                                     v
[Khách hàng] <------- Gửi SMS xác nhận -------- [Hệ thống Portal]
                                             (Trạng thái: Đã tiếp nhận)
```

### 5.2 Luồng xuất kho và bàn giao (Thủ kho)

1. Thủ kho xem danh sách đơn hàng `Đã tiếp nhận` trên Portal và bấm in Phiếu xuất kho kèm nhãn dán vận đơn 247Express.
2. Thủ kho lấy hàng vật lý từ kệ kho theo vị trí ghi trên phiếu, thực hiện đóng gói và dán nhãn vận đơn 247Express lên gói hàng.
3. Bưu tá 247Express đến kho lấy hàng, quét mã vạch bàn giao và cập nhật trạng thái đã lấy hàng.

```
[Hệ thống Portal] (Đã tiếp nhận) ---> [Thủ kho] --- In Phiếu & Nhãn vận đơn
                                                            |
                                                   (Lấy hàng theo kệ)
                                                   (Đóng gói & Dán nhãn)
                                                            v
[Hãng 247Express] <------- Quét mã lấy hàng ------ [Gói hàng vật lý]
```


1. Bưu tá 247Express giao hàng thành công và cập nhật trạng thái `Phát thành công` trên hệ thống 247Express.
2. Hệ thống nhận Webhook/Polling từ 247Express, cập nhật trạng thái đơn hàng thành `Phát thành công`, gửi SMS cảm ơn khách hàng và gửi thông báo Telegram cho Sales.
4. Định kỳ đối soát, hệ thống nạp dữ liệu COD thực thu từ 247Express, đối chiếu tự động với số liệu hóa đơn và thực hiện tất toán công nợ đơn hàng.

```
[Hãng 247Express] --- Webhook: Phát thành công ---> [Hệ thống Portal] (Trạng thái: Phát thành công)
                                                     |
                                            (SMS & Telegram báo thành công)
                                                     v
                                                     |
                                            (Tự động đối soát COD)
                                                     v
[Hệ thống Portal] ------ Khớp tiền COD -------> Tất toán công nợ đơn hàng
```

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Khi nào | YES (nhánh đồng ý) | NO (nhánh từ chối) |
|---|---|---|---|---|
| **D1** | Khởi tạo đơn hàng | Khi tạo đơn hàng thủ công. | Kho khả dụng ≥ số lượng đặt → Cho phép tiếp tục luồng và khóa kho tạm giữ. | Kho khả dụng < số lượng đặt → Chặn hành động và hiển thị thông báo hết hàng. |
| **D2** | Phê duyệt đơn thủ công | Admin (Checker) đánh giá đơn hàng Chờ Duyệt (`Chờ duyệt`). | Duyệt đơn → Chuyển trạng thái sang `Đã tiếp nhận`, trừ kho thực tế và gọi API 247Express. | Từ chối duyệt → Yêu cầu lý do từ chối, giải phóng kho và chuyển đơn sang `Từ chối` (khóa đơn). |
| **D3** | Lưu chỉnh sửa đơn chờ duyệt | Sales bấm lưu chỉnh sửa đơn hàng đang Chờ Duyệt. | Trạng thái đơn vẫn là `Chờ duyệt` và Version dữ liệu khớp → Cho lưu thay đổi và tăng số Version đơn. | Trạng thái đơn đã thay đổi (Admin đã duyệt/từ chối) hoặc Version bị lệch → Chặn lưu, báo lỗi. |
| **D4** | Đối soát COD tự động | Khi đối soát tiền thực nhận từ đối tác vận chuyển 247Express. | Số tiền COD khớp 100% hóa đơn đơn hàng → Tự động tất toán công nợ đơn hàng. | Số tiền COD lệch so với hóa đơn → Gắn cờ cảnh báo `Reconciliation Discrepancy` để xử lý thủ công. |

### 6.2 Scenario Matrix (has_multi_role & states)

| Vai trò thao tác | Trạng thái đơn | Hành động hợp lệ | Kết quả hệ thống |
|---|---|---|---|
| **Sales phụ trách (Maker)** | Chờ duyệt | Chỉnh sửa thông tin đơn hàng | Cập nhật thông tin đơn hàng, tăng Version dữ liệu. |
| **Sales phụ trách (Maker)** | Từ chối / Đã tiếp nhận / Đang đi phát / Phát thành công / Thất bại / Chờ chuyển hoàn / Đã chuyển hoàn | Chỉnh sửa thông tin đơn hàng | **Bị chặn.** Không được chỉnh sửa đơn hàng ở các trạng thái này. |
| **Admin (Checker)** | Chờ duyệt | Phê duyệt (Approve) đơn hàng | Chuyển đơn sang `Đã tiếp nhận`, trừ kho, gọi API 247Express, gửi SMS cho khách. |
| **Admin (Checker)** | Chờ duyệt | Từ chối (Reject) đơn hàng | Chuyển đơn sang `Từ chối`, yêu cầu nhập lý do từ chối, giải phóng kho tạm giữ. |
| **Thủ kho** | Đã tiếp nhận | In phiếu xuất kho & nhãn dán | In thông tin vị trí xuất kệ kho và nhãn vận đơn để dán gói hàng. |

### 6.3 State Transitions

#### Đơn hàng (Order Entity)
`Chờ duyệt` → `Đã tiếp nhận` → `Đang đi phát` → `Phát thành công` hoặc `Thất bại` → `Đã chuyển hoàn` (nếu hoàn trả).
`Chờ duyệt` → `Từ chối` (Trạng thái cuối, bị khóa).

| Entity | Từ | Sang | Trigger | Quay lại được? |
|--------|------|----|---------|-------------|
| **Order** | `Chờ duyệt` | `Đã tiếp nhận` | Admin nhấn Phê duyệt đơn thủ công. | Không |
| **Order** | `Chờ duyệt` | `Từ chối` | Admin nhấn Từ chối duyệt và nhập lý do từ chối. | Không (Bị khóa vĩnh viễn) |
| **Order** | `Đã tiếp nhận` | `Đang đi phát` | Bưu tá 247Express lấy hàng vật lý và quét mã vạch (Webhook báo trạng thái). | Không |
| **Order** | `Đang đi phát` | `Phát thành công` | Giao hàng thành công (Webhook từ 247Express). | Không |
| **Order** | `Đang đi phát` | `Thất bại` | Giao hàng thất bại lần 1 (Webhook từ 247Express). | Có (Khi Sales nhấn [Yêu cầu Giao lại]) |
| **Order** | `Thất bại` | `Đã chuyển hoàn` | Sales nhấn [Xác nhận Hoàn Hàng] sau khi đơn giao lỗi. | Không |

#### Tồn kho (Product Inventory Entity)
`Khả dụng` → `Tạm giữ (Hold 10 phút)` → `Trừ kho thực tế` → `Hoàn trả lại kho thực tế` (nếu đơn hủy/hoàn).

| Entity | Từ | Sang | Trigger | Quay lại được? |
|--------|------|----|---------|-------------|
| **Inventory** | Khả dụng | Tạm giữ (Hold) | Khách bắt đầu thanh toán trên VietMec hoặc Sales gửi duyệt đơn thủ công. | Có (Giải phóng sau 10 phút nếu không thanh toán hoặc khi Admin Reject đơn) |
| **Inventory** | Tạm giữ (Hold) | Trừ kho thực tế | Đơn chuyển sang trạng thái `Đã tiếp nhận` (Admin duyệt/Web sync thành công). | Có (Chỉ cộng lại khi đơn bị chuyển hoàn `Đã chuyển hoàn`) |
| **Inventory** | Trừ kho thực tế | Đã xuất kho | Thủ kho dán nhãn và bàn giao gói hàng cho bưu tá 247Express. | Có (Cộng lại kho khi trạng thái đơn đổi thành `Đã chuyển hoàn`) |

### 6.4 Interrupted Transactions

| Tình huống | Hệ thống còn lại gì | Resume (Khôi phục) | Cleanup (Giải phóng) |
|---|---|---|---|
| **Admin từ chối duyệt đơn hàng thủ công** | Đơn hàng ở trạng thái `Từ chối`, sản phẩm vẫn đang bị tạm giữ. | Sales nhận thông báo lỗi, không được sửa đơn cũ, bắt buộc tạo đơn mới. | Hệ thống tự động xóa bản ghi giữ kho, cộng lại sản phẩm về kho. |
| **Gọi API 247Express bị lỗi đường truyền/timeout** | Đơn hàng ở trạng thái `Đã tiếp nhận` nhưng trạng thái vận chuyển là `COURIER_Thất bại`. Tồn kho đã trừ. | Hệ thống lưu trữ đơn hàng, hiển thị nút **[Thử lại gửi API]** cho Sales. | Sales nhấn gửi lại API thủ công sau khi hệ thống 247Express phục hồi kết nối. |
| **Cổng gửi tin nhắn SMS Brandname bị lỗi** | Đơn hàng chuyển sang trạng thái mới nhưng lịch sử thông báo ghi trạng thái gửi SMS `Thất bại`. | Hệ thống ghi nhận log lỗi gửi SMS, hiển thị nút **[Gửi lại SMS]** cho Sales. | Sales kiểm tra lại số điện thoại khách hàng và bấm gửi lại tin nhắn thủ công. |
| **Xung đột sửa và duyệt đồng thời** | Bản ghi đơn hàng vẫn giữ nguyên phiên bản cũ trong DB. | Giao dịch gửi yêu cầu sau bị chặn và rollback, hiển thị thông báo lỗi. | Yêu cầu người dùng tải lại trang (F5) để cập nhật thông tin mới nhất. |

### 6.5 Other Edge Cases

* **Giao hàng thất bại:** Hệ thống không cho phép giao nhận hoặc hoàn hàng một phần. Đơn hàng gặp sự cố giao lỗi phải được xử lý giao lại toàn bộ (lần 2) hoặc chuyển hoàn toàn bộ. Khi chuyển hoàn (`Đã chuyển hoàn`), hệ thống tự động cộng lại toàn bộ số lượng vào kho thực tế tại vị trí cũ.
* **Lệch công nợ COD đối soát:** Nếu chênh lệch tiền COD thực nhận từ 247Express so với hóa đơn > 0 đ, đơn hàng chuyển sang trạng thái `Reconciliation Discrepancy` (Lệch đối soát), gắn cờ cảnh báo đỏ và khóa tính năng tất toán tự động để kế toán xử lý thủ công.

## 7. Validation, Limits & Wording

### 7.1 Validation rules

| Field | Rule |
|---|---|
| **Số điện thoại nhận** | Định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 0). Bắt buộc. |
| **Địa chỉ nhận** | Chuẩn hóa thông qua bộ chọn Tỉnh/Thành, Quận/Huyện, Phường/Xã có sẵn. Địa chỉ chi tiết bắt buộc nhập. |
| **Dung lượng file Hóa đơn** | Kích thước file ≤ 5MB. Định dạng hỗ trợ: PDF, PNG, JPG. Tùy chọn (không bắt buộc). |
| **Lý do từ chối duyệt** | Bắt buộc nhập khi Admin chọn hành động Từ chối (Reject) đơn hàng. Độ dài từ 10 - 200 ký tự. |

### 7.2 Limits & Quotas (exact values)

| Tham số | Giá trị | Window | Behavior khi vượt |
|---|---|---|---|
| **Số lần giao lại tối đa** | 2 lần | Mỗi đơn hàng giao lỗi | Nếu giao thất bại lần 2, hệ thống tự động chuyển đơn sang trạng thái yêu cầu chuyển hoàn. |

### 7.3 Wording samples (exact strings)

#### Error messages

| Tình huống | Wording | Code |
|---|---|---|
| Giao dịch đồng thời bị chặn | "Đơn hàng đã được duyệt hoặc thay đổi bởi người khác. Vui lòng tải lại trang." | E-ORDER-001 |
| Sửa đơn không ở Chờ duyệt | "Đơn hàng đã được duyệt hoặc từ chối. Không được phép chỉnh sửa. Hãy tạo đơn mới!" | E-ORDER-002 |
| Tải file Hóa đơn quá lớn | "Dung lượng tệp đính kèm vượt quá giới hạn 5MB. Vui lòng chọn tệp nhỏ hơn." | E-INV-001 |
| Gọi API 247Express thất bại | "Lỗi kết nối tới đối tác 247Express. Thông tin vận đơn chưa được đồng bộ." | E-COURIER-001 |
| Gửi SMS Brandname thất bại | "Không thể gửi tin nhắn SMS tới số điện thoại khách hàng. Vui lòng kiểm tra lại kết nối." | E-SMS-001 |

#### Success messages

| Tình huống | Wording |
|---|---|
| Lưu chỉnh sửa thành công | "Cập nhật thông tin đơn hàng chờ duyệt thành công." |
| Admin phê duyệt thành công | "Đơn hàng đã được phê duyệt thành công và chuyển sang trạng thái đã tiếp nhận." |
| Admin từ chối thành công | "Đơn hàng đã bị từ chối duyệt. Đã giải phóng số lượng tồn kho khả dụng." |

#### Info / neutral messages

| Tình huống | Wording |
|---|---|

## 8. Assumptions

* Đối tác vận chuyển 247Express cung cấp API tạo đơn, tracking trạng thái ổn định và hỗ trợ cơ chế Webhook trả dữ liệu thời gian thực.
* Cổng kết nối SMS Brandname đã được đăng ký và hoạt động ổn định cho các đầu số mạng di động tại Việt Nam.
* Sơ đồ vị trí và cách định vị sản phẩm (kệ/hàng/ô) trong kho hàng đã được thiết lập đồng bộ từ trước.

## 9. Risks

| Rủi ro | Khả năng | Hậu quả nghiệp vụ | Cách phòng |
|---|---|---|---|
| **Sales nhập sai thông tin giao hàng khi tạo tay** | Thường xuyên | Đơn hàng không giao được, phát sinh phí ship 2 đầu và tăng tỷ lệ hoàn hàng. | Chuẩn hóa địa chỉ thông qua dropdown Tỉnh/Thành/Quận/Phường, validate SĐT 10 số. |
| **Lệch tồn kho thực tế so với hệ thống** | Hiếm gặp | Đơn hàng được phê duyệt nhưng thực tế kho đã hết hàng dẫn đến treo đơn, hủy đơn. | Hỗ trợ tính năng điều chỉnh kho vật lý định kỳ (Stock Adjustment) và đối chiếu tồn kho kệ. |
| **Đối tác vận chuyển 247Express gián đoạn dịch vụ diện rộng** | Hiếm gặp | Hàng hóa bị ứ đọng tại kho, trễ hạn giao hàng cam kết với khách hàng. | Thiết kế module tích hợp đa nhà vận chuyển, hỗ trợ cấu hình chuyển sang đối tác dự phòng (như Viettel Post). |

## 10. Success Criteria (preliminary)

* Thời gian chuẩn bị hàng, in phiếu và dán nhãn vận đơn của Thủ kho dưới 5 phút cho mỗi đơn hàng.

## 11. Open Questions

* **OQ-1:** Tài liệu đặc tả API và cơ chế Webhook của đối tác 247Express cần được cung cấp chi tiết để phục vụ bước SRS.
* **OQ-2:** Lựa chọn nhà cung cấp dịch vụ SMS Brandname cụ thể (eSMS, Twilio, VietGuys, v.v.) và phí duy trì.

## 12. Next Steps

Sau brainstorm này (sau khi BA approve):
* `/urd order-tracking` — Khảo sát và ghi nhận yêu cầu người dùng chi tiết.
* `/brd order-tracking` — Xây dựng tài liệu yêu cầu nghiệp vụ chi tiết.
* `/prd order-tracking` — Định hình phạm vi tính năng sản phẩm cụ thể trước khi lập SRS.
