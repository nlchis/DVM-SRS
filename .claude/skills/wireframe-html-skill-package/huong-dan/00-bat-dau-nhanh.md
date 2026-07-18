# 00 — Bắt đầu nhanh (5 phút)

> Mục tiêu: cài xong skill `/wireframe-html` (kèm `/user-flow`) và vẽ thử wireframe HTML cho một feature trong ~5 phút. Skill sinh **wireframe HTML đen trắng** (element HTML thật, không phải ASCII) cho từng luồng người dùng của feature, mỗi luồng 1 file double-click là mở.

---

## Bước 1 — Copy skill vào workspace BA

Từ thư mục gốc gói này:

```bash
# Thay <workspace> bằng workspace BA của bạn (nơi có CLAUDE.md + docs/)
mkdir -p <workspace>/.claude/{skills,agents,rules,scripts} <workspace>/_templates

cp -R claude-code/.claude/skills/wireframe-html  <workspace>/.claude/skills/
cp -R claude-code/.claude/skills/user-flow        <workspace>/.claude/skills/
cp    claude-code/.claude/agents/*.md              <workspace>/.claude/agents/
cp    claude-code/.claude/rules/*.md               <workspace>/.claude/rules/
cp    claude-code/.claude/scripts/*.mjs            <workspace>/.claude/scripts/
cp    claude-code/_templates/*                     <workspace>/_templates/
```

> Rule/agent trùng tên với bộ BA-KIT sẵn có trong workspace → cứ giữ bản của workspace, không đè.

---

## Bước 2 — Không cần cài công cụ gì để vẽ wireframe

Wireframe HTML là file tĩnh tự-chứa (self-contained) — double-click mở bằng trình duyệt, **không cần cài gì**.

Tùy chọn (chỉ nếu muốn `/user-flow` tự kiểm mermaid có compile không): cài `mmdc` — xem `01-cai-dat-cong-cu.md`. Thiếu `mmdc` vẫn chạy tốt, chỉ bỏ bước verify sơ đồ.

---

## Bước 3 — Mở Claude Code tại workspace và chạy

```bash
cd <workspace>
claude
```

Trong chat, vẽ wireframe cho 1 feature đã có tài liệu trong `docs/{feature}/`:

```
/wireframe-html authentication
```

Skill chạy pipeline 2 nhịp:

1. **Cần user flow trước.** Nếu `docs/{feature}/srs/{feature}-userflow.md` chưa có, skill **tự gọi `/user-flow`** để phân tích nghiệp vụ ra luồng + chia flow (đây là nguồn "flow nào gồm màn nào"). `/user-flow` có hỏi–đáp làm rõ và **DỪNG chờ bạn duyệt** flow.
2. **Hỏi device (bắt buộc).** Trước khi vẽ, skill hỏi bạn **Mobile 375 / Tablet 768 / Desktop 1024 / Responsive** (có đề xuất sẵn) — vì bề rộng khung là quyết định thiết kế, skill không tự đoán im lặng.
3. **Vẽ.** Mỗi flow → 1 file `{flow-slug}.html` (screen render trong khung đúng bề rộng device) + 1 file điều hướng `{feature}-wireframe.html` (sidebar + flow map).

> Skill dừng ở các chốt người (duyệt flow, chốt device, L1 preview trước khi ghi) — đây là human-in-the-loop, không vẽ bừa rồi bắt bạn sửa.

---

## Bước 4 — Xem kết quả mẫu trước khi tự làm

Mở `example/authentication/` — bộ wireframe HTML hoàn chỉnh cho feature **Đăng nhập / Đăng ký** (6 luồng: login, signup+verify, Google/GitHub OAuth, quên mật khẩu, gỡ liên kết). Double-click `authentication/html-wireframe/authentication-wireframe.html` để xem cửa vào điều hướng. Đọc `example/README.md` để hiểu quan hệ userflow → wireframe.

---

## Feature chưa có tài liệu thì sao?

Bạn vẫn chạy được: `/wireframe-html <mô tả feature>`. Skill sẽ tự gọi `/user-flow` — skill này phỏng vấn bạn (actor, các bước, nhánh lỗi/edge) để dựng luồng trước, rồi mới vẽ. Không có tài liệu = skill hỏi bạn, KHÔNG bịa. Xem `04-cach-hoat-dong.md`.

## Gặp lỗi?

→ `05-cau-hoi-thuong-gap.md` (FAQ + xử lý sự cố).
