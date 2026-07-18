# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## PHÂN HỆ THEO DÕI ĐƠN HÀNG (ORDER TRACKING SYSTEM)

Tác giả: **@nlchis**
                    Cập nhật: **2026-07-02**
                    Trạng thái: **Đ&atilde; ph&ecirc; duyệt**

## 
                    1. Giới Thiệu (Introduction)

### 1.1 Mục đích (Purpose)

T&agrave;i liệu n&agrave;y đặc tả chi tiết to&agrave;n bộ các y&ecirc;u cầu chức năng, phi chức năng, quy tắc nghiệp vụ v&agrave; luồng tương tác thực tế của hệ thống theo d&otilde;i đơn h&agrave;ng tích hợp h&atilde;ng vận chuyển đối tác 247Express. Đ&acirc;y l&agrave; t&agrave;i liệu duy nhất l&agrave;m cơ sở để phát triển m&atilde; nguồn v&agrave; kiểm định chất lượng sản phẩm.

### 1.2 Phạm vi hệ thống (Scope)


### 1.3 Thuật ngữ & Từ viết tắt (Glossary)

| **
Thuật ngữ viết tắt
** | **
&Yacute; nghĩa giải thích chi tiết
**  |
| 
PO (Purchase Order)
 | 
Phiếu đặt h&agrave;ng. Đ&acirc;y l&agrave; chứng từ nội bộ của hệ thống d&ugrave;ng để theo d&otilde;i th&ocirc;ng tin giao dịch sản phẩm của khách.
  |
| 
 | 
H&oacute;a đơn giá trị gia tăng. Chứng từ thuế xuất điện tử bắt buộc cho mọi đơn giao h&agrave;ng th&agrave;nh c&ocirc;ng.
  |
| 
COD (Cash on Delivery)
 | 
Thu hộ tiền mặt. Bưu tá của 247Express sẽ nhận tiền mặt từ người mua tại thời điểm giao h&agrave;ng vật l&yacute;.
  |
| 
SMS Brandname
 | 
Tin nhắn thương hiệu. Dịch vụ tự động bắn tin nhắn hiển thị t&ecirc;n VietMec l&agrave;m người gửi đến điện thoại khách h&agrave;ng.
  |
| 
API
 | 
Giao diện lập tr&igrave;nh ứng dụng. Phương thức kết nối kỹ thuật gi&uacute;p đồng bộ th&ocirc;ng tin đơn h&agrave;ng giữa VietMec v&agrave; 247Express.
  |
| 
Webhook
 | 
Cổng nhận dữ liệu tự động thời gian thực từ h&atilde;ng vận chuyển 247Express đẩy về VietMec.
  |
| 
Maker/Checker
 | 
Quy tr&igrave;nh kiểm soát hai bước: Nh&acirc;n vi&ecirc;n Sales tạo đơn (Maker), Admin duyệt đơn (Checker) mới kích hoạt xuất kho.
  |
| 
Hệ thống quản l&yacute; nội bộ
 | 
Giao diện Web Portal nội bộ chỉ d&agrave;nh ri&ecirc;ng cho cán bộ nh&acirc;n vi&ecirc;n của VietMec truy cập sử dụng.
  |
## 
                    2. Tác Nh&acirc;n Hệ Thống (Actors)

| **
T&ecirc;n tác nh&acirc;n
** | **
M&ocirc; tả vai tr&ograve; nghiệp vụ
**  |
| 
Khách h&agrave;ng
 | 
Khách mua h&agrave;ng trực tuyến tr&ecirc;n VietMec, thanh toán, nhận tin nhắn thương hiệu (SMS) th&ocirc;ng báo h&agrave;nh tr&igrave;nh đơn.
  |
| 
Sales phụ trách (Maker)
 | 
Nh&acirc;n vi&ecirc;n tạo đơn h&agrave;ng thủ c&ocirc;ng tr&ecirc;n hệ thống nội bộ, chỉnh sửa đơn chờ duyệt v&agrave; xử l&yacute; điều phối đơn giao lỗi qua Telegram.
  |
| 
Admin (Checker)
 | 
Quản trị vi&ecirc;n hệ thống nội bộ, ph&ecirc; duyệt hoặc từ chối đơn h&agrave;ng thủ c&ocirc;ng do Sales tạo k&egrave;m l&yacute; do từ chối.
  |
| 
Thủ kho
 | 
Thực hiện xuất h&oacute;a đơn nhặt h&agrave;ng, in nh&atilde;n vận đơn 247Express, đ&oacute;ng g&oacute;i v&agrave; b&agrave;n giao bưu tá lấy h&agrave;ng.
  |
| 

 | 
  |
| 
Hệ thống đối tác (247Express)
 | 
Hệ thống của đối tác vận chuyển b&ecirc;n thứ 3, nhận th&ocirc;ng tin tạo đơn, trả Tracking ID, gửi Webhook cập nhật trạng thái.
  |
## 
                    3. Sơ Đồ Hệ Thống (System Diagrams)

### 3.1 Sơ đồ Use Case tổng thể

### 3.2 Sơ đồ luồng xử l&yacute; hệ thống

## 
                    4. Y&ecirc;u Cầu Chức Năng (Functional Requirements)

| **
Module
** | **
T&ecirc;n y&ecirc;u cầu chức năng
** | **
M&ocirc; tả nghiệp vụ
** | **
Độ ưu ti&ecirc;n
**  |
| 
Quản l&yacute; khách h&agrave;ng
 | 
Tạo hồ sơ khách h&agrave;ng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n sales tạo hồ sơ khách h&agrave;ng (th&ocirc;ng tin cá nh&acirc;n, địa chỉ, số điện thoại, hợp đồng, &hellip;)
 | 
P0
  |
| 
Nhập hợp đồng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n sales nhập hợp đồng đ&atilde; k&yacute; kết để gen ra hồ sơ khách h&agrave;ng
 | 
P0
  |
| 
Xem chi tiết khách h&agrave;ng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n sales xem chi tiết th&ocirc;ng tin khách h&agrave;ng
 | 
P0
  |
| 
Sửa hồ sơ khách h&agrave;ng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n sales sửa th&ocirc;ng tin khách h&agrave;ng
 | 
P0
  |
| 
Quản l&yacute; đơn h&agrave;ng
 | 
Tạo đơn h&agrave;ng thủ c&ocirc;ng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n Sales tạo mới đơn h&agrave;ng trực tiếp tr&ecirc;n BO sử dụng th&ocirc;ng tin đối tác đ&atilde; lưu
 | 
P0
  |
| 
Xem chi tiết đơn h&agrave;ng
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n Sales xem chi tiết th&ocirc;ng tin đơn h&agrave;ng
 | 
P0
  |
| 
Điều phối xử l&yacute; giao lỗi
 | 
Cung cấp tính năng cho Sales nhấn Xác nhận Ho&agrave;n h&agrave;ng tr&ecirc;n trang chi tiết đơn h&agrave;ng giao lỗi.
 | 
P1
  |
| 
Ph&ecirc; duyệt đơn h&agrave;ng thủ c&ocirc;ng
 | 
Cung cấp giao diện v&agrave; tính năng cho Admin ph&ecirc; duyệt các đơn h&agrave;ng Chờ Duyệt/Đang sửa đổi
 | 
P0
  |
| 
Từ chối đơn h&agrave;ng thủ c&ocirc;ng
 | 
Cho ph&eacute;p Admin từ chối ph&ecirc; duyệt đơn Chờ duyệt/Đang sửa đổi, y&ecirc;u cầu nhập l&yacute; do từ chối
 | 
P0
  |
| 
Chỉnh sửa đơn Chờ Duyệt
 | 
Cho ph&eacute;p nh&acirc;n vi&ecirc;n Sales sửa đổi th&ocirc;ng tin đơn h&agrave;ng khi đơn đang ở trạng thái Chờ Duyệt.
 | 
P0
  |
| 
In chứng từ v&agrave; nh&atilde;n vận đơn
 | 
Hỗ trợ Thủ kho in Phiếu xuất kho và in nhãn dán vận đơn của 247Express để dán lên kiện hàng thực tế.
 | 
P0
  |
| 
Quản l&yacute; sản phẩm
 | 
Tạo mới sản phẩm
 | 
Cho ph&eacute;p thủ kho th&ecirc;m mới sản phẩm bao gồm các th&ocirc;ng tin: T&ecirc;n, m&ocirc; tả, hạn sử dụng, &hellip;
 | 
P0
  |
| 
Xem chi tiết sản phẩm
 | 
Cho ph&eacute;p thủ kho xem chi tiết th&ocirc;ng tin sản phẩm
 | 
P0
  |
| 
Sửa th&ocirc;ng tin sản phẩm
 | 
Cho ph&eacute;p Thủ kho sửa th&ocirc;ng tin sản phẩm
 | 
P0
  |
| 
Quản l&yacute; tồn kho
 | 
Nhập/xuất kho
 | 
Cho ph&eacute;p Thủ kho thực hiện nhập/xuất thủ c&ocirc;ng số lượng tồn kho khả dụng trực tiếp cho 1/nhiều sản phẩm
 | 
P0
  |
| 
Ph&ecirc; duyệt y&ecirc;u cầu nhập/xuất kho
 | 
Cho ph&eacute;p Admin ph&ecirc; duyệt các bản ghi từ Chờ Duyệt sang trạng thái Đ&atilde; duyệt.
 | 
P0
  |
| 
Từ chối y&ecirc;u cầu nhập/xuất kho
 | 
Cho ph&eacute;p Admin từ chối ph&ecirc; duyệt các bản ghi từ Chờ Duyệt sang trạng thái Từ chối.
 | 
P0
  |
| 
Chức năng hệ thống
 | 
Đồng bộ h&agrave;nh tr&igrave;nh từ 247Express
 | 
Tự động cập nhật h&agrave;nh tr&igrave;nh v&agrave; trạng thái giao h&agrave;ng từ đối tác 247Express th&ocirc;ng qua Webhook (hoặc Polling cron job).
 | 
P0
  |
| 
Gửi SMS tự động cho khách h&agrave;ng
 | 
Tự động gửi SMS Brandname th&ocirc;ng báo đặt h&agrave;ng th&agrave;nh c&ocirc;ng, đang giao h&agrave;ng, v&agrave; giao h&agrave;ng th&agrave;nh c&ocirc;ng tới số điện thoại của người nhận.
 | 
P1
  |
| 
Gửi cảnh báo Telegram Group
 | 
Tự động gửi tin nhắn cảnh báo sự cố giao lỗi hoặc h&agrave;nh tr&igrave;nh cập nhật tới group Telegram của bộ phận Sales phụ trách.
 | 
P2
  |
| 
Đối soát
 | 
 | 

 | 
  |
| 
Đối soát COD bán tự động
 | 

 | 
  |
## 
                    5. Đặc Tả Chi Tiết Use Cases

### 