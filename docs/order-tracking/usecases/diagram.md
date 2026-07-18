# Sơ đồ Use Case - Phân hệ B2B (Hợp đồng & Đơn hàng)

Sơ đồ Use Case mô tả mối quan hệ tương tác giữa các tác nhân (Actors) và các ca sử dụng (Use Cases) của hệ thống.

```plantuml
@startuml
left to right direction
skinparam RoundCorner 10
skinparam UsecaseBackgroundColor #F8FAFC
skinparam UsecaseBorderColor #475569
skinparam UsecaseFontColor #0F172A
skinparam ActorBackgroundColor #F8FAFC
skinparam ActorBorderColor #475569
skinparam ActorFontColor #0F172A
skinparam ArrowColor #334155

actor "Sales phụ trách" as Sales
actor "Admin" as Admin
actor "Thủ kho" as WH
actor "247Express\n(Webhook)" as Courier

rectangle "Hệ thống Quản lý B2B (VietMec Portal)" {

  rectangle "Khách hàng & Hợp đồng" {
    usecase "Quản lý Khách hàng" as UCc1
    usecase "Quản lý Hợp đồng & Phụ lục" as UCc2
  }

  rectangle "Yêu cầu giao hàng" {
    usecase "Tạo Yêu cầu giao hàng" as UCd1
  }

  rectangle "Bán hàng (Sales / CRM)" {
    usecase "Tạo đơn hàng từ Yêu cầu" as UC1
    usecase "Chỉnh sửa đơn hàng" as UC4
    usecase "Xử lý Hoàn hàng (Chủ động)" as UC5a
  }

  rectangle "Phê duyệt (Approval)" {
    usecase "Phê duyệt / Từ chối đơn hàng" as UC2
  }

  rectangle "Quản lý kho (Inventory)" {
    usecase "Xem chi tiết & In chứng từ" as UC3
    usecase "Nhập bổ sung tồn kho" as UC6
  }

  rectangle "Giao hàng (Webhook)" {
    usecase "Cập nhật hành trình & Hoàn hàng (Tự động)" as UC5b
  }
}

' Actor to Use Case Associations
Sales -- UCc1
Sales -- UCc2
Sales -- UC1
Sales -- UC4
Sales -- UC5a

Admin -- UCc1
Admin -- UCc2
Admin -- UCd1
Admin -- UC2

WH -- UC3
WH -- UC6

Courier -- UC5b

' Connections
UCc2 ..> UCc1 : <<include>>
UCd1 ..> UCc2 : <<include>>
UC1 ..> UCd1 : <<include>>

@enduml
```

## Ghi chú các quan hệ
* **Sales phụ trách:** Quản lý khách hàng, khởi tạo hợp đồng, tự tạo đơn hàng dựa trên hạn mức Yêu cầu giao hàng, và thao tác yêu cầu hoàn hàng cho khách.
* **Admin:** Quản lý khách hàng, khởi tạo hợp đồng, tạo Yêu cầu giao hàng từ Hợp đồng để Sales chạy đơn, và có quyền duyệt/từ chối đơn hàng.
* **Thủ kho:** Thực hiện lấy hàng, in nhãn dán, đóng gói và tự kiểm đếm nhập kho thủ công khi có đơn hoàn.
* **247Express:** Đối tác vận chuyển gửi Webhook cập nhật hành trình tự động (Đang giao, Thành công, Thất bại, Chờ Hoàn, Đã hoàn).
