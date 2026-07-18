---
type: spec
feature: order-tracking
status: approved
created: 2026-07-02
updated: 2026-07-16
owner: "@nlchis"
changelog:
  - date: 2026-07-16
    author: "System"
    note: "Bổ sung quản lý Hợp đồng, Khách hàng, Yêu cầu giao hàng. Cập nhật luồng hoàn hàng và tự động cập nhật số lượng."
---

# Đặc Tả Yêu Cầu Chức Năng (FR), Phi Chức Năng (NFR) & Quy Tắc Nghiệp Vụ - Theo Dõi Đơn Hàng B2B

## 1. Mô hình Dữ liệu (Data Models)

Hệ thống quản lý chuỗi cung ứng B2B dựa trên 4 thực thể (Entities) liên kết chặt chẽ:
1. **Khách hàng (Customer)**: (1:N với Hợp đồng). Lưu Tên, SĐT, Địa chỉ, MST, Email.
2. **Hợp đồng & Phụ lục (Contract & Addendum)**: (1:N với Yêu cầu). Lưu Danh sách SP, Số lượng yêu cầu, **Số lượng đã giao**. Trạng thái: Còn hiệu lực / Hết hiệu lực. Có Phụ lục để nới số lượng.
3. **Yêu cầu giao hàng (Delivery Request)**: (1:N với Đơn giao hàng). Lưu Danh sách SP đợt này. Có 2 thông số: **Số lượng yêu cầu** và **Số lượng đã giao thực tế**. Trạng thái: Chờ xử lý / Hoàn thành / Đã hủy.
4. **Đơn giao hàng (Delivery Order)**: Tham chiếu Yêu cầu giao hàng. Có **Số lượng hoàn lại**, **Lý do hoàn** và **Phí vận chuyển hoàn**. Bắt buộc có Hóa đơn.

---

## 2. Yêu cầu Chức năng (Functional Requirements - FR)

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

## 3. Quy tắc Nghiệp vụ (Business Rules - BR)

| ID | Tên quy tắc nghiệp vụ | Mô tả chính sách chi tiết |
| :--- | :--- | :--- |
| **BR-contract-001** | Trạng thái Hợp đồng | Chỉ có **Còn hiệu lực** và **Hết hiệu lực**. Do Sales tự quyết định. |
| **BR-contract-002** | Ghi nhận số lượng Hợp đồng | Số lượng "đã giao" của Hợp đồng CHỈ được cộng dồn khi Yêu cầu giao hàng của đợt đó đạt trạng thái **Hoàn thành**. |
| **BR-delivery-001** | Hủy Yêu cầu giao hàng | Chỉ cho phép Admin hủy nếu Yêu cầu chưa có Đơn giao hàng nào, hoặc tất cả các đơn đều đang ở trạng thái Từ chối / Đã chuyển hoàn / Đã hủy. Báo lỗi "Yêu cầu hủy đơn giao hàng trước" nếu vi phạm. |
| **BR-delivery-002** | Trạng thái Yêu cầu giao hàng | Hệ thống tự tính toán dựa trên Đơn giao hàng: Nếu *SL đã giao thực tế* < *SL yêu cầu* -> **Chờ xử lý**. Nếu *SL đã giao thực tế* = *SL yêu cầu* -> **Hoàn thành**. |
| **BR-delivery-003** | Ghi nhận số lượng Yêu cầu | Số lượng "đã giao thực tế" của Yêu cầu giao hàng CHỈ tăng lên khi một Đơn giao hàng đạt trạng thái **Phát thành công**. |
| **BR-delivery-004** | Auto Refund Số lượng (Hoàn) | Khi 1 Đơn bị chuyển thành **Từ chối** hoặc **Đã chuyển hoàn**, hệ thống lập tức trừ đi số lượng của đơn đó khỏi Yêu cầu giao hàng. Điều này có thể làm Yêu cầu giao hàng bị lùi trạng thái từ Hoàn thành về Chờ xử lý. |
| **BR-order-tracking-005** | Hạn chế quyền sửa của Sales | Sales có quyền sửa đơn khi ở trạng thái **Chờ Duyệt**. Đơn bị Khóa (Disable) nút sửa nếu đã được duyệt hoặc từ chối. |
| **BR-order-tracking-007** | Phí Vận Chuyển | Chi phí vận chuyển đi do Công ty chi trả. Khi phát sinh hoàn hàng do Khách yêu cầu, hệ thống tự cộng thêm **Phí vận chuyển hoàn** vào đơn hàng để Kế toán theo dõi. |
| **BR-order-tracking-009** | Khấu trừ tồn kho tự động | Sinh Bản ghi Xuất kho (Chờ duyệt). Trừ tồn kho thực tế diễn ra khi bản ghi chuyển sang Đã duyệt (lúc đơn chuyển sang Đã lấy hàng). |
| **BR-order-tracking-010** | Không tự động cộng tồn kho | Khi Đơn hàng chuyển sang **Đã chuyển hoàn**, hệ thống KHÔNG tự động cộng lại tồn kho. Thủ kho phải tự tạo Bản ghi Nhập kho thủ công (Maker/Checker). |
| **BR-order-tracking-016** | Hoàn trả tạm giữ kho | Khi bản ghi Xuất kho thủ công (Chờ duyệt) bị Quản lý kho Từ chối, hệ thống phải hoàn trả lại số lượng tồn kho khả dụng đã tạm giữ trước đó. |
| **BR-order-tracking-015** | Hoàn hàng 1 phần | Nút [Hoàn hàng] chỉ được mở (enabled) khi đơn ở trạng thái **Phát thành công**. Không tạo đơn hàng mới. Mọi cập nhật trạng thái vòng Hoàn hàng (Chờ chuyển hoàn -> Đã chuyển hoàn) sẽ ghi đè lên đơn hiện tại nhưng lưu giữ song song lịch sử tracking cũ. |

---

## 4. Quy tắc Chuyển Đổi Trạng Thái (State Transition Rules - STR)

### 4.1 STR-001: Chu kỳ Đơn giao hàng (Order Entity)

| Trạng thái ban đầu | Sự kiện kích hoạt (Trigger) | Trạng thái tiếp theo | Hành vi hệ thống đi kèm |
| :--- | :--- | :--- | :--- |
| (Khởi tạo) | Sales tạo đơn từ Yêu cầu | **Chờ Duyệt** | Tạm giữ hàng. |
| **Chờ Duyệt** | Admin nhấn Từ chối (Reject) | **Từ Chối** | Hủy tạm giữ kho. Auto Refund (Nhả hạn mức cho Yêu cầu giao hàng). |
| **Chờ Duyệt** | Admin nhấn Phê duyệt (Approve) | **Đã tiếp nhận** | Sinh Bản ghi Xuất kho (Chờ duyệt), tự động in phiếu, gọi API 247Express lấy mã vận đơn. |
| **Đã tiếp nhận** | Sales bấm Hủy đơn | **Hủy** | Bản ghi Xuất kho chuyển sang Hủy. Hủy tạm giữ kho. Nhả hạn mức Yêu cầu giao hàng. |
| **Đã tiếp nhận** | Nhận thông tin [Đã lấy hàng] từ 247 | **Đã lấy hàng** | Bản ghi Xuất kho tự động chuyển sang Đã duyệt. Trừ tồn kho thực tế. |
| **Đã lấy hàng** | Nhận thông tin [Đang vận chuyển] từ 247 | **Đang vận chuyển** | Cập nhật hành trình. |
| **Đang vận chuyển** | Nhận thông tin [Đang đi phát] từ 247 | **Đang đi phát** | Gửi SMS "Đang đi phát hàng" cho khách, gửi Telegram cho Sales. |
| **Đang đi phát** | Nhận thông tin [Chờ xử lý] từ 247 | **Chờ xử lý** | Cập nhật lý do giao thất bại. |
| **Đang đi phát** | Nhận thông tin [Phát thành công] từ 247 | **Phát thành công** | Cộng *Số lượng đã giao* vào Yêu cầu giao hàng. Gửi SMS thành công. |
| **Chờ xử lý** | Nhận thông tin [Đang đi phát] từ 247 (giao lại) | **Đang đi phát** | Ghi nhận lượt giao lại. |
| **Chờ xử lý** | Nhận thông tin [Chờ chuyển hoàn] từ 247 | **Chờ chuyển hoàn** | Ghi nhận hành trình hoàn về kho. |
| **Phát thành công** | Sales bấm [Hoàn hàng 1 phần] | **Chờ chuyển hoàn** | Lưu trữ số lượng hoàn, lý do hoàn. |
| **Chờ chuyển hoàn** | Nhận thông tin [Đã chuyển hoàn] từ 247 | **Đã chuyển hoàn** | Auto Refund trừ *Số lượng đã giao* của Yêu cầu giao hàng. (Thủ kho tự nhập tồn kho). |

### 4.2 STR-002: Chu kỳ Yêu cầu giao hàng (Delivery Request)

| Trạng thái ban đầu | Sự kiện kích hoạt (Trigger) | Trạng thái tiếp theo |
| :--- | :--- | :--- |
| (Khởi tạo) | Admin tạo Yêu cầu mới | **Chờ xử lý** |
| **Chờ xử lý** | Đơn giao hàng của Yêu cầu này đạt Phát thành công, khiến (SL đã giao = SL yêu cầu) | **Hoàn thành** |
| **Hoàn thành** | Đơn giao hàng bị Auto Refund (Từ chối/Đã chuyển hoàn), khiến (SL đã giao < SL yêu cầu) | **Chờ xử lý** |
| **Chờ xử lý** | Admin bấm Hủy yêu cầu (Thỏa mãn Validate) | **Đã hủy** |

---

## 5. Bảng Mã lỗi Nghiệp vụ (Errors - E)

| Mã lỗi | Tên lỗi | Điều kiện xuất hiện | Câu thông báo phản hồi (Wording) |
| :--- | :--- | :--- | :--- |
| **E-delivery-001** | Lỗi Hủy Yêu cầu | Admin bấm hủy nhưng Yêu cầu vẫn còn Đơn giao hàng đang chạy (Chưa Từ chối/Đã chuyển hoàn/Hủy). | "Vui lòng yêu cầu hủy/từ chối các đơn giao hàng trực thuộc trước." |
| **E-order-002** | Lỗi Hạn mức SL | Sales nhập số lượng đơn > Tổng số lượng Yêu cầu giao hàng. | "Số lượng giao vượt quá hạn mức cho phép của Yêu cầu." |
