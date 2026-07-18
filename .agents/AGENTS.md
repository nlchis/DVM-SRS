# Workspace Rules cho VietMec

## Quy tắc đánh số tự động (Auto-Renumbering)

> Khi sửa đổi tài liệu (VD: SRS, Use Cases, Wireframes, v.v.) nếu bạn thực hiện xóa bỏ một hạng mục có đánh số thứ tự (ví dụ: `UC-order-07`, hoặc một bước số `4.` trong danh sách), bạn PHẢI tự động thiết lập lại và cập nhật toàn bộ các số thứ tự phía sau để không để lại khoảng trống (gap) nào.

1. **Đổi tên tệp:** Nếu xóa tệp `UC-07`, thì tệp `UC-08` phải được đổi tên thành `UC-07`.
2. **Cập nhật mã nội bộ (ID):** Các ID tham chiếu bên trong nội dung các tệp tin (ví dụ: `[UC-09]` đổi thành `[UC-08]`) phải được cập nhật đồng bộ.
3. **Cập nhật danh sách tham chiếu:** Quét tất cả các tệp tin liên quan (`index.md`, `srs.md`, `flows.md`, `.html`) để replace các ID cũ bằng ID mới đã dồn lên, đảm bảo các link liên kết (hyperlinks) không bị gãy (broken links).
4. **Không giới hạn ở Use Case:** Quy tắc này áp dụng cho mọi danh sách có đánh số (Steps, Sections, Wireframes list, Error Codes).

## Quy tắc viết Markdown (Markdown formatting)

> Tuyệt đối KHÔNG ĐƯỢC để dòng trống (empty line) xen giữa các hàng (rows) trong bảng Markdown. Việc để dòng trống giữa các hàng sẽ làm phá vỡ cấu trúc bảng (break table rendering) khi trình bày trên giao diện IDE hoặc khi biên dịch ra HTML.
