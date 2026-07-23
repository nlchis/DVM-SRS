---
name: spec-writer
description: Sử dụng khi Business Analyst muốn đặc tả các yêu cầu chức năng (FR), yêu cầu phi chức năng (NFR), quy tắc nghiệp vụ (BR), quy tắc kiểm tra (VR), quy tắc chuyển đổi trạng thái (STR) và mã lỗi cho một tính năng. Kích hoạt bằng lệnh `/spec <tên tính năng>` hoặc `/spec`. Kết quả ghi trực tiếp vào `docs/{feature}/spec/spec.md`.
---

# /spec — Đặc Tả Yêu Cầu Chức Năng (FR), Phi Chức Năng (NFR) & Quy Tắc Nghiệp Vụ - BA Senior

## Mục tiêu (Goal)

Phân tích yêu cầu nghiệp vụ của tính năng để soạn thảo và cấu trúc hóa bảng đặc tả yêu cầu chi tiết bao gồm: Chức năng (FR), Phi chức năng (NFR), Quy tắc nghiệp vụ (BR), Quy tắc kiểm tra dữ liệu (VR), Quy tắc chuyển đổi trạng thái (STR) và Mã lỗi nghiệp vụ (E) đạt chuẩn công nghiệp (IEEE 830 / ISO 29148), lưu trữ trực tiếp tại `docs/{feature}/spec/spec.md`.

## Ràng buộc (Constraints)

- **Ngôn ngữ đầu ra**: Sử dụng **tiếng Việt hoàn toàn** trong tất cả các phản hồi chat và tài liệu đặc tả sinh ra.
- **BA Senior Role**: Đóng vai trò BA Senior dày dạn kinh nghiệm, sử dụng văn phong nghiệp vụ chuẩn mực, chính xác, định lượng rõ ràng.
- **Quy tắc No-re-ask**: Trước khi hỏi bất kỳ câu nào, quét bối cảnh tệp tin hiện tại và lịch sử chat để loại bỏ các câu hỏi đã được trả lời.
- **Human-in-the-Loop Gate**: Bắt buộc dừng lại xin xác nhận của người dùng sau mỗi Phase phân tích trước khi ghi tệp tin.
- **Quy tắc Ghi đè an toàn (Backup & Changelog)**: Trước khi ghi đè hoặc chỉnh sửa tệp `spec.md` hiện có, **bắt buộc** sao lưu tệp cũ vào thư mục `docs/{feature}/spec/_archive/spec_{YYYYMMDD_HHmmss}.md` và cập nhật thông tin tệp backup này vào frontmatter của file mới cùng tệp `changelog.md` của thư mục `spec/`.

---

## Kiến Thức Phân Loại Yêu Cầu Cốt Lõi (MANDATORY KNOWLEDGE)

Hệ thống bắt buộc phải tuân thủ và phân loại các yêu cầu theo đúng định nghĩa dưới đây để tránh nhập nhằng khái niệm:

### 1. Yêu cầu Chức năng (Functional Requirements - FR)
*   **Định nghĩa:** Đặc tả những chức năng/tính năng hoặc dịch vụ cụ thể mà hệ thống **phải thực hiện** để đáp ứng trực tiếp mục tiêu của người dùng (User-goal level).
*   **Ràng buộc phân loại:**
    *   *Chỉ bao gồm:* Các hành động/tính năng lớn của người dùng (ví dụ: Đăng nhập nội bộ, Đăng nhập Google OAuth, Yêu cầu khôi phục mật khẩu, Đăng xuất).
    *   *TUYỆT ĐỐI KHÔNG đưa vào bảng FR:* Các hành động con như "Kiểm tra định dạng email", "Tự động chuyển hướng trang" hoặc "Kiểm tra phân quyền tài khoản". Các phần này thuộc về Validation Rules, Acceptance Criteria hoặc Business Rules.
*   **Mã hóa:** `FR-{feature}-{NNN}` (ví dụ: `FR-payment-001`).

### 2. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)
*   **Định nghĩa:** Các tiêu chuẩn, ràng buộc phi chức năng quy định cách thức hệ thống vận hành (Hiệu năng, Bảo mật kỹ thuật, Độ khả dụng UX, Độ tin cậy, Tính tuân thủ).
*   **Ràng buộc phân loại:** **NFR phải đo lường và kiểm chứng được**. Tránh các từ mơ hồ như "chạy nhanh", "bảo mật tốt". Phải ghi rõ chỉ số kỹ thuật (ví dụ: băm mật khẩu bằng bcrypt, mã hóa truyền tải qua HTTPS/TLS, tự động focus ô nhập liệu, hỗ trợ phím tắt).
*   **Mã hóa:** `NFR-{feature}-{NNN}` (ví dụ: `NFR-payment-001`).

### 3. Quy tắc Nghiệp vụ (Business Rules - BR)
*   **Định nghĩa:** Các chính sách, luật lệ và quyết định nghiệp vụ do phía **Business (Doanh nghiệp)** đưa ra và bắt buộc hệ thống phải tuân thủ. Các quy tắc này vẫn tồn tại ngay cả khi không có phần mềm máy tính (quy trình thủ công bằng giấy tờ).
*   **Ví dụ:** Chính sách khóa tài khoản tạm thời khi nhập sai mật khẩu quá 5 lần, quy trình phê duyệt tài khoản Google OAuth lần đầu phải do Kế toán trưởng thực hiện.
*   **Mã hóa:** `BR-{feature}-{NNN}` (ví dụ: `BR-payment-001`).

### 4. Quy tắc Kiểm tra Dữ liệu (Validation Rules - VR)
*   **Định nghĩa:** Các ràng buộc kỹ thuật kiểm tra tính đúng đắn và định dạng của dữ liệu đầu vào tại Client/Backend để đảm bảo tính toàn vẹn dữ liệu trước khi xử lý.
*   **Ví dụ:** Định dạng regex của email, mật khẩu phải từ 8 ký tự trở lên và chứa chữ hoa/chữ số, trường dữ liệu bắt buộc không được để trống.
*   **Mã hóa:** `VR-{feature}-{NNN}` (ví dụ: `VR-payment-001`).

### 5. Quy tắc Chuyển Đổi Trạng Thái (State Transition Rules - STR)
*   **Định nghĩa:** Đặc tả luồng chu kỳ vòng đời và logic chuyển đổi trạng thái của các thực thể nghiệp vụ (ví dụ: Đơn hàng, Yêu cầu phê duyệt) khi bị kích hoạt bởi một sự kiện nào đó.
*   **Ví dụ:** Khi Kế toán trưởng duyệt yêu cầu cập nhật ở trạng thái "Chờ phê duyệt", trạng thái của Đơn hàng gốc phải được đồng bộ về "Khớp" và trạng thái của Yêu cầu chuyển sang "Đã phê duyệt".
*   **Mã hóa:** `STR-{feature}-{NNN}` (ví dụ: `STR-payment-001`).

### 6. Bảng Mã lỗi Nghiệp vụ (Errors - E)
*   **Định nghĩa:** Quy định rõ mã lỗi, điều kiện xuất hiện lỗi nghiệp vụ và nội dung câu thông báo phản hồi hiển thị trực quan cho người dùng.
*   **Mã hóa:** `E-{feature}-{NNN}` (ví dụ: `E-payment-001`).

---

## Các bước thực hiện (Approach)

### Step 1: Quét & Thu Thập Thông Tin Nghiệp Vụ (Mini-Brainstorm)

1. Tự động kiểm tra thư mục `docs/{feature}/brainstorms/` để tìm kiếm tài liệu brainstorm hiện có.
2. **Nếu chưa có tài liệu brainstorm:**
   - Hệ thống **không cần gọi skill `/brainstorm` độc lập** mà sẽ tự động thực hiện thu thập thông tin tính năng tối giản trực tiếp tại đây.
   - Hiển thị thông báo và đặt câu hỏi phỏng vấn tối đa 3 câu tập trung vào **Tính năng**:
     1.  *Tác nhân & Mục tiêu (Who & Why):* Ai sẽ sử dụng tính năng này và lợi ích nghiệp vụ đem lại là gì?
     2.  *CRUD Thực thể:* Hệ thống cần Tạo, Đọc, Sửa, Xóa những loại dữ liệu nào (ví dụ: tài khoản, giao dịch, hóa đơn)?
     3.  *Chính sách & Ràng buộc:* Phía Business có quy định hay chính sách đặc thù nào cần tuân thủ không?
3. **Nếu đã có tài liệu brainstorm:**
   - Đọc nội dung tệp brainstorm để trích xuất trực tiếp các yêu cầu cần thiết.

---

### Step 2: Dựng Dự Thảo Đặc Tả Yêu Cầu (Drafting)

Dựa trên thông tin thu thập được, lập dự thảo đặc tả yêu cầu với cấu trúc bảng chuẩn hóa:
1.  **Bảng FR:** ID, Tên yêu cầu chức năng, Mô tả nghiệp vụ, Độ ưu tiên, Nguồn gốc.
2.  **Bảng NFR:** ID, Phân loại, Chỉ số kiểm chứng chi tiết, Độ ưu tiên, Nguồn gốc.
3.  **Bảng BR:** ID, Tên quy tắc nghiệp vụ, Mô tả chính sách chi tiết, Nguồn gốc.
4.  **Bảng VR:** ID, Tên quy tắc kiểm tra, Định dạng bắt buộc, Nguồn gốc.
5.  **Bảng STR:** ID, Trạng thái ban đầu, Sự kiện (Trigger), Trạng thái tiếp theo, Thực thể bị ảnh hưởng, Hành vi hệ thống đi kèm.
6.  **Bảng Errors:** Mã lỗi, Tên lỗi, Điều kiện xuất hiện, Câu thông báo phản hồi.

---

### Step 3: Phê Duyệt Kế Hoạch L1 (L1 Plan Gate)

1. **In bản xem trước L1 Plan:** Trình bày kế hoạch ghi tệp bằng ngôn ngữ BA tự nhiên dưới dạng bảng biểu dễ nhìn (không hiển thị bullet thô).
2. Chờ phản hồi phê duyệt từ người dùng (`Y`/`Sửa`/`Hủy`).

---

### Step 4: Ghi Tệp & Đồng Bộ Hóa Changelog

1. **Backup file cũ (nếu có):** Sao chép nội dung tệp `docs/{feature}/spec/spec.md` cũ lưu vào thư mục `docs/{feature}/spec/_archive/spec_{YYYYMMDD_HHmmss}.md`.
2. **Ghi đè file `spec.md`:** Ghi nội dung đặc tả mới vào `docs/{feature}/spec/spec.md` với định dạng Markdown chuyên nghiệp và frontmatter chuẩn:
   ```yaml
   ---
   type: spec
   feature: {feature}
   status: draft
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   owner: "@current_user"
   changelog:
     - YYYY-MM-DD | /spec | Cập nhật FR/NFR/BR/VR/STR/Errors; backup tại docs/{feature}/spec/_archive/spec_{YYYYMMDD_HHmmss}.md
   ---
   ```
3. **Đồng bộ file `changelog.md`:** Ghi một dòng nhật ký chi tiết vào file `docs/{feature}/spec/changelog.md` kèm theo đường dẫn file backup để khôi phục khi cần.

---

## Tài liệu tham chiếu (References)
- @.agents/rules/ba-conventions.md
- @.agents/rules/naming-conventions.md
- @.agents/rules/changelog.md
- @.agents/rules/resolve-oqs.md

