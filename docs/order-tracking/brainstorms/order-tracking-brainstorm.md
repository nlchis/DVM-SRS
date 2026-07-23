---
type: brainstorm
feature: order-tracking
idea_slug: order-tracking-brainstorm
status: approved
mode: deep
lang: vi
owner: "@nlchis"
created: 2026-06-30
updated: 2026-07-16
complexity_flags: [has_external_redirect, has_state_machine, has_multi_role, has_async_flow, has_throttle_rules]
links:
  - "[order-management-dashboard.md](file:///d:/VietMec/docs/order-tracking/wireframes/order-management-dashboard.md)"
tags: [brainstorm, order-tracking]
stale_reason: ""
changelog:
  - date: 2026-07-16
    author: "System"
    note: "Bổ sung kiến trúc B2B: Khách hàng, Hợp đồng, Yêu cầu giao hàng và luồng Hoàn hàng trả 1 phần."
---

# Giải pháp Hệ thống Quản lý B2B & Theo dõi Đơn hàng (Order Tracking System)

> Feature: order-tracking | Idea: order-tracking-brainstorm
> Tài liệu brainstorm khép kín quy trình vận hành và kiểm soát nghiệp vụ B2B (Khách hàng -> Hợp đồng -> Yêu cầu giao hàng -> Đơn hàng) của VietMec.

## 1. Idea Seed

Hệ thống quản lý chuỗi cung ứng B2B toàn diện: Sales quản lý hồ sơ Khách hàng và tạo Hợp đồng. Admin dựa trên Hợp đồng để phân bổ thành các Yêu cầu giao hàng. Sales dựa trên Yêu cầu giao hàng để tạo Đơn hàng thực tế. Hệ thống quản lý chặt chẽ hạn mức giao hàng giữa 3 tầng. Quản lý trạng thái vận chuyển qua Webhook 247Express. Hỗ trợ hoàn hàng tự động và hoàn hàng chủ động (trả 1 phần).

## 2. Context

Nhằm đáp ứng mô hình kinh doanh B2B phức tạp, hệ thống cần nâng cấp từ việc tạo đơn lẻ tẻ sang việc quản lý số lượng lớn theo Hợp đồng. Giúp Admin kiểm soát chính xác hạn mức xuất kho theo Hợp đồng, đồng thời cung cấp cơ chế hoàn hàng thông minh để tránh sai lệch tồn kho.

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|---|---|---|
| **Khách hàng (B2B/Cá nhân)** | Cần theo dõi tiến độ giao hàng của từng đợt theo hợp đồng đã ký. | Nhận thông báo SMS hành trình đơn hàng và có thể yêu cầu trả hàng nếu hàng lỗi. |
| **Sales phụ trách** | Quản lý hợp đồng và đơn hàng thủ công mất thời gian, dễ sai sót số lượng. | Quản lý Hợp đồng tập trung. Tạo đơn nhanh chóng từ Yêu cầu giao hàng có sẵn. |
| **Admin** | Khó kiểm soát việc Sales xuất hàng vượt quá số lượng trên hợp đồng. | Tạo Yêu cầu giao hàng cấp hạn mức cho Sales. Phê duyệt đơn hàng xuất kho. |
| **Thủ kho** | Gặp khó khăn trong định vị sản phẩm và đếm hàng hoàn. | In phiếu xuất kho tự động và kiểm đếm nhập kho thủ công khi có hàng hoàn. |

## 4. Capabilities Breakdown

### P0 — must have
* Quản lý Khách hàng và Hợp đồng (No Maker/Checker).
* Admin tạo Yêu cầu giao hàng từ Hợp đồng để phân bổ số lượng.
* Sales tạo Đơn hàng dựa trên Yêu cầu giao hàng (Hệ thống chặn nếu vượt số lượng).
* Admin phê duyệt Đơn hàng (Sinh Bản ghi xuất kho ở trạng thái Chờ duyệt tự động in phiếu, gọi API 247Express. Chỉ trừ tồn kho khi bản ghi chuyển sang Đã duyệt).
* Tích hợp Webhook 247Express cập nhật trạng thái tự động.
* Cơ chế Auto Refund: Hoàn hạn mức số lượng cho Yêu cầu giao hàng khi Đơn hàng bị Chờ xử lý / Đã chuyển hoàn.
* Hoàn hàng chủ động: Cho phép Sales bấm [Hoàn hàng 1 phần] trên đơn đã Phát thành công, tạo vòng lặp trạng thái Chờ chuyển hoàn -> Đã chuyển hoàn.

## 5. Core Flows (Happy Path)

### 5.1 Luồng Khởi tạo & Tạo Yêu cầu (Sales & Admin)
1. Sales tạo Hợp đồng B2B với Khách hàng (Nhập SP, Đơn giá, Số lượng). Trạng thái `Còn hiệu lực`.
2. Admin tạo Yêu cầu giao hàng từ Hợp đồng. Cấp số lượng cần giao đợt này. Trạng thái `Chờ xử lý`.

### 5.2 Luồng Tạo Đơn & Giao Hàng (Sales & Admin)
1. Sales chọn Yêu cầu giao hàng, nhập số lượng muốn giao, upload Hóa đơn -> Gửi duyệt (`Chờ Duyệt`).
2. Admin Phê duyệt -> `Đã tiếp nhận` (Sinh Bản ghi xuất kho tự động).
3. Webhook cập nhật `Đã lấy hàng` (Bản ghi xuất kho tự động chuyển sang Đã duyệt, tiến hành trừ tồn kho).
4. Webhook cập nhật `Đang vận chuyển` -> `Đang đi phát` -> `Phát thành công`.
4. Số lượng đã giao thực tế của Yêu cầu giao hàng tăng lên. Nếu đạt mốc, Yêu cầu chuyển sang `Hoàn thành`. Hợp đồng được ghi nhận số lượng.

### 5.3 Luồng Hoàn Hàng (Chủ động - Trả 1 phần)
1. Đơn hàng đang ở `Phát thành công`. Khách báo trả lại 1 phần.
2. Sales bấm [Hoàn hàng 1 phần], nhập số lượng trả lại -> Đơn về `Chờ chuyển hoàn`.
3. Hàng về kho -> Nhận webhook, Đơn thành `Đã chuyển hoàn`. 
4. Auto Refund: Số lượng đã giao của Yêu cầu giao hàng bị trừ đi. Có thể làm Yêu cầu rớt trạng thái từ `Hoàn thành` về `Chờ xử lý`. Thủ kho tự nhập tồn kho thủ công.

## 6. System Behavior Deep Dive

### 6.1 State Transitions

#### Yêu cầu giao hàng (Delivery Request)
`Chờ xử lý` <--> `Hoàn thành` (Auto tính toán dựa trên số lượng Đơn giao hàng).

#### Đơn hàng (Order Entity)
`Chờ duyệt` -> `Đã tiếp nhận` -> `Đã lấy hàng` -> `Đang vận chuyển` -> `Đang đi phát` -> `Phát thành công`.
Hoàn hàng: `Phát thành công` -> `Chờ chuyển hoàn` -> `Đã chuyển hoàn`.

### 6.2 Validation Rules
* **Tạo Yêu cầu:** Số lượng yêu cầu <= Số lượng Hợp đồng còn lại.
* **Tạo Đơn hàng:** Số lượng giao <= Số lượng Yêu cầu giao hàng.
* **Hoàn hàng:** Nút Hoàn hàng chỉ mở khi Đơn hàng đạt trạng thái `Phát thành công`.

## 7. Next Steps

Sau brainstorm này:
* Áp dụng quy tắc Hợp đồng vào hệ thống và bắt đầu triển khai code (Next Phase).
