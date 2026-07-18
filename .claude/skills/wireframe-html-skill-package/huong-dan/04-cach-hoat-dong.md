# 04 — Cách hoạt động

> Trang này giải thích bên trong: nguồn element từ đâu, wireframe render thế nào, bảng mô tả 5 cột 6 lớp, và ranh giới với các renderer khác.

---

## Thang fidelity: HTML wireframe đứng ở đâu

```
/wireframe-ascii      →   /wireframe-html      →   /prototype-html
(lo-fi, chat-native)      (lo-fi, B&W,             (hi-fi, màu +
 ASCII trong .md)          layout đúng device)      design tokens + JS click)
        └──────── 2 renderer cùng bậc lo-fi ────────┘
```

- **`/wireframe-html`** (bộ này): đen trắng, tĩnh, không JS navigation. Mục đích: review **scope + layout + tỉ lệ device** nhanh, bằng element HTML thật (input/button/link) chứ không phải ASCII.
- Khác `/prototype-html`: prototype có màu (design tokens), JS click-through, để demo stakeholder. Wireframe cố tình B&W để người xem tập trung vào bố cục, không sa vào màu sắc.

---

## Vì sao khung đúng bề rộng device

Cách cũ (mỗi card 33% chiều ngang) làm màn login mobile và dashboard desktop cùng kích thước → trông giả, sai tỉ lệ. Bộ này render mỗi screen trong **khung đúng bề rộng device thật** (375 / 768 / 1024), các screen **tự wrap** xuống dòng theo bề rộng đó (không ép 3/hàng). Nhờ vậy tỉ lệ giống màn thật.

---

## Hai nguồn element

Với mỗi screen, skill lấy field/nút/nhãn từ (ưu tiên trên xuống):

1. **Bảng mô tả 5 cột của `/wireframe-ascii`** (nếu feature đã chạy ASCII trước) — cùng schema, dùng thẳng, không suy luận lại.
2. **Tài liệu nghiệp vụ** — brainstorm / URD / PRD / `srs/{feature}-spec.md`. Mục đích màn lấy từ `userflow.md` Mục 2 (cột "Mục đích"); validation/error lấy từ spec (BR/NFR/Error Matrix).

Thiếu chi tiết ở cả 2 → **hỏi bạn**, không bịa.

---

## Bảng mô tả 5 cột — cột Description 6 lớp

Mỗi screen kèm một bảng: `# / Items / Control type / Data type / Description`. Cột **Description** không được nông — viết theo 6 lớp (điền lớp nào áp dụng):

| Lớp | Nội dung |
|---|---|
| 1. Mục đích nghiệp vụ | Field/nút này để làm gì (1 câu). |
| 2. Validation / ràng buộc | Bắt buộc/tùy chọn, rule cụ thể (trích `BR-...`), default, placeholder; nêu cả điều KHÔNG áp. |
| 3. States | default / focus / disabled / submitting / error / success (chỉ state thật sự có). |
| 4. Navigation | Trigger đi màn nào, điều kiện enable/disable. |
| 5. Error + wording | Mã `E-{feature}-NNN` + wording exact + hệ quả (tăng/không tăng counter…). |
| 6. Edge / security / compliance | Anti-enumeration, audit log, lỗi mạng, fallback… (trích `NFR-...`) khi áp dụng. |

Nguồn ưu tiên: `srs/{feature}-spec.md` > use case > brainstorm/PRD/URD, đối chiếu `userflow.md` cho case error/edge.

---

## Control type & Data type map thế nào

Skill suy `Control type` từ loại element (Textbox / Button / Link / Checkbox / Dropdown / Browse Button / Label…) và `Data type` từ hành vi tương tác (Text nhập tự do / Click trigger action / Check chọn / Select từ danh sách / ReadOnly). Đây là **kiểu tương tác nghiệp vụ**, KHÔNG phải kiểu dữ liệu lập trình.

---

## Một màn = một trạng thái

State loại trừ nhau (chỉ 1 hiện tùy điều kiện — vd verify-email: thành công / hết-hạn; payment: success / fail) → skill tách **mỗi state 1 screen riêng** (slug `{screen}-{state}`), KHÔNG vẽ 2 khối cạnh nhau trong 1 khung (dễ đọc nhầm "màn có cả 2"). Chỉ chung 1 khung khi các phần cùng hiện đồng thời.

---

## Đen trắng nghiêm ngặt

CSS chỉ dùng `#000 / #fff / #f0f0f0 / #888 / #ccc` — không màu có sắc. Icon = token chữ (`(eye)`, `(play)`) hoặc SVG stroke, KHÔNG emoji (emoji làm lệch khung). Toàn bộ diện mạo nằm trong `_templates/wireframe-html-template.html` — muốn đổi spacing/font/class thì sửa template, mọi flow tự kế thừa.

---

## Cửa vào điều hướng (Phase G.5)

Feature nhiều flow → mở từng file rời rất rối. Skill sinh thêm `{feature}-wireframe.html` từ `_templates/wireframe-html-nav-template.html`: sidebar TOC (flow → screen), tab "Tổng quan" là flow map click được, iframe load từng flow. Mỗi node trong flow map tô theo case (happy / error / edge) đọc từ `userflow.md`. Đây là file bạn double-click để xem cả feature.
