---
layout: default
title: Order Management Dashboard Wireframes
status: Approved
date: 2026-07-16
---

# Phác thảo Giao diện (Wireframes): Quản lý Đơn hàng (Cập nhật B2B & Hoàn Hàng)

Tài liệu này chứa phác thảo giao diện ASCII cho luồng quản lý đơn hàng dựa trên Yêu cầu giao hàng, và vòng lặp Hoàn hàng chủ động do Khách hàng yêu cầu.

## 1. Màn hình Dashboard Tổng quan

```text
┌────────────────────────────────────────────────────────────┐
│ [Hệ Thống Theo Dõi Đơn]        [User: Admin] [Đăng xuất]   │
├────────────────────────────────────────────────────────────┤
│ Menu: [Dashboard] | [Đơn Hàng] | [Khách Hàng] | [Hợp Đồng] │
├────────────────────────────────────────────────────────────┤
│ TỔNG QUAN HÔM NAY (16/7/2026)            [+ Tạo Đơn Nhanh] │
│                                                            │
│ ┌──────────────┬──────────────┬────────────────┬───────────┬─────────────────┬─────────────────┐ │
│ │ Đã tiếp nhận │ Đang đi phát │ Phát thành công│ Chờ xử lý │ Chờ chuyển hoàn │ Đã chuyển hoàn  │ │
│ │      12      │      32      │       96       │     2     │        3        │        5        │ │
│ └──────────────┴──────────────┴────────────────┴───────────┴─────────────────┴─────────────────┘ │
│                                                            │
│ TÌNH TRẠNG CHUNG THEO TUẦN (Biểu đồ)                       │
│    100 |   * * *                                           │
│     50 | *       * *                                       │
│      0 |_____________                                      │
│         T2 T3 T4 T5 T6                                     │
└────────────────────────────────────────────────────────────┘
```

---

## 2. Quản lý Danh sách Đơn hàng

```text
┌────────────────────────────────────────────────────────────┐
│ QUẢN LÝ DANH SÁCH ĐƠN HÀNG                                 │
├────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [ Nhập mã/SĐT...       ]   Trạng thái: [Tất cả v]│
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Mã Đơn    | Khách Hàng      | Trạng thái     | Thao tác   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 247-00123 | Cong ty ABC     | Đang đi phát   | [Xem] [In] │ │
│ │ 247-00124 | TNHH Thuoc B    | Phát thành công| [Xem] [In] │ │
│ │ 247-00125 | Cong ty ABC     | Đã chuyển hoàn | [Xem] [In] │ │
│ └────────────────────────────────────────────────────────┘ │
│ Trang: < 1 2 3 >                                           │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Form Tạo Đơn Vận Chuyển Mới (Từ Yêu cầu giao hàng)

```text
┌────────────────────────────────────────────────────────────┐
│ TẠO ĐƠN GIAO HÀNG (Tích hợp 247Express)                    │
├────────────────────────────────────────────────────────────┤
│ THÔNG TIN YÊU CẦU:                                         │
│ Chọn YC giao hàng (*): [ YC001 - Cong ty ABC           v ] │
│ Tự động điền KH:       Cong ty ABC - 0901234567            │
│ Địa chỉ giao (*):      [ Số 123, Đường A, TP.HCM         ] │
│                                                            │
│ THÔNG TIN HÀNG HOÁ (SL tối đa cho phép hiển thị bên phải): │
│ 1. Sâm Ngọc Linh - Đơn giá: 10,000,000đ                    │
│    SL muốn giao: [ 5 ] kg                 (Còn lại: 20 kg) │
│                                                            │
│ 2. Ba Kích - Đơn giá: 2,000,000đ                           │
│    SL muốn giao: [ 0 ] kg                 (Còn lại: 50 kg) │
│                                                            │
│ TÀI LIỆU ĐÍNH KÈM:                                         │
│ File Hóa đơn (*):      [ Chọn Tệp... ] (Chưa có tệp nào)   │
│                                                            │
│ [ Hủy Bỏ ]                                [ Xác Nhận Tạo ] │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Chi tiết Đơn hàng & Tracking (Luồng Hoàn hàng Chủ động)

```text
┌────────────────────────────────────────────────────────────┐
│ CHI TIẾT ĐƠN HÀNG: #247-00124    Trạng thái: PHÁT THÀNH CÔNG│
├────────────────────────────────────────────────────────────┤
│ KHÁCH HÀNG: TNHH Thuoc B  | SĐT: 090xxxxxxx                │
│ HÀNG HOÁ: Sâm Ngọc Linh (5kg)| YÊU CẦU: YC001              │
│ SỐ LƯỢNG THỰC TẾ ĐÃ GIAO: 5 kg                             │
│ PHÍ VẬN CHUYỂN HOÀN: 0 đ                                   │
│ ────────────────────────────────────────────────────────── │
│ LỊCH SỬ TRACKING (Cập nhật từ 247Express)                  │
│ (v) 10:00 - Tạo đơn thành công (Mã vận đơn: 247XYZ123)     │
│ (v) 14:00 - Bưu tá đã lấy hàng                             │
│ (v) 16:00 - Phát thành công                                │
│                                                            │
│ [ In Phiếu Xuất Kho ]                       [ Quay Lại ]   │
│                                           [ HOÀN HÀNG ]    │
└────────────────────────────────────────────────────────────┘
```
*Lưu ý: Nút `[Hoàn Hàng]` sẽ bị làm mờ (disabled) nếu trạng thái đơn KHÁC **Phát thành công**.*

---

## 5. Popup Xác nhận Hoàn hàng (Trả hàng 1 phần)

Khi Sales bấm nút `[Hoàn Hàng]` từ màn hình trên.

```text
┌────────────────────────────────────────────────────────────┐
│ TẠO YÊU CẦU HOÀN HÀNG (Khách trả lại)                      │
├────────────────────────────────────────────────────────────┤
│ Bạn đang thao tác trên đơn hàng: #247-00124                │
│ Số lượng ban đầu: Sâm Ngọc Linh (5 kg)                     │
│                                                            │
│ -> Nhập Số lượng hoàn: [ 2 ] kg                            │
│ -> Lý do hoàn trả:     [ Hàng bị ẩm mốc trong túi        ] │
│                                                            │
│ Cảnh báo: Thao tác này sẽ chuyển trạng thái đơn hàng sang  │
│ [Chờ chuyển hoàn] và yêu cầu shipper 247Express qua lấy.   │
│ Lịch sử tracking cũ sẽ vẫn được giữ lại.                   │
│                                                            │
│                     [ HUỶ BỎ ]         [ XÁC NHẬN HOÀN ]   │
└────────────────────────────────────────────────────────────┘
```

Sau khi bấm Xác nhận, đơn sẽ quay về `Chờ chuyển hoàn` -> `Đã chuyển hoàn`. Số lượng thực tế đã giao sẽ tự trừ đi 2kg (còn 3kg) và hiển thị trên màn hình Chi tiết đơn hàng. Trường Phí vận chuyển hoàn sẽ tự động cập nhật khi hành trình kết thúc.
