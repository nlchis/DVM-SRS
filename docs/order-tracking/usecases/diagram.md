# Sơ đồ Use Case - Phân hệ Theo dõi Đơn hàng

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

actor "Khách hàng" as KH
actor "Sales phụ trách" as Sales
actor "Admin (Checker)" as Admin
actor "Thủ kho" as WH
actor "Kế toán" as Accountant
actor "247Express\n(External System)" as Courier

rectangle "Hệ thống Theo dõi Đơn hàng (VietMec Portal)" {

  rectangle "Bán hàng (Sales / CRM)" {
    usecase "Đặt hàng tự động từ Website" as UC1
    usecase "Tạo đơn hàng thủ công" as UC2
    usecase "Điều phối xử lý giao hàng lỗi" as UC6
  }

  rectangle "Phê duyệt (Approval)" {
    usecase "Phê duyệt / Từ chối đơn hàng" as UC3
  }

  rectangle "Quản lý kho (Inventory)" {
    usecase "Đóng gói & Bàn giao vận chuyển" as UC4
    usecase "Nhập bổ sung tồn kho" as UC9
  }

  rectangle "Giao hàng (custom module)" {
    usecase "Cập nhật hành trình tự động" as UC5
  }

  rectangle "Kế toán (Accounting)" {
    usecase "Phát hành hóa đơn VAT" as UC7
    usecase "Đối soát công nợ COD" as UC8
  }
}

' Actor to Use Case Associations (Standard UML solid lines)
KH -- UC1
Sales -- UC2
Sales -- UC6
Admin -- UC3
WH -- UC4
WH -- UC9
Accountant -- UC7
Accountant -- UC8
Courier -- UC5

' Connections representing flows/relationships between operations
UC1 --> UC4 : "Tự động gán kệ xuất kho"
UC2 --> UC3 : "Yêu cầu duyệt đơn"
UC3 --> UC4 : "Phê duyệt xuất kho"
UC4 --> Courier : "Bàn giao vật lý"
Courier --> UC5 : "Cập nhật hành trình"
UC5 --> UC6 : "Giao hàng thất bại"
UC5 --> UC7 : "Giao hàng thành công"
UC7 --> UC8 : "Đối soát công nợ"

@enduml
```

## Ghi chú các quan hệ
* **Khách hàng:** Tác nhân chính thực hiện mua sắm trên VietMec (UC-01).
* **Sales phụ trách:** Maker tạo đơn tay (UC-02) và điều phối xử lý khi giao hàng thất bại (UC-06).
* **Admin:** Checker phê duyệt hoặc từ chối các đơn hàng thủ công (UC-03).
* **Thủ kho:** Thực hiện lấy hàng, đóng gói và bàn giao cho bưu tá (UC-04).
* **Kế toán:** Phát hành hóa đơn VAT (UC-07) và đối soát COD cuối kỳ (UC-08).
* **247Express:** Đối tác vận chuyển (External System) nhận lệnh giao hàng và đẩy Webhook cập nhật (UC-05).
