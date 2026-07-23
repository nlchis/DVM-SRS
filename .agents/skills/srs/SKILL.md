---
name: srs-compiler
description: Tổng hợp tài liệu đặc tả yêu cầu phần mềm (SRS) cho dự án dựa trên kết quả brainstorm, spec, diagram, usecase, wireframe, và prototype. Khi kích hoạt bằng lệnh /srs, hệ thống sẽ tự động gọi /workflow để quét và chuẩn bị các tài liệu tiền đề, sau đó biên dịch thành tệp SRS.md hoàn chỉnh và hiển thị tab preview đặc tả trước khi lưu tệp chính thức.
---

# /srs — Dựng Tài Liệu Đặc Tả Yêu Cầu Phần Mềm (SRS)

Skill này đóng vai trò là **skill điều phối cha** chịu trách nhiệm chạy quy trình `/workflow` tuần tự để thu thập tài liệu, sau đó thực hiện biên dịch, tổng hợp và định hình tài liệu Đặc tả yêu cầu phần mềm (SRS) hoàn chỉnh cho dự án.

## Đầu vào (Inputs)

Lệnh kích hoạt chính: `/srs` hoặc có thể gọi trực tiếp khi người dùng yêu cầu dựng tài liệu SRS.

## Cách tiếp cận & Quy trình (Approach)

Khi người dùng kích hoạt lệnh `/srs`, hệ thống sẽ chạy qua 4 giai đoạn:

```
[Giai đoạn 1: Chuẩn bị]   →  Kích hoạt tự động /workflow để quét và đồng bộ các tài liệu tiền đề
[Giai đoạn 2: Biên dịch]   →  Tổng hợp thông tin từ các folder con thành cấu trúc tài liệu SRS.md
[Giai đoạn 3: Phê duyệt]   →  Hiển thị bản nháp đặc tả (Preview Tab) và ghi file khi người dùng đồng ý (Y)
[Giai đoạn 4: Minh họa trên HTML] → Hỏi người dùng có muốn xuất HTML preview. Nếu có, gọi /prototype (từ Phase D) để tạo web có navigation và zoom ảnh.
```

---

### Giai đoạn 1: Kích Hoạt Workflow Chuẩn Bị
Hệ thống tự động kích hoạt skill `/workflow` ([srs/workflow/SKILL.md](file:///d:/ARS/.agents/skills/srs/workflow/SKILL.md)) để thực hiện quét sự tồn tại của các tài liệu tiền đề, chạy cascade các skill thiếu qua các Approval Gates (L1 Plan Gate, Usecase Gate, Prototype Gate), sau đó thực hiện **Đánh giá tính đầy đủ & Đề xuất triển khai (Completeness Audit & Action Proposal)** để người dùng duyệt trước khi tạo cấu trúc thư mục đóng gói tại `docs/{feature}/srs/`.

---

### Giai đoạn 2: Biên Dịch Tài Liệu SRS (Đọc Trực Tiếp Từ Thư Mục Gốc)
Sau khi các tài liệu tiền đề tại `docs/{feature}/` đã sẵn sàng, hệ thống tiến hành đọc dữ liệu trực tiếp từ các thư mục gốc (`spec/spec.md`, `brainstorms/`, `usecases/`, `wireframes/`, `prototypes/`, `diagrams/`) và biên dịch thành tệp `docs/{feature}/srs/srs.md` duy nhất mà **KHÔNG SAO CHÉP / CLONE** bất kỳ file gốc nào thành tệp trùng lặp. Cấu trúc chi tiết của tệp `srs.md`:

#### **Phần 1: Giới thiệu (Introduction)**
*   **1.1. Mục đích (Purpose):** Khái quát mục tiêu của tài liệu SRS và đối tượng độc giả (lấy từ tài liệu `brainstorm`).
*   **1.2. Phạm vi (Scope):** Định nghĩa phạm vi sản phẩm, tính năng và phân hệ (lấy từ tài liệu `brainstorm`).
*   **1.3. Thuật ngữ & Từ viết tắt (Glossary):** Tổng hợp bảng định nghĩa thuật ngữ sử dụng trong hệ thống (lấy từ `brainstorm` và `spec.md`).
*   **1.4. Tài liệu tham khảo (References):** Danh sách tài liệu tham chiếu (lấy từ `brainstorm` và quy trình `workflow`).
*   **1.5. Tổng quát (Product Overview):** Mô tả bức tranh tổng thể của phân hệ tính năng (lấy từ `brainstorm`).

#### **Phần 2: Các yêu cầu chức năng (Functional Requirements - FR)**
*   **2.1. Các tác nhân (Actors):** Mô tả các vai trò tham gia hệ thống và quyền hạn tương ứng (lấy từ `brainstorm` và `spec.md`).
*   **2.2. Mô hình tổng thể hệ thống (System Diagram):** Nhúng sơ đồ hệ thống tổng quan (Sơ đồ tuần tự - Sequence Diagram hoặc Architecture Diagram) bằng định dạng **Mermaid hoặc PlantUML** (tùy thuộc vào quyết định của người dùng khi chạy skill `/diagram` trước đó và định dạng tệp lưu trữ trong thư mục `diagrams/`).
*   **2.3. Sơ đồ tuần tự luồng dữ liệu:** Biểu diễn luồng tương tác chi tiết giữa các hệ thống (nếu có).
*   **2.4. Danh sách chức năng FR (FR List):** Bảng tổng hợp danh sách chức năng FR (lấy từ `spec.md`).
*   **2.5. Đặc tả các use case (Use Case Specifications):**
    Với mỗi Use Case trong hệ thống, đặc tả chi tiết theo đúng thứ tự các tiểu mục sau:
    1.  **Thông tin Use Case:** Mã UC, Tên UC, Người tạo, Ngày tạo, Lần cuối cập nhật, Độ ưu tiên, Tần suất sử dụng (lấy từ `usecases/`).
    2.  **Tác nhân:** Tác nhân chính (Primary Actor), Tác nhân phụ (Secondary Actor) (lấy từ `usecases/`).
    3.  **Điều kiện kích hoạt (Trigger):** Sự kiện kích hoạt Use Case (suy luận từ luồng tương tác hoặc lấy từ `usecases/`).
    4.  **Tiền điều kiện & Hậu điều kiện (Preconditions & Postconditions) (lấy từ `usecases/`).**
    5.  **Sơ đồ Flowchart luồng xử lý dữ liệu:** Biểu diễn trực quan luồng sự kiện chính (Normal Course) kết hợp luồng thay thế (Alternative) và ngoại lệ (Exceptions) dưới dạng sơ đồ Flowchart (Mermaid hoặc PlantUML), đặt ngay TRƯỚC phần mô tả chữ.
    6.  **Mô tả luồng sự kiện (Normal, Alternative, Exceptions):** Mô tả chi tiết bằng chữ các bước thực hiện.
    7.  **Màn hình giao diện (Wireframe/Prototype):** Trong file `SRS.md`, chỉ để đường link tham chiếu tới file wireframe gốc (ví dụ: `[link](file://...)`). Lưu ý: Giao diện ASCII thực tế chỉ được nhúng nội tuyến (inline) để hiển thị khi xuất bản bản Preview HTML.
    8.  **Mô tả chi tiết chức năng (Screen Data Field Description):** Bảng đặc tả trường dữ liệu màn hình (STT | Tên trường dữ liệu | Định dạng | Bắt buộc? (Y/N) | Mô tả) (lấy từ mục mô tả trường dữ liệu của `usecases/`).

#### **Phần 3: Các yêu cầu phi chức năng (Non-Functional Requirements - NFR)**
*   Thông tin được lấy trực tiếp từ mục Yêu cầu phi chức năng trong tệp `spec.md`.
*   Cấu trúc của phần này sẽ **linh hoạt theo các mục thực tế có trong tệp `spec.md`** chứ không bắt buộc lúc nào cũng phải chia thành đúng 3 mục cố định (UI, Bảo mật, Ràng buộc).

#### **Phần 4: Câu hỏi mở & Các vấn đề chưa giải quyết (Open Questions & TBDs)**
*   Tổng hợp các câu hỏi mở, vấn đề nghiệp vụ hoặc kỹ thuật cần làm rõ thêm trong quá trình phát triển (lấy từ mục Ghi chú và Vấn đề của các tài liệu use case hoặc spec.md).
*   Định dạng: Bảng chi tiết gồm các trường: STT | Mã TBD | Nội dung vấn đề / Câu hỏi mở | Người chịu trách nhiệm | Hạn xử lý | Trạng thái.

### ⚠️ Quy tắc tìm kiếm thông tin mở rộng (Fallback & Consistency)
Trong quá trình biên dịch, nếu hệ thống không tìm được thông tin liên quan tại các skill đã chỉ định mặc định:
1.  Hệ thống sẽ **tự động mở rộng phạm vi tìm kiếm sang tất cả các tài liệu của các skill còn lại** để thu thập thông tin đầy đủ.
2.  Thông tin thu thập từ các nguồn khác nhau phải được thống nhất xuyên suốt và không xung đột logic.
3.  Nếu sau khi mở rộng phạm vi tìm kiếm vẫn không tìm thấy thông tin cần thiết (ví dụ: thiếu thông tin bắt buộc như "Điều kiện kích hoạt"), hệ thống **bắt buộc phải dừng lại hỏi người dùng để làm rõ hoặc xác nhận đề xuất tự động**. Tuyệt đối không tự ý bỏ qua hoặc bịa đặt thông tin không có cơ sở.

---

### Giai đoạn 3: Phê Duyệt Bản Nháp (Draft Preview Gate)
1.  **Dựng Draft Preview:** Sau khi biên dịch xong, hệ thống không lưu file tạm trên đĩa cứng mà **hiển thị trực tiếp bản nháp SRS.md dưới dạng một tab preview (Gemini Artifact)** để người dùng review cấu trúc và nội dung Markdown.
2.  **Đồng ý (Y):** Chỉ khi người dùng xác nhận phê duyệt bản draft (`Y` / `Accept`), hệ thống mới tiến hành ghi đè chính thức nội dung vào tệp [docs/{feature}/srs/SRS.md](file:///d:/ARS/docs/{feature}/srs/SRS.md).
3.  **Lưu Nhật ký thay đổi (changelog.md):** Ghi nhận đầy đủ thông tin về việc tạo mới/cập nhật tệp `SRS.md` vào tệp [changelog.md](file:///d:/ARS/docs/{feature}/srs/changelog.md) (bao gồm cả các chi tiết thay đổi trên file srs.md).

---

### Giai đoạn 4: Minh họa trên HTML
Sau khi tạo thành công tệp SRS chính thức ở Giai đoạn 3, hệ thống sẽ hỏi người dùng: *"Bạn có muốn minh họa cụ thể tài liệu này ở định dạng HTML để dễ dàng xem và điều hướng không? (Y/N)"*.
1. **Nếu đồng ý (Y):** Hệ thống tự động chạy skill `/prototype` với yêu cầu tạo file HTML tĩnh để preview tài liệu SRS vừa xây dựng.
   *   **Chọn lọc Phase:** Chỉ chạy skill `/prototype` từ **Phase D (Triển khai code UI - Dựng file HTML/CSS/JS tĩnh)** trở đi.
   *   **Yêu cầu tính năng HTML:** 
       *   Có thanh điều hướng (Navigation menu) ở cạnh bên để di chuyển nhanh đến từng đầu mục cụ thể của tài liệu.
       *   Các hình ảnh và sơ đồ (Mermaid/PlantUML diagrams) phải hỗ trợ tính năng phóng to/thu nhỏ (zoom in/out).
       *   Hiển thị trung thực và đầy đủ 100% nội dung chữ, bảng biểu, danh sách từ file SRS gốc.
       *   Đặc biệt: Tự động trích xuất nội dung block ASCII Wireframe từ các file con tương ứng để thay thế cho các link tham chiếu, hiển thị giao diện nhúng trực tiếp ngay trên trang HTML.
2. **Nếu từ chối (N):** Hoàn tất toàn bộ quy trình biên dịch SRS.

---

## Những điều cần lưu ý (Gotchas)
- **Data Traceability:** Phải đối chiếu chéo thông tin giữa các file đầu vào để đảm bảo tính nhất quán (ví dụ: tên Tác nhân trong bảng đặc tả use case phải trùng khớp hoàn toàn với danh sách tác nhân ở Phần 2).
- **Quy tắc soạn thảo & Thuật ngữ BA:** Tuyệt đối không đưa các thiết kế database vật lý, cấu trúc class code, hoặc các biệt ngữ kỹ thuật (technical jargon - ví dụ: "Immutable audit trail", "Solution design") vào tài liệu đặc tả SRS. Phải sử dụng thuần thuật ngữ mô tả nghiệp vụ của Business Analyst.
- **Chuẩn hóa thông tin Tác giả:** Mặc định luôn để thông tin tác giả trong các tài liệu, bảng biểu (kể cả Changelog) là `@nlchis`. Tuyệt đối không tự ý giả lập các chức danh như "AI BA", "IT BA", hay "AI BA Senior".
- **Cú pháp Mermaid:** Khi vẽ sơ đồ Mermaid, các nhãn (label) của node nếu có chứa khoảng trắng hoặc ký tự đặc biệt thì bắt buộc phải bọc trong dấu ngoặc kép (ví dụ: `id["Nội dung nhãn"]`) để tránh lỗi parse rendering khiến biểu đồ hiển thị trắng.

