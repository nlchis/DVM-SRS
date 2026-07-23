# Sơ Đồ Trạng Thái - Theo Dõi Đơn Hàng

Tài liệu chứa sơ đồ trạng thái (State Diagram) biểu diễn chu kỳ vòng đời của các thực thể nghiệp vụ cốt lõi: Hợp đồng, Yêu cầu giao hàng, và Đơn giao hàng.

---

## Entity: Hợp đồng (Contract)

Mô tả vòng đời đơn giản của Hợp đồng B2B do Sales tự quản lý trạng thái.

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> Active : Sales tạo Hợp đồng mới

state "Còn hiệu lực" as Active
state "Hết hiệu lực" as Expired
state "Hủy" as Cancelled

Active --> Expired : Sales cập nhật khi hết hạn hoặc thanh lý
Expired --> Active : Sales mở lại (gia hạn)
Active --> Cancelled : Sales chủ động cập nhật khi hợp đồng bị hủy

Active --> [*]
Expired --> [*]
Cancelled --> [*]
@enduml
```

### Bảng giải thích trạng thái: Hợp đồng

| Trạng thái | Ý nghĩa | Chuyển trạng thái khi |
|---|---|---|
| **Còn hiệu lực** | Hợp đồng đang trong thời hạn giao dịch, có thể tạo Yêu cầu giao hàng. | Sales tạo mới hợp đồng hoặc gia hạn hợp đồng cũ. |
| **Hết hiệu lực** | Hợp đồng đã thanh lý, hết hạn, hoặc bị hủy bỏ. Không thể giao dịch thêm. | Sales chủ động cập nhật trạng thái khi hết hạn/thanh lý. |
| **Hủy** | Hợp đồng bị hủy bỏ trước thời hạn. | Sales chủ động cập nhật khi hợp đồng bị hủy. |

---

## Entity: Yêu cầu giao hàng (Delivery Request)

Mô tả vòng đời của một Yêu cầu giao hàng được Admin tạo ra từ Hợp đồng. Số lượng hoàn thành phụ thuộc vào tiến độ của Đơn giao hàng.

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> Pending : Admin tạo yêu cầu

state "Chờ xử lý" as Pending
note right of Pending
  Số lượng đã giao thực tế < Yêu cầu
end note

state "Hoàn thành" as Completed
note right of Completed
  Số lượng đã giao thực tế = Yêu cầu
  (Lúc này mới ghi nhận số lượng vào Hợp đồng)
end note

state "Đã hủy" as Cancelled
note right of Cancelled
  Admin hủy (chỉ khi chưa có đơn hoặc đơn đã hỏng/hoàn)
end note

Pending --> Completed : Khi Đơn giao hàng đạt trạng thái "Phát thành công" đủ số lượng
Completed --> Pending : Khi có Đơn giao hàng bị "Đã chuyển hoàn" (Auto Refund trừ số lượng)
Pending --> Cancelled : Admin bấm Hủy yêu cầu

Cancelled --> [*]
Completed --> [*]
@enduml
```

### Bảng giải thích trạng thái: Yêu cầu giao hàng

| Trạng thái | Ý nghĩa | Chuyển trạng thái khi |
|---|---|---|
| **Chờ xử lý** | Yêu cầu giao hàng đã được tạo, nhưng chưa giao đủ số lượng hàng theo yêu cầu. | Admin khởi tạo yêu cầu, hoặc có đơn hàng chuyển hoàn khiến số lượng thực tế bị giảm. |
| **Hoàn thành** | Đã giao đủ 100% số lượng hàng hóa trong yêu cầu cho khách hàng. | Các đơn giao hàng thuộc yêu cầu này đạt trạng thái "Phát thành công" và đủ tổng số lượng. |
| **Đã hủy** | Yêu cầu giao hàng bị Admin hủy bỏ, không tiếp tục giao. | Admin chủ động hủy (chỉ thực hiện được khi chưa có đơn hàng nào, hoặc các đơn hàng đều đã hủy/hoàn). |

---

## Entity: Đơn giao hàng (Delivery Order)

Mô tả các trạng thái chuyển đổi của thực thể Đơn giao hàng từ lúc khởi tạo đến khi giao thành công, kèm theo 2 luồng hoàn hàng (Tự động hoàn do giao lỗi và Khách yêu cầu hoàn sau khi nhận).

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> PENDING_APPROVAL : Sales tạo đơn từ Yêu cầu giao hàng

state "Chờ Duyệt" as PENDING_APPROVAL

state "Đã xóa (Mềm)" as SOFT_DELETED
note right of SOFT_DELETED
  Hủy tạm giữ kho & ẩn khỏi FO
end note

state "Từ Chối" as REJECTED
note right of REJECTED
  Hủy tạm giữ kho
end note

state "Đã duyệt" as APPROVED
note right of APPROVED
  Gửi thông tin sang 247Express
end note

state "Đã tiếp nhận" as AWAITING_SHIPPING
note right of AWAITING_SHIPPING
  Đã nhận Mã vận đơn 247
end note

state "Hủy" as CANCELLED
note right of CANCELLED
  Sales hủy trước khi lấy hàng
end note

state "Đã lấy hàng" as PICKED_UP
state "Đang vận chuyển" as IN_TRANSIT
state "Đang đi phát" as DELIVERING
state "Chờ xử lý" as FAILED

state "Phát thành công" as SUCCESS
note right of SUCCESS
  Tăng số lượng đã giao của Yêu cầu
end note

state "Chờ chuyển hoàn" as RETURNING

state "Đã chuyển hoàn" as RETURNED
note right of RETURNED
  Auto Refund giảm số lượng đã giao của Yêu cầu.
  Thủ kho tự kiểm đếm để cộng tồn kho.
end note

PENDING_APPROVAL --> SOFT_DELETED : Người dùng bấm [Xóa đơn]
PENDING_APPROVAL --> REJECTED : Admin Từ chối
PENDING_APPROVAL --> APPROVED : Admin Phê duyệt
APPROVED --> AWAITING_SHIPPING : 247Express trả Mã vận đơn

AWAITING_SHIPPING --> CANCELLED : Sales bấm Hủy đơn
AWAITING_SHIPPING --> PICKED_UP : Nhận thông tin [Đã lấy hàng] từ 247
PICKED_UP --> IN_TRANSIT : Nhận thông tin [Đang vận chuyển] từ 247
IN_TRANSIT --> DELIVERING : Nhận thông tin [Đang đi phát] từ 247
DELIVERING --> SUCCESS : Nhận thông tin [Phát thành công] từ 247
DELIVERING --> FAILED : Nhận thông tin [Chờ xử lý] từ 247

' Luồng giao lỗi và tự động hoàn
FAILED --> DELIVERING : Nhận thông tin [Đang đi phát] từ 247 (Tối đa X lần)
FAILED --> RETURNING : Nhận thông tin [Chờ chuyển hoàn] từ 247
RETURNING --> RETURNED : Nhận thông tin [Đã chuyển hoàn] từ 247

' Luồng khách yêu cầu hoàn sau khi đã nhận thành công (Trả 1 phần hoặc toàn bộ)
SUCCESS --> RETURNING : Sales bấm [Hoàn hàng] (1 phần hoặc toàn bộ)
RETURNING --> RETURNED : Nhận thông tin [Đã chuyển hoàn] từ 247

SOFT_DELETED --> [*]
REJECTED --> [*]
CANCELLED --> [*]
RETURNED --> [*]
@enduml
```

### Bảng giải thích trạng thái: Đơn giao hàng

| Trạng thái | Ý nghĩa | Chuyển trạng thái khi |
|---|---|---|
| **Chờ Duyệt** | Đơn giao hàng vừa được Sales tạo, chờ Admin phê duyệt. | Sales tạo đơn thành công. |
| **Đã xóa (Mềm)** | Đơn hàng ở trạng thái Chờ duyệt bị người dùng xóa. | Người dùng bấm [Xóa đơn] khi đơn ở trạng thái Chờ duyệt. |
| **Từ Chối** | Đơn hàng bị Admin từ chối phê duyệt. | Admin bấm Từ chối. |
| **Đã duyệt** | Admin phê duyệt đơn, hệ thống đang gửi thông tin sang 247Express. | Admin phê duyệt đơn. |
| **Đã tiếp nhận** | Đơn hàng đã nhận mã vận đơn từ 247Express. | 247Express trả về mã vận đơn (Tracking ID). |
| **Hủy** | Đơn hàng bị hủy bỏ trước khi bưu tá đến lấy hàng. | Sales chủ động hủy đơn khi ở trạng thái Đã tiếp nhận. |
| **Đã lấy hàng** | Bưu tá 247Express đã đến kho và lấy hàng thành công. | Nhận thông tin [Đã lấy hàng] từ 247. |
| **Đang vận chuyển** | Hàng hóa đang luân chuyển giữa các kho của 247Express. | Nhận thông tin [Đang vận chuyển] từ 247. |
| **Đang đi phát** | Bưu tá 247Express đang đi giao hàng đến tay người nhận. | Nhận thông tin [Đang đi phát] từ 247. |
| **Chờ xử lý** | Quá trình giao hàng gặp sự cố, bưu tá giao thất bại. | Nhận thông tin [Chờ xử lý] từ 247. |
| **Phát thành công** | Giao hàng thành công đến tay khách hàng. | Nhận thông tin [Phát thành công] từ 247. |
| **Chờ chuyển hoàn** | Đơn hàng đang trên đường chuyển hoàn lại về kho công ty. | Nhận thông tin [Chờ chuyển hoàn] từ 247. |
| **Đã chuyển hoàn** | Đơn hàng đã hoàn trả vật lý về kho công ty. | Nhận thông tin [Đã chuyển hoàn] từ 247. |

---

## Entity: Bản ghi Nhập/Xuất kho (Warehouse Record)

Mô tả vòng đời của một yêu cầu Nhập/Xuất kho. Bản ghi có thể được tạo thủ công (Maker/Checker) hoặc tự động sinh từ Đơn giao hàng.

### 1. Luồng Thủ công (Nhập/Xuất kho nội bộ)

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> MANUAL_PENDING : Thủ kho tạo bản ghi thủ công

state "Chờ duyệt" as MANUAL_PENDING
note right of MANUAL_PENDING
  Thủ kho được phép sửa ghi đè thông tin.
end note

state "Đã duyệt" as APPROVED
note right of APPROVED
  Tồn kho chính thức biến động.
end note

state "Từ chối" as REJECTED
note right of REJECTED
  Hoàn trả tồn kho (nếu là xuất kho).
end note

MANUAL_PENDING --> APPROVED : Quản lý kho Phê duyệt
MANUAL_PENDING --> REJECTED : Quản lý kho Từ chối

APPROVED --> [*]
REJECTED --> [*]
@enduml
```

### 2. Luồng Tự động (Từ Đơn giao hàng)

Lưu ý: Luồng này không đi qua bước phê duyệt thủ công, hệ thống tự động sinh phiếu Xuất kho ngay từ khi sinh bản ghi Chờ duyệt.

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> AUTO_PENDING : Sinh tự động từ Đơn hàng đã tiếp nhận

state "Chờ duyệt" as AUTO_PENDING
note right of AUTO_PENDING
  Hệ thống tự sinh phiếu Xuất kho.
  (Không cho phép duyệt/từ chối thủ công)
end note

state "Đã duyệt" as APPROVED
note right of APPROVED
  Trừ tồn kho thực tế.
end note

state "Hủy" as CANCELLED
note right of CANCELLED
  Hủy khi Sales hủy Đơn hàng.
end note

AUTO_PENDING --> APPROVED : Nhận thông tin [Đã lấy hàng] từ 247
AUTO_PENDING --> CANCELLED : Sales hủy Đơn hàng trước khi lấy hàng

APPROVED --> [*]
CANCELLED --> [*]
@enduml
```

### Bảng giải thích trạng thái: Bản ghi Nhập/Xuất kho

| Trạng thái | Ý nghĩa | Chuyển trạng thái khi |
|---|---|---|
| **Chờ duyệt** | Bản ghi chờ xác nhận để chính thức biến động kho. Hệ thống đã tự động sinh phiếu Nhập/Xuất kho. | Thủ kho tạo bản ghi thủ công, hoặc hệ thống tự động sinh khi Đơn giao hàng được duyệt (Đã tiếp nhận). Nếu là bản tự động, không được Duyệt/Từ chối thủ công. |
| **Từ chối** | Bản ghi thủ công bị từ chối duyệt. | Quản lý kho bấm Từ chối bản ghi thủ công. |
| **Đã duyệt** | Hàng hóa đã chính thức xuất/nhập, biến động tồn kho thực tế. | Quản lý kho bấm Phê duyệt (đối với bản thủ công), hoặc hệ thống nhận thông tin [Đã lấy hàng] từ 247 (đối với bản tự động). |
| **Hủy** | Bản ghi xuất kho bị hủy bỏ do đơn hàng bị hủy. | Sales hủy đơn hàng giao hàng trước khi lấy hàng. |

---

## Entity: Tồn kho (Inventory)

Mô tả các trạng thái của số lượng sản phẩm trong kho. Việc biến động tồn kho được thực hiện thông qua 2 luồng: Tự động và Thủ công.

### 1. Luồng Tự động (Từ Đơn giao hàng)

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> Available : Khởi tạo tồn kho ban đầu

state Available
note right of Available
  Số lượng khả dụng
end note

state Held
note right of Held
  Tạm giữ kho chờ xử lý
end note

state Deducted
note right of Deducted
  Trừ tồn kho thực tế
end note

Available --> Held : Sales tạo Đơn giao hàng (Chờ duyệt)
Held --> Available : Admin Từ chối Đơn / Sales Hủy Đơn
Held --> Deducted : Nhận thông tin [Đã lấy hàng] từ 247

Deducted --> [*] : Giao hàng thành công
@enduml
```

### 2. Luồng Thủ công (Nhập/Xuất kho nội bộ)

Yêu cầu nhập/xuất kho thủ công độc lập, không bắt buộc phải đi từ Yêu cầu giao hàng.

```plantuml
@startuml
skinparam RoundCorner 10
skinparam StateBackgroundColor #F8FAFC
skinparam StateBorderColor #475569
skinparam StateFontColor #0F172A
skinparam ArrowColor #334155

[*] --> Available : Khởi tạo tồn kho

state Available
note right of Available
  Số lượng khả dụng
end note

state Held
note right of Held
  Tạm giữ (Chờ xuất kho) / Chờ nhập kho
end note

state Deducted
note right of Deducted
  Trừ tồn kho thực tế
end note

' Luồng xuất kho
Available --> Held : Thủ kho tạo Bản ghi Xuất kho (Chờ duyệt)
Held --> Available : Quản lý kho Từ chối Xuất kho
Held --> Deducted : Quản lý kho Phê duyệt Xuất kho

' Luồng nhập kho
[*] --> Held : Thủ kho tạo Bản ghi Nhập kho (Chờ duyệt)
Held --> [*] : Quản lý kho Từ chối Nhập kho
Held --> Available : Quản lý kho Phê duyệt Nhập kho

Deducted --> [*]
@enduml
```

### Bảng giải thích trạng thái: Tồn kho

| Trạng thái | Ý nghĩa | Chuyển trạng thái khi |
|---|---|---|
| **Available (Khả dụng)** | Số lượng sản phẩm có sẵn trong kho, có thể bán và giao dịch. | - Quản lý duyệt phiếu Nhập kho thủ công.<br>- Giải phóng tồn kho do Đơn hàng bị hủy/từ chối, hoặc phiếu Xuất kho thủ công bị từ chối. |
| **Held (Tạm giữ / Chờ xử lý)** | Tồn kho bị khóa chờ xuất, hoặc hàng hóa đang chờ xác nhận nhập kho. | - **[Tự động]**: Sales tạo đơn giao hàng (Chờ duyệt).<br>- **[Thủ công]**: Thủ kho tạo bản ghi xuất/nhập kho (Chờ duyệt). |
| **Deducted (Đã trừ thực tế)** | Số lượng hàng hóa đã chính thức bị trừ khỏi hệ thống tồn kho vật lý. | - **[Tự động]**: Bưu tá lấy hàng đi giao (Nhận thông tin Đã lấy hàng từ 247).<br>- **[Thủ công]**: Quản lý kho duyệt phiếu xuất thủ công. |

---
