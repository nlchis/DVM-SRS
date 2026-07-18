# 03 — Hướng dẫn chi tiết (cách gọi + tình huống)

> Trang này đi sâu: các cách gọi skill, cách trả lời từng chốt, và các tình huống hay gặp.

---

## Các cách gọi

```
/wireframe-html authentication              # vẽ tất cả flow của feature
/wireframe-html authentication --flow login-email-password   # chỉ 1 flow
/wireframe-html "đăng nhập và đăng ký người dùng"            # feature chưa có → tự chạy /user-flow
```

Muốn đổi hành vi mặc định thì **nói bằng lời**, không cần cờ:
- "viết bằng tiếng Anh" → labels tiếng Anh.
- "chỉ vẽ lại flow quên mật khẩu" → chỉ regenerate flow đó.

---

## Tình huống 1 — Feature đã có đầy đủ tài liệu

Có `docs/{feature}/srs/{feature}-userflow.md` (đã duyệt) + `spec.md` (FR/BR/NFR/Error Matrix).

1. `/wireframe-html {feature}`
2. Skill đọc userflow.md (chia flow) + spec (validation/error cho từng field).
3. Hỏi device → bạn chốt.
4. L1 preview → Y.
5. Ra wireframe + bảng mô tả 5 cột đầy đủ (mã lỗi `E-...`, rule `BR-...` trích thẳng từ spec).

Đây là trường hợp cho ra wireframe "dày" nhất vì có nguồn nghiệp vụ để điền cột Description.

---

## Tình huống 2 — Có userflow nhưng chưa có spec chi tiết

Skill vẫn vẽ được layout + element, nhưng cột Description của bảng 5 cột sẽ mỏng ở chỗ thiếu nguồn. Khi một field có ràng buộc mà tài liệu **không nói rõ** (vd "tối đa 50 ký tự" nhưng không rõ charset), skill **hỏi bạn từng field một** (Phase F.5 Gap check) — KHÔNG tự bịa rule. Bạn trả lời hoặc nói "bỏ qua, giữ nguyên".

---

## Tình huống 3 — Feature hoàn toàn mới (chưa có folder)

`/wireframe-html "<mô tả nghiệp vụ>"`

Skill nhận ra chưa có `docs/{feature}/` → tự gọi `/user-flow`, skill này:
- Derive slug feature từ mô tả (bạn xác nhận).
- Phỏng vấn đúng phạm vi: actor, các bước, nhánh lỗi/edge (theo IT-BA framing — hỏi nghiệp vụ, không hỏi DB/API).
- Vẽ flow, `@flow-reviewer` soi, HARD STOP để bạn duyệt.

Rồi mới quay lại vẽ wireframe. Feature mới tạo chỉ có flow + wireframe → skill gợi ý chạy `/srs` sau để hoàn thiện đặc tả.

---

## Tình huống 4 — Đã chạy /wireframe-ascii trước đó

Nếu workspace của bạn cũng có `/wireframe-ascii` (không kèm trong gói này) và feature đã có `ascii-wireframe/{flow}.md`, thì `/wireframe-html` **đọc lại bảng mô tả 5 cột của ASCII** làm nguồn element — không suy luận lại từ đầu (tránh 2 renderer lệch nhau). Cùng schema 5 cột nên dùng thẳng.

Không có ASCII → skill tự suy luận element từ tài liệu nghiệp vụ. Bộ này chạy độc lập tốt mà không cần ASCII.

---

## Trả lời chốt device

Skill hỏi qua menu 4 lựa chọn, đặt sẵn đề xuất lên đầu:

| Lựa chọn | Bề rộng khung | Dùng khi |
|---|---|---|
| Mobile | 375px | App mobile / responsive ưu tiên mobile |
| Tablet | 768px | Layout tablet |
| Desktop | 1024px | Web app desktop |
| Responsive | nhiều breakpoint | Chỉ khi renderer thật sinh nhiều bề rộng |

> Đề xuất đến từ `userflow.md` frontmatter `primary_device`, thiếu thì suy từ `docs/design.md`. Nếu userflow chưa có `primary_device`, sau khi bạn chốt skill gợi ý ghi ngược vào để lần sau (và `/prototype-html`) dùng chung — không hỏi lại.

**Form không trải rộng hết khung desktop:** màn dạng form/auth/dialog (login, signup, quên mật khẩu, modal) được bọc trong box căn giữa hẹp (~380–460px) — input/nút full-width TRONG box, không kéo dài full 1024px (trông sai). Màn full-content (dashboard/list) mới trải thẳng.

---

## Đọc output

| File | Là gì |
|---|---|
| `{feature}-wireframe.html` | **Cửa vào** — mở cái này. Sidebar TOC (flow → screen) + flow map click được + iframe từng flow. |
| `{flow-slug}.html` | 1 luồng, các screen trong khung device, tự wrap. Mỗi screen có `id="s{n}"` để index deep-link. |
| `{feature}-wireframe-html-index.md` | Metadata cho git/Obsidian (bảng Flows). Không phải cửa vào chính. |

Ngay dưới phần wireframe mỗi flow là **bảng mô tả 5 cột**: `# / Items / Control type / Data type / Description`. Cột Description viết theo 6 lớp (mục đích · validation · states · navigation · error+wording · edge/security) — đủ để BA/dev/QC dùng, xem `04-cach-hoat-dong.md`.
