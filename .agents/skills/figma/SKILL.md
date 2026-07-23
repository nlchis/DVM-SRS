---
name: figma
description: Sử dụng khi người dùng muốn dựng bản thiết kế giao diện (UI/UX) cho trang web trên Figma bằng cách kết nối Figma UI MCP Bridge. Kích hoạt bằng lệnh `/figma <yêu cầu>` hoặc `/figma @<tệp>` hoặc `/figma` (tương tác trực tiếp). Kết quả là các frame và component thiết kế thực tế trên bản vẽ Figma.
---

# /figma — Dựng Bản Thiết Kế Figma (Figma UI MCP Bridge)

## Mục tiêu (Goal)
Tự động hóa toàn bộ quy trình từ phân tích yêu cầu nghiệp vụ, lập sơ đồ bố trí màn hình đến việc trực tiếp thiết kế các màn hình UI chất lượng cao trên Figma. Thiết kế phải tuân thủ nghiêm ngặt hệ thống thiết kế (Design Tokens & Rules) được định nghĩa trong file `DESIGN.md` (hoặc `design.md`), đồng thời tự động rà soát, phát hiện và sửa các lỗi thiết kế sau khi vẽ.

## Ràng buộc (Constraints)
- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các phản hồi trong chat và tài liệu sinh ra.
- **Kết nối & Tự sửa lỗi mạng**:
  - Phải xác thực trạng thái kết nối thông qua MCP tool `figma_status` (hoặc endpoints `/health` và `/status` của local bridge).
  - Nếu kết nối thất bại, Agent phải tự động phân tích lỗi (ví dụ: cổng 38451 bị đóng, plugin chưa chạy) và hướng dẫn người dùng chạy lệnh `npx figma-ui-mcp` hoặc kết nối lại, thay vì bỏ qua lỗi.
- **Phân tích Tài liệu Nghiệp vụ**:
  - Chủ động tìm kiếm các tài liệu đặc tả nghiệp vụ, URD, BRD, sơ đồ wireframe có sẵn trong thư mục hiện tại (ví dụ: các file `.docx`, `.md`).
  - **Không tự ý giả định**: Nếu thông tin trong tài liệu chưa đầy đủ hoặc mơ hồ, bắt buộc phải hỏi lại người dùng để làm rõ (ví dụ: tỷ lệ màn hình mong muốn Desktop/Mobile, các tính năng cụ thể trên màn, các business rules đặc biệt).
- **Phê duyệt Sơ đồ Bố trí (Plan Gate - Bắt buộc)**:
  - Trước khi vẽ, phải gửi một bản kế hoạch tóm tắt (Kế hoạch L1) liệt kê: danh sách các màn hình sẽ vẽ, mục đích/chức năng từng màn, vị trí tọa độ (X, Y) dự kiến trên Figma và thứ tự các màn.
  - **Quy tắc sắp xếp bố cục (Layout rules)**:
    - Trong **cùng một luồng nghiệp vụ**: Sắp xếp các màn hình tuần tự từ **trái sang phải** (tăng dần trục X).
    - Khi chuyển sang **luồng nghiệp vụ mới**: Thực hiện **ngắt dòng xuống phía dưới** (tăng trục Y, đặt lại X về điểm xuất phát).
  - Chờ người dùng gõ xác nhận đồng ý (`Y` hoặc phản hồi chỉnh sửa) trước khi tiến hành vẽ.
- **Quy tắc Thiết kế Nhất quán (Design System Gate)**:
  - Bắt buộc phải tìm kiếm và nghiên cứu kỹ các quy định thiết kế trong file `design.md` hoặc `DESIGN.md` ở thư mục hiện tại.
  - Nếu phát hiện nhiều file hướng dẫn thiết kế khác nhau, bắt buộc dừng lại hỏi người dùng để chọn duy nhất một file thiết kế áp dụng cho dự án.
  - Sử dụng API `setupDesignTokens` để đồng bộ các mã màu, font chữ, border radius, spacing từ file design system đã chọn lên Figma trước khi vẽ.
- **Rà soát & Tự sửa lỗi (Self-Correction Loop)**:
  - Sau khi vẽ xong, bắt buộc thực hiện kiểm tra lại thiết kế thông qua các lệnh đọc tree hoặc chụp hình.
  - Phát hiện và chủ động gọi API chỉnh sửa (`modify`, `delete`, `append`) nếu có lỗi: chữ bị mất/đè/chèn khuất, component sai vị trí, tràn viền (overflow), lỗi font chữ, sai lệch tỷ lệ.

## Đầu vào (Inputs)
```
/figma                                             # Tương tác trực tiếp: hỏi yêu cầu thiết kế màn hình
/figma <yêu cầu cụ thể hoặc tên luồng màn hình>     # Nhận yêu cầu chi tiết từ câu lệnh
/figma @<tài liệu nghiệp vụ>                        # Đọc yêu cầu từ tệp tin nghiệp vụ được tag
```

## Các bước thực hiện (Approach)

### Phase A — Kết nối & Kiểm tra Trạng thái Figma MCP
1. Gọi tool `figma_status` (hoặc tương đương) để kiểm tra kết nối với Figma UI MCP Bridge.
2. Nếu không thành công:
   - Kiểm tra xem cổng cục bộ (mặc định 38451) có đang phản hồi không.
   - Hướng dẫn người dùng chạy lệnh khởi động Bridge: `npx figma-ui-mcp` hoặc mở plugin "Figma UI MCP Bridge" trong Figma và nhấn Reconnect.
   - Tiến hành thử kết nối lại cho đến khi thành công.

### Phase B — Phân tích Yêu cầu & Làm rõ Nghiệp vụ
1. Tìm kiếm và đọc nội dung các file đặc tả yêu cầu nghiệp vụ trong thư mục dự án (ví dụ các file `.docx` đặc tả đối soát, file `.md` mô tả thiết kế).
2. Trích xuất thông tin về các màn hình cần dựng cho dự án Đối soát Tự động (ARS).
3. Đặt câu hỏi làm rõ với người dùng về:
   - Độ phân giải/Tỷ lệ màn hình mục tiêu (ví dụ: Desktop 1440x900, Mobile 375x812).
   - Danh sách tính năng chi tiết trên mỗi màn hình (ví dụ: bộ lọc đối soát, bảng chi tiết giao dịch lệch, biểu đồ trực quan).
   - Bất kỳ lưu ý đặc biệt nào về luồng thao tác của người dùng.

### Phase C — Đề xuất Kế hoạch Bố trí (Plan Gate)
1. Xác định danh sách màn hình cần vẽ dựa trên yêu cầu đã phân tích.
2. Thiết lập tọa độ X, Y cho từng màn hình trên bản vẽ Figma:
   - Các màn hình trong cùng 1 luồng (Happy path, trạng thái lỗi): X tăng dần (cách nhau khoảng cách trống an toàn, ví dụ 1600px).
   - Màn hình luồng mới: X quay về vị trí ban đầu (ví dụ X=0), Y tăng lên (cách nhau khoảng cách trống an toàn, ví dụ 1200px).
3. **Checkpoint 1**: In bản kế hoạch tóm tắt trong chat bao gồm:
   - Danh sách các màn hình và mục đích của từng màn.
   - Tọa độ thiết kế dự kiến (X, Y) để người dùng dễ hình dung luồng từ trái sang phải, từ trên xuống dưới.
   - Chờ xác nhận của người dùng (`Y`/`Sửa`/`Hủy`).

### Phase D — Áp dụng Quy định Thiết kế & Khởi tạo (Design System Gate)
1. Tìm các file dạng `*design*.md` trong thư mục hiện tại.
2. Nếu tìm thấy nhiều file:
   - Dừng lại hỏi người dùng: *"Em tìm thấy nhiều file thiết kế [{file1}, {file2}]. Anh/chị muốn áp dụng quy chuẩn thiết kế của file nào cho trang web ARS?"*
3. Đọc chi tiết file thiết kế được chọn.
4. Gọi `setupDesignTokens` để đồng bộ toàn bộ biến màu sắc, kiểu chữ và kích thước quy chuẩn lên collection của Figma.

### Phase E — Thực thi Vẽ Giao diện trên Figma
1. Thực hiện tạo các Frame màn hình tương ứng với tọa độ (X, Y) đã được phê duyệt ở Phase C.
2. Tạo các khối layout cơ bản (Sidebar, Header, Main Dashboard Card, Footer) dựa trên tỷ lệ màn hình.
3. Tạo các component chi tiết (Nút bấm, Input field, Bảng dữ liệu đối soát, Trạng thái thành công/lỗi, Biểu đồ) sử dụng đúng biến thiết kế đã đăng ký ở Phase D.
4. Sắp xếp vị trí các phần tử con bên trong Frame màn hình một cách cân đối, sử dụng Auto Layout nếu cần thiết để hạn chế lệch vị trí.

### Phase F — Rà soát & Tự sửa lỗi (Self-Correction Loop)
1. Quét lại cấu trúc các Frame vừa tạo bằng cách lấy thông tin chi tiết qua `get_selection` hoặc `get_design`.
2. Kiểm tra các lỗi phổ biến:
   - Lỗi tràn viền (Kích thước phần tử con lớn hơn phần tử cha).
   - Lỗi font chữ (Font chữ không thuộc hệ thống thiết kế quy định hoặc bị thiếu font).
   - Chữ bị đè/chèn lên nhau (xảy ra khi gán cứng `width: 100, height: 100` và `textAutoResize: "NONE"`, làm chữ bị xếp thành cột đứng và đè lên nhau).
   - Component bị lệch vị trí, sai khoảng cách quy định.
3. Chủ động thực hiện chỉnh sửa lỗi bằng lệnh `modify` hoặc điều chỉnh tọa độ. Lặp lại quá trình quét cho đến khi thiết kế đạt chuẩn không còn lỗi hiển thị.
4. **Quy trình tối ưu hóa co giãn Text (textAutoResize)**:
   - Đối với các nhãn đơn dòng (Logo, menu, nút bấm, tiêu đề, ô bảng biểu): Thiết lập `textAutoResize: "WIDTH_AND_HEIGHT"` (Hug Contents) để chữ tự động mở rộng theo hàng ngang mà không xuống dòng.
   - Đối với các đoạn văn dài/textarea (nội dung giải trình, phản hồi, thông báo lỗi): Thiết lập `textAutoResize: "HEIGHT"` để giữ nguyên chiều rộng thiết kế (ví dụ 450px - 560px) nhưng tự động điều chỉnh chiều cao theo dòng chữ.

## Những điều cần lưu ý (Gotchas) & Quy tắc Thiết kế
- **Cơ chế Node từ getNodeById**: Các node trả về từ `figma.getNodeById(id)` chỉ là bản sao JSON đơn giản (không có `.children`). Muốn duyệt cây có `.children`, bắt buộc phải dùng `figma.get_design({ id })` hoặc `figma_read` với `operation: "search_nodes"`.
- **Tránh Timeout bằng search_nodes**: Gọi `get_design` trên các frame/clone lớn dễ gây timeout 30-60 giây. Hãy dùng `search_nodes` (lọc theo `type: "FRAME"` hoặc `namePattern`) để lấy ID con cực nhanh (dưới 1 giây).
- **Mẹo Reorder bypass cache**: Figma Bridge có thể bỏ qua lệnh thay đổi parent nếu parentId trùng khớp. Để ép reorder vị trí các con trong Auto Layout, di chuyển chúng sang Parent tạm thời ở giao dịch 1 (một tool call `figma_write`), rồi di chuyển chúng ngược lại Parent gốc theo đúng thứ tự mong muốn ở giao dịch 2.
- **Tránh xung đột HUG (AUTO) và STRETCH (FILL)**: 
  - Nếu cha ôm con (`counterAxisSizingMode: "AUTO"`), bắt buộc ít nhất một con không được co giãn (`STRETCH`) để làm điểm tựa chiều cao cho cha.
  - Con dùng `STRETCH` nhưng đặt `primaryAxisSizingMode: "AUTO"` sẽ làm mất tác dụng của lệnh Stretch của cha. Hãy dùng `primaryAxisSizingMode: "FIXED"` trên các Sidebar/Panel cần kéo giãn dọc.
- **Thứ tự Resize và Sizing Mode**: Gọi `figma.resize` sẽ tự động chuyển Sizing Mode sang `FIXED`. Thiết lập `sizingMode` sang `"AUTO"` phải được gọi **sau** khi đã gọi `resize`.
- **Quy tắc Bottom-Up khi sửa Text**: Luôn set `textAutoResize` trước cho text tự nở rộng theo nội dung thật, sau đó mới set `sizingMode: "AUTO"` cho nút/badge chứa nó ôm vừa vặn lấy chữ, tránh tình trạng nút bị co rúm ở size 100px.
- **Thanh tiến trình Timeline dọc nối liền**:
  - Không đặt padding-bottom hoặc itemSpacing trên khung dòng `TrackStep` vì sẽ tạo khoảng trống gap vật lý mà đường Line dọc không thể vẽ tràn qua.
  - Giải pháp: Đặt `itemSpacing: 0` trên khung danh sách `StepsList`. Thêm `paddingBottom: 24` vào **khung text cột bên phải** của từng bước để đẩy chiều cao bước đó lên. Cột chứa đường vẽ bên trái set `layoutAlign: "STRETCH"` và đường Line dọc set `layoutGrow: 1` để Line kéo dài chạm khít vào chấm trạng thái của bước sau.
- **Căn thẳng cột bảng biểu (Data Table)**:
  - Cấu hình chiều rộng cố định (`primaryAxisSizingMode: "FIXED"`) và cùng một kích thước `width` cho các cột Header và dữ liệu tương ứng ở các dòng (Mã Đơn `120px`, Trạng Thái `150px`, Thao Tác `80px`). Các cột cần giãn đặt `layoutGrow: 1`.
  - Bắt buộc tiêu đề cột ở Header và dữ liệu tương ứng ở các dòng phải có cùng thuộc tính căn lề (`textAlign: "LEFT"` hoặc `"CENTER"`).
- **Tránh méo hình khi resize parent**: Resize một Frame chứa Icon/Vector có thể làm méo icon do ràng buộc `SCALE`. Thiết lập ràng buộc của icon con thành `MIN` (Left, Top) trước khi thay đổi kích thước cha, hoặc luôn gọi `figma.resize` ép kích thước icon về đúng `20x20px` sau khi sửa kích thước cha.
- **Tải Font chữ trước khi sửa TEXT**: Khi sửa đổi các thuộc tính văn bản trên TEXT node, bắt buộc gọi `await figma.loadFontAsync(node.fontName)` trước.
- **Tối ưu hóa hiệu năng bằng figma.batch**: Gom các thao tác chỉnh sửa thành các mảng và thực thi bằng `figma.batch()` theo từng nhóm 40-50 nodes để tránh timeout.


## Tài liệu tham chiếu (References)
- [DESIGN.md](file:///d:/ARS/DESIGN.md) (Quy chuẩn thiết kế mặc định)
- @.agents/rules/ba-conventions.md
- @.agents/rules/approval-gate.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/resolve-oqs.md

