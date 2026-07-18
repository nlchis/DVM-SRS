# 02 — Luồng: user flow TRƯỚC, wireframe SAU

> Điểm cốt lõi phải hiểu để dùng đúng bộ này: `/wireframe-html` **không tự chia flow**. Nó đọc một nguồn duy nhất — `srs/{feature}-userflow.md` — để biết feature có mấy luồng, mỗi luồng gồm những màn nào, theo thứ tự nào. Nguồn đó do `/user-flow` sinh ra.

---

## Vì sao tách 2 skill

Nếu để một skill vừa "nghĩ ra luồng" vừa "vẽ", thì mỗi lần vẽ lại (ASCII, HTML, prototype) sẽ tự chia flow một kiểu → lệch nhau. Tách ra:

- **`/user-flow`** = phân tích nghiệp vụ → sơ đồ luồng (mermaid, phủ happy/error/edge) + **bảng chia flow** (flow-slug + màn hình gồm + case phủ). Đây là "bản đồ" dùng chung.
- **`/wireframe-html`** = đọc bản đồ đó → vẽ mỗi flow thành 1 file HTML. Không quyết định flow nào có màn gì — chỉ render.

Cùng một `userflow.md` cũng là nguồn cho `/wireframe-ascii` và `/prototype-html` (nếu bạn có), nên các renderer luôn nhất quán.

---

## Sơ đồ luồng chạy

```
  /wireframe-html <feature>
        │
        ├─ Chưa có srs/{feature}-userflow.md?
        │     └─ TỰ GỌI /user-flow <feature>
        │            ├─ (feature mới) phỏng vấn: actor · các bước · nhánh lỗi/edge
        │            ├─ vẽ mermaid flow (happy/error/edge) + chia flow
        │            ├─ @flow-reviewer soi (thiếu nhánh? dead-end? màn thiếu?)
        │            └─ HARD STOP — bạn duyệt flow (chốt / sửa / hủy)
        │
        ├─ Hỏi device: Mobile 375 / Tablet 768 / Desktop 1024 / Responsive  ← BẮT BUỘC
        │
        ├─ (tùy chọn) đọc lại ascii-wireframe/{flow}.md nếu đã có → dùng làm nguồn element
        │
        ├─ L1 preview: liệt kê N file HTML sắp tạo + screens mỗi flow
        │     └─ bạn gõ Y / sửa / skip <số>
        │
        └─ Ghi:
              docs/{feature}/html-wireframe/
                ├─ {flow-1}.html … {flow-N}.html     (mỗi flow 1 file)
                ├─ {feature}-wireframe.html           (cửa vào: sidebar + flow map)
                └─ {feature}-wireframe-html-index.md  (metadata)
```

---

## Ba chốt người (human-in-the-loop)

| Chốt | Khi nào | Bạn làm gì |
|---|---|---|
| **Duyệt flow** | Cuối `/user-flow` (HARD STOP) | Xem sơ đồ + bảng chia flow. Gõ chốt / mô tả sửa / hủy. |
| **Chốt device** | Đầu `/wireframe-html` | Chọn bề rộng khung. Có đề xuất sẵn từ `primary_device` hoặc `docs/design.md`. |
| **L1 preview** | Trước khi ghi file | Xem danh sách file + screens. Y / sửa / skip. Update file cũ thì có thêm L2 diff. |

> Skill **không** vẽ luôn rồi bắt bạn sửa. Nó dừng ở các chốt này để bạn kiểm trước khi tốn công.

---

## Chạy lại (đã có wireframe)

Gọi lại `/wireframe-html <feature>` khi đã có file → skill tự vào **update mode**, hiện **L2 diff** cho từng file trước khi ghi đè. Không cần cờ. Muốn đổi gì (thêm màn, sửa element) cứ nói bằng lời.

Sửa `userflow.md` (thêm/bớt flow) rồi chạy lại wireframe → wireframe bám theo bản đồ mới.
