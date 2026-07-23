---
name: prototype
description: Sử dụng khi người dùng muốn dựng bản thiết kế prototype có thể tương tác được (Interactive Prototype) từ các tài liệu trong dự án (wireframe, brainstorm, URD, BRD...) dưới dạng Figma prototype hoặc trang web HTML. Kích hoạt bằng lệnh `/prototype <yêu cầu>` hoặc `/protype`.
---

# /prototype — Dựng Bản Thiết Kế Prototype Tương Tác

## Mục tiêu (Goal)
Tự động hóa quy trình xây dựng bản thiết kế prototype tương tác được (Interactive Prototype) từ các tài liệu đặc tả nghiệp vụ, wireframe, brainstorm có sẵn trong dự án. Bản thiết kế prototype phải mô phỏng chân thực các tính năng, luồng thao tác của người dùng (user flow), các trường hợp validate dữ liệu, dữ liệu mẫu (demo data), và có sự liên kết động giữa các màn hình để người dùng có thể click tương tác như trên một ứng dụng thật.

## Ràng buộc (Constraints)
- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các tài liệu tạo ra và phản hồi trong chat.
- **Không tự ý giả định**: Phải phân tích kỹ các trigger, danh sách tính năng, thao tác người dùng và kết quả của từng chức năng. Nếu có điểm chưa rõ hoặc mơ hồ trong tài liệu nghiệp vụ, phải đặt câu hỏi làm rõ với người dùng.
- **Duyệt Kế hoạch Bố trí & Tính năng (Plan Gate - Bắt buộc)**:
  - Trước khi dựng thiết kế, bắt buộc phải tạo một bản tóm tắt kế hoạch thực hiện bao gồm: danh sách các màn hình, minh họa các tính năng có trong màn, luồng thao tác của người dùng.
  - Chờ người dùng xác nhận phê duyệt kế hoạch (`Y`/`Sửa`/`Hủy`) trước khi tiến hành tạo file hoặc vẽ.
- **Lựa chọn hình thức Output**:
  - Phải hỏi ý kiến người dùng về định dạng đầu ra mong muốn: **Figma** hay **HTML**.
  - Nếu chọn **Figma**: Kết nối với skill `/figma` để dựng các frame, component và thiết lập liên kết tương tác qua API `figma.setReactions` (mô tả rõ trigger click/hover).
  - Nếu chọn **HTML**: Dựng một tệp HTML tự chứa (self-contained HTML) có giao diện đẹp, sử dụng TailwindCSS (CDN) hoặc CSS thuần, thiết kế thanh navigation và phân tách các case/trạng thái thành từng tab trực quan để người dùng dễ dàng chuyển đổi và chạy thử.
- **Yêu cầu Chất lượng**: Bản thiết kế (Figma/HTML) phải chứa đầy đủ validation (thông báo lỗi khi nhập sai, trạng thái thành công/thất bại), dữ liệu mẫu thực tế, các liên kết logic và nút bấm hoạt động được.

## Đầu vào (Inputs)
```
/prototype                                         # Tương tác trực tiếp: hỏi nghiệp vụ và yêu cầu dựng prototype
/prototype <yêu cầu cụ thể hoặc tên tính năng>     # Nhận yêu cầu chi tiết từ câu lệnh
/protype <yêu cầu>                                 # Hỗ trợ lệnh viết tắt/gõ sai
/prototype @<tài liệu nghiệp vụ>                    # Đọc và phân tích nghiệp vụ từ tệp tin được tag
```

## Các bước thực hiện (Approach)

### Phase A — Nhận Input & Phân Tích Bối Cảnh
1. Lắng nghe yêu cầu từ lệnh `/prototype` (hoặc `/protype`).
2. Quét toàn bộ thư mục hiện tại để tìm các tài liệu liên quan đến tính năng cần làm (ví dụ: các tệp wireframe ASCII trong `docs/`, các tài liệu brainstorm, URD, BRD).
3. Đọc và hiểu bối cảnh nghiệp vụ, các bước trong luồng người dùng hiện có.

### Phase B — Phân tích Chi tiết Nghiệp vụ & Thiết kế Luồng Tương Tác
1. Liệt kê danh sách các màn hình cần thiết để mô phỏng hoàn chỉnh luồng nghiệp vụ.
2. Phân tích chi tiết:
   - Các hành động của người dùng (click vào đâu, điền thông tin gì).
   - Các trigger tương tác (onClick, onHover, onChange).
   - Logic validate dữ liệu (các trường bắt buộc, định dạng dữ liệu).
   - Trạng thái phản hồi của hệ thống (thông báo thành công, pop-up lỗi, tooltip hướng dẫn).
3. Chuẩn bị dữ liệu mẫu (demo data) thực tế và phong phú để hiển thị trong prototype.
4. Đặt các câu hỏi làm rõ cho người dùng (nếu có điểm chưa rõ ràng).

### Phase C — Lựa chọn Output & Checkpoint Phê duyệt Kế hoạch (Plan Gate)
1. Hỏi người dùng về hình thức xuất bản thiết kế:
   > Anh/chị muốn xây dựng bản prototype tương tác này dưới dạng nào?
   > 1. **Vẽ trên Figma** (Dựng các màn hình và thiết lập prototype links trực tiếp trên Figma).
   > 2. **Tạo trang web HTML** (Tạo file HTML chạy trực tiếp trên trình duyệt, có thanh navigation điều hướng và chia tab các trường hợp test).
2. Trình bày Kế hoạch L1 tóm tắt trực tiếp trong chat:
   - Danh sách các màn hình sẽ xây dựng.
   - Các tính năng và tương tác chính trên từng màn hình.
   - Luồng thao tác của người dùng từ điểm bắt đầu đến khi kết thúc.
3. Chờ phản hồi xác nhận phê duyệt từ người dùng (`Y`/`Sửa`/`Hủy`).

### Phase D — Thực thi Xây dựng Prototype

#### Trường hợp 1: Dựng prototype trên Figma
1. Đọc tệp thiết kế `DESIGN.md` hiện tại để đảm bảo nhất quán về màu sắc, font chữ, border radius, và spacing.
2. Kết nối Figma plugin thông qua skill `/figma`, gọi `setupDesignTokens` để cập nhật tokens.
3. Tạo các frame màn hình theo tọa độ luồng (từ trái qua phải). Dựng các component chi tiết (Nút bấm, form nhập liệu, bảng dữ liệu mẫu, thông báo lỗi).
4. Thiết lập tương tác giữa các phần tử bằng `figma.setReactions` (ví dụ: click nút "Submit" hiển thị pop-up validate, click "Next" chuyển sang màn hình tiếp theo với hiệu ứng Smart Animate).

#### Trường hợp 2: Dựng prototype dưới dạng file HTML
1. Tạo một tệp HTML tự chứa (self-contained) tại đường dẫn phù hợp (ví dụ: `docs/{feature}/prototypes/{prototype-slug}.html`).
2. Thiết kế giao diện hiện đại, chuyên nghiệp (SaaS Plus/Corporate layout) tương thích với hệ màu của dự án:
   - Sidebar/Navigation bar để chuyển đổi linh hoạt giữa các màn hình/luồng chính.
   - Phân chia các case kiểm thử (Happy path, validation error, Checker approve, checker reject) dưới dạng các tab rõ ràng.
   - Thêm mã JavaScript để xử lý tương tác động (validate form, hiển thị thông báo, cập nhật bảng dữ liệu mẫu khi tương tác).
3. Khởi chạy một local web server ngầm (ví dụ sử dụng `npx -y serve -l 38452`) và cung cấp đồng thời cả hai loại link:
   - **Link xem Preview trực tiếp trên IDE** bằng cách sử dụng giao thức `file://` với đường dẫn tuyệt đối (ví dụ: `[Xem Preview cục bộ](file:///d:/ARS/docs/{feature}/prototypes/{prototype-slug}.html)` - chú ý viết đúng định dạng link markdown và dùng dấu gạch chéo `/` cho đường dẫn Windows) để người dùng có thể preview trực tiếp tại cửa sổ preview của IDE ngay lập tức mà không cần click link localhost.
   - **Link localhost** (ví dụ `http://localhost:38452/docs/{feature}/prototypes/{prototype-slug}.html`) để truy cập trên trình duyệt.

### Phase E — Rà soát & Tự sửa lỗi (Self-Correction Loop)
1. Chạy thử và kiểm tra kỹ lưỡng các liên kết tương tác:
   - Figma: Kiểm tra xem các nút bấm có chuyển màn hình đúng vị trí, pop-up có hiển thị đúng trigger không.
   - HTML: Kiểm tra lỗi JavaScript trong console, căn chỉnh layout, kiểm tra xem các chức năng validate có hoạt động đúng logic nghiệp vụ không.
2. Chủ động chỉnh sửa các lỗi hiển thị hoặc liên kết hỏng trước khi bàn giao.

### Phase F — Nghiệm thu & Walkthrough
1. Cung cấp đường dẫn đến file HTML đã tạo (đầy đủ cả link `file://` để preview trực tiếp trên IDE và link localhost) hoặc thông tin Frame trên Figma để người dùng trải nghiệm.
2. In walkthrough tóm tắt ngắn gọn các điểm nổi bật của bản prototype và hướng dẫn tương tác.
3. Hướng dẫn chi tiết cho người dùng cách xem và tương tác trực tiếp với file HTML ngay trong IDE mà không cần mở trình duyệt ngoài bằng 2 cách:
   - Cách 1: Sử dụng extension **Live Preview** của Microsoft (chuột phải chọn "Live Preview: Show Preview" hoặc click icon kính lúp góc phải).
   - Cách 2: Sử dụng lệnh **Simple Browser: Show** của VS Code thông qua Command Palette (`Ctrl + Shift + P`) và paste link localhost vào.

## Những điều cần lưu ý (Gotchas)
- **Độc lập của file HTML**: File HTML được tạo ra phải hoàn toàn tự chứa (self-contained), có thể chạy trực tiếp bằng cách click đúp file trong hệ điều hành mà không cần cài đặt server phức tạp (sử dụng CDN Tailwind CSS và JS nội bộ).
- **Tailwind CSS qua CDN**: Khi sử dụng CDN của Tailwind (`<script src="https://cdn.tailwindcss.com"></script>`), thẻ chứa CSS nội bộ phải được khai báo với `type="text/tailwindcss"` (ví dụ: `<style type="text/tailwindcss">`) thì trình duyệt mới biên dịch được các directive như `@apply`.
- **Zoom Sơ đồ Mermaid với medium-zoom**: Thư viện `medium-zoom` mặc định không hoạt động tốt trực tiếp trên thẻ `<svg>`. Cần viết script ở `postRenderCallback` để: (1) Tăng kích thước `width`/`height` của SVG lên gấp đôi dựa vào `viewBox` để ảnh không bị mờ/nhỏ; (2) Chuyển đổi `<svg>` thành chuỗi Base64 và nhúng vào thẻ `<img>`; (3) Chuyển `overflow-x-auto` của thẻ cha thành `overflow: visible !important` và nâng `z-index` khi zoom (sự kiện `open`) để tránh bị cắt xén (clipping) gây kẹt pop-up.
- **Encoding tiếng Việt trong PowerShell**: Nếu tạo hoặc chỉnh sửa file HTML bằng lệnh PowerShell, bắt buộc phải dùng cờ `-Encoding UTF8` ở cả hai lệnh `Get-Content` và `Set-Content`/`Out-File` để tránh lỗi hiển thị font (Mojibake).
- **Tránh xung đột Auto Layout trên Figma**: Khi thiết lập tương tác trên Figma, hãy đảm bảo các nút bấm hoặc layer kích hoạt trigger không làm phá vỡ cấu trúc Auto Layout của frame cha.

## Tài liệu tham chiếu (References)
- @.agents/rules/approval-gate.md
- @.agents/rules/ba-conventions.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/resolve-oqs.md
- @.agents/rules/changelog.md

