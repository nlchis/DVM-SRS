---
type: skill-explainer
skill: wireframe-html
updated: 2026-07-18
---

# `/wireframe-html` là gì và nó chạy như thế nào?

## 1. Dùng để làm gì, khi nào nên gõ lệnh này

`/wireframe-html` là lệnh vẽ **wireframe** — bản phác bố cục màn hình — dưới dạng trang HTML đen trắng cho từng luồng người dùng của một tính năng.

Wireframe là bước "nhìn thấy được" đầu tiên: trước khi ai đó tô màu, chọn font hay lập trình, bạn muốn trả lời câu hỏi *"màn này có những ô nhập gì, nút gì, đi đâu tiếp"*. Wireframe HTML của bộ này trả lời đúng câu đó, bằng **element thật** (ô nhập, nút bấm, đường link) đặt trong khung có bề rộng đúng thiết bị (điện thoại / máy tính bảng / máy tính) — nên bạn thấy được tỉ lệ giống màn thật, không phải hình vẽ nguệch ngoạc.

Bạn gõ:

```text
/wireframe-html authentication
```

để vẽ tất cả luồng của tính năng "authentication" (đăng nhập/đăng ký). Hoặc chỉ một luồng:

```text
/wireframe-html authentication --flow forgot-password
```

Hoặc, nếu tính năng chưa có tài liệu, mô tả bằng lời:

```text
/wireframe-html "khách đăng nhập bằng email hoặc Google"
```

## 2. Nó cần gì trước khi vẽ

Có một quy tắc quan trọng: **`/wireframe-html` không tự bịa ra "tính năng này có mấy luồng"**. Nó đọc một "bản đồ luồng" — file `srs/{feature}-userflow.md` — để biết:

- Tính năng có mấy luồng (đăng nhập, đăng ký, quên mật khẩu…).
- Mỗi luồng đi qua những màn nào, theo thứ tự nào.
- Mỗi màn phủ tình huống gì (thành công / lỗi / trường hợp biên).

Bản đồ đó do lệnh chị em **`/user-flow`** tạo ra. Bạn không phải nhớ chạy nó trước: nếu chưa có bản đồ, `/wireframe-html` **tự gọi `/user-flow`**, lệnh này sẽ phỏng vấn bạn (ai dùng, các bước, nhánh lỗi) rồi vẽ sơ đồ luồng và **dừng lại chờ bạn duyệt**. Duyệt xong mới vẽ wireframe.

Vì sao tách đôi? Để mọi cách vẽ (wireframe đen trắng, bản mẫu có màu…) đều bám chung một bản đồ, không mỗi cái chia luồng một kiểu rồi lệch nhau.

## 3. Nó hỏi bạn điều gì

**Kích thước thiết bị.** Trước khi vẽ, skill hỏi bạn khung rộng bao nhiêu: điện thoại (375), máy tính bảng (768), máy tính (1024), hay responsive. Nó *gợi ý sẵn* một lựa chọn (đọc từ tài liệu thiết kế) để bạn chỉ cần xác nhận một giây — nhưng **không tự chọn im lặng**, vì bề rộng khung là một quyết định thiết kế thật sự (form đăng nhập trên điện thoại khác trên máy tính).

**Chi tiết còn thiếu.** Khi một ô nhập có ràng buộc mà tài liệu nói không rõ (ví dụ "tối đa 50 ký tự" nhưng không nói được nhập chữ gì), skill **hỏi bạn** thay vì tự chế ra quy tắc. Bạn trả lời, hoặc nói "bỏ qua".

## 4. Bạn nhận được gì

Với mỗi luồng, một file `.html` double-click là mở bằng trình duyệt — không cần cài gì, không cần internet. Kèm theo một file **cửa vào điều hướng** `{feature}-wireframe.html`: bên trái là mục lục (luồng → màn), giữa là sơ đồ luồng bấm được, và khung xem từng luồng. Đây là file bạn mở để xem cả tính năng.

Ngay dưới phần hình vẽ mỗi luồng là một **bảng mô tả 5 cột**: số thứ tự, tên element, loại điều khiển, kiểu tương tác, và mô tả. Cột mô tả không hời hợt — nó ghi rõ ô này để làm gì, ràng buộc nào, các trạng thái (bình thường / đang gửi / lỗi), bấm vào đi đâu, lỗi hiện wording gì. Đây là phần dev và tester dùng thật.

## 5. Nó KHÔNG làm gì (để khỏi kỳ vọng nhầm)

- **Không tô màu, không click-through.** Cố tình đen trắng + tĩnh, để người xem tập trung vào bố cục chứ không sa vào màu sắc. Muốn bản có màu bấm được để demo thì đó là việc của `/prototype-html` (một lệnh khác).
- **Không tự nghĩ ra luồng.** Luôn bám `userflow.md`.
- **Không bịa số liệu/lỗi.** Thiếu nguồn thì hỏi bạn.

## 6. Một câu tóm lại

> `/wireframe-html` biến "bản đồ luồng" của một tính năng thành các trang wireframe đen trắng — element HTML thật, đúng tỉ lệ thiết bị, kèm bảng mô tả từng ô — để bạn và team nhìn thấy bố cục màn hình trước khi thiết kế đẹp hay lập trình.
