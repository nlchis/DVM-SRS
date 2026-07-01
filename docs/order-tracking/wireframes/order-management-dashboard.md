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

## Giải quyết Câu hỏi mở (Resolve OQs)
- Không có câu hỏi mở nào bị tồn đọng.

## Changelog
- **2026-07-02:** Đồng bộ trạng thái Chờ Giao (Pending) mới tạo, cập nhật sơ đồ 5 thẻ thống kê Dashboard và thiết kế timeline/thông báo cho đơn hàng chưa lấy.
- **2026-07-01:** Bổ sung các màn hình edge case (lỗi tạo đơn, giao hàng thất bại/hoàn hàng, lỗi notification).
- **2026-06-30:** Khởi tạo bản phác thảo wireframe lần đầu cho hệ thống theo dõi đơn hàng.
