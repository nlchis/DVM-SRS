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
    note: "Cấu trúc lại tài liệu brainstorm tích hợp luồng đặt hàng VietMec, quy trình Maker/Checker 3 phân làn, nghiệp vụ Kho/Kế toán tự động và các cơ chế xử lý lỗi/kiểm soát đồng thời."
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

Hệ thống theo dõi đơn hàng khép kín: Tự động đồng bộ đơn hàng từ website VietMec sang hệ thống Portal, tự động khóa tồn kho trong 10 phút khi thanh toán, phân công Sales phụ trách. Đối với đơn thủ công, áp dụng quy trình kiểm soát Maker/Checker (Sales tạo đơn SHIP COD mặc định, Admin duyệt hoặc từ chối kèm lý do). Tự động quản lý xuất/nhập/tồn kho vật lý theo sơ đồ vị trí. Gọi API tự động đẩy đơn sang 247Express, Thủ kho in phiếu xuất kho và dán nhãn vận đơn vật lý. Gửi SMS cập nhật cho Khách hàng và cảnh báo Telegram sự cố cho Sales. Kế toán phát hành hóa đơn VAT và đối soát COD tự động, xử lý khi lệch công nợ.

## 2. Context

Nhằm tối ưu hóa chuỗi vận hành giao nhận của VietMec, giảm thiểu sai sót nhập liệu thủ công của Sales, kiểm soát chặt chẽ số lượng và vị trí hàng tồn kho thực tế, đồng thời theo dõi dòng tiền COD thu hộ từ đối tác vận chuyển 247Express, tránh thất thoát tài sản và nâng cao trải nghiệm mua sắm của khách hàng.

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|---|---|---|
| **Khách hàng** | Không rõ đơn hàng đã được gửi đi chưa, khi nào nhận được hàng. | Nhận thông báo xác nhận và thông tin theo dõi hành trình đơn hàng tự động qua SMS. |
| **Sales phụ trách** | Phải nhập tay đơn hàng từ website, theo dõi thủ công trạng thái vận chuyển để xử lý sự cố. | Đơn hàng web tự động đồng bộ; nhận cảnh báo Telegram ngay lập tức khi đơn hàng gặp sự cố giao lỗi để xử lý nhanh. |
| **Admin (Checker)** | Thiếu công cụ kiểm soát chất lượng thông tin đơn hàng B2B/Offline do Sales tạo. | Phê duyệt hoặc từ chối đơn hàng thủ công kèm lý do rõ ràng trước khi gửi sang hãng vận chuyển. |
| **Thủ kho** | Gặp khó khăn trong định vị vị trí sản phẩm trong kho khi chuẩn bị hàng, mất thời gian viết bill. | In phiếu xuất kho chứa thông tin vị trí kệ hàng và in nhãn dán vận đơn 247Express để dán trực tiếp. |
| **Kế toán** | Đối soát COD thủ công cuối tháng dễ sai sót, chậm xuất hóa đơn VAT theo quy định. | Hệ thống tự động đối soát COD chênh lệch, cảnh báo lệch công nợ và hỗ trợ công cụ phát hành hóa đơn VAT nhanh. |

## 4. Capabilities Breakdown

### P0 — must have
* Tự động đồng bộ đơn hàng từ website VietMec sang Portal và phân công Sales phụ trách.
* Quy trình Maker/Checker kiểm soát đơn thủ công (Sales tạo, Admin duyệt/từ chối kèm lý do).
* Tự động giữ kho tạm thời 10 phút khi thanh toán; trừ kho thực tế và gán vị trí xuất kho khi đơn chuyển trạng thái `AWAITING_SHIPPING`.
* Tự động hoàn trả tồn kho khả dụng về vị trí cũ khi đơn hàng bị từ chối duyệt hoặc bị chuyển hoàn (`RETURNED`).
* Tích hợp API 247Express tạo mã vận đơn tự động ngay khi đơn sang trạng thái `AWAITING_SHIPPING`.
* Gửi SMS Brandname tự động: Ngay khi đồng bộ (đối với đơn web) hoặc sau khi được Admin duyệt (đối với đơn thủ công).
* Cảnh báo Telegram Group cho Sales phụ trách khi có sự cố giao lỗi (`FAILED`) để lựa chọn giao lại lần 2 hoặc hoàn hàng.
* Giao nhận nhị phân: Chỉ cho phép nhận toàn bộ đơn hoặc hoàn trả toàn bộ (không giao nhận một phần).
* Kế toán xuất hóa đơn VAT trong 24 giờ và đối soát COD tự động với 247Express (cảnh báo lệch công nợ).
* Tự động sinh và lưu trữ Phiếu đặt hàng (Purchase Order) trên Portal nội bộ làm chứng từ đối chiếu.

### P1 — should have
* Tính năng "Thử lại" gửi API vận đơn 247Express khi gặp lỗi đường truyền.
* Tính năng "Gửi lại" tin nhắn SMS thủ công trong trang chi tiết đơn hàng khi nhật ký báo gửi lỗi.
* Quản lý danh mục sơ đồ kệ/hàng/ô trong kho hàng.

### P2 — nice to have
* Tích hợp đa nhà vận chuyển dự phòng (Multi-carrier).
* Dashboard thống kê hiệu suất giao hàng của đối tác và tỷ lệ hoàn hàng theo từng Sales.

## 5. Core Flows (Happy Path)

### 5.1 Luồng đặt hàng tự động từ Website VietMec (Khách hàng & Hệ thống)

1. Khách hàng lựa chọn sản phẩm trên website VietMec và nhấn nút thanh toán.
2. Hệ thống thực hiện tạm giữ hàng trong kho khả dụng (Stock Lock) trong thời gian tối đa 10 phút.
3. Khách hàng hoàn tất thanh toán thành công.
4. Hệ thống tạo đơn hàng mới, tự động phân công Sales phụ trách, khấu trừ tồn kho thực tế, gán vị trí xuất kho và tự động tạo Phiếu đặt hàng (PO) lưu trữ nội bộ.
5. Hệ thống gửi SMS đặt hàng thành công cho Khách hàng, đồng thời gọi API 247Express tạo vận đơn và nhận về Tracking ID. Trạng thái đơn hàng chuyển sang `AWAITING_SHIPPING`.

### 5.2 Luồng tạo đơn hàng thủ công (Maker, Checker & Hệ thống)

1. Maker (Sales) điền thông tin đơn hàng thủ công trên Portal (mặc định hình thức thanh toán SHIP COD, tải chứng từ CO/CQ tùy chọn) và bấm gửi duyệt.
2. Hệ thống tạm giữ tồn kho khả dụng của sản phẩm và tạo đơn hàng ở trạng thái `PENDING_APPROVAL`.
3. Checker (Admin) xem xét và bấm Phê duyệt đơn hàng.
4. Hệ thống thực hiện trừ tồn kho thực tế, gán vị trí xuất kho, sinh Phiếu đặt hàng (PO) lưu nội bộ, gửi SMS xác nhận cho khách hàng và gọi API 247Express lấy mã vận đơn (Tracking ID) chuyển trạng thái sang `AWAITING_SHIPPING`.

### 5.3 Luồng xuất kho và bàn giao (Thủ kho)

1. Thủ kho xem danh sách đơn hàng `AWAITING_SHIPPING` trên Portal và bấm in Phiếu xuất kho kèm nhãn dán vận đơn 247Express.
2. Thủ kho lấy hàng vật lý từ kệ kho theo vị trí ghi trên phiếu, thực hiện đóng gói và dán nhãn vận đơn 247Express lên gói hàng.
3. Bưu tá 247Express đến kho lấy hàng, quét mã vạch bàn giao và cập nhật trạng thái đã lấy hàng.

### 5.4 Luồng Giao hàng thành công & Kế toán đối soát

1. Bưu tá 247Express giao hàng thành công và cập nhật trạng thái `SUCCESS` trên hệ thống 247Express.
2. Hệ thống nhận Webhook/Polling từ 247Express, cập nhật trạng thái đơn hàng thành `SUCCESS`, gửi SMS cảm ơn khách hàng và gửi thông báo Telegram cho Sales.
3. Kế toán phát hành hóa đơn VAT cho đơn hàng trên Portal trong vòng 24 giờ.
4. Định kỳ đối soát, hệ thống nạp dữ liệu COD thực thu từ 247Express, đối chiếu tự động với số liệu hóa đơn và thực hiện tất toán công nợ đơn hàng.

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Khi nào | YES (nhánh đồng ý) | NO (nhánh từ chối) |
|---|---|---|---|---|
| **D1** | Khởi tạo đơn hàng | Khi tạo đơn hàng trên website hoặc tạo thủ công. | Kho khả dụng ≥ số lượng đặt → Cho phép tiếp tục luồng và khóa kho tạm giữ. | Kho khả dụng < số lượng đặt → Chặn hành động và hiển thị thông báo hết hàng. |
| **D2** | Phê duyệt đơn thủ công | Admin (Checker) đánh giá đơn hàng Chờ Duyệt (`PENDING_APPROVAL`). | Duyệt đơn → Chuyển trạng thái sang `AWAITING_SHIPPING`, trừ kho thực tế và gọi API 247Express. | Từ chối duyệt → Yêu cầu lý do từ chối, giải phóng kho và chuyển đơn sang `REJECTED` (khóa đơn). |
| **D3** | Lưu chỉnh sửa đơn chờ duyệt | Sales bấm lưu chỉnh sửa đơn hàng đang Chờ Duyệt. | Trạng thái đơn vẫn là `PENDING_APPROVAL` và Version dữ liệu khớp → Cho lưu thay đổi và tăng số Version đơn. | Trạng thái đơn đã thay đổi (Admin đã duyệt/từ chối) hoặc Version bị lệch → Chặn lưu, báo lỗi. |
| **D4** | Đối soát COD tự động | Khi đối soát tiền thực nhận từ đối tác vận chuyển 247Express. | Số tiền COD khớp 100% hóa đơn đơn hàng → Tự động tất toán công nợ đơn hàng. | Số tiền COD lệch so với hóa đơn → Gắn cờ cảnh báo `Reconciliation Discrepancy` để xử lý thủ công. |

### 6.2 Scenario Matrix (has_multi_role & states)

| Vai trò thao tác | Trạng thái đơn | Hành động hợp lệ | Kết quả hệ thống |
|---|---|---|---|
| **Sales phụ trách (Maker)** | PENDING_APPROVAL | Chỉnh sửa thông tin đơn hàng | Cập nhật thông tin đơn hàng, tăng Version dữ liệu. |
| **Sales phụ trách (Maker)** | REJECTED / AWAITING_SHIPPING / DELIVERING / SUCCESS / FAILED / RETURNED | Chỉnh sửa thông tin đơn hàng | **Bị chặn.** Không được chỉnh sửa đơn hàng ở các trạng thái này. |
| **Admin (Checker)** | PENDING_APPROVAL | Phê duyệt (Approve) đơn hàng | Chuyển đơn sang `AWAITING_SHIPPING`, trừ kho, gọi API 247Express, gửi SMS cho khách. |
| **Admin (Checker)** | PENDING_APPROVAL | Từ chối (Reject) đơn hàng | Chuyển đơn sang `REJECTED`, yêu cầu nhập lý do từ chối duyệt, giải phóng kho tạm giữ. |
| **Thủ kho** | AWAITING_SHIPPING | In phiếu xuất kho & nhãn dán | In thông tin vị trí xuất kệ kho và nhãn vận đơn để dán gói hàng. |
| **Kế toán** | SUCCESS | Phát hành hóa đơn VAT | Ghi nhận hóa đơn và ghi nhận công nợ đơn hàng. |

### 6.3 State Transitions

#### Đơn hàng (Order Entity)
`PENDING_APPROVAL` → `AWAITING_SHIPPING` → `DELIVERING` → `SUCCESS` hoặc `FAILED` → `RETURNED` (nếu hoàn trả).
`PENDING_APPROVAL` → `REJECTED` (Trạng thái cuối, bị khóa).

| Entity | Từ | Sang | Trigger | Quay lại được? |
|--------|------|----|---------|-------------|
| **Order** | `PENDING_APPROVAL` | `AWAITING_SHIPPING` | Admin nhấn Phê duyệt (đơn thủ công) hoặc VietMec tự động đồng bộ đơn hàng. | Không |
| **Order** | `PENDING_APPROVAL` | `REJECTED` | Admin nhấn Từ chối duyệt và nhập lý do từ chối. | Không (Bị khóa vĩnh viễn) |
| **Order** | `AWAITING_SHIPPING` | `DELIVERING` | Bưu tá 247Express quét mã nhận hàng (Webhook báo trạng thái). | Không |
| **Order** | `DELIVERING` | `SUCCESS` | Giao hàng thành công (Webhook từ 247Express). | Không |
| **Order** | `DELIVERING` | `FAILED` | Giao hàng thất bại lần 1 (Webhook từ 247Express). | Có (Khi Sales nhấn [Yêu cầu Giao lại]) |
| **Order** | `FAILED` | `RETURNED` | Sales nhấn [Xác nhận Hoàn Hàng] sau khi đơn giao lỗi. | Không |

#### Tồn kho (Product Inventory Entity)
`Khả dụng` → `Tạm giữ (Hold 10 phút)` → `Trừ kho thực tế` → `Hoàn trả lại kho thực tế` (nếu đơn hủy/hoàn).

| Entity | Từ | Sang | Trigger | Quay lại được? |
|--------|------|----|---------|-------------|
| **Inventory** | Khả dụng | Tạm giữ (Hold) | Khách bắt đầu thanh toán trên VietMec hoặc Sales gửi duyệt đơn thủ công. | Có (Giải phóng sau 10 phút nếu không thanh toán hoặc khi Admin Reject đơn) |
| **Inventory** | Tạm giữ (Hold) | Trừ kho thực tế | Đơn chuyển sang trạng thái `AWAITING_SHIPPING` (Admin duyệt/Web sync thành công). | Có (Chỉ cộng lại khi đơn bị chuyển hoàn `RETURNED`) |
| **Inventory** | Trừ kho thực tế | Đã xuất kho | Thủ kho dán nhãn và bàn giao gói hàng cho bưu tá 247Express. | Có (Cộng lại kho khi trạng thái đơn đổi thành `RETURNED`) |

### 6.4 Interrupted Transactions

| Tình huống | Hệ thống còn lại gì | Resume (Khôi phục) | Cleanup (Giải phóng) |
|---|---|---|---|
| **Khách hàng không thanh toán hoặc tắt trình duyệt (Quá hạn 10 phút)** | Sản phẩm bị khóa tạm thời trong bảng giữ kho (Hold Stock). | Không áp dụng. | Hết 10 phút, Cron job tự động xóa bản ghi hold, cộng lại số lượng vào tồn khả dụng. Website VietMec hiện cảnh báo hết giờ và chuyển hướng khách về trang chủ. |
| **Admin từ chối duyệt đơn hàng thủ công** | Đơn hàng ở trạng thái `REJECTED`, sản phẩm vẫn đang bị tạm giữ. | Sales nhận thông báo lỗi, không được sửa đơn cũ, bắt buộc tạo đơn mới. | Hệ thống tự động xóa bản ghi giữ kho, cộng lại sản phẩm về vị trí kệ kho xuất ban đầu. |
| **Gọi API 247Express bị lỗi đường truyền/timeout** | Đơn hàng ở trạng thái `AWAITING_SHIPPING` nhưng trạng thái vận chuyển là `COURIER_FAILED`. Tồn kho đã trừ. | Hệ thống lưu trữ đơn hàng, hiển thị nút **[Thử lại gửi API]** cho Sales. | Sales nhấn gửi lại API thủ công sau khi hệ thống 247Express phục hồi kết nối. |
| **Cổng gửi tin nhắn SMS Brandname bị lỗi** | Đơn hàng chuyển sang trạng thái mới nhưng lịch sử thông báo ghi trạng thái gửi SMS `FAILED`. | Hệ thống ghi nhận log lỗi gửi SMS, hiển thị nút **[Gửi lại SMS]** cho Sales. | Sales kiểm tra lại số điện thoại khách hàng và bấm gửi lại tin nhắn thủ công. |
| **Xung đột sửa và duyệt đồng thời** | Bản ghi đơn hàng vẫn giữ nguyên phiên bản cũ trong DB. | Giao dịch đồng thời bị chặn và rollback, hiển thị thông báo lỗi. | Yêu cầu người dùng tải lại trang (F5) để cập nhật thông tin mới nhất. |

### 6.5 Other Edge Cases

* **Giao hàng thất bại:** Hệ thống không hỗ trợ giao hàng/hoàn hàng một phần. Khách hàng chỉ có thể nhận toàn bộ đơn hàng (`SUCCESS`) hoặc hoàn trả toàn bộ (`RETURNED`). Khi chuyển hoàn (`RETURNED`), hệ thống tự động cộng lại toàn bộ số lượng vào kho thực tế tại vị trí cũ.
* **Lệch công nợ COD đối soát:** Nếu chênh lệch tiền COD thực nhận từ 247Express so với hóa đơn > 0 đ, đơn hàng chuyển sang trạng thái `Reconciliation Discrepancy` (Lệch đối soát), gắn cờ cảnh báo đỏ và khóa tính năng tất toán tự động để kế toán xử lý thủ công.

## 7. Validation, Limits & Wording

### 7.1 Validation rules

| Field | Rule |
|---|---|
| **Số điện thoại nhận** | Định dạng số điện thoại di động Việt Nam gồm đúng 10 chữ số, bắt đầu bằng đầu số `0` (ví dụ: `0901234567`). |
| **Địa chỉ nhận** | Chuẩn hóa thông qua bộ chọn Tỉnh/Thành, Quận/Huyện, Phường/Xã có sẵn. Địa chỉ chi tiết bắt buộc nhập. |
| **Dung lượng file CO/CQ** | Kích thước file ≤ 5MB. Định dạng hỗ trợ: PDF, PNG, JPG. Tùy chọn (không bắt buộc). |
| **Lý do từ chối duyệt đơn** | Bắt buộc nhập lý do từ chối duyệt khi Admin bấm Từ chối đơn hàng. Lý do phải dài từ 10 đến 200 ký tự. |

### 7.2 Limits & Quotas (exact values)

| Tham số | Giá trị | Window | Behavior khi vượt |
|---|---|---|---|
| **Thời gian tạm giữ kho** | 10 phút | Mỗi phiên giao dịch thanh toán | Hủy giữ kho, cộng lại sản phẩm khả dụng, Website VietMec hiện popup thông báo và redirect về trang chủ. |
| **Thời gian xuất hóa đơn VAT** | 24 giờ | Kể từ khi đơn chuyển sang `SUCCESS` | Gắn cờ cảnh báo quá hạn xuất hóa đơn (chữ đỏ), gửi cảnh báo qua email hàng ngày cho Kế toán. |
| **Số lần giao lại tối đa** | 2 lần | Mỗi đơn hàng giao lỗi | Nếu giao thất bại lần 2, hệ thống tự động chuyển đơn sang trạng thái yêu cầu chuyển hoàn. |

### 7.3 Wording samples (exact strings)

#### Error messages

| Tình huống | Wording | Code |
|---|---|---|
| Giao dịch đồng thời bị chặn | "Đơn hàng đã được duyệt hoặc thay đổi bởi người khác. Vui lòng tải lại trang." | E-ORDER-001 |
| Sửa đơn không ở Chờ duyệt | "Đơn hàng đã được duyệt hoặc từ chối (REJECTED). Không được phép chỉnh sửa. Hãy tạo đơn mới!" | E-ORDER-002 |
| Tải file CO/CQ quá lớn | "Dung lượng tệp đính kèm vượt quá giới hạn 5MB. Vui lòng chọn tệp nhỏ hơn." | E-INV-001 |
| Gọi API 247Express thất bại | "Lỗi kết nối tới đối tác 247Express. Thông tin vận đơn chưa được đồng bộ." | E-COURIER-001 |
| Gửi SMS Brandname thất bại | "Không thể gửi tin nhắn SMS tới số điện thoại khách hàng. Vui lòng kiểm tra lại kết nối." | E-SMS-001 |

#### Success messages

| Tình huống | Wording |
|---|---|
| Lưu chỉnh sửa thành công | "Cập nhật thông tin đơn hàng chờ duyệt thành công." |
| Admin phê duyệt thành công | "Đơn hàng đã được phê duyệt thành công và chuyển sang trạng thái chờ giao." |
| Admin từ chối thành công | "Đơn hàng đã bị từ chối duyệt. Đã giải phóng số lượng tồn kho khả dụng." |

#### Info / neutral messages

| Tình huống | Wording |
|---|---|
| Giữ kho thanh toán hết hạn | "Hết thời gian thanh toán chờ giữ hàng. Bạn sẽ được chuyển hướng về trang chủ." |

## 8. Assumptions

* Đối tác vận chuyển 247Express cung cấp API tạo đơn, tracking trạng thái ổn định và hỗ trợ cơ chế Webhook trả dữ liệu thời gian thực.
* Cổng kết nối SMS Brandname đã được đăng ký và hoạt động ổn định cho các đầu số mạng di động tại Việt Nam.
* Sơ đồ vị trí và cách định vị sản phẩm (kệ/hàng/ô) trong kho hàng đã được thiết lập đồng bộ từ trước.

## 9. Risks

| Rủi ro | Khả năng | Hậu quả nghiệp vụ | Cách phòng |
|---|---|---|---|
| **Sales nhập sai thông tin giao hàng khi tạo tay** | Thường xuyên | Đơn hàng không giao được, phát sinh phí ship 2 đầu và tăng tỷ lệ hoàn hàng. | Chuẩn hóa địa chỉ thông qua dropdown Tỉnh/Thành/Quận/Phường, validate SĐT 10 số. |
| **Lệch tồn kho thực tế so với hệ thống** | Hiếm gặp | Đơn hàng được phê duyệt nhưng thực tế kho đã hết hàng dẫn đến treo đơn, hủy đơn. | Hỗ trợ tính năng điều chỉnh kho vật lý định kỳ (Stock Adjustment) và đối chiếu tồn kho kệ. |
| **Đối tác vận chuyển 247Express gián đoạn dịch vụ diện rộng** | Hiếm gặp | Hàng hóa bị ứ đọng tại kho, trễ hạn giao hàng cam kết với khách hàng. | Thiết kế module tích hợp đa nhà vận chuyển, hỗ trợ cấu hình chuyển sang đối tác vận phòng (như Viettel Post). |
| **Kế toán bị quá tải đối soát COD cuối tháng** | Thỉnh thoảng | Trễ báo cáo tài chính và tất toán công nợ đối tác, khó phát hiện chênh lệch sớm. | Hệ thống chạy đối soát tự động định kỳ hàng tuần, chỉ cảnh báo các đơn lệch để xử lý thủ công sớm. |

## 10. Success Criteria (preliminary)

* 100% đơn đặt hàng từ website VietMec được đồng bộ và đẩy sang đối tác 247Express tự động không cần can thiệp tay của Sales.
* Tỷ lệ lỗi lệch tồn kho do overselling tại website VietMec giảm về 0% nhờ cơ chế Stock Lock.
* Thời gian chuẩn bị hàng, in phiếu và dán nhãn vận đơn của Thủ kho dưới 5 phút cho mỗi đơn hàng.
* Thời gian Kế toán phát hành hóa đơn VAT cho các đơn giao thành công nằm trong phạm vi 24 giờ đạt > 98%.

## 11. Open Questions

* **OQ-1:** Tài liệu đặc tả API và cơ chế Webhook của đối tác 247Express cần được cung cấp chi tiết để phục vụ bước SRS.
* **OQ-2:** Lựa chọn nhà cung cấp dịch vụ SMS Brandname cụ thể (eSMS, Twilio, VietGuys, v.v.) và phí duy trì.
* **OQ-3:** Quy tắc tự động phân bổ/phân công đơn hàng từ VietMec cho các Sales (Round Robin hay theo khu vực địa lý cụ thể)?

## 12. Next Steps

Sau brainstorm này (sau khi BA approve):
* `/urd order-tracking` — Khảo sát và ghi nhận yêu cầu người dùng chi tiết.
* `/brd order-tracking` — Xây dựng tài liệu yêu cầu nghiệp vụ chi tiết.
* `/prd order-tracking` — Định hình phạm vi tính năng sản phẩm cụ thể trước khi lập SRS.
