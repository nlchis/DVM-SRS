# Skill vẽ Wireframe HTML cho BA — Wireframe HTML Skill Package

> Skill `/wireframe-html` cho **IT Business Analyst**: biến bản đồ luồng người dùng của một tính năng thành **wireframe HTML đen trắng** — element HTML thật (ô nhập, nút, link) đặt trong khung đúng bề rộng thiết bị, mỗi luồng 1 file double-click là mở. Kèm skill chị em `/user-flow` để phân tích nghiệp vụ ra luồng + chia flow (nguồn của wireframe).
>
> Gói này viết cho **Claude Code**, kèm hướng dẫn **port sang Codex CLI** và **Google Antigravity IDE**.

Bộ này là một phần của bộ công cụ BA-KIT dạy trong khóa **AI4BA** — [ai4ba.com](https://ai4ba.com). Xem mục [Về AI4BA](#về-ai4ba) ở cuối.

---

## `/wireframe-html` làm gì

| | |
|---|---|
| **Nguồn** | `srs/{feature}-userflow.md` (bản đồ chia flow, do `/user-flow` tạo) + tài liệu nghiệp vụ (`spec.md` cho validation/error) |
| **Output** | Wireframe HTML self-contained (B&W), mỗi luồng 1 file + 1 file cửa vào điều hướng, kèm bảng mô tả 5 cột |
| **Khung thiết bị** | Mobile 375 / Tablet 768 / Desktop 1024 / Responsive — hỏi bạn chốt, có đề xuất sẵn |
| **Người đọc cuối** | BA / thiết kế / dev / QC — review bố cục màn + element trước khi thiết kế đẹp hay code |
| **Đặc trưng** | Element HTML thật (không ASCII) · đúng tỉ lệ device · một màn = một trạng thái · không tự chia flow |

**Hai skill trong gói, chạy nối nhau:**

| Skill | Vai trò | Người đọc cuối |
|---|---|---|
| **`/user-flow`** | Nghiệp vụ → sơ đồ luồng (mermaid, phủ happy/error/edge) + **chia flow** | BA / team |
| **`/wireframe-html`** | Đọc bản đồ flow → vẽ mỗi flow thành wireframe HTML | BA / thiết kế / dev / QC |

**Thang fidelity (để đặt đúng kỳ vọng):**

```
/wireframe-ascii   →   /wireframe-html   →   /prototype-html
(ASCII, chat)          (B&W, đúng device)     (màu + JS click, demo)
                        ▲ bộ này
```

`/wireframe-html` là bậc lo-fi B&W, layout-accurate. Khác `/prototype-html` (có màu + click-through để demo stakeholder) và `/wireframe-ascii` (ASCII trong markdown). Hai cái kia **không** kèm trong gói này.

---

## Gói này có gì

```
wireframe-html-skill-package/
├── README.md                       ← bạn đang đọc
├── LICENSE                         ← MIT
├── huong-dan/                      ← HƯỚNG DẪN SỬ DỤNG CHI TIẾT (đọc kỹ phần này)
│   ├── 00-bat-dau-nhanh.md         ← cài + vẽ thử trong 5 phút
│   ├── 01-cai-dat-cong-cu.md       ← mức tối thiểu (không cần cài gì) + tùy chọn mmdc
│   ├── 02-luong-user-flow-truoc.md ← user flow TRƯỚC → wireframe SAU + 3 chốt người
│   ├── 03-huong-dan-chi-tiet.md    ← cách gọi, tình huống, cách trả lời từng chốt
│   ├── 04-cach-hoat-dong.md        ← nguồn element · bảng 5 cột 6 lớp · khung device · cửa vào
│   └── 05-cau-hoi-thuong-gap.md    ← FAQ + xử lý sự cố
├── explain-skills/                 ← GIẢI THÍCH NGHIỆP VỤ (cho người không rành kỹ thuật)
│   └── wireframe-html.md
├── example/                        ← VÍ DỤ ĐẦY ĐỦ: wireframe feature "Đăng nhập / Đăng ký"
│   ├── README.md                   ← bản đồ file + quan hệ userflow → wireframe
│   └── authentication/             ← userflow nguồn + 6 flow HTML + cửa vào điều hướng
├── claude-code/                    ← BỘ NGUYÊN BẢN cho Claude Code (copy vào workspace)
│   ├── .claude/
│   │   ├── skills/wireframe-html/  ← SKILL.md
│   │   ├── skills/user-flow/       ← SKILL.md (chạy trước, nguồn chia flow)
│   │   ├── agents/                 ← flow-reviewer (soi flow ở /user-flow)
│   │   ├── rules/                  ← rule dùng chung (approval-gate, ba-conventions, naming...)
│   │   └── scripts/                ← mermaid-verify.mjs (verify sơ đồ /user-flow — tùy chọn)
│   └── _templates/                 ← wireframe-html-template.html + wireframe-html-nav-template.html
├── INSTALL-CODEX.md                ← port sang Codex CLI (.codex/)
├── INSTALL-ANTIGRAVITY.md          ← port sang Google Antigravity IDE (.agents/)
├── PROMPT-CODEX.md                 ← prompt copy-paste để Codex tự cài
└── PROMPT-ANTIGRAVITY.md           ← prompt copy-paste để Antigravity tự cài
```

---

## Bắt đầu ngay (Claude Code)

1. **Copy skill vào workspace** BA của bạn:
   ```bash
   mkdir -p <workspace>/.claude/{skills,agents,rules,scripts} <workspace>/_templates
   cp -R claude-code/.claude/skills/wireframe-html  <workspace>/.claude/skills/
   cp -R claude-code/.claude/skills/user-flow        <workspace>/.claude/skills/
   cp    claude-code/.claude/agents/*.md             <workspace>/.claude/agents/
   cp    claude-code/.claude/rules/*.md              <workspace>/.claude/rules/
   cp    claude-code/.claude/scripts/*.mjs           <workspace>/.claude/scripts/
   cp    claude-code/_templates/*                    <workspace>/_templates/
   ```
   > Workspace đã có sẵn bộ BA-KIT → rule/agent có thể trùng, cứ giữ bản đang dùng.

2. **Không cần cài công cụ gì** để vẽ wireframe (file HTML tĩnh, tự-chứa). Tùy chọn: cài `mmdc` nếu muốn `/user-flow` tự kiểm mermaid — xem `huong-dan/01-cai-dat-cong-cu.md`.

3. **Chạy thử** trong Claude Code mở tại workspace:
   ```
   /wireframe-html authentication      # feature đã có tài liệu
   /wireframe-html "đăng nhập bằng email hoặc Google"   # feature mới → tự chạy /user-flow
   ```

👉 Chi tiết từng bước ở **`huong-dan/00-bat-dau-nhanh.md`**.

---

## Điểm mạnh của bộ này

- **Bản đồ luồng là nguồn duy nhất.** `/wireframe-html` không tự nghĩ ra "feature có mấy luồng" — đọc `userflow.md` do `/user-flow` tạo, nên ASCII / HTML / prototype luôn nhất quán.
- **Element HTML thật, đúng tỉ lệ thiết bị.** Không phải card 33% đồng đều — mỗi màn render trong khung đúng bề rộng device (375/768/1024), tự wrap, giống màn thật.
- **Bạn chốt device trước khi vẽ.** Skill đề xuất sẵn nhưng không tự chọn im lặng — bề rộng khung là quyết định thiết kế.
- **Bảng mô tả 5 cột đủ dùng.** Cột Description 6 lớp: mục đích · validation · states · navigation · error+wording · edge/security — dev và QC dùng thật, không phải chú thích qua loa.
- **Không bịa.** Field thiếu chi tiết validation → skill hỏi bạn, không tự chế rule.
- **Cửa vào điều hướng.** Feature nhiều flow → 1 file `.html` gom sidebar + flow map, thay vì mở hàng loạt file rời.

---

## Port sang công cụ khác

- **Codex CLI** → `INSTALL-CODEX.md` (chi tiết) + `PROMPT-CODEX.md` (prompt copy-paste).
- **Google Antigravity IDE** → `INSTALL-ANTIGRAVITY.md` (chi tiết) + `PROMPT-ANTIGRAVITY.md` (prompt copy-paste).

---

## Về AI4BA

Skill này là công cụ thực hành trong khóa **AI4BA — AI cho Business Analyst** tại **[ai4ba.com](https://ai4ba.com)**.

AI4BA dạy BA/PO dùng AI (Claude Code, Codex, Antigravity…) để làm nhanh và chuẩn hơn toàn bộ vòng đời tài liệu nghiệp vụ: từ brainstorm ý tưởng, viết URD/BRD/PRD/SRS, vẽ sơ đồ, dựng user flow + wireframe, tới user story/acceptance criteria và đồng bộ Jira/Confluence.

### Triết lý: Human-in-the-loop — BA vẫn là cốt lõi

AI4BA **không** thay BA bằng AI. **BA là người điều khiển, AI là công cụ tăng tốc:**

- **BA cung cấp context — AI mới hiểu đúng nghiệp vụ.** Chất lượng wireframe phụ thuộc vào bản đồ luồng + tài liệu nguồn + câu trả lời của BA (device, chi tiết validation). AI không bịa element/lỗi khi thiếu nguồn.
- **BA duyệt trước khi ghi.** `/user-flow` dựng flow rồi DỪNG chờ bạn duyệt (HARD STOP); `/wireframe-html` hỏi device + xem trước (L1) rồi mới ghi; cập nhật thì xem diff (L2). Mọi thay đổi qua tay người.
- **BA review output — không giao khoán cho AI.** Wireframe AI vẽ là bản nháp chất lượng cao để BA thẩm định; đúng-sai bố cục/nghiệp vụ là quyết định của BA.
- **AI lo phần máy móc, BA lo phần tư duy.** AI đọc tài liệu, map element, render HTML, dàn khung — để BA tập trung vào hiểu người dùng và chịu trách nhiệm với team.

> Nói ngắn: **AI làm nhanh hơn, BA làm chuẩn hơn.**

Muốn học đầy đủ quy trình BA-with-AI và các bộ skill khác → **[ai4ba.com](https://ai4ba.com)**.

---

## License

MIT — xem `LICENSE`. Dùng tự do, ghi nguồn AI4BA nếu chia sẻ lại.
