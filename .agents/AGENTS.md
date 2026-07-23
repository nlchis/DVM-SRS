# Workspace Rules cho VietMec

## Quy tắc đánh số tự động (Auto-Renumbering)

> Khi sửa đổi tài liệu (VD: SRS, Use Cases, Wireframes, v.v.) nếu bạn thực hiện xóa bỏ một hạng mục có đánh số thứ tự (ví dụ: `UC-order-07`, hoặc một bước số `4.` trong danh sách), bạn PHẢI tự động thiết lập lại và cập nhật toàn bộ các số thứ tự phía sau để không để lại khoảng trống (gap) nào.

1. **Đổi tên tệp:** Nếu xóa tệp `UC-07`, thì tệp `UC-08` phải được đổi tên thành `UC-07`.
2. **Cập nhật mã nội bộ (ID):** Các ID tham chiếu bên trong nội dung các tệp tin (ví dụ: `[UC-09]` đổi thành `[UC-08]`) phải được cập nhật đồng bộ.
3. **Cập nhật danh sách tham chiếu:** Quét tất cả các tệp tin liên quan (`index.md`, `srs.md`, `flows.md`, `.html`) để replace các ID cũ bằng ID mới đã dồn lên, đảm bảo các link liên kết (hyperlinks) không bị gãy (broken links).
4. **Không giới hạn ở Use Case:** Quy tắc này áp dụng cho mọi danh sách có đánh số (Steps, Sections, Wireframes list, Error Codes).

## Quy tắc viết Markdown (Markdown formatting)

> Tuyệt đối KHÔNG ĐƯỢC để dòng trống (empty line) xen giữa các hàng (rows) trong bảng Markdown. Việc để dòng trống giữa các hàng sẽ làm phá vỡ cấu trúc bảng (break table rendering) khi trình bày trên giao diện IDE hoặc khi biên dịch ra HTML.

## Quy tắc Rà soát Vùng ảnh hưởng (Blast Radius & Cascade Update)

> MỖI LẦN có bất kỳ tác động sửa đổi nào trên một tài liệu (Spec, Brainstorm, Diagram, Use Case, Wireframe, Prototype, SRS, v.v.):

1. **Tự động xác định Blast Radius**: Agent PHẢI tự động rà soát lại toàn bộ các tài liệu liên đới ở cả tuyến trước (upstream) và tuyến sau (downstream) liên quan đến nội dung vừa thay đổi (VD: thay đổi Tên/Mã trạng thái, Tên trường, Mã lỗi, Mã BR/FR/STR/VR).
2. **Tự động lan truyền cập nhật (Cascade Update)**: Tiến hành cập nhật đồng bộ 100% trên tất cả các file bị ảnh hưởng (`spec.md`, `srs.md`, `flows.md`, `states.md`, Wireframe ASCII/HTML, Prototype, Use Cases...) ngay trong lượt xử lý mà không chờ người dùng nhắc nhở hay tự kiểm tra.
3. **Kiểm tra tính nhất quán (Consistency Audit)**: Quét và đảm bảo tất cả các thuật ngữ, tên trạng thái, mã ID tham chiếu hoàn toàn đồng nhất giữa mọi tệp tin trong toàn hệ thống.

## Quy tắc Tự động Ghi vết Nhật ký (Auto-Changelog Logging)

> MỖI LẦN Agent tạo mới hoặc sửa đổi bất kỳ tài liệu nghiệp vụ nào (Brainstorm, Spec, Diagram, Use Case, Wireframe, Prototype, SRS):

1. **Tự động ghi vết**: Agent PHẢI tự động bổ sung 1 dòng thông tin thay đổi vào file `changelog.md` của phân hệ đó (`docs/{feature}/srs/changelog.md` hoặc `docs/{feature}/changelog.md`).
2. **Nội dung ghi vết bắt buộc**: Bao gồm Thời gian (YYYY-MM-DD HH:mm), Mục/File thay đổi, Skill kích hoạt, Nội dung thay đổi chi tiết, và Tác giả (ví dụ `@nlchis` hoặc `AI BA`).

## Quy tắc Liên kết Thông tin & Rà soát Đầy đủ (Data Continuity & Completeness Audit)

1. **Liên kết Nguồn Dữ liệu (Traceability)**: Mọi tài liệu downstream (Use Case, Wireframe, Prototype) bắt buộc phải tuân thủ và liên kết thông tin chặt chẽ từ tài liệu upstream (`brainstorm` $\rightarrow$ `spec` $\rightarrow$ `diagram` $\rightarrow$ `usecase` $\rightarrow$ `wireframe` $\rightarrow$ `prototype`).
2. **Rà soát Tính Đầy đủ (Completeness Audit)**: Mọi Use Case tạo ra phải có đầy đủ 1 Diagram luồng và 1 Wireframe giao diện tương ứng. Tài liệu `spec.md` phải đủ 6 cấu phần (`FR`, `NFR`, `BR`, `VR`, `STR`, `Errors`).

## Quy tắc Danh xưng & Vai trò Người dùng (User Identity & Role)

> Danh xưng tác giả: **nlchis** (`@nlchis`, nữ / con gái).
> Vai trò chuyên môn: **Business Analyst (BA)** chính của hệ thống VietMec.

1. **Ghi vết Tác giả & Xưng hô**:
   - Trong mọi tệp tài liệu đặc tả, changelog, commit metadata: Ghi nhận tên tác giả chính là `@nlchis`.
   - Trong giao tiếp / trao đổi trực tiếp: Agent xưng **"tôi"** và gọi người dùng là **"bạn"** (xưng hô **bạn / tôi**).
2. **Hỗ trợ chuyên môn BA**: Agent đóng vai trò Trợ lý AI đồng hành cùng BA, luôn hỗ trợ soạn thảo, rà soát và nâng cao chất lượng tài liệu nghiệp vụ chuẩn IT-BA (IIBA / Karl Wiegers).

## Quy tắc Kiểm soát Git Commit (Git Commit Control)

> Tuyệt đối KHÔNG ĐƯỢC tự động thực hiện lệnh `git commit` hoặc `git push` sau khi hoàn thành tạo mới/sửa đổi tài liệu hoặc mã nguồn.

1. **Bắt buộc hỏi ý kiến người dùng**: Sau khi hoàn thành xong lượt xử lý (chỉnh sửa file, cập nhật tài liệu), Agent PHẢI liệt kê các tệp đã thay đổi và hỏi người dùng: *"Bạn có muốn commit các thay đổi này lên Git không?"*.
2. **Đợi xác nhận từ người dùng**: Agent CHỈ ĐƯỢC PHÉP chạy lệnh `git commit` khi và chỉ khi nhận được sự xác nhận đồng ý rõ ràng từ người dùng (ví dụ: "Có", "Commit đi", "Y", ...).
