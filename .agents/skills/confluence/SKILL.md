---
name: confluence
description: Xuất bản tài liệu BA từ IDE lên Confluence (Hỗ trợ Dry-run, Idempotency, PNG cho PlantUML/Mermaid).
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
user-invocable: true
argument-hint: "<feature> [--push]"
---

# /confluence - Đẩy tài liệu lên Confluence

## Goal
Xuất bản tài liệu (URD, BRD, SRS, Diagram) lên Confluence cho stakeholder theo cấu trúc cây thư mục. Luôn đảm bảo an toàn, không push nhầm, tự động quản lý phiên bản qua Caching và Idempotency.

## Inputs
- `/confluence <feature>`: Chế độ mặc định là **Dry-run**. Tạo bảng kế hoạch (Page Plan) và mở file `implementation_plan.md` artifact để chờ người dùng xác nhận.
- `/confluence <feature> --push`: Chế độ **Push**. Thực thi việc đẩy dữ liệu lên hệ thống sau khi đã được xác nhận (Explicit Approval).

## Quy trình Thực thi

### 1. Kiểm tra và Cảnh báo (Hard Gate)
- Đọc tất cả các file markdown trong thư mục tính năng (`docs/<feature>`).
- Kiểm tra `frontmatter` của từng file. Nếu có `status: stale` -> **TỪ CHỐI** đưa vào danh sách đẩy lên. Báo cho người dùng phải cập nhật file trước.

### 2. Idempotency (Chống trùng lặp)
- Kiểm tra `frontmatter` để tìm key `confluence: { page_id: <id>, url: <url> }`.
- Nếu CÓ -> Mode: `Update` (Cập nhật ghi đè lên page_id đã có).
- Nếu KHÔNG CÓ -> Mode: `Create` (Tạo trang mới).

### 3. Dry-run & Implementation Plan (Bắt buộc)
- Nếu gọi lệnh KHÔNG CÓ cờ `--push`:
  1. Vẽ sơ đồ cây dự kiến (Page Plan) gồm Trang cha (đọc từ `docs/_shared/confluence-map.md`, không gian mặc định là `BYAB`) và các trang con.
  2. Dùng tool `write_to_file` để tạo artifact `implementation_plan.md` liệt kê chi tiết: Có bao nhiêu file mới (Create), bao nhiêu file cập nhật (Update), file nào bị loại do stale.
  3. Dừng lại, yêu cầu người dùng bấm **Proceed** hoặc gõ thủ công `--push` mới thực hiện đẩy.

### 4. Xử lý Định dạng & Biểu đồ (Khi Push)
- Sử dụng Atlassian MCP Tool để kết nối (nếu mất kết nối, báo user gõ `/mcp auth atlassian`).
- Dịch Markdown sang dạng HTML tương thích với Confluence.
- **Biểu đồ (Mermaid / PlantUML)**:
  - Tuyệt đối **KHÔNG** đẩy raw markdown codeblock của sơ đồ lên Confluence. Confluence không tự dịch được markdown này.
  - Sử dụng công cụ nội bộ (như bash chạy mmdc/plantuml) để convert biểu đồ sang dạng ảnh PNG.
  - Tải ảnh lên bằng API đính kèm (Attachment) của trang Confluence, sau đó chèn vào nội dung thông qua thẻ `<ac:image><ri:attachment ri:filename="diagram.png"/></ac:image>` (định dạng Confluence storage) hoặc `<img>`.

### 5. Thứ tự Đẩy lên (Hierarchy Push)
1. Đẩy trang Parent trước để lấy Parent Page ID.
2. Đẩy các trang Con (Sub-pages), chỉ định thuộc tính `parentId` trỏ về trang Parent vừa tạo.

### 6. Cập nhật Changelog & Map File
- Cập nhật thông tin Parent Page ID vào `docs/_shared/confluence-map.md` (nếu là lần tạo gốc mới).
- Ghi log chi tiết vào `docs/_shared/confluence-changelog.md` theo định dạng:
  `| YYYY-MM-DD HH:mm | /confluence | Create/Update | Tên File -> URL | Chi tiết thay đổi |`
- Thêm `changelog` nội bộ trong file `.md` vừa push: `- {date} | /confluence | pushed as page_id={id}`.
