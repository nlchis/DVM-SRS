# Ví dụ đầy đủ — Wireframe HTML feature "Đăng nhập / Đăng ký"

> Bộ wireframe HTML hoàn chỉnh do skill `/wireframe-html` sinh ra cho feature **authentication** (đăng nhập, đăng ký + xác nhận email, đăng nhập qua Google/GitHub, quên mật khẩu, gỡ liên kết). Toàn bộ được vẽ từ **bản đồ luồng** `srs/authentication-userflow.md` (nguồn của `/user-flow`) — minh họa trọn pipeline: user flow → wireframe HTML.
>
> Đây là bản mẫu để bạn đối chiếu khi chạy `/wireframe-html` trên feature của mình.

---

## Cách xem

**Mở cửa vào điều hướng:** double-click `authentication/html-wireframe/authentication-wireframe.html` — mở bằng trình duyệt, không cần server. Sidebar trái là mục lục (flow → screen); tab "Tổng quan" là sơ đồ luồng bấm được; khung giữa load từng flow.

Muốn xem 1 luồng riêng: mở thẳng file luồng đó, ví dụ `authentication/html-wireframe/login-email-password.html`.

---

## Cấu trúc ví dụ

```
authentication/
├── srs/
│   └── authentication-userflow.md            ← NGUỒN: bản đồ luồng (output /user-flow) — chia 6 flow
└── html-wireframe/                            ← OUTPUT: wireframe HTML (output /wireframe-html)
    ├── authentication-wireframe.html          ← CỬA VÀO: sidebar TOC + flow map + iframe từng flow
    ├── authentication-wireframe-html-index.md ← master metadata (bảng Flows) cho git/Obsidian
    ├── login-email-password.html              ← flow 1: đăng nhập email + password
    ├── signup-verify-email.html               ← flow 2: đăng ký → gửi email → xác nhận (nhiều màn)
    ├── google-oauth.html                      ← flow 3: đăng nhập/đăng ký qua Google
    ├── github-oauth.html                      ← flow 4: đăng nhập/đăng ký qua GitHub
    ├── forgot-password.html                   ← flow 5: quên mật khẩu → đặt lại
    └── unlink-google.html                     ← flow 6: gỡ liên kết Google
```

---

## Quan hệ userflow → wireframe

`srs/authentication-userflow.md` Mục 3 chia feature thành **6 flow**; `/wireframe-html` đọc bảng đó và vẽ mỗi flow thành 1 file `.html` cùng tên slug. Đối chiếu nhanh:

| userflow Mục 3 (flow-slug) | Màn hình gồm | File HTML |
|---|---|---|
| `login-email-password` | login | `login-email-password.html` |
| `signup-verify-email` | signup → verify-email-sent → verify-email-result | `signup-verify-email.html` |
| `google-oauth` | login [chung với flow login] | `google-oauth.html` |
| `github-oauth` | login [chung với flow login] | `github-oauth.html` |
| `forgot-password` | forgot-password-request → reset-password-form | `forgot-password.html` |
| `unlink-google` | account-security | `unlink-google.html` |

---

## Ví dụ này minh họa gì

| Nguyên tắc của `/wireframe-html` | Thể hiện trong ví dụ |
|---|---|
| **Không tự chia flow** | 6 file HTML khớp đúng 6 flow trong `userflow.md` Mục 3 — wireframe chỉ render, không tự nghĩ luồng |
| **Element HTML thật** | Mỗi màn dùng `<input>`, `<button>`, `<a>`, `<label>` — không phải ASCII `<pre>` |
| **Đen trắng nghiêm ngặt** | Chỉ `#000 / #fff / #f0f0f0 / #888 / #ccc`, icon = token chữ (`(eye)`), không emoji |
| **Form không trải rộng** | Màn login/signup/forgot bọc trong box căn giữa hẹp, không kéo full chiều ngang |
| **Một màn = một trạng thái** | `signup-verify-email` tách màn "xác nhận thành công" và "link hết hạn" thành screen riêng, không nhồi chung khung |
| **Màn dùng chung nhiều flow** | Screen `login` xuất hiện trong login + Google + GitHub OAuth, gắn nhãn `[chung]` |
| **Bảng mô tả 5 cột 6 lớp** | Mỗi flow có bảng `# / Items / Control type / Data type / Description`; cột Description ghi validation, states, navigation, mã lỗi `E-...` |
| **Cửa vào điều hướng** | `authentication-wireframe.html` gom 6 flow vào 1 chỗ (sidebar + flow map), thay vì mở 6 file rời |

---

## Lưu ý về bộ ví dụ này

- Bộ này được sinh ở giai đoạn convention **"chốt device một lần cho cả feature"** chưa hoàn thiện, nên vài file để `data-device` khác nhau (login = mobile, signup = desktop). Khi bạn chạy mới, skill hỏi device **một lần** ở đầu và áp nhất quán cho mọi flow.
- File HTML tự-chứa (self-contained) — không tham chiếu CSS/JS ngoài, không cần internet. Cửa vào `authentication-wireframe.html` load các file flow qua iframe bằng đường dẫn tương đối, nên giữ nguyên cấu trúc thư mục khi copy đi nơi khác.

> Muốn wireframe có phần mô tả "dày" như ví dụ này, feature cần có `srs/{feature}-spec.md` (FR/BR/NFR/Error Matrix) làm nguồn — xem `../huong-dan/04-cach-hoat-dong.md`.
