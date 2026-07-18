---
type: wireframe-html-index
feature: authentication
status: draft
updated: 2026-07-11
links:
  - docs/authentication/srs/authentication-userflow.md
  - docs/authentication/usecases/authentication-usecase-index.md
---

# authentication — HTML Wireframes

> HTML wireframe files (B&W, static) cho các flows của feature authentication. Mỗi file = 1 luồng người dùng — double-click mở trực tiếp trong browser. Nguồn chia flow: `srs/authentication-userflow.md` Mục 3. Nguồn elements: suy luận từ tài liệu nghiệp vụ (hoặc đọc lại `ascii-wireframe/{slug}.md` nếu feature cũng đã chạy `/wireframe-ascii`). Không có JS, không có màu sắc.

## Flows

| # | Flow | File | Screens (theo thứ tự) | Status | Updated |
|---|------|------|-----------------------|--------|---------|
| 1 | Signup + Verify Email | [signup-verify-email.html](signup-verify-email.html) | signup → verify-email-sent → verify-email-result | draft | 2026-07-11 |
| 2 | Login Email + Password | [login-email-password.html](login-email-password.html) | login | draft | 2026-07-11 |
| 3 | Google OAuth | [google-oauth.html](google-oauth.html) | login [chung với flow 2] | draft | 2026-07-11 |
| 4 | GitHub OAuth | [github-oauth.html](github-oauth.html) | login [chung với flow 2] | draft | 2026-07-11 |
| 5 | Forgot Password | [forgot-password.html](forgot-password.html) | forgot-password-request → reset-password-form | draft | 2026-07-11 |
| 6 | Unlink Google | [unlink-google.html](unlink-google.html) | account-security | draft | 2026-07-11 |

**Cửa vào điều hướng:** mở [`authentication-wireframe.html`](authentication-wireframe.html) — sidebar TOC (flow → screen) + flow map click được + iframe load từng flow. Đây là output Phase G.5, dùng khi feature nhiều flow.

**Status:** `draft` / `reviewed` / `approved`.

**Quy ước:**
- `[chung với flow X]` — màn hình được dùng chung với flow khác, render đầy đủ trong cả 2.
- Mỗi màn hình render HTML element thật (input, button, link, label) — không dùng ASCII `<pre>`.
- State hints (italic nhỏ bên dưới element) mô tả logic UI từ cột Description của bảng mô tả 5 cột.
- Mỗi file có bảng mô tả 5 cột (# / Items / Control type / Data type / Description) ngay dưới phần wireframe.

## Links upstream

- [[docs/authentication/srs/authentication-userflow.md|User Flow (nguồn chia flow)]]
- [[docs/authentication/usecases/authentication-usecase-index.md|Use Cases]]
