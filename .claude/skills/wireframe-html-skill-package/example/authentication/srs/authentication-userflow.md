---
type: srs-userflow
feature: authentication
updated: 2026-07-11
stage: flow-approved
primary_device: mobile
flow_approved_at: 2026-07-11
flow_hash: "1431406e"
---

# Authentication — User Flow

> Nguồn chia flow DUY NHẤT cho feature này. `/wireframe-ascii` và `/wireframe-html` đọc file này để biết flow nào gồm những màn nào — KHÔNG tự chia flow riêng.
>
> Derived từ 7 use case hiện có (`docs/authentication/usecases/uc-*.md`) + màn hình đã tồn tại ở `ascii-wireframe/` và `html-wireframe/`. Cách chia flow giữ nhất quán với `html-wireframe/authentication-wireframe-html-index.md` (5 flow đã có) + bổ sung flow GitHub OAuth (uc-github-oauth thêm sau, CR-20260612-001, chưa có wireframe riêng).

## 1. User Flow (tổng)

> Phủ happy / error / edge cases. `[n]` = số màn hình đối chiếu Mục 2.

```mermaid
flowchart TD
    n0["Bắt đầu:<br/>chưa có phiên"]
    n1["[1] Đăng nhập<br/>(email/password + Google + GitHub)"]
    n2["[2] Đăng ký<br/>(email + password)"]
    d1{"Kiểm tra<br/>email/password"}
    n3["Vào app<br/>(hoặc onboarding)"]
    e1["Báo: email hoặc<br/>mật khẩu không đúng"]
    e2["Yêu cầu captcha<br/>(fail ≥3 lần)"]
    e3["Khóa account 24h"]
    e4["Báo: account chưa<br/>verified + nút gửi lại"]
    d2{"Password<br/>đạt chính sách?"}
    n4["[3] Đã gửi email<br/>xác nhận"]
    e5["Inline error:<br/>password không đạt policy"]
    e6["Báo: email<br/>đã được đăng ký"]
    n5["[4] Kết quả xác nhận email<br/>(thành công / hết hạn)"]
    d3{"Token verify<br/>còn hạn + chưa dùng?"}
    e7["Báo: link đã hết hạn<br/>hoặc đã dùng, nút gửi lại"]
    dg{"Google/GitHub<br/>consent OK?"}
    e8["Báo: đăng nhập<br/>Google/GitHub thất bại"]
    dlink{"Email trùng<br/>account có sẵn?"}
    n6["Tự liên kết vào<br/>account đã có"]
    n7["Tạo account mới<br/>verified"]
    n8["[5] Quên mật khẩu<br/>— nhập email"]
    n9["Thông báo trung tính:<br/>nếu email tồn tại, đã gửi link"]
    n10["[6] Đặt mật khẩu mới<br/>(nhập 2 lần)"]
    d4{"Reset link<br/>còn hạn 30 phút?"}
    e9["Báo: link đã hết hạn,<br/>mời quên mật khẩu lại"]
    n11["Đặt lại thành công,<br/>thu hồi mọi session,<br/>yêu cầu đăng nhập lại"]
    n12["[7] Bảo mật tài khoản<br/>— gỡ liên kết Google"]
    d5{"Account đã<br/>có password?"}
    n13["Gỡ liên kết Google<br/>thành công"]
    n14["Buộc tạo mật khẩu<br/>trước khi gỡ"]

    n0 -->|"có account"| n1
    n0 -->|"chưa có account"| n2

    n1 -->|"submit email/password"| d1
    d1 -->|"đúng + verified"| n3
    d1 -->|"sai"| e1
    e1 -.->|"fail 1-2 lần"| n1
    e1 -->|"fail ≥3 lần"| e2
    e2 -.->|"fail ≥5 lần"| e3
    d1 -->|"chưa verified"| e4
    e4 -.->|"gửi lại email"| n4
    n1 -->|"bấm Google"| dg
    n1 -->|"bấm GitHub"| dg
    dg -->|"thành công"| dlink
    dg -->|"thất bại/đóng tab"| e8
    e8 -.->|"thử lại"| n1
    dlink -->|"email đã có"| n6
    dlink -->|"email mới"| n7
    n6 --> n3
    n7 --> n3
    n1 -->|"quên mật khẩu?"| n8
    n1 -->|"chưa có account?"| n2

    n2 -->|"submit"| d2
    d2 -->|"đạt"| n4
    d2 -->|"không đạt"| e5
    e5 -.->|"sửa lại"| n2
    n2 -->|"email đã tồn tại"| e6
    e6 -.->|"đăng nhập/quên MK"| n1
    n4 -->|"click link trong email"| d3
    d3 -->|"hợp lệ, chưa dùng"| n5
    d3 -->|"hết hạn/đã dùng"| e7
    e7 -.->|"gửi lại link"| n4
    n5 -->|"vui lòng đăng nhập"| n1

    n8 -->|"submit email"| n9
    n9 -.->|"nếu email tồn tại"| n10
    n10 -->|"submit mật khẩu mới"| d4
    d4 -->|"còn hạn + đạt policy"| n11
    d4 -->|"hết hạn"| e9
    e9 -.->|"quên mật khẩu lại"| n8
    n11 -->|"đăng nhập lại"| n1

    n3 -->|"vào phần bảo mật"| n12
    n12 -->|"bấm gỡ liên kết"| d5
    d5 -->|"đã có password"| n13
    d5 -->|"chưa có password"| n14
    n14 -.->|"tạo xong password"| n13
    n13 --> n12

    classDef happy fill:#d4edda,stroke:#28a745
    classDef error fill:#f8d7da,stroke:#dc3545
    classDef edge fill:#fff3cd,stroke:#ffc107

    class n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13 happy
    class e1,e3,e5,e6,e8,e9 error
    class e2,e4,e7,n14,dlink edge
```

## 2. Danh sách màn hình

| [#] | Màn hình | Mục đích | Thuộc flow |
|-----|----------|----------|------------|
| 1 | login | Đăng nhập bằng email/password, hoặc qua Google/GitHub; lối vào đăng ký + quên mật khẩu | login-email-password, google-oauth, github-oauth |
| 2 | signup | Đăng ký tài khoản mới bằng email + password | signup-verify-email |
| 3 | verify-email-sent | Thông báo đã gửi email xác nhận, có nút gửi lại | signup-verify-email |
| 4 | verify-email-result | Kết quả click link xác nhận (thành công / hết hạn) | signup-verify-email |
| 5 | forgot-password-request | Nhập email để nhận link đặt lại mật khẩu | forgot-password |
| 6 | reset-password-form | Đặt mật khẩu mới (nhập 2 lần) sau khi click link reset | forgot-password |
| 7 | account-security | Gỡ liên kết Google, buộc tạo password nếu account chưa có | unlink-google |

## 3. Danh sách flow

| Flow-slug | Tên flow | Màn hình gồm | Cases phủ |
|-----------|----------|--------------|-----------|
| login-email-password | Đăng nhập email + password | login | happy (đăng nhập thành công, vào app/onboarding), error (sai email/password, chưa verified), edge (captcha ≥3 lần, khóa 24h ≥5 lần, lỗi mạng không tính fail) |
| signup-verify-email | Đăng ký + xác nhận email | signup → verify-email-sent → verify-email-result | happy (đăng ký + xác nhận thành công), error (password không đạt policy, email đã tồn tại, link hết hạn/đã dùng), edge (resend cooldown 60s max 5/ngày, 2 thiết bị cùng click 1 link) |
| google-oauth | Đăng nhập/đăng ký qua Google | login [chung với flow login-email-password] | happy (tạo account mới hoặc auto-link vào account có sẵn), error (callback thất bại), edge (đóng tab giữa chừng, email Google khác hoàn toàn email cũ) |
| github-oauth | Đăng nhập/đăng ký qua GitHub | login [chung với flow login-email-password] | happy (tạo account mới hoặc auto-link vào account có sẵn), error (callback thất bại, GitHub không trả email), edge (đóng tab giữa chừng, email GitHub khác hoàn toàn email cũ) |
| forgot-password | Quên mật khẩu / đặt lại | forgot-password-request → reset-password-form | happy (đặt lại thành công, thu hồi mọi session), error (link hết hạn 30 phút, password mới không đạt policy), edge (anti-enumeration — email không tồn tại vẫn báo trung tính) |
| unlink-google | Gỡ liên kết Google | account-security | happy (gỡ liên kết thành công khi đã có password), edge (account chưa có password → buộc tạo password trước, bỏ giữa chừng vẫn còn liên kết) |

## 4. Open Questions

- [ ] OQ-1 (kế thừa từ `uc-login-email.md`): vị trí nút đăng xuất trong app chính — ngoài scope màn hình auth, chốt khi thiết kế layout app chính.
- [ ] OQ-2 (kế thừa từ `uc-google-oauth.md` + `uc-github-oauth.md`): auto-link Google/GitHub không re-verify ownership — rủi ro chiếm tài khoản, cân nhắc P1 (đồng bộ OQ-3 ở `srs/spec.md`).
- [ ] OQ-3 (kế thừa từ `uc-github-oauth.md`): gỡ liên kết GitHub (unlink) chưa có UC/FR — hiện `account-security` chỉ hỗ trợ unlink Google. Flow `github-oauth` ở trên chỉ phủ link/login, chưa phủ unlink GitHub (enhancement sau, out of scope CR-20260612-001).

## Changelog

- 2026-07-11 | /user-flow | initial: derive từ 7 use case hiện có (signup/verify/login/forgot-password/google-oauth/unlink-google/github-oauth), chia 6 flow (thêm github-oauth mới so với 5 flow html-wireframe cũ), phủ happy/error/edge.
