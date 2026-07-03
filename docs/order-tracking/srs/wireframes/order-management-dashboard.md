---
layout: default
title: Order Management Dashboard Wireframes
status: Approved
date: 2026-07-01
---

# Phác thảo Giao diện (Wireframes): Hệ thống Theo dõi Đơn hàng

Tài liệu này chứa phác thảo giao diện ASCII cho luồng quản lý và theo dõi đơn hàng tích hợp 247Express.

## 1. Màn hình Dashboard Tổng quan

```text
┌────────────────────────────────────────────────────────────┐
│ [Hệ Thống Theo Dõi Đơn]        [User: Admin] [Đăng xuất]   │
├────────────────────────────────────────────────────────────┤
│ TỔNG QUAN HÔM NAY (1/7/2026)             [+ Tạo Đơn Nhanh] │
│                                                            │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│ │ Chờ Giao  │ │ Đang Giao │ │Thành Công │ │ Thất Bại  │ │ Hoàn Hàng │ │
│ │    12     │ │    32     │ │    96     │ │     2     │ │     3     │ │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
│                                                            │
│ TÌNH TRẠNG CHUNG THEO TUẦN (Biểu đồ)                       │
│    100 |   * * *                                           │
│     50 | *       * *                                       │
│      0 |_____________                                      │
│         T2 T3 T4 T5 T6                                     │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Thẻ Thống kê:** Hiển thị màu sắc tương ứng (Xanh dương = Chờ giao, Vàng = Đang giao, Xanh lá = Giao thành công, Đỏ = Thất bại, Đỏ sẫm = Hoàn hàng). Click vào thẻ sẽ điều hướng tới trang Danh sách Đơn hàng với filter tương ứng được tự động áp dụng.
- **Biểu đồ:** Sử dụng bar chart (hoặc line chart) đơn giản để Sales/Admin nắm được xu hướng.

---

## 2. Quản lý Danh sách Đơn hàng

```text
┌────────────────────────────────────────────────────────────┐
│ QUẢN LÝ DANH SÁCH ĐƠN HÀNG                                 │
├────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [ Nhập mã/SĐT...       ]   Trạng thái: [Tất cả v]│
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Mã Đơn    | Khách Hàng      | Trạng thái  | Thao tác   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 247-00123 | Nguyen Van A    | Đang Giao   | [Xem] [In] │ │
│ │ 247-00124 | Tran Thi B      | Thành Công  | [Xem] [In] │ │
│ │ 247-00125 | Le Van C        | Hoàn Hàng(!)| [Xem] [In] │ │
│ └────────────────────────────────────────────────────────┘ │
│ Trang: < 1 2 3 >                                           │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Thanh Tìm kiếm:** Hỗ trợ tìm kiếm realtime (debounce 500ms) theo Mã vận đơn, Tên KH, hoặc Số điện thoại.
- **Bộ lọc Trạng thái:** Hỗ trợ lọc danh sách đơn theo 5 trạng thái: Tất cả, Chờ Giao, Đang Vận Chuyển, Giao Thành Công, Giao Thất Bại, Chờ Hoàn Hàng.
- **Trạng thái (Status Badge):** "Hoàn Hàng" hoặc "Thất bại" cần có icon cảnh báo (Warning Icon) màu đỏ để gây sự chú ý.
- **Phân trang (Pagination):** Mặc định hiển thị 20 dòng/trang để tối ưu không gian hiển thị.

---

## 3. Tạo Đơn Vận Chuyển Mới

```text
┌────────────────────────────────────────────────────────────┐
│ TẠO ĐƠN VẬN CHUYỂN MỚI (Tích hợp 247Express)               │
├────────────────────────────────────────────────────────────┤
│ THÔNG TIN NGƯỜI NHẬN:                                      │
│ Họ Tên (*):  [ Nhập họ và tên người nhận             ]     │
│ SĐT (*):     [ Nhập số điện thoại                    ]     │
│ Địa chỉ (*): [ Nhập địa chỉ chi tiết                 ]     │
│                                                            │
│ THÔNG TIN HÀNG HOÁ:                                        │
│ Tên SP (*):  [ Nhập tên sản phẩm                     ]     │
│ Khối lượng:  [ 1.5 ] kg         Thu Hộ (COD): [ 0 đ  ]     │
│                                                            │
│ TÀI LIỆU ĐÍNH KÈM:                                         │
│ File CO/CQ:  [ Chọn Tệp... ] (Chưa có tệp nào được chọn)   │
│                                                            │
│ [ Hủy Bỏ ]                                [ Xác Nhận Tạo ] │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Validate:** Các trường có dấu `(*)` là bắt buộc. Nút "Xác Nhận Tạo" sẽ bị disable nếu chưa nhập đủ thông tin bắt buộc.
- **SĐT:** Validate số điện thoại định dạng Việt Nam (10 số, bắt đầu bằng 0).
- **Loading State:** Khi nhấn "Xác Nhận Tạo", nút chuyển sang trạng thái Loading (Spinner) và disable toàn bộ form để chờ phản hồi từ API 247Express.

---

## 4. Chi tiết Đơn hàng & Tracking

```text
┌────────────────────────────────────────────────────────────┐
│ CHI TIẾT ĐƠN HÀNG: #247-00123           Trạng thái: ACTIVE │
├────────────────────────────────────────────────────────────┤
│ KHÁCH HÀNG: Nguyen Van A  | SĐT: 090xxxxxxx                │
│ HÀNG HOÁ: Macbook Pro M3  | COD: 0 đ                       │
│ ────────────────────────────────────────────────────────── │
│ LỊCH SỬ TRACKING (Cập nhật từ 247Express)                  │
│ (v) 10:00 - Tạo đơn thành công (Mã vận đơn: 247XYZ123)     │
│ (v) 14:00 - Bưu tá đã lấy hàng                             │
│ ( ) ...   - Đang giao hàng (Chờ cập nhật)                  │
│                                                            │
│ LỊCH SỬ THÔNG BÁO (Notifications)                          │
│ [OK] Gửi SMS Brandname lúc 10:01 cho Khách hàng            │
│ [OK] Bắn cảnh báo Telegram tới group Sales lúc 14:01       │
│                                                            │
│ [ In Phiếu Xuất Kho ]                       [ Quay Lại ]   │
│ └────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Tracking Timeline:** Hiển thị dạng Timeline dọc, tick xanh `(v)` cho các bước đã hoàn tất. Bước hiện tại nhấp nháy hoặc làm nổi bật.
  - *Trạng thái Chờ Giao (Pending):* Chỉ hiển thị mốc "Tạo đơn thành công" (tick xanh), còn mốc "Bưu tá đã lấy hàng" và "Đang giao hàng" hiển thị dạng chờ `( ) ...` và làm mờ chữ.
- **Log Thông báo:** Liệt kê các trạng thái gửi SMS/Telegram để Admin/Sales dễ dàng đối chiếu nếu khách khiếu nại chưa nhận được tin.
  - *Trạng thái Chờ Giao (Pending):* Chỉ có dòng thông báo SMS (gửi lúc tạo đơn), ẩn dòng thông báo Telegram bắn tới group Sales.

---

## 5. Màn hình Tạo Đơn - Trạng thái Lỗi (Validation & API Error)

```text
┌────────────────────────────────────────────────────────────┐
│ TẠO ĐƠN VẬN CHUYỂN MỚI (Tích hợp 247Express)               │
├────────────────────────────────────────────────────────────┤
│ [!] LỖI KẾT NỐI: Không thể kết nối tới API 247Express.     │
│     Đường truyền gián đoạn. [ Thử Lại ]                    │
├────────────────────────────────────────────────────────────┤
│ THÔNG TIN NGƯỜI NHẬN:                                      │
│ Họ Tên (*):  [ Nhập họ và tên người nhận             ]     │
│              [!] Họ tên không được để trống                │
│ SĐT (*):     [ 09012                                 ]     │
│              [!] Số điện thoại phải đủ 10 chữ số           │
│ Địa chỉ (*): [ Nhập địa chỉ chi tiết                 ]     │
│                                                            │
│ THÔNG TIN HÀNG HOÁ:                                        │
│ Tên SP (*):  [ Macbook Pro M3                        ]     │
│ Khối lượng:  [ 0   ] kg         Thu Hộ (COD): [ 0 đ  ]     │
│              [!] Khối lượng phải lớn hơn 0 kg              │
│                                                            │
│ TÀI LIỆU ĐÍNH KÈM:                                         │
│ File CO/CQ:  [ Chọn Tệp... ] (file_co_cq_qua_lon.pdf)      │
│              [!] Dung lượng file vượt quá giới hạn 5MB     │
│                                                            │
│ [ Hủy Bỏ ]                                [ Xác Nhận Tạo ] │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Inline Error Alert:** Hiển thị chữ màu đỏ ngay phía dưới ô nhập liệu bị lỗi, đường viền của ô nhập liệu chuyển sang màu đỏ (Border-Danger).
- **Global Error Banner:** Khi xảy ra lỗi hệ thống hoặc kết nối API ngoài (Timeout 247Express), hiển thị banner đỏ nổi bật trên cùng kèm nút "Thử Lại" (Retry) để kích hoạt gửi lại request mà không làm mất thông tin đã điền.

---

## 6. Màn hình Chi tiết Đơn hàng - Giao Thất Bại & Xử lý Hoàn Hàng

```text
┌────────────────────────────────────────────────────────────┐
│ CHI TIẾT ĐƠN HÀNG: #247-00125        Trạng thái: THẤT BẠI │
├────────────────────────────────────────────────────────────┤
│ [!] CẢNH BÁO: Đơn hàng giao không thành công lần 1.        │
│     Lý do từ bưu tá: "Khách hàng thuê bao không liên lạc   │
│     được khi giao hàng".                                   │
│     [ Yêu cầu Giao Lại (lần 2) ]  [ Xác nhận Hoàn Hàng ]   │
├────────────────────────────────────────────────────────────┤
│ KHÁCH HÀNG: Le Van C      | SĐT: 0933444555                │
│ HÀNG HOÁ: Macbook Pro M3  | COD: 15,000,000 đ              │
│ ────────────────────────────────────────────────────────── │
│ LỊCH SỬ TRACKING (Cập nhật từ 247Express)                  │
│ (v) 08:00 - Bưu tá đã lấy hàng thành công                  │
│ (v) 11:30 - Bưu tá đang đi giao hàng                       │
│ (x) 16:00 - Giao hàng thất bại (Khách không nghe máy)      │
│                                                            │
│ LỊCH SỬ THÔNG BÁO (Notifications)                          │
│ [OK] Bắn cảnh báo Telegram tới group Sales lúc 16:02       │
│ [!] LỖI: Gửi SMS Brandname thất bại (Nhà mạng lỗi) [Gửi lại]│
│                                                            │
│ [ In Phiếu Xuất Kho ]                       [ Quay Lại ]   │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Action Banner:** Khi đơn hàng rơi vào trạng thái cảnh báo ("Giao thất bại", "Chờ hoàn hàng"), Sales/Admin cần có banner hướng dẫn xử lý nổi bật ở đầu trang chi tiết kèm 2 nút hành động nhanh để điều phối (Giao lại / Hoàn hàng).
- **Timeline Error Point:** Điểm checkpoint thất bại cuối cùng hiển thị màu đỏ (Danger color) kèm icon chéo `(x)` thay vì xanh lá, giúp nhận biết điểm dừng lỗi của đơn.
- **Retry Notification:** Với các notification bị lỗi gửi (chữ đỏ), cung cấp nút [Gửi lại] (Resend) nhanh để thao tác thủ công.

---

## 7. Màn hình Phê duyệt Đơn hàng & Popup lý do từ chối (Checker)

```text
┌────────────────────────────────────────────────────────────┐
│ DUYỆT ĐƠN HÀNG THỦ CÔNG (Checker)         [User: Admin]    │
├────────────────────────────────────────────────────────────┤
│ ĐƠN HÀNG: #247-00125           Trạng thái: CHỜ PHÊ DUYỆT   │
│ Người tạo: Sales @nlchis       Ngày tạo: 2026-07-02        │
├────────────────────────────────────────────────────────────┤
│ THÔNG TIN NGƯỜI NHẬN:                                      │
│ Họ Tên: Le Van C               SĐT: 0933444555             │
│ Địa chỉ: 789 Lê Lợi, Hải Châu 1, Hải Châu, Đà Nẵng         │
│                                                            │
│ THÔNG TIN HÀNG HÓA & TỒN KHO:                              │
│ Sản phẩm: iPad Air 5 (0.8 kg)  Số lượng: 1                 │
│ Tiền hàng: 15,000,000 đ        Thu hộ (COD): 15,000,000 đ  │
│ Chứng từ CO/CQ: [Xem_File_CO_CQ.pdf]                       │
│ Tồn kho khả dụng hiện tại: 5 sản phẩm (Đã giữ kho: 1)      │
├────────────────────────────────────────────────────────────┤
│  [ PHÊ DUYỆT ĐƠN ]                  [ TỪ CHỐI DUYỆT ]      │
└────────────────────────────────────────────────────────────┘

Popup xuất hiện khi nhấn [ TỪ CHỐI DUYỆT ]:
┌──────────────────────────────────────────┐
│ popup: TỪ CHỐI PHÊ DUYỆT ĐƠN HÀNG        │
├──────────────────────────────────────────┤
│ Lý do từ chối (*) (Tối thiểu 10 ký tự):  │
│ [ Khách hàng yêu cầu hủy đơn do đổi ý,  ]│
│ [ không muốn lấy iPad Air 5 nữa.        ]│
│                                          │
│ [ HỦY BỎ ]             [ XÁC NHẬN TỪ CHỐI]│
└──────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Quy tắc Maker/Checker:** Chỉ tài khoản có quyền "Checker" (Admin) mới có nút Phê duyệt / Từ chối duyệt.
- **Duyệt đơn:** Nhấn [ PHÊ DUYỆT ĐƠN ] sẽ tự động gọi API đẩy 247Express và trừ kho thực tế.
- **Từ chối đơn:** Popup từ chối bắt buộc nhập tối thiểu 10 ký tự, khi xác nhận sẽ hủy tạm khóa và hoàn trả số lượng vào tồn kho khả dụng.

---

## 8. Phiếu xuất kho & Nhãn dán vận đơn chuyên dụng (Thủ kho)

```text
┌────────────────────────────────────────────────────────────┐
│ PHIẾU XUẤT KHO VÀ NHÃN VẬN ĐƠN (Khổ K80)                 │
├────────────────────────────────────────────────────────────┤
│ PHIẾU XUẤT KHO NỘI BỘ                                      │
│ Mã đơn: #247-00123             Ngày: 02/07/2026            │
│ Vị trí lấy hàng:                                    │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Tên Sản Phẩm  | Vị Trí Kệ   | Hàng | Ô | Số Lượng      │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Macbook Pro M3| KỆ-B03      | 02   | 04| 1             │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ ────────────────────────────────────────────────────────── │
│ NHÃN VẬN CHUYỂN ĐỐI TÁC 247EXPRESS                         │
│ Mã vận đơn: 247XYZ123                                      │
│ Người gửi: VietMec Store - Hà Nội                          │
│ Người nhận: Nguyen Van A - SĐT: 0901234567                 │
│ Địa chỉ: 123 Đường Láng, Láng Thượng, Đống Đa, Hà Nội      │
│ [|||||||||||||||||||||||||||||||||||||||||||||||||||||||]   │
│ COD: 0 đ (Đã thanh toán trực tuyến)                        │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Khổ giấy:** Thiết kế tối ưu in nhiệt dọc (khổ 80mm) để có thể in nhanh từ máy in nhiệt tại kho.
- **Vị trí kệ:** Hiển thị rõ ràng số hiệu kệ, hàng và ô để Thủ kho tiết kiệm thời gian lấy hàng vật lý.

---

## 9. Thông tin Hóa đơn VAT & Form nhập thông tin Thuế (Kế toán)

```text
┌────────────────────────────────────────────────────────────┐
│ PHÁT HÀNH HÓA ĐƠN ĐIỆN TỬ VAT            [User: Kế toán]   │
├────────────────────────────────────────────────────────────┤
│ ĐƠN HÀNG THÀNH CÔNG: #247-00124       Trạng thái: THÀNH CÔNG│
│ Tiền hàng thực thu: 20,000,000 đ       Ngày giao: 02/07/2026│
├────────────────────────────────────────────────────────────┤
│ THÔNG TIN XUẤT HÓA ĐƠN VAT:                                │
│ [ ] Khách hàng doanh nghiệp (Xuất hóa đơn công ty)         │
│ Tên Công Ty: [ Công ty Cổ phần VietMec                  ]  │
│ Mã Số Thuế:  [ 0102345678                               ]  │
│ Địa Chi Cty: [ Số 10 Tràng Thi, Hoàn Kiếm, Hà Nội        ]  │
│ Email Nhận:  [ ketoan@vietmec.vn                        ]  │
│                                                            │
│ [ HUY BỎ ]                          [ PHÁT HÀNH HÓA ĐƠN ]  │
├────────────────────────────────────────────────────────────┤
│ TRẠNG THÁI HÓA ĐƠN ĐÃ PHÁT HÀNH:                           │
│ Số hóa đơn: HD-2026-0004562    Ngày xuất: 02/07/2026       │
│ File PDF hóa đơn VAT: [Download_Invoice_HD-0004562.pdf]    │
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Thông tin hóa đơn:** Checkbox doanh nghiệp sẽ kích hoạt hiển thị 3 trường Tên công ty, MST và Địa chỉ.
- **Phát hành hóa đơn:** Tự động kết nối hóa đơn điện tử và gán mã hóa đơn liên kết ngược lại đơn hàng.

---

## 10. Nạp tệp đối soát COD & Bảng kê đối chiếu (Kế toán)

```text
┌────────────────────────────────────────────────────────────┐
│ ĐỐI SOÁT CÔNG NỢ COD                      [User: Kế toán]   │
├────────────────────────────────────────────────────────────┤
│ NẠP BẢNG KÊ ĐỐI SOÁT:                                      │
│ Chọn tệp bảng kê (.xlsx): [ bang_ke_247_t7_2026.xlsx ]     │
│ [ ] Tải Lên Và So Khớp Tự Động                             │
├────────────────────────────────────────────────────────────┤
│ KẾT QUẢ ĐỐI CHIẾU SO KHỚP TỰ ĐỘNG:                         │
│ Tổng đơn so khớp: 3 đơn | Khớp: 2 đơn | [!] Lệch: 1 đơn    │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Mã Vận Đơn | Tiền Hóa Đơn | Tiền Đối Soát| Trạng Thái  │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 247XYZ123  | 0 đ          | 0 đ          | KHỚP 100%   │ │
│ │ 247XYZ124  | 20,000,000 đ | 20,000,000 đ | KHỚP 100%   │ │
│ │ 247XYZ125  | 15,000,000 đ | 14,800,000 đ | [!] LỆCH    │ │
│ └────────────────────────────────────────────────────────┘ │
│ Chi tiết lệch đơn 247XYZ125: Thiếu 200,000 đ COD thực thu. │
│ [ HỦY BỎ ĐỐI SOÁT ]                [ XỬ LÝ TẤT TOÁN THỦ CÔNG]│
└────────────────────────────────────────────────────────────┘
```

**UI-Rules & Đề xuất UX:**
- **Upload File:** Hỗ trợ kéo thả file excel từ 247Express.
- **Lệch đối soát (Reconciliation Discrepancy):** Đơn hàng có chênh lệch tiền thu hộ COD lớn hơn 0đ sẽ tự động bị gắn cờ đỏ cảnh báo và khóa nút tất toán tự động. Kế toán phải xử lý thủ công và nhấn [ XỬ LÝ TẤT TOÁN THỦ CÔNG ] để ghi đè trạng thái sang Đã tất toán.

---

## Giải quyết Câu hỏi mở (Resolve OQs)
- Không có câu hỏi mở nào bị tồn đọng.

## Changelog
- **2026-07-02:** Bổ sung thêm 4 màn hình phác thảo giao diện chi tiết cho luồng Phê duyệt đơn, Phiếu in Thủ kho, Hóa đơn VAT, và Đối soát công nợ COD của Kế toán.
- **2026-07-01:** Bổ sung các màn hình edge case (lỗi tạo đơn, giao hàng thất bại/hoàn hàng, lỗi notification).
- **2026-06-30:** Khởi tạo bản phác thảo wireframe lần đầu cho hệ thống theo dõi đơn hàng.

