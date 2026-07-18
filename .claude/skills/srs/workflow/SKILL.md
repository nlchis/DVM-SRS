---
name: srs-workflow
description: Sử dụng khi Business Analyst muốn thiết lập quy trình (workflow) chuẩn bị và dựng tài liệu SRS. Kích hoạt tự động khi người dùng gọi skill /srs, hoặc có thể chạy trực tiếp bằng lệnh /workflow hoặc /srs-workflow. Kết quả là thiết lập thư mục srs, kiểm tra cascade các skill tiền đề (brainstorm -> spec -> diagram -> usecase -> wireframe -> prototype), sao chép tài liệu, tạo index và changelog.
---

# /workflow — Quy Trình Xử Lý Xây Dựng Tài Liệu SRS (BA Senior)

## Mục tiêu (Goal)

Quy trình này hướng dẫn chi tiết cách thức AI BA Senior thực hiện thiết lập, thu thập tài liệu từ các skill trước, tự động cấu trúc thư mục, đồng bộ hóa Use Case/Diagram/Wireframe/Prototype và theo dõi lịch sử chỉnh sửa (changelog) khi bắt đầu soạn thảo tài liệu SRS.

## Ràng buộc (Constraints)

- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các phản hồi chat và hướng dẫn lập tài liệu (tài liệu kỹ thuật/SRS có thể dùng thuật ngữ tiếng Anh nhưng nội dung mô tả bằng tiếng Việt).
- **BA Senior Role**: Đóng vai trò BA Senior dày dạn kinh nghiệm, tư duy logic, cấu trúc tài liệu mạch lạc, rõ ràng.
- **Tự động kích hoạt & Tuân thủ**: Skill workflow này sẽ tự động kích hoạt khi người dùng gọi lệnh `/srs`, `/workflow`, `/srs-workflow`, **HOẶC mỗi khi người dùng có tác động chỉnh sửa bất kỳ tài liệu nào** trong chuỗi tài liệu liên quan (brainstorm, spec, diagram, usecase, wireframe...). Việc tự động gọi lại `/workflow` sau mỗi lần sửa đổi giúp đảm bảo hệ thống luôn bám sát các quy tắc liên kết và cấu trúc.
- **Tự động rà soát Vùng ảnh hưởng (Blast Radius) & Đồng nhất tài liệu**: MỖI LẦN có một tác động sửa đổi trên một tài liệu (ví dụ: đổi tên trường dữ liệu trong Spec, thêm một nhánh trong Brainstorm), hệ thống **BẮT BUỘC** phải tự động rà soát lại vùng ảnh hưởng (blast radius) của sự thay đổi đó. Sau đó, hệ thống phải tiến hành lan truyền cập nhật (cascade update) và đồng nhất lại toàn bộ thông tin trên các tài liệu liên đới ở cả tuyến trước và tuyến sau, đảm bảo tính nhất quán 100%.
- **Quy tắc No-re-ask**: Trước khi hỏi bất kỳ câu nào, quét bối cảnh tệp tin hiện tại và lịch sử chat để loại bỏ các câu hỏi đã được trả lời.
- **Xác nhận từng skill (L1 Plan Gate)**: Khi tự động gọi bất kỳ skill tiền đề nào còn thiếu, **bắt buộc hiển thị bản xem trước kế hoạch L1 và yêu cầu người dùng duyệt (Y/Sửa/Hủy) trước khi bắt đầu chạy skill đó**. Quy tắc này áp dụng cho TỪNG SKILL riêng biệt.
- **Độc lập và Toàn vẹn**: Sao chép (copy) toàn bộ tệp tài liệu gốc từ các skill trước vào thư mục con tương ứng của `srs/` để đảm bảo tính đóng gói độc lập của một phiên bản SRS.

### Ràng buộc Liên kết Thông tin Chặt chẽ (Data Traceability & Continuity)
Hệ thống bắt buộc phải tuân thủ tính liên kết thông tin tuần tự xuyên suốt chuỗi tài liệu:
1.  **Spec:** Phải kế thừa đầy đủ và chính xác danh sách yêu cầu chức năng (FR) và các quy tắc nghiệp vụ (BR) từ tài liệu `brainstorm`.
2.  **Diagram:** Vẽ sơ đồ tương tác hệ thống dựa trên luồng nghiệp vụ đã phác thảo trong `brainstorm` và các ràng buộc kỹ thuật quy định trong `spec`.
3.  **Usecase:** Các Use Case phải được xây dựng dựa trên danh sách tính năng (Function List/CRUD) từ `brainstorm`, tích hợp các quy tắc VR/BR/STR từ `spec`, và tuân thủ trình tự tương tác trong `diagram`.
4.  **Wireframe:** Thiết kế các màn hình tương ứng dựa trực tiếp trên các bước tương tác và mô tả màn hình trong tài liệu `usecase`.
5.  **Prototype:** Dựng các màn hình hoàn chỉnh, thiết lập liên kết tương tác dựa trên tài liệu `wireframe` làm nguồn thông tin gốc.

### Ràng buộc Cấu trúc Tài liệu (Document Structure Rules)
Hệ thống phải tuân thủ nghiêm ngặt thứ tự các đầu mục (Section) và liệt kê chi tiết nguồn lấy thông tin (Data Sources) cho từng mục:

**1. Cấu trúc chuẩn của File SRS Tổng thể (`srs.md`)**
- **1. Giới Thiệu:**
  - *Mục đích & Phạm vi hệ thống (Scope):* Lấy từ phần Mục tiêu (Goal/Scope) trong tài liệu `brainstorm`.
  - *Thuật ngữ & Từ viết tắt:* Khởi tạo dựa trên các từ khóa nghiệp vụ đặc thù của dự án.
- **2. Mô Tả Tổng Quan:**
  - *Các tác nhân (Actors):* Lấy từ danh sách User Types / Roles trong tài liệu `brainstorm`.
  - *Quy tắc nghiệp vụ cốt lõi (Business Rules):* Lấy các quy tắc quan trọng nhất từ tài liệu `spec`.
- **3. Bản Đồ Sơ Đồ Hệ Thống (System Diagrams):** Liên kết và tóm tắt các sơ đồ Use Case, Sequence, Activity, State đã được tạo bởi skill `/diagram`.
- **4. Đặc Tả Chi Tiết Ca Sử Dụng (Use Cases):** Cung cấp danh sách liên kết đến các file Markdown đặc tả Use Case độc lập (kết quả của skill `/usecase`).
- **5. Đặc Tả Giao Diện Người Dùng:** Cung cấp danh sách liên kết đến các file Wireframes (kết quả của `/wireframe`) và Prototypes.
- **6. Yêu Cầu Phi Chức Năng (NFR):** Các yêu cầu đo lường được về Hiệu năng, Bảo mật, Tính sẵn sàng... Lấy toàn bộ từ phần NFR của tài liệu `spec`.
- **7. Tài Liệu Nghiệp Vụ Đi Kèm (Appendix):** Cung cấp liên kết gốc đến tài liệu `spec` (để tra cứu mã lỗi, rule chi tiết) và tài liệu `brainstorm`.

**2. Cấu trúc chuẩn của File Đặc Tả Use Case (VD: `UC-order-01.md`)**
Mỗi file Use Case BẮT BUỘC phải bao gồm các phần sau và tuân thủ nguồn lấy dữ liệu:
- **1. Thông tin chung:** Mã UC, Tên, Actor, Độ ưu tiên. *(Lấy từ danh sách Function List / CRUD trong `brainstorm`)*.
- **2. Mô tả & Điều kiện:** Mô tả nghiệp vụ, Tiền điều kiện (Preconditions), Hậu điều kiện (Postconditions). *(Lấy và suy luận từ phân tích luồng nghiệp vụ & Use Case Diagram trong `brainstorm` / `diagram`)*.
- **3. Sơ đồ Flowchart luồng xử lý:** Sơ đồ trực quan Mermaid/PlantUML. *(Kế thừa trình tự tương tác và sơ đồ từ file `diagram` tương ứng, hoặc tự sinh dựa trên luồng sự kiện bên dưới)*.
- **4. Luồng sự kiện (Course of Events):**
  - *Luồng thông thường (Normal Course):* Các bước thực thi chính.
  - *Luồng ngoại lệ (Exceptions):* Các trường hợp rẽ nhánh hoặc lỗi.
  - *(Nguồn gốc: Xây dựng bộ khung dựa trên `brainstorm`, đồng thời **tích hợp chặt chẽ** các quy tắc kiểm tra dữ liệu VR, quy tắc nghiệp vụ BR, quy tắc chuyển đổi trạng thái STR từ tài liệu `spec`)*.
- **5. Yêu cầu đặc biệt & Giao diện:**
  - *Yêu cầu đặc biệt:* Thời gian phản hồi, bảo mật... *(Lấy từ NFR trong `spec`)*.
  - *Bảng mô tả trường dữ liệu (Data Fields Table):* Bắt buộc phải có bảng liệt kê các trường thông tin hiển thị trên màn hình hoặc Payload API (Tên trường, Kiểu dữ liệu, Bắt buộc/Không, Ràng buộc). *(Nguồn gốc: Lấy từ các thuộc tính thực thể trong `brainstorm` và các quy tắc validation VR trong `spec`)*. **Lưu ý quan trọng:** Bảng dữ liệu này trong Use Case chính là nguồn thông tin đầu vào (Input) bắt buộc để sau này vẽ màn hình bằng skill `/wireframe`.
- **6. Vấn đề chưa giải quyết (Notes & Issues):** Bảng các TBD (To Be Decided) nếu có thông tin chưa rõ ràng.

## Đầu vào (Inputs)

```
/workflow                                           # Kích hoạt quy trình dựng tài liệu SRS
/srs-workflow                                       # Lệnh tương đương
Tự động kích hoạt khi người dùng gọi /srs
```

## Các bước thực hiện (Approach)

### Bước 1: Quét & Thu Thập Tài Liệu Liên Kết (Cascade Document Search)

Hệ thống sẽ tự động quét và kiểm tra sự tồn tại của các tài liệu từ các skill trước theo đúng luồng:
`brainstorm` $\rightarrow$ `spec` $\rightarrow$ `diagram` $\rightarrow$ `usecase` $\rightarrow$ `wireframe` $\rightarrow$ `prototype`.

1. **Định vị tài liệu gốc:**
   - `brainstorm`: Kiểm tra tại `docs/{feature}/brainstorms/`
   - `spec`: Kiểm tra tại `docs/{feature}/spec/spec.md` (chứa yêu cầu FR, NFR, BR, VR, STR & Errors sinh ra từ skill `/spec` độc lập)
   - `diagram`: Kiểm tra tại `docs/{feature}/diagrams/`
   - `usecase`: Kiểm tra tại `docs/{feature}/usecases/` (kiểu file `uc-*.md`)
   - `wireframe`: Kiểm tra tại `docs/{feature}/wireframes/` (kiểu file ASCII)
   - `prototype`: Kiểm tra tại `docs/{feature}/prototypes/` hoặc thông tin Figma UI được đính kèm
2. **Quy tắc chạy tự động tại các bước (Usecase & Prototype Gates):**

   *   **Tại bước `usecase`:**
       - Hệ thống tự động dựa vào Phạm vi (Scope) và Danh sách tính năng (Function List) từ tài liệu `spec` và `brainstorm` để tự phân tích và liệt kê các Use Case tương ứng.
       - Tên Use Case đề xuất bắt buộc phải tuân thủ quy chuẩn đặt tên trong skill `usecase` (dạng "**Động từ + Danh từ**" ở thể chủ động, ví dụ: `UC-<module>-01_user-login`).
       - Hệ thống **bắt buộc dừng lại hiển thị danh sách Use Case đề xuất (Preview)** để người dùng duyệt (`Y`/`Sửa`/`Hủy`).
       - Sau khi người dùng duyệt đồng ý (`Y`):
         1. Hệ thống tự động gọi skill `/usecase` để sinh file đặc tả chi tiết cho từng Use Case và lưu file tại đúng thư mục `usecases/` của `srs/` (ví dụ: `docs/{feature}/srs/usecases/uc-*.md`), đồng thời cập nhật file `usecases/index.md` và `changelog.md` của srs.
         2. Đồng thời, hệ thống tự động chạy skill `/diagram` để vẽ sơ đồ luồng/tương tác mô tả cho Use Case đó, lưu file tại folder `diagrams/` của `srs/` (ví dụ: `docs/{feature}/srs/diagrams/`), và cập nhật file `diagrams/index.md`.
         3. Đồng thời, hệ thống tự động chạy skill `/wireframe` để vẽ ASCII wireframe mô tả màn hình tương ứng, lưu file tại folder `wireframes/` của `srs/` (ví dụ: `docs/{feature}/srs/wireframes/`), cập nhật file `wireframes/index.md` và tệp `changelog.md` tương ứng.

   *   **Tại bước `prototype` (sau khi chạy xong bước wireframe):**
       - Hệ thống hiển thị câu hỏi phỏng vấn trực tiếp cho người dùng: *"Bạn có cần thiết kế màn hình (prototype đồ họa) cho người dùng cuối không? (Y/N)"*
       - **Nếu người dùng trả lời `Y` (hoặc Có):**
         - Hệ thống thực hiện kiểm tra kết nối với Figma (bằng cách gọi công cụ `figma_status`).
         - Nếu chưa kết nối (`pluginConnected: false`), hệ thống sẽ đưa ra thông báo nhắc nhở: *"Plugin Figma chưa kết nối. In Figma Desktop: Plugins → Development → Figma UI MCP Bridge → Run"* và hỗ trợ người dùng kết nối trước khi chạy tiếp skill `/prototype`.
       - **Nếu người dùng trả lời `N` (hoặc Không):**
         - Hệ thống sẽ dừng lại ở các màn hình wireframe đã vẽ và hoàn tất quy trình xây dựng SRS mà không chạy tiếp bước prototype.

3. **Thông báo trạng thái và Checkpoint phê duyệt:**
   - Liệt kê chi tiết những tài liệu đã có thông tin và những tài liệu còn thiếu.
   - **Trường hợp 1: Thiếu tài liệu tiền đề:**
     Hiển thị thông báo dạng:
     > 📋 **Trạng thái tài liệu tiền đề:**
     > - `brainstorm`: [Đã có - {file_list}] / [Chưa có]
     > - `spec`: [Đã có - spec.md] / [Chưa có]
     > - `diagram`: [Đã có - {file_list}] / [Chưa có]
     > - `usecase`: [Đã có - {file_list}] / [Chưa có]
     > - `wireframe`: [Đã có - {file_list}] / [Chưa có]
     > - `prototype`: [Đã có - {file_list}] / [Chưa có]
     > 
     > Tài liệu {danh_sách_thiếu} chưa được xây dựng. Bạn có muốn hệ thống tự động chạy các skill tương ứng để sinh tài liệu này theo thứ tự không?
     > (Nếu đồng ý, hệ thống sẽ tự động phân tích và sinh Usecase/Diagram/Wireframe/Prototype theo quy tắc tự động hóa nêu trên) (Y/Sửa/Hủy)
   - **Trường hợp 2: Đã có đầy đủ tài liệu tiền đề:**
     Hiển thị thông báo dạng:
     > 📋 **Trạng thái tài liệu tiền đề:**
     > - Tất cả tài liệu cho các skill (brainstorm, spec, diagram, usecase, wireframe, prototype) đều đã sẵn sàng!
     > - Danh sách tài liệu: {tổng_hợp_danh_sách_file}
     > 
     > Bạn có muốn tiếp tục xây dựng tài liệu SRS dựa trên các tài liệu hiện có này không? (Y/Sửa/Hủy)


---

### Bước 2: Đánh Giá Tính Đầy Đủ & Đề Xuất Triển Khai (Completeness Audit & Action Proposal)

Sau khi đã hoàn thành việc thu thập và chạy cascade các skill (tức là đã có đầy đủ tài liệu brainstorm, spec, diagrams, usecases, wireframes, prototypes), hệ thống bắt buộc phải thực hiện đánh giá tính đầy đủ của bộ tài liệu và đưa ra đề xuất triển khai dựng SRS:

1. **Đối chiếu chéo thông tin (Completeness Audit):**
   *   **Brainstorm Completeness Check:** Kiểm tra xem tệp tin brainstorm trong `brainstorms/` đã có đầy đủ các cấu phần thông tin cần thiết theo yêu cầu của skill `/brainstorm` chưa, bao gồm:
       - Mục tiêu nghiệp vụ (Cockburn Goal Levels - Summary, User Goal, Subfunction)
       - Nhu cầu nghiệp vụ (5W1H Framework)
       - Sơ đồ hành trình hệ thống/người dùng (PlantUML)
       - Danh sách tính năng (CRUD Brainstorming)
       - Quy tắc nghiệp vụ (Business Rules dạng mã `BR-{feature}-{NNN}`)
       - Luồng ngoại lệ & Rủi ro nghiệp vụ (Exception Flows dạng `EF-{feature}-{NNN}` & Risks dạng `R-{NNN}`)
       - Câu hỏi mở (Open Questions)
   *   **Spec Completeness Check:** Kiểm tra xem tệp tin `spec.md` (hoặc dữ liệu đầu vào spec) đã chứa đầy đủ 6 cấu phần/bảng dữ liệu theo đúng định nghĩa của skill `/spec` chưa, bao gồm:
       - Yêu cầu chức năng FR (dạng mã `FR-{feature}-{NNN}`)
       - Yêu cầu phi chức năng NFR đo lường được (dạng mã `NFR-{feature}-{NNN}`)
       - Quy tắc nghiệp vụ BR (dạng mã `BR-{feature}-{NNN}`)
       - Quy tắc kiểm tra dữ liệu VR (dạng mã `VR-{feature}-{NNN}`)
       - Quy tắc chuyển đổi trạng thái STR (dạng mã `STR-{feature}-{NNN}`)
       - Bảng mã lỗi nghiệp vụ Errors (dạng mã `E-{feature}-{NNN}`)
   *   **Use Cases vs Scope & Function List:** Đối chiếu số lượng và phạm vi các Use Case đã sinh ra trong thư mục `usecases/` với Scope và Function List trong `brainstorm` và `spec.md` để đảm bảo đã bao phủ 100% nghiệp vụ, không bị sót phân hệ hay tính năng nào.
   *   **Diagrams vs Use Cases:** Đảm bảo có đúng 1 sơ đồ luồng tổng thể hệ thống và có đầy đủ sơ đồ luồng xử lý dữ liệu (dạng Mermaid/PlantUML) tương ứng cho TỪNG Use Case.
   *   **Wireframes vs Use Cases:** Đảm bảo có ít nhất 1 màn hình wireframe mô tả giao diện tương ứng cho TỪNG Use Case.
   *   **Prototypes vs Use Cases:** Nếu người dùng yêu cầu thiết kế UI/Prototype (Figma), đảm bảo đã có link/hình ảnh màn hình tương ứng cho từng Use Case.

2. **Báo cáo Đánh giá & Đề xuất triển khai (Action Proposal):**
   *   Hệ thống tổng hợp kết quả đối chiếu thành một bảng báo cáo đánh giá chi tiết (các tài liệu đã đạt, các phần còn thiếu hoặc cần bổ sung/chỉnh sửa).
   *   **Bổ sung thông tin còn thiếu:** Nếu phát hiện brainstorm hoặc spec thiếu bất kỳ cấu phần bắt buộc nào theo yêu cầu của skill tương ứng, hệ thống **bắt buộc phải bổ sung bước thu thập thông tin còn thiếu** vào đề xuất triển khai (ví dụ: tự động đặt câu hỏi làm rõ hoặc gọi skill `/brainstorm`, `/spec` để bổ sung phần khuyết trước khi tiến hành khởi tạo thư mục và biên dịch).
   *   Đưa ra đề xuất triển khai cụ thể: Cấu trúc thư mục SRS sẽ được dựng thế nào, các nội dung biên dịch chính cho tệp `SRS.md` và lộ trình thực hiện tiếp theo.
   *   **Approval Gate:** Hệ thống **bắt buộc phải dừng lại, hiển thị bảng Đánh giá & Đề xuất triển khai** này để xin phê duyệt của người dùng (`Y`/`Sửa`/`Hủy`). Chỉ khi người dùng duyệt đồng ý (`Y`), hệ thống mới được phép chuyển sang Bước 3 để khởi tạo cấu trúc thư mục và biên dịch tài liệu.

---

### Bước 3: Tự Động Khởi Tạo Cấu Trúc Thư Mục SRS

Sau khi người dùng phê duyệt kết quả đánh giá ở Bước 2, hệ thống tiến hành tạo cấu trúc thư mục đóng gói độc lập:

Thư mục chính: `docs/{feature}/srs/`

Các thư mục con:
```
docs/{feature}/srs/
├── brainstorms/
│   ├── {tệp_brainstorm_1}.md
│   └── index.md             # Tóm tắt & tổng quan các ý tưởng brainstorm
├── diagrams/
│   ├── {tệp_sơ_đồ_1}.puml
│   └── index.md             # Tổng quan các sơ đồ luồng/hệ thống
├── usecases/
│   ├── {uc-slug-1}.md
│   └── index.md             # Tổng quan về tất cả các usecase
├── wireframes/
│   ├── {tệp_wireframe_1}.md
│   └── index.md             # Tổng quan các wireframe (nếu số tệp > 1)
├── prototypes/
│   ├── {tệp_prototype_1}.png
│   └── index.md             # Tổng quan màn hình / figma wireframe
├── spec.md                  # Tài liệu đặc tả FR, NFR, BR, VR, STR, Errors chính của SRS
└── changelog.md             # Nhật ký lưu lại mọi thay đổi trong quá trình sửa đổi SRS
```

---

### Bước 4: Sao Chép Tài Liệu & Tạo Bản Mục Lục (Index)

1. **Sao chép tài liệu:** Lưu lại toàn bộ các tài liệu đang sử dụng (bao gồm các tài liệu đã có từ trước hoặc các tài liệu mới sinh ra sau khi chạy các skill tiền đề thiếu) vào thư mục con tương ứng trong `docs/{feature}/srs/`. Tệp đặc tả `spec.md` từ `docs/{feature}/spec/spec.md` sẽ được sao chép trực tiếp vào `docs/{feature}/srs/spec.md`.
   *Chú ý:* Nếu người dùng chọn không thiết kế prototype, bỏ qua việc sao chép thư mục `prototypes/` và không cập nhật phần prototype trong tài liệu tổng hợp.
2. **Tự động sinh file `index.md`:**
   * Đối với mỗi thư mục con (ví dụ: `brainstorms/`, `diagrams/`, `usecases/`, `wireframes/`, `prototypes/`):
     * Nếu trong thư mục có **từ 2 file tài liệu trở lên** (số tài liệu > 1) sau khi cập nhật, hệ thống phải tự động tạo (hoặc cập nhật) file `index.md` trong thư mục đó.
     * Nội dung file `index.md` bao gồm:
       - Tiêu đề thư mục (ví dụ: `# Tổng Quan Sơ Đồ Hệ Thống`)
       - Danh sách bảng liên kết đến các file chi tiết (sử dụng relative wikilinks hoặc markdown links) kèm mô tả ngắn gọn 1-2 dòng về mục đích của file đó.

---

### Bước 5: Khởi Tạo Nhật Ký Thay Đổi (changelog.md)

Tự động tạo file `changelog.md` trong thư mục `docs/{feature}/srs/changelog.md`. File này dùng để lưu trữ toàn bộ các chỉnh sửa nghiệp vụ do người dùng hoặc hệ thống thực hiện trong quá trình soạn thảo và hoàn thiện tài liệu SRS.

Cấu trúc file `changelog.md` phải trình bày dạng bảng markdown với các thông tin rõ ràng:
```markdown
# Nhật Ký Thay Đổi Tài Liệu SRS - {Feature Name}

| Thời gian | Mục thay đổi | Skill liên quan | Nội dung thay đổi chi tiết | Tác giả |
| :--- | :--- | :--- | :--- | :--- |
| YYYY-MM-DD HH:mm | [Mục lục/Phân hệ thay đổi] | [Tên skill kích hoạt] | [Mô tả chi tiết nội dung thay đổi] | [Tác giả thay đổi, ví dụ: @current_user hoặc AI BA] |
```

---

### Bước 6: Chuyển Tiếp Tới Biên Dịch SRS (Chỉ dành cho lệnh gọi từ /srs)

Sau khi hoàn thành việc chuẩn bị thư mục, sao chép tài liệu, và khởi tạo changelog, hệ thống tự động chuyển tiếp quyền điều khiển sang Giai đoạn 2 (Biên dịch) và Giai đoạn 3 (Phê duyệt nháp) của skill `/srs` cha để sinh tài liệu đặc tả `SRS.md` hoàn chỉnh.


---

## Những điều cần lưu ý (Gotchas)

- **Ngăn chặn Technical Jargon:** Tuyệt đối không bàn luận sâu về code hoặc cấu trúc database vật lý cấp thấp trong tài liệu SRS, giữ nguyên phong cách BA nghiệp vụ.
- **Luôn duyệt L1 Plan:** Mỗi lần chạy tự động một skill mới để bù đắp tài liệu thiếu, phải đề xuất L1 plan tương ứng của skill đó và chờ người dùng gõ `Y` mới thực thi.
- **Tập tin Index đồng bộ:** Khi có file mới được thêm vào các thư mục con trong quá trình sửa đổi sau này, file `index.md` phải được cập nhật tương ứng.

## Tài liệu tham chiếu (References)
- @.claude/rules/ba-conventions.md
- @.claude/rules/naming-conventions.md
- @.claude/rules/changelog.md
- @.claude/rules/resolve-oqs.md
