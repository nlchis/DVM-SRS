# 01 — Cài đặt công cụ

> Mức tối thiểu để vẽ wireframe HTML là **không cần cài gì** ngoài Claude Code. Trang này liệt kê cái bắt buộc và cái tùy chọn.

---

## Bắt buộc

| Thứ | Vì sao | Ghi chú |
|---|---|---|
| **Claude Code** | Chạy skill `/wireframe-html` + `/user-flow` | Mở tại workspace BA (nơi có `CLAUDE.md` + `docs/`) |
| **Trình duyệt** | Mở file `.html` để xem wireframe | Chrome/Safari/Firefox — file tự-chứa, không cần server |

Không có build step, không có dependency npm nào cho phần vẽ. Wireframe HTML là file tĩnh, inline hết CSS.

---

## Tùy chọn — `mmdc` (verify sơ đồ mermaid của `/user-flow`)

`/user-flow` vẽ sơ đồ luồng bằng **mermaid** trong file `{feature}-userflow.md`. Sau khi ghi, skill chạy `mermaid-verify.mjs` để chắc chắn sơ đồ compile được (mermaid không render trong chat nên lỗi cú pháp chỉ lộ khi mở IDE).

- **Không cài `mmdc`** → skill bỏ qua bước verify này, vẫn ghi userflow + vẽ wireframe bình thường. Bạn tự xem sơ đồ khi mở file trong Obsidian/GitHub/IDE.
- **Muốn có verify tự động** → cài mermaid CLI:

```bash
npm install -g @mermaid-js/mermaid-cli
# mmdc cần một bản Chrome; nếu chưa có, cài Puppeteer chrome:
npx puppeteer browsers install chrome
```

> `mermaid-verify.mjs` chỉ dùng Node built-in + gọi `mmdc` bên ngoài — không cần `npm install` trong thư mục script.

---

## Tùy chọn — bộ KG (chọn nguồn nhanh)

Cả `/user-flow` và `/wireframe-html` có nhắc `kg-query.mjs` để **chọn nhanh file cần đọc** (coverage/neighbors). Gói này **không kèm engine KG** — nếu workspace của bạn không có nó, skill tự chuyển về cách đọc trực tiếp tài liệu (`KG-ERROR → flow cũ`, theo `kg-usage.md`). Không ảnh hưởng kết quả wireframe.

---

## Kiểm tra đã cài đúng

Trong Claude Code mở tại workspace:

```
/wireframe-html
```

Skill liệt kê feature có sẵn + feature nào đã có `userflow.md`. Ra danh sách nghĩa là skill đã nạp đúng. Nếu báo "không tìm thấy skill" → kiểm lại đã copy `.claude/skills/wireframe-html/` và `.claude/skills/user-flow/` vào workspace chưa (Bước 1 của `00-bat-dau-nhanh.md`).
