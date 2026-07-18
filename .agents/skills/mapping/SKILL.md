---
name: mapping
description: Đồng bộ 2 chiều (IDE <-> Confluence) và ghi log changelog. Đảm bảo dữ liệu luôn nhất quán.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
user-invocable: true
argument-hint: "<feature>"
---

# /mapping - Đồng bộ 2 chiều IDE và Confluence

## Goal
Kết nối file local và link online. Quản lý khác biệt nội dung để không bao giờ bị lệch dữ liệu giữa máy tính (IDE) và bản xuất bản trên Confluence. Ghi lại lịch sử cập nhật.

## Triggers
- Gọi lệnh thủ công `/mapping <feature>`.
- Gợi ý tự động khi người dùng đang sửa đổi một file tài liệu (nếu IDE cho phép hook sự kiện).

## Workflow (Quy trình)

### 1. Phân tích ngữ cảnh
- Nhận diện các file trong `docs/<feature>`.
- Đọc file ánh xạ `docs/_shared/confluence-map.md`.
- Lấy `page_id` từ `frontmatter` (`confluence: { page_id: <id> }`) của file local đang xem. Nếu file không có `page_id`, có nghĩa là tài liệu chưa từng được đẩy lên -> Dừng lại và khuyên người dùng chạy `/confluence` trước.

### 2. Kéo (Fetch) dữ liệu từ Confluence Online
- Sử dụng Atlassian MCP Tool để đọc nội dung mới nhất của `page_id` này trên Confluence.
- Kiểm tra lại lịch sử thay đổi (Version) hoặc tạo bản so sánh nội dung (Diff) giữa văn bản Local và văn bản Online.

### 3. Xử lý Chênh lệch (Sync)
**Trường hợp 1 (Local mới hơn):**
- File ở IDE đã được sửa sau lần đẩy cuối cùng.
- Trợ lý in ra tóm tắt khác biệt (Diff).
- Đề xuất: "Tài liệu cục bộ của bạn có cập nhật mới. Bạn có muốn đẩy những thay đổi này lên Confluence để đồng nhất không? (Bấm Y để tôi thực hiện `/confluence --push`)".

**Trường hợp 2 (Online mới hơn):**
- Ai đó đã vào sửa nội dung trực tiếp trên web Confluence.
- Trợ lý phát hiện ra và hiển thị các phần nội dung đã bị thay đổi trên web.
- Đề xuất: "Nội dung online đang mới hơn bản máy tính. Bạn có muốn kéo về (Pull) để cập nhật vào file IDE không?". 
- Nếu người dùng đồng ý, trợ lý dùng chức năng Edit file để sửa markdown ở IDE sao cho khớp với online.

**Trường hợp 3 (Up-to-date):**
- Hai bên giống nhau hoàn toàn, trợ lý báo: "Dữ liệu đã đồng bộ 100%".

### 4. Ghi Nhật ký (Changelog)
- Mỗi khi thực hiện đồng bộ thành công (bất kể chiều Local->Online hay Online->Local), trợ lý **bắt buộc** phải ghi thêm dòng trạng thái vào file `docs/_shared/confluence-changelog.md`.
- Định dạng dòng:
  `| YYYY-MM-DD HH:mm | /mapping | Sync (Local->Online / Online->Local) | Tên File -> URL | Tóm tắt điểm thay đổi (vd: Sửa Use Case 2, Thêm sơ đồ) |`
