# Sơ Đồ Trạng Thái - Theo Dõi Đơn Hàng

Tài liệu chứa sơ đồ trạng thái (State Diagram) biểu diễn chu kỳ vòng đời của các thực thể nghiệp vụ cốt lõi.

---

## Entity: Đơn hàng (Order)

Mô tả các trạng thái chuyển đổi của thực thể Đơn hàng (Order) từ lúc khởi tạo đến trạng thái tất toán hoặc từ chối duyệt:

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> PENDING_APPROVAL : Sales tạo đơn thủ công
[*] --> AWAITING_SHIPPING : Đồng bộ tự động từ VietMec

state PENDING_APPROVAL {
  [*] --> Waiting : Chờ Admin duyệt
  Waiting --> Waiting : Sales lưu chỉnh sửa
}

PENDING_APPROVAL --> AWAITING_SHIPPING : Admin phê duyệt (Approve)
PENDING_APPROVAL --> REJECTED : Admin từ chối duyệt (Reject)

state REJECTED {
  note right : Trạng thái cuối, bị khóa cấm sửa.\nSales phải tạo đơn mới hoàn toàn.
}

REJECTED --> [*]

AWAITING_SHIPPING --> DELIVERING : Bưu tá 247Express quét mã nhận hàng

state DELIVERING {
}

DELIVERING --> SUCCESS : Giao hàng thành công hoàn toàn
DELIVERING --> FAILED : Giao hàng thất bại lần 1

state FAILED {
}

FAILED --> DELIVERING : Sales bấm [Yêu cầu Giao Lại] (Giao lại lần 2)
FAILED --> RETURNING : Sales bấm [Xác nhận Hoàn Hàng] (Chờ Hoàn Hàng)
RETURNING --> RETURNED : Bưu tá hoàn trả hàng thành công (Đã Hoàn Hàng)

state RETURNING {
  note right : Đơn hàng đang được bưu tá chuyển trả ngược về kho.
}

state RETURNED {
  note right : Trạng thái cuối: Đã hoàn hàng thành công.\nHệ thống tự động hoàn trả sản phẩm về vị trí kệ kho xuất cũ.
}

SUCCESS --> [*]
RETURNED --> [*]
@enduml
```

---

## Entity: Tồn kho (Inventory)

Mô tả các trạng thái của số lượng sản phẩm trong kho (Khả dụng, Tạm giữ, Đã khấu trừ, Hoàn trả):

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> Available : Khởi tạo tồn kho

state Available {
  note right : Số lượng sản phẩm khả dụng hiển thị bán
}

Available --> Held : Khách bấm thanh toán (VietMec) hoặc Sales tạo đơn tay

state Held {
  note right : Tạm giữ kho trong tối đa 10 phút (VietMec)\nhoặc chờ phê duyệt (đơn thủ công)
}

Held --> Available : Quá 10 phút không thanh toán hoặc Admin Reject
Held --> Deducted : Admin duyệt hoặc Đơn web đồng bộ thành công

state Deducted {
  note right : Trừ tồn kho thực tế và gán vị trí kệ xuất kho
}

Deducted --> Available : Đơn hàng chuyển sang Đã Hoàn Hàng
Deducted --> [*] : Tất toán hoàn tất đơn hàng
@enduml
```
