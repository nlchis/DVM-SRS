---
type: spec
feature: order-tracking
status: approved
created: 2026-07-02
updated: 2026-07-02
owner: "@nlchis"
changelog:
  - date: 2026-07-02
    author: "@nlchis"
    note: "Khởi tạo tài liệu đặc tả FR, NFR, BR, VR, STR và mã lỗi hệ thống lần đầu cho phân hệ theo dõi đơn hàng."
---

# Đặc Tả Yêu Cầu Chức Năng (FR), Phi Chức Năng (NFR) & Quy Tắc Nghiệp Vụ - Theo Dõi Đơn Hàng

Tài liệu đặc tả các yêu cầu phần mềm chi tiết cho phân hệ Theo dõi Đơn hàng (Order Tracking System) thuộc dự án VietMec.

## 1. Yêu cầu Chức năng (Functional Requirements - FR)

Dưới đây là danh sách các yêu cầu chức năng cốt lõi của hệ thống:

| ID | Tên yêu cầu chức năng | Mô tả nghiệp vụ | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| **FR-order-tracking-001** | Đồng bộ đơn hàng từ Website VietMec | Hệ thống tự động nhận và lưu dữ liệu đơn hàng từ Website VietMec ngay khi khách đặt hàng thành công (mặc định hình thức thanh toán SHIP COD, tự động gửi SMS) qua cổng kết nối API đồng bộ. | P0 |
| **FR-order-tracking-002** | Tạo đơn hàng thủ công | Cho phép nhân viên Sales tạo mới đơn hàng B2B/Offline trực tiếp trên Portal thông qua Form nhập liệu, hỗ trợ đính kèm CO/CQ tùy chọn. | P0 |
| **FR-order-tracking-003** | Phê duyệt đơn hàng thủ công | Cung cấp giao diện và tính năng cho Admin phê duyệt các đơn hàng thủ công Chờ Duyệt sang trạng thái Chờ Giao. | P0 |
| **FR-order-tracking-004** | Từ chối đơn hàng thủ công | Cho phép Admin từ chối phê duyệt đơn thủ công, yêu cầu nhập lý do và tự động khóa đơn hàng ở trạng thái **Từ Chối Duyệt**. | P0 |
| **FR-order-tracking-005** | Chỉnh sửa đơn Chờ Duyệt | Cho phép nhân viên Sales sửa đổi thông tin đơn hàng khi đơn đang ở trạng thái Chờ Duyệt (**Chờ Phê Duyệt**). | P0 |
| **FR-order-tracking-006** | In chứng từ và nhãn vận đơn | Hỗ trợ Thủ kho in Phiếu xuất kho (kèm vị trí kệ) và in nhãn dán vận đơn của 247Express để dán lên kiện hàng thực tế. | P0 |
| **FR-order-tracking-007** | Đồng bộ hành trình từ 247Express | Tự động cập nhật hành trình và trạng thái giao hàng từ đối tác 247Express thông qua Webhook (hoặc Polling cron job). | P0 |
| **FR-order-tracking-008** | Gửi SMS tự động cho khách hàng | Tự động gửi SMS Brandname thông báo đặt hàng thành công, đang giao hàng, và giao hàng thành công tới số điện thoại của người nhận. | P0 |
| **FR-order-tracking-009** | Gửi cảnh báo Telegram Group | Tự động gửi tin nhắn cảnh báo sự cố giao lỗi hoặc hành trình cập nhật tới group Telegram của bộ phận Sales phụ trách. | P0 |
| **FR-order-tracking-010** | Điều phối xử lý giao lỗi | Cung cấp tính năng cho Sales nhấn yêu cầu Giao lại lần 2 hoặc Xác nhận Hoàn hàng trên trang chi tiết đơn hàng giao lỗi. | P0 |
| **FR-order-tracking-011** | Xuất hóa đơn VAT | Cho phép Kế toán thực hiện phát hành và lưu trữ hóa đơn VAT cho các đơn hàng giao thành công. | P0 |
| **FR-order-tracking-012** | Đối soát COD bán tự động | Cho phép Kế toán tải lên (nạp) thủ công tệp đối soát Excel từ đối tác vận chuyển, hệ thống tự động so khớp chênh lệch số tiền COD thực thu để tất toán công nợ. | P0 |
| **FR-order-tracking-013** | Nhập bổ sung tồn kho | Cho phép Thủ kho thực hiện nhập bổ sung số lượng tồn kho khả dụng trực tiếp cho từng sản phẩm trên Portal nội bộ. | P0 |

## 2. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)

| ID | Phân loại | Chỉ số kiểm chứng chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| **NFR-order-tracking-001** | Hiệu năng | API đồng bộ đơn hàng từ website VietMec sang Portal nội bộ phải phản hồi trong thời gian ≤ 2 giây ở điều kiện tải thông thường. | P0 |
| **NFR-order-tracking-002** | Bảo mật | Tất cả các kết nối truyền nhận thông tin API (VietMec, 247Express, SMS Brandname) bắt buộc phải sử dụng mã hóa truyền tải HTTPS/TLS 1.2 trở lên. | P0 |


## 3. Quy tắc Nghiệp vụ (Business Rules - BR)

| ID | Tên quy tắc nghiệp vụ | Mô tả chính sách chi tiết |
| :--- | :--- | :--- |
| **BR-order-tracking-001** | Tự động phân công Sales | Đơn hàng đồng bộ từ website VietMec sẽ tự động được phân bổ cho Sales phụ trách dựa trên tỉnh thành người nhận hoặc phân chia xoay vòng (Round Robin). |
| **BR-order-tracking-002** | Maker/Checker chọn lọc | Chỉ đơn hàng tạo thủ công bởi Sales mới cần qua bước phê duyệt của Admin. Đơn hàng từ website VietMec được khách hàng đặt hàng thành công (hình thức thanh toán mặc định là SHIP COD) sẽ bỏ qua bước duyệt và tự động chuyển sang trạng thái **Chờ Giao Hàng** để xuất kho. |
| **BR-order-tracking-004** | Quyền hạn Checker (Admin) | Ở trạng thái **Chờ Phê Duyệt**, Admin có quyền bấm Phê duyệt (chuyển sang **Chờ Giao Hàng**) hoặc Từ chối (yêu cầu nhập lý do từ chối, chuyển đơn sang **Từ Chối Duyệt**). |
| **BR-order-tracking-005** | Hạn chế quyền sửa của Sales | Bất kỳ nhân viên Sales nào (quyền Maker) cũng được phép chỉnh sửa thông tin đơn hàng khi đơn đang ở trạng thái **Chờ Phê Duyệt**. Giao diện Portal sẽ tự động vô hiệu hóa (disable) nút chỉnh sửa đối với các đơn đã được duyệt hoặc bị từ chối duyệt để ngăn chặn sửa đổi trái phép. |
| **BR-order-tracking-006** | Kiểm soát thao tác đồng thời | Hệ thống kiểm tra phiên bản dữ liệu (Optimistic Locking) trước khi lưu. Nếu Admin duyệt đơn đúng lúc Sales đang lưu sửa, yêu cầu nào gửi lên sau sẽ bị hệ thống chặn và yêu cầu tải lại trang. |
| **BR-order-tracking-007** | Hình thức thanh toán mặc định | Tất cả các đơn hàng (bao gồm đồng bộ tự động từ Web và tạo thủ công) mặc định sử dụng duy nhất hình thức thanh toán SHIP COD (Thanh toán khi nhận hàng) qua hãng vận chuyển. |
| **BR-order-tracking-008** | Tạm giữ tồn kho (Stock Lock) | Đối với đơn hàng đồng bộ từ website VietMec (thanh toán SHIP COD), hệ thống không thực hiện khóa giữ tồn kho tạm thời mà tiến hành khấu trừ trực tiếp tồn kho thực tế và gán vị trí xuất kho dự kiến khi đơn chuyển sang **Chờ Giao Hàng**. |
| **BR-order-tracking-009** | Khấu trừ tồn kho thực tế | Khi đơn hàng sang **Chờ Giao Hàng** (Admin duyệt xong hoặc đơn web đồng bộ thành công), hệ thống tự động trừ tồn kho thực tế và gán vị trí xuất kho dự kiến theo kệ/ô. |
| **BR-order-tracking-010** | Cộng lại tồn kho hoàn trả | Khi trạng thái đơn hàng cập nhật thành **Chờ Hoàn Hàng** (Đã hoàn hàng về kho), hệ thống tự động cộng lại số lượng sản phẩm vào tồn kho thực tế tại đúng vị trí xuất kho ban đầu. |
| **BR-order-tracking-011** | Kích hoạt gọi API 247Express | Ngay khi đơn hàng chuyển sang trạng thái **Chờ Giao Hàng**, hệ thống tự động gọi API 247Express để khởi tạo đơn vận chuyển vật lý và lấy mã vận đơn (Tracking ID). |
| **BR-order-tracking-012** | Nghiệp vụ đóng gói Thủ kho | Sau khi đơn có mã vận đơn, Thủ kho in Phiếu xuất kho (chứa vị trí kệ), đóng gói vật lý, in nhãn dán vận đơn 247Express dán lên kiện hàng trước khi bàn giao bưu tá. |
| **BR-order-tracking-013** | Quy tắc gửi SMS Đặt hàng | Gửi SMS đặt hàng thành công cho khách ngay khi đơn web được tạo (do duyệt tự động), và chỉ gửi đối với đơn tạo tay sau khi Admin đã bấm phê duyệt. |
| **BR-order-tracking-014** | Chống trùng lặp thông báo | Hệ thống kiểm tra nhật ký gửi thông báo trước khi gửi SMS/Telegram để đảm bảo mỗi bước thay đổi trạng thái đơn hàng chỉ gửi thông báo duy nhất một lần. |
| **BR-order-tracking-015** | Giao nhận nhị phân | Hệ thống không hỗ trợ giao hàng/hoàn hàng một phần. Khách hàng chỉ có thể nhận toàn bộ đơn hàng (**Giao Thành Công**) hoặc hoàn trả toàn bộ (**Chờ Hoàn Hàng**). |
| **BR-order-tracking-017** | Hạn mức lệch đối soát | Nếu số tiền COD thực thu lệch so với tiền hàng trên hóa đơn > 0 đ, đơn hàng tự động chuyển sang trạng thái `Reconciliation Discrepancy` (Lệch đối soát), gắn cờ cảnh báo đỏ và khóa tính năng tất toán tự động. |
| **BR-order-tracking-018** | Tự động tạo Phiếu đặt hàng | Ngay khi đơn hàng chuyển sang **Chờ Giao Hàng**, hệ thống tự động tạo tệp Phiếu đặt hàng (Purchase Order) dạng PDF/HTML và lưu trữ trên Portal nội bộ làm chứng từ đối chiếu cho Kế toán. |
| **BR-order-tracking-019** | Nhập bổ sung tồn kho thủ công | Khi Thủ kho nhập bổ sung tồn kho, số lượng mới phải > 0, được cộng dồn vào tồn kho khả dụng, và hệ thống tự động ghi nhật ký giao dịch kho (Audit Log). |

## 5. Quy tắc Chuyển Đổi Trạng Thái (State Transition Rules - STR)

### 5.1 STR-order-tracking-001: Chu kỳ vòng đời Đơn hàng (Order Entity)

| Trạng thái ban đầu | Sự kiện kích hoạt (Trigger) | Trạng thái tiếp theo | Thực thể bị ảnh hưởng | Hành vi hệ thống đi kèm |
| :--- | :--- | :--- | :--- | :--- |
| (Khởi tạo) | Khách đặt hàng từ VietMec | **Chờ Giao Hàng** | Đơn hàng | Tự động gán Sales phụ trách, trừ kho thực tế, gán vị trí xuất kho, sinh Phiếu đặt hàng (PO) lưu nội bộ, gửi SMS xác nhận cho khách, gọi API 247Express lấy mã vận đơn. |
| (Khởi tạo) | Sales tạo đơn thủ công trên Portal | **Chờ Phê Duyệt** | Đơn hàng | Tạm giữ hàng trong kho khả dụng. Không gửi SMS cho khách. |
| **Chờ Phê Duyệt** | Sales lưu chỉnh sửa đơn hàng | **Chờ Phê Duyệt** | Đơn hàng | Lưu cập nhật thông tin đơn, cập nhật số lượng tạm giữ kho khả dụng nếu có thay đổi. |
| **Chờ Phê Duyệt** | Admin nhấn Phê duyệt (Approve) | **Chờ Giao Hàng** | Đơn hàng | Trừ kho thực tế, gán vị trí xuất, gửi SMS xác nhận cho khách, sinh Phiếu đặt hàng (PO), gọi API 247Express lấy mã vận đơn. |
| **Chờ Phê Duyệt** | Admin nhấn Từ chối (Reject) | **Từ Chối Duyệt** | Đơn hàng | Hủy tạm giữ kho khả dụng, yêu cầu nhập lý do từ chối duyệt, thông báo cho Sales phụ trách. |
| **Chờ Giao Hàng** | Bưu tá 247Express quét mã nhận hàng | **Đang Giao Hàng** | Đơn hàng | Cập nhật trạng thái thông qua Webhook, gửi SMS "Đang giao hàng" cho khách, gửi thông báo Telegram cho Sales. |
| **Đang Giao Hàng** | Giao hàng thành công hoàn toàn | **Giao Thành Công** | Đơn hàng | Cập nhật trạng thái đơn, gửi SMS "Giao thành công", báo Telegram, mở tính năng xuất hóa đơn cho Kế toán. |
| **Đang Giao Hàng** | Giao hàng thất bại lần 1 | **Giao Thất Bại** | Đơn hàng | Cập nhật trạng thái đơn, lưu lý do thất bại từ bưu tá, bắn Telegram khẩn cấp kèm link xử lý cho Sales. |
| **Giao Thất Bại** | Sales bấm [Yêu cầu Giao Lại] | **Đang Giao Hàng** | Đơn hàng | Gọi API giao lại lần 2 sang 247Express. |
| **Giao Thất Bại** | Sales bấm [Xác nhận Hoàn Hàng] | **Chờ Hoàn Hàng** | Đơn hàng | Gọi API chuyển hoàn sang 247Express để bưu tá chuyển trả hàng về kho. |
| **Chờ Hoàn Hàng** | Đối tác hoàn trả hàng thành công về kho | **Đã Hoàn Hàng** | Đơn hàng | Hệ thống cập nhật trạng thái đơn, giải phóng liên kết kệ và tự động cộng dồn lại số lượng sản phẩm vào tồn kho thực tế tại vị trí kệ kho cũ. |

### 5.2 STR-order-tracking-002: Chu kỳ trạng thái Tồn kho (Inventory Entity)

| Trạng thái ban đầu | Sự kiện kích hoạt (Trigger) | Trạng thái tiếp theo | Thực thể bị ảnh hưởng | Hành vi hệ thống đi kèm |
| :--- | :--- | :--- | :--- | :--- |
| `Khả dụng` | Sales tạo đơn hàng thủ công trên Portal | `Tạm giữ (Hold)` | Sản phẩm | Khóa số lượng sản phẩm trong kho khả dụng cho đơn hàng đó. |
| `Khả dụng` | Đơn hàng từ Web VietMec đồng bộ thành công | `Trừ kho thực tế` | Sản phẩm | Khấu trừ trực tiếp số lượng thực tế trong kho, gán vị trí kệ kho xuất dự kiến. |
| `Tạm giữ (Hold)` | Admin từ chối duyệt đơn hàng thủ công | `Khả dụng` | Sản phẩm | Giải phóng số lượng tạm giữ, cộng lại số lượng vào tồn kho khả dụng. |
| `Tạm giữ (Hold)` | Admin duyệt đơn hàng thủ công | `Trừ kho thực tế` | Sản phẩm | Trừ số lượng thực tế trong kho, gán vị trí kệ kho xuất dự kiến. |
| `Trừ kho thực tế` | Đơn hàng chuyển sang trạng thái **Đã Hoàn Hàng** | `Khả dụng` | Sản phẩm | Cộng lại số lượng sản phẩm vào tồn kho thực tế tại vị trí kệ kho xuất cũ. |

## 6. Bảng Mã lỗi Nghiệp vụ (Errors - E)

| Mã lỗi | Tên lỗi | Điều kiện xuất hiện | Câu thông báo phản hồi (Wording) |
| :--- | :--- | :--- | :--- |
| **E-order-tracking-001** | Xung đột thao tác đồng thời | Admin duyệt/từ chối đúng lúc Sales lưu chỉnh sửa đơn hàng (phiên bản dữ liệu không khớp). | "Đơn hàng đã được duyệt hoặc thay đổi bởi người khác. Vui lòng tải lại trang." |
| **E-order-tracking-004** | API 247Express lỗi kết nối | Mạng lỗi hoặc API của đối tác 247Express gặp sự cố sập nguồn/timeout. | "Lỗi kết nối tới đối tác 247Express. Thông tin vận đơn chưa được đồng bộ." |
| **E-order-tracking-005** | SMS Brandname gửi thất bại | Nhà mạng gặp sự cố nghẽn mạng hoặc sai cấu hình số Brandname. | "Không thể gửi tin nhắn SMS tới số điện thoại khách hàng. Vui lòng kiểm tra lại kết nối." |
