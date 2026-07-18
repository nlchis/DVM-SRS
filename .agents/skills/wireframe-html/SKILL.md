---
name: wireframe-html
description: Dùng khi cần tạo wireframe HTML (đen trắng, đơn giản) cho các flow của 1 feature, render element HTML thật thay vì ASCII. Kích hoạt bằng /wireframe-html <feature>. Cần có srs/{feature}-userflow.md trước (skill tự chạy /user-flow nếu chưa có). Nếu /wireframe-ascii đã chạy trước cho screen đó, đọc lại bảng mô tả ASCII làm nguồn element thay vì suy luận lại từ đầu.
---

# /wireframe-html â€” HTML Wireframe Generator

> Skill cháº¡y `context: fork` (read nhiá»u file + compose HTML). Main context giá»¯ sáº¡ch.

## Goal

Sinh **HTML wireframe file** (B&W, khĂ´ng mĂ u sáº¯c) cho tá»«ng luá»“ng cá»§a 1 feature. Má»—i flow = 1 HTML file tá»±-contained. Má»—i screen render trong **khung cĂ³ bá» rá»™ng device tháº­t** (mobile 375 / tablet 768 / desktop 1024px â€” láº¥y tá»« `srs/{feature}-userflow.md` frontmatter `primary_device`), cĂ¡c screen **tá»± wrap** xuá»‘ng dĂ²ng theo bá» rá»™ng device (KHĂ”NG Ă©p 3/row). Má»—i screen render **HTML element tháº­t** â€” `<input>`, `<button>`, `<a>`, `<label>`... khĂ´ng dĂ¹ng `<pre>` ASCII.

> **VĂ¬ sao khung device tháº­t:** card "33% chiá»u ngang" cÅ© lĂ m mobile login vĂ  desktop dashboard cĂ¹ng size â†’ trĂ´ng giáº£, sai tá»‰ lá»‡. Render Ä‘Ăºng bá» rá»™ng device cho tá»‰ lá»‡ tháº­t.

ASCII (`/wireframe-ascii`) vĂ  HTML lĂ  2 renderer **ngang hĂ ng** cá»§a cĂ¹ng 1 screen. Skill nĂ o cháº¡y **trÆ°á»›c** váº«n tá»± suy luáº­n element tá»« tĂ i liá»‡u nghiá»‡p vá»¥; skill cháº¡y **sau** Ä‘á»c láº¡i káº¿t quáº£ cá»§a skill trÆ°á»›c lĂ m nguá»“n, trĂ¡nh suy luáº­n 2 láº§n lá»‡ch nhau â€” xem Phase B.5. Cáº£ hai dĂ¹ng chung 1 nguá»“n chia flow: `docs/{feature}/srs/{feature}-userflow.md`.

Ngay dÆ°á»›i pháº§n wireframe cá»§a má»—i flow, skill sinh thĂªm **báº£ng mĂ´ táº£ mĂ n hĂ¬nh** (5 cá»™t: `#` / Items / Control type / Data type / Description) â€” 1 báº£ng duy nháº¥t, gá»™p táº¥t cáº£ screens cá»§a flow, phĂ¢n Ä‘oáº¡n theo `Screen N: {tĂªn screen}`. Xem Phase F.5.

**Thang fidelity 3 báº­c:** `/wireframe-ascii` (lo-fi chat-native) â†’ `/wireframe-html` (lo-fi B&W, layout-accurate â€” báº­c NĂ€Y) â†’ `/prototype-html` (hi-fi, tokens + JS). ASCII vĂ  HTML **cĂ¹ng báº­c lo-fi, 2 renderer** cĂ¹ng 1 screen.

**Äiá»ƒm khĂ¡c biá»‡t vá»›i `/prototype-html`:**
- `/wireframe-html` â†’ B&W static layout, khĂ´ng JS navigation, má»¥c Ä‘Ă­ch review scope/layout + tá»‰ lá»‡ device nhanh.
- `/prototype-html` â†’ mĂ u sáº¯c Ä‘áº§y Ä‘á»§ (design tokens), JS click-through, má»¥c Ä‘Ă­ch stakeholder demo.

## Constraints

- **Cáº§n `srs/{feature}-userflow.md` trÆ°á»›c.** ChÆ°a tá»“n táº¡i/chÆ°a duyá»‡t â†’ skill tá»± gá»i `/user-flow <feature>` (Phase A), KHĂ”NG tá»± chia flow riĂªng.
- **Confirm device size vá»›i user TRÆ¯á»C khi váº½ (Phase A bÆ°á»›c 4)** â€” Mobile 375 / Tablet 768 / Desktop 1024 / Responsive. Äá» xuáº¥t sáºµn tá»« `primary_device`/design.md nhÆ°ng KHĂ”NG tá»± chá»‘t im láº·ng (device lĂ  quyáº¿t Ä‘á»‹nh thiáº¿t káº¿).
- **L1 plan preview** trÆ°á»›c khi write báº¥t ká»³ file.
- **L2 diff** cho `{feature}-wireframe-html-index.md` khi file Ä‘Ă£ tá»“n táº¡i (update mode tá»± Ä‘á»™ng).
- **`<feature>` báº¯t buá»™c** (positional arg, auto-infer khi chá»‰ 1 feature match tá»« arg).
- **Nguá»“n element Æ°u tiĂªn: ASCII Ä‘Ă£ cĂ³ â†’ tĂ i liá»‡u nghiá»‡p vá»¥.** Screen Ä‘Ă£ cĂ³ `ascii-wireframe/{flow-slug}.md` â†’ Ä‘á»c báº£ng mĂ´ táº£ **5 cá»™t** cá»§a screen Ä‘Ă³ (cĂ¹ng schema) lĂ m nguá»“n field/action/validation (Phase B.5), KHĂ”NG suy luáº­n láº¡i tá»« Ä‘áº§u, KHĂ”NG re-infer mĂ n ASCII Ä‘Ă£ táº£. Screen chÆ°a cĂ³ ASCII â†’ tá»± suy luáº­n tá»« brainstorm/URD/PRD/SRS spec nhÆ° cÅ©. `userflow.md` cho biáº¿t flow nĂ o gá»“m mĂ n nĂ o + má»¥c Ä‘Ă­ch tá»«ng mĂ n.
- **Báº£ng mĂ´ táº£ 5 cá»™t (Phase F.5)**: khi tĂ i liá»‡u nghiá»‡p vá»¥ thiáº¿u chi tiáº¿t validation cá»¥ thá»ƒ cho 1 field (vd giá»›i háº¡n kĂ½ tá»± nhÆ°ng khĂ´ng nĂ³i rĂµ charset cho phĂ©p, hoáº·c upload khĂ´ng nĂ³i rĂµ dung lÆ°á»£ng/Ä‘á»‹nh dáº¡ng) â†’ skill PHáº¢I há»i user bá»• sung (tá»«ng field má»™t, theo no-re-ask rule), KHĂ”NG tá»± suy Ä‘oĂ¡n hoáº·c bá»‹a quy táº¯c khĂ´ng cĂ³ nguá»“n.
- **B&W strict**: CSS chá»‰ dĂ¹ng `#000`, `#fff`, `#f0f0f0`, `#888`, `#ccc` â€” KHĂ”NG dĂ¹ng mĂ u cĂ³ sáº¯c.
- **Self-contained HTML**: khĂ´ng cĂ³ external CSS/JS dependencies. Inline táº¥t.
- **Cross-flow screens**: flow B báº¯t Ä‘áº§u tá»« mĂ n hĂ¬nh thuá»™c flow A â†’ bao gá»“m mĂ n hĂ¬nh Ä‘Ă³, nhĂ£n `[chung]`.
- **Vietnamese-first** labels. User nĂ³i "viáº¿t báº±ng tiáº¿ng Anh" Ä‘á»ƒ switch.
- **BA conventions** â€” L1 prose preview, no-re-ask rule, IT-BA framing. Per @../../rules/ba-conventions.md.

## Inputs

```
/wireframe-html <feature>                    # táº¥t cáº£ flows
/wireframe-html <feature> --flow <slug>      # 1 flow cá»¥ thá»ƒ
```

Muá»‘n Ä‘á»•i hĂ nh vi máº·c Ä‘á»‹nh, nĂ³i báº±ng lá»i:
- File flow Ä‘Ă£ tá»“n táº¡i â†’ skill tá»± regenerate (L2 diff má»—i file), khĂ´ng cáº§n flag; muá»‘n sá»­a gá»i láº¡i skill vĂ  nĂ³i cáº§n Ä‘á»•i gĂ¬.
- Viáº¿t báº±ng tiáº¿ng Anh â†’ nĂ³i "viáº¿t báº±ng tiáº¿ng Anh".

## Context (dynamic)

Today: !`date +%Y-%m-%d`
Features cĂ³ sáºµn: !`ls -d docs/*/ 2>/dev/null | xargs -I{} basename {} | grep -v "^_" | head -20`
Features cĂ³ userflow.md (nguá»“n chia flow Báº®T BUá»˜C): !`for d in docs/*/srs/*-userflow.md; do [ -f "$d" ] && dirname "$d" | xargs dirname | xargs basename; done 2>/dev/null | head -20`
Features Ä‘Ă£ cĂ³ html-wireframe: !`for d in docs/*/html-wireframe/*-wireframe-html-index.md; do [ -f "$d" ] && dirname "$d" | xargs dirname | xargs basename; done 2>/dev/null | head -20`

## Output

```
docs/{feature}/html-wireframe/
  {feature}-wireframe.html                           â† INDEX ÄIá»€U HÆ¯á»NG (cá»­a vĂ o â€” double-click má»Ÿ browser: sidebar TOC + flow map + iframe). Xem Phase G.5.
  {feature}-wireframe-html-index.md                  â† master index metadata (type: wireframe-html-index, cho git/Obsidian)
  {flow-slug}.html           â† 1 file per flow (má»—i screen cĂ³ id="s{n}" Ä‘á»ƒ index deep-link)
  {flow-slug-2}.html
  ...
```

Sau generate: cáº­p nháº­t `docs/{feature}/ascii-wireframe/{feature}-wireframe-index.md` cá»™t `HTML wireframe` (náº¿u tá»“n táº¡i â€” 2 renderer ngang hĂ ng, cross-link Ä‘á»ƒ dá»… tra cá»©u, xem Phase H).

## Approach

### Phase A â€” Parse & Validate

1. Extract `<feature>` tá»« args. Validate `docs/{feature}/` tá»“n táº¡i â†’ OK.
2. Check `docs/{feature}/srs/{feature}-userflow.md`:
   - Tá»“n táº¡i + `stage: flow-approved` â†’ Read, dĂ¹ng lĂ m nguá»“n chia flow + danh sĂ¡ch mĂ n hĂ¬nh.
   - ChÆ°a tá»“n táº¡i hoáº·c chÆ°a duyá»‡t â†’ **tá»± Ä‘á»™ng gá»i `/user-flow <feature>`** trÆ°á»›c khi tiáº¿p tá»¥c. Skill nĂ y KHĂ”NG tá»± chia flow riĂªng.
3. Náº¿u `--flow <slug>`: chá»‰ xá»­ lĂ½ flow Ä‘Ă³ (pháº£i khá»›p 1 flow-slug trong userflow.md Má»¥c 3).
4. **Confirm device size vá»›i user (Báº®T BUá»˜C â€” KHĂ”NG tá»± chá»‘t im láº·ng).** Device quyáº¿t Ä‘á»‹nh bá» rá»™ng khung â†’ lĂ  quyáº¿t Ä‘á»‹nh thiáº¿t káº¿, pháº£i Ä‘á»ƒ user chá»‘t trÆ°á»›c khi váº½:
   - Äá» xuáº¥t sáºµn 1 device tá»« nguá»“n (Æ°u tiĂªn `userflow.md` `primary_device`; thiáº¿u thĂ¬ suy tá»« `docs/design.md` Breakpoints/Max-width) Ä‘á»ƒ user chá»‰ cáº§n xĂ¡c nháº­n.
   - Há»i qua AskUserQuestion: **Mobile 375 / Tablet 768 / Desktop 1024 / Responsive (nhiá»u breakpoint)** â€” option Ä‘á» xuáº¥t Ä‘á»ƒ Ä‘áº§u + note "(Ä‘á» xuáº¥t â€” tá»« {nguá»“n})".
   - User chá»n khĂ¡c â†’ dĂ¹ng lá»±a chá»n cá»§a user. Náº¿u userflow chÆ°a cĂ³ `primary_device` â†’ sau khi user chá»‘t, gá»£i Ă½ ghi ngÆ°á»£c vĂ o userflow frontmatter (Ä‘á»ƒ láº§n sau + `/prototype-html` dĂ¹ng chung).
   - KHĂ”NG suy 1 device rá»“i váº½ luĂ´n khĂ´ng há»i â€” ká»ƒ cáº£ khi design.md rĂµ rĂ ng.

### Phase B â€” Read Upstream Docs

- **KG chá»n nguá»“n trÆ°á»›c (ráº» hÆ¡n scan):** cháº¡y `node .agents/skills/kg/engine/kg-query.mjs facts {feature}` vĂ  `node .agents/skills/kg/engine/kg-query.mjs neighbors <doc-path>` khi cĂ³ doc má»‘c Ä‘á»ƒ láº¥y danh sĂ¡ch candidate/coverage cho FR/UC/E nguá»“n cá»§a screen, rá»“i VáºªN Read Ä‘áº§y Ä‘á»§ prose file Ä‘Ă£ chá»n. TuĂ¢n `.agents/rules/kg-usage.md` (3 nghÄ©a vá»¥: `--all` khi bá»‹ cap Â· Ä‘á»c má»¥c "Pháº£i Read tay" Â· `KG-ERROR` â†’ scan trá»±c tiáº¿p nhÆ° cÅ©).

Äá»c song song cĂ¡c file sau (optional â€” warn náº¿u thiáº¿u, khĂ´ng abort):

| File | Má»¥c Ä‘Ă­ch |
|------|----------|
| `docs/{feature}/srs/{feature}-userflow.md` | Má»¥c 2 (danh sĂ¡ch mĂ n hĂ¬nh + má»¥c Ä‘Ă­ch) + Má»¥c 3 (chia flow, screens/flow theo thá»© tá»±) â€” **nguá»“n chĂ­nh cho flow + screen order** |
| `docs/{feature}/brainstorms/*.md` | Core flows, field/action cá»¥ thá»ƒ cho tá»«ng mĂ n |
| `docs/{feature}/{feature}-urd.md`, `prd.md` | User needs, capabilities liĂªn quan tá»›i mĂ n hĂ¬nh |
| `docs/{feature}/srs/{feature}-spec.md` | FR/NFR/Business Rules â€” validation cá»¥ thá»ƒ cho field |
| `docs/{feature}/usecases/{feature}-usecase-index.md` (náº¿u cĂ³) | Báº£ng UCs â€” bá»• sung ngá»¯ cáº£nh nghiá»‡p vá»¥, KHĂ”NG dĂ¹ng Ä‘á»ƒ chia flow (Ä‘Ă£ cĂ³ userflow.md) |
| `docs/{feature}/ascii-wireframe/{flow-slug}.md` (náº¿u tá»“n táº¡i) | Nguá»“n element Æ°u tiĂªn cho screen Ä‘Ă£ cĂ³ ASCII â€” xem Phase B.5 |

### Phase C â€” Identify Flows

Flow = Ä‘á»c tháº³ng `srs/{feature}-userflow.md` Má»¥c 3 (danh sĂ¡ch flow: flow-slug + tĂªn + screens gá»“m + cases phá»§). KHĂ”NG tá»± tá»•ng há»£p tá»« nhiá»u nguá»“n ná»¯a â€” `userflow.md` Ä‘Ă£ lĂ  nguá»“n chia flow chung vá»›i `/wireframe-ascii`.

Preview Ä‘á»ƒ user confirm (xem Phase E).

### Phase B.5 â€” Check ASCII wireframe Ä‘Ă£ cĂ³ (Ä‘á»c-láº¡i náº¿u tá»“n táº¡i)

Vá»›i má»—i screen: check `docs/{feature}/ascii-wireframe/{flow-slug}.md` Ä‘Ă£ tá»“n táº¡i chÆ°a (`/wireframe-ascii` Ä‘Ă£ cháº¡y trÆ°á»›c cho flow nĂ y).

- **CĂ³** â†’ Ä‘á»c block `## Screen: {slug}` â€” báº£ng "Screen description" **5 cá»™t** (cĂ¹ng schema `# / Items / Control type / Data type / Description`) â€” dĂ¹ng tháº³ng lĂ m nguá»“n element cho screen Ä‘Ă³, KHĂ”NG re-infer. Chá»‰ Ä‘á»c thĂªm nghiá»‡p vá»¥ náº¿u ASCII thiáº¿u chi tiáº¿t validation.
- **ChÆ°a cĂ³** â†’ Phase D/F tá»± suy luáº­n nhÆ° bĂ¬nh thÆ°á»ng tá»« tĂ i liá»‡u nghiá»‡p vá»¥.

### Phase D â€” Map Screens to Flows (Per Flow)

Vá»›i má»—i flow, láº¥y **ordered list of screen slugs** trá»±c tiáº¿p tá»« `userflow.md` Má»¥c 3 (cá»™t "MĂ n hĂ¬nh gá»“m", theo Ä‘Ăºng thá»© tá»± liá»‡t kĂª).

**Cross-flow screen detection:** screen Ä‘áº§u flow B thuá»™c flow A â†’ include + nhĂ£n `[chung vá»›i {other-flow}]` (Ä‘á»‘i chiáº¿u Má»¥c 2 cá»™t "Thuá»™c flow" náº¿u 1 screen xuáº¥t hiá»‡n á»Ÿ nhiá»u flow).

**Element source cho má»—i screen:** Æ°u tiĂªn káº¿t quáº£ Phase B.5 (ASCII Ä‘Ă£ cĂ³) náº¿u tá»“n táº¡i; náº¿u khĂ´ng, tá»± suy luáº­n field/action tá»« brainstorm + URD/PRD + SRS spec (Business Rules, Error Matrix) liĂªn quan tá»›i má»¥c Ä‘Ă­ch mĂ n (láº¥y tá»« `userflow.md` Má»¥c 2 cá»™t "Má»¥c Ä‘Ă­ch"). Thiáº¿u chi tiáº¿t rĂµ rĂ ng (cáº£ 2 trÆ°á»ng há»£p) â†’ há»i user (xem Phase F.5 Gap check â€” Ă¡p dá»¥ng ngay tá»« bÆ°á»›c thu tháº­p element, khĂ´ng chá»‰ validation).

### Phase E â€” L1 Plan Preview

```
Em sáº½ táº¡o {N} file HTML wireframe trong `docs/{feature}/html-wireframe/`:

  1. {flow-name} â†’ {flow-slug}.html
     Screens: {slug-1} â†’ {slug-2} â†’ {slug-3} â†’ {slug-4}
     Device: {mobile 375 / tablet 768 / desktop 1024} Â· {N} mĂ n hĂ¬nh (tá»± wrap)
  ...

  Cá»™ng thĂªm: {feature}-wireframe.html (index Ä‘iá»u hÆ°á»›ng â€” má»Ÿ cĂ¡i nĂ y) + {feature}-wireframe-html-index.md (metadata).

Apply? (Y / sá»­a / skip <sá»‘>):
```

### Phase F â€” Generate HTML (Per Flow)

Vá»›i má»—i flow Ä‘Æ°á»£c duyá»‡t:

1. **XĂ¡c Ä‘á»‹nh element má»—i screen**: Æ°u tiĂªn nguá»“n Phase B.5 (báº£ng mĂ´ táº£ ASCII Ä‘Ă£ cĂ³) náº¿u tá»“n táº¡i; náº¿u khĂ´ng, tá»« má»¥c Ä‘Ă­ch mĂ n (`userflow.md` Má»¥c 2) + brainstorm/URD/PRD/SRS spec liĂªn quan â€” tá»± suy luáº­n field/action/state cáº§n cĂ³ cho screen Ä‘Ă³.
2. **Láº­p element table ná»™i bá»™** (tÆ°Æ¡ng Ä‘Æ°Æ¡ng Má»¥c 2 cÅ©): má»—i field/action 1 row theo thá»© tá»± xuáº¥t hiá»‡n dá»± kiáº¿n trĂªn mĂ n.
3. **Infer screen title** tá»« má»¥c Ä‘Ă­ch mĂ n trong `userflow.md` Má»¥c 2.
4. **Map elements â†’ HTML** (xem Má»¥c "Element Mapping"). Icon = token chá»¯ `(eye)`/`(play)` hoáº·c SVG stroke B&W â€” KHĂ”NG emoji.
5. **Device**: dĂ¹ng device **user Ä‘Ă£ chá»‘t á»Ÿ Phase A bÆ°á»›c 4** (Ä‘Ă£ confirm, khĂ´ng tá»± Ä‘oĂ¡n láº¡i). Äiá»n `{{DEVICE}}`.
6. **Sinh `{{SCREENS}}`**: má»—i screen 1 khá»‘i `<div class="wf-screen" id="s{n}">` (n = thá»© tá»± screen tá»« 1 â€” Báº®T BUá»˜C cĂ³ `id` Ä‘á»ƒ index Phase G.5 deep-link tá»›i), frame rá»™ng Ä‘Ăºng device, Ä‘áº·t liá»n nhau trong `.wf-rows` â€” **tá»± wrap**, KHĂ”NG Ă©p 3/row, KHĂ”NG mÅ©i tĂªn giá»¯a screen.
7. **Render HTML** tá»« `_templates/wireframe-html-template.html` (xem Má»¥c "HTML Template" â€” thay placeholder + fill `{{SCREENS}}`).
8. **Fill `{{DESC_TABLE}}`** â€” xem Phase F.5 ngay dÆ°á»›i, cháº¡y TRÆ¯á»C khi Write.
9. **Write** `docs/{feature}/html-wireframe/{flow-slug}.html`.

### Phase F.5 â€” Báº£ng mĂ´ táº£ mĂ n hĂ¬nh (5 cá»™t)

Ngay sau khi parse xong Má»¥c 2 cá»§a má»i screen trong flow (bÆ°á»›c F.2), build **1 báº£ng duy nháº¥t** cho toĂ n flow, Ä‘áº·t dÆ°á»›i `{{SCREENS}}` trong HTML (khá»‘i `{{DESC_TABLE}}`).

**Cáº¥u trĂºc báº£ng** (Ä‘Ăºng theo máº«u tham kháº£o cá»§a user â€” 5 cá»™t):

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | {TĂªn field/element} | {Loáº¡i control} | {Loáº¡i data} | {MĂ´ táº£ nghiá»‡p vá»¥ + validation Ä‘áº§y Ä‘á»§} |

Table chia theo screen â€” má»—i screen má»Ÿ Ä‘áº§u báº±ng 1 hĂ ng full-width `Screen {N}: {screen title}`, rá»“i cĂ¡c field cá»§a screen Ä‘Ă³ Ä‘Ă¡nh sá»‘ láº¡i tá»« 1.

**1. XĂ¡c Ä‘á»‹nh `Control type`** (map tá»« Má»¥c 2 "Element" + Má»¥c 1 ASCII layout):

| Element hint | Control type |
|---|---|
| Text hiá»ƒn thá»‹ tÄ©nh, khĂ´ng sá»­a Ä‘Æ°á»£c | `Label` |
| Input text/email/password 1 dĂ²ng | `Textbox` |
| Textarea nhiá»u dĂ²ng | `Text area` |
| Button (Primary/Secondary/Google...) | `Button` |
| Link / navigate text | `Link` |
| Checkbox | `Checkbox` |
| Radio button | `Radio button` |
| Dropdown / select | `Dropdown` |
| Upload / drag-drop file | `Browse Button` |
| Banner / thĂ´ng bĂ¡o tÄ©nh | `Label` |

**2. XĂ¡c Ä‘á»‹nh `Data type`** (map tá»« hĂ nh vi tÆ°Æ¡ng tĂ¡c â€” KHĂ”NG pháº£i kiá»ƒu dá»¯ liá»‡u láº­p trĂ¬nh):

| HĂ nh vi | Data type |
|---|---|
| KhĂ´ng sá»­a/khĂ´ng click Ä‘Æ°á»£c (label, banner tÄ©nh) | `ReadOnly` |
| Nháº­p text tá»± do | `Text` |
| Click Ä‘á»ƒ trigger action (button, link) | `Click` |
| Chá»n 1 trong nhiá»u (radio, checkbox) | `Check` |
| Chá»n tá»« danh sĂ¡ch (dropdown) | `Select` |
| Upload file | `Click` (browse) + note Ä‘á»‹nh dáº¡ng/size trong Description |

**3. Viáº¿t `Description` SĂ‚U (6 lá»›p)** â€” per `ba-conventions.md` Má»¥c 6, KHĂ”NG nĂ´ng:
1. **Má»¥c Ä‘Ă­ch nghiá»‡p vá»¥** â€” business meaning 1 cĂ¢u.
2. **Validation / rĂ ng buá»™c** â€” báº¯t buá»™c/tĂ¹y chá»n, rule cá»¥ thá»ƒ (trĂ­ch BR-xxx), default, placeholder; nĂªu cáº£ Ä‘iá»u KHĂ”NG Ă¡p.
3. **States** â€” default/focus/disabled/submitting/error/success (chá»‰ state element tháº­t sá»± cĂ³).
4. **Navigation** â€” trigger Ä‘i mĂ n nĂ o, Ä‘iá»u kiá»‡n enable/disable.
5. **Error + wording** â€” mĂ£ `E-{feature}-NNN` + wording exact + há»‡ quáº£ (tÄƒng/khĂ´ng tÄƒng counter...).
6. **Edge/security/compliance** â€” anti-enumeration, audit log, lá»—i máº¡ng, auto-link, fallback... (trĂ­ch NFR-xxx) khi Ă¡p dá»¥ng.

Gá»n nhÆ°ng Ä‘á»§; KHĂ”NG láº·p 1 mĂ£ ID nhiá»u láº§n. Nguá»“n: **`srs/{feature}-spec.md` (FR/BR/NFR/Error Matrix) + `uc-*.md` branches** > brainstorm/PRD/URD, Ä‘á»‘i chiáº¿u `userflow.md` cho case error/edge. Thiáº¿u nguá»“n â†’ Gap check (bÆ°á»›c 4 dÆ°á»›i) há»i user.

**4. Gap check (Báº®T BUá»˜C trÆ°á»›c khi viáº¿t Description cho field Ä‘Ă³):**

Vá»›i má»—i field cĂ³ validation nháº¯c tá»›i giá»›i háº¡n (kĂ½ tá»±, dung lÆ°á»£ng, Ä‘á»‹nh dáº¡ng) nhÆ°ng **tĂ i liá»‡u nghiá»‡p vá»¥ khĂ´ng nĂ³i rĂµ chi tiáº¿t** (vd "Tá»‘i Ä‘a 50 kĂ½ tá»±" nhÆ°ng khĂ´ng nĂ³i kĂ½ tá»± nĂ o Ä‘Æ°á»£c phĂ©p), skill KHĂ”NG tá»± suy Ä‘oĂ¡n hay bá»‹a thĂªm rule. Skill gom cĂ¡c field thiáº¿u chi tiáº¿t nĂ y láº¡i, há»i user tá»«ng field má»™t (theo no-re-ask rule â€” khĂ´ng há»i láº¡i field Ä‘Ă£ cĂ³ Ä‘á»§ info):

```
Field "{tĂªn field}" (screen {slug}) cĂ³ giá»›i háº¡n "{rule hiá»‡n cĂ³}" nhÆ°ng chÆ°a rĂµ:
  - Cho phĂ©p nháº­p kĂ½ tá»± gĂ¬ (chá»¯/sá»‘/unicode/kĂ½ tá»± Ä‘áº·c biá»‡t)?
  - {cĂ¢u há»i cá»¥ thá»ƒ khĂ¡c náº¿u Ă¡p dá»¥ng, vd Ä‘á»‹nh dáº¡ng file/kĂ­ch thÆ°á»›c khuyáº¿n nghá»‹}
```

Chá»‰ sau khi user tráº£ lá»i (hoáº·c explicit nĂ³i "bá» qua, giá»¯ nguyĂªn mĂ´ táº£ hiá»‡n cĂ³") má»›i viáº¿t Description hoĂ n chá»‰nh + tiáº¿p tá»¥c Phase F bÆ°á»›c 7.

**5. Format HTML cá»§a báº£ng** â€” dĂ¹ng `<table class="wf-desc-table">` (xem template), 1 báº£ng cho cáº£ flow, `<tr class="wf-desc-screen-header">` cho hĂ ng phĂ¢n Ä‘oáº¡n `Screen N: {title}`.

### Phase G â€” Write {feature}-wireframe-html-index.md

Táº¡o `docs/{feature}/html-wireframe/{feature}-wireframe-html-index.md`:

```yaml
---
type: wireframe-html-index
feature: {feature}
status: draft
updated: {date}
links:
  - docs/{feature}/srs/{feature}-userflow.md
---

(Env note cho activity.log: `initial {N} flow wireframes generated`)

# {feature} â€” HTML Wireframes

> HTML wireframe files (B&W, static) cho cĂ¡c flows. Má»—i file = 1 luá»“ng ngÆ°á»i dĂ¹ng, double-click má»Ÿ browser. Nguá»“n: `srs/{feature}-userflow.md` (chia flow) + tĂ i liá»‡u nghiá»‡p vá»¥ (elements) â€” Ä‘á»™c láº­p vá»›i `ascii-wireframe/`.

## Flows

| # | Flow | File | Screens (theo thá»© tá»±) | Status | Updated |
|---|------|------|-----------------------|--------|---------|
| 1 | {flow-name} | [{flow-slug}.html]({flow-slug}.html) | {slug-1} â†’ {slug-2} â†’ ... | draft | {date} |

**Status:** `draft` / `reviewed` / `approved`.

## Links upstream

- [[docs/{feature}/srs/{feature}-userflow.md|User Flow]]
- [[docs/{feature}/brainstorms/|Brainstorms]]
- [[docs/{feature}/srs/{feature}-spec.md|SRS Spec]]

## Changelog

> Newest on top. Routing: edits Ä‘áº¿n `{flow-slug}.html` â†’ append entry á»Ÿ Ä‘Ă¢y vá»›i prefix `[{flow-slug}]`.
```

### Phase G.5 â€” Sinh index Ä‘iá»u hÆ°á»›ng HTML `{feature}-wireframe.html`

> Feature nhiá»u flow (epic phá»©c táº¡p) â†’ má»Ÿ tá»«ng file `.html` rá»i ráº¥t khĂ³ Ä‘iá»u hÆ°á»›ng. File index HTML nĂ y lĂ  **cá»­a vĂ o duy nháº¥t**: double-click má»Ÿ browser, cĂ³ sidebar TOC (flow â†’ screen) + tab "Tá»•ng quan" lĂ  flow map click Ä‘Æ°á»£c + iframe load tá»«ng flow. Má»—i flow VáºªN lĂ  1 file riĂªng (KHĂ”NG gá»™p) â€” index chá»‰ lĂ  lá»›p Ä‘iá»u hÆ°á»›ng.

1. **Äiá»u kiá»‡n anchor**: khi render má»—i flow file (Phase F), má»—i block `.wf-screen` PHáº¢I cĂ³ `id="s{n}"` (n = thá»© tá»± screen trong flow, tá»« 1). ÄĂ¢y lĂ  Ä‘Ă­ch cho deep-link `{flow-slug}.html#s{n}` tá»« index. (Náº¿u quĂªn â†’ link váº«n má»Ÿ Ä‘Ăºng file, chá»‰ khĂ´ng auto-scroll tá»›i screen.)
2. **Read** `_templates/wireframe-html-nav-template.html`.
3. **Thay placeholder**: `{{LANG}}` `{{FEATURE}}` `{{DEVICE}}` (primary_device) `{{FLOW_COUNT}}` `{{SCREEN_COUNT}}`.
4. **Sinh `{{TOC}}`**: má»—i flow (thá»© tá»± theo `userflow.md` Má»¥c 3) â†’ 1 `.toc-section` + link flow + N link screen (`data-src="{flow-slug}.html"`, `data-scroll="{n}"`). Máº«u á»Ÿ cuá»‘i template.
5. **Sinh `{{FLOWMAP}}`**: má»—i flow â†’ 1 `.flowgroup` (chain node click Ä‘Æ°á»£c). Node class theo `userflow.md` Má»¥c 3 cá»™t "Cases phá»§": mĂ n rá»—ng/loading â†’ `.node edge`, mĂ n lá»—i â†’ `.node error`, cĂ²n láº¡i happy (máº·c Ä‘á»‹nh). Máº«u á»Ÿ cuá»‘i template.
6. **Write** `docs/{feature}/html-wireframe/{feature}-wireframe.html`. L2 diff náº¿u Ä‘Ă£ tá»“n táº¡i.

> File index nĂ y thay tháº¿ vai trĂ² "cá»­a vĂ o" cá»§a `{feature}-wireframe-html-index.md` (báº£ng markdown chá»‰ xem Ä‘Æ°á»£c trong IDE). Váº«n giá»¯ file `.md` (metadata + git + Obsidian), nhÆ°ng khi cáº§n **xem/Ä‘iá»u hÆ°á»›ng thá»±c táº¿** thĂ¬ má»Ÿ `{feature}-wireframe.html`.

### Phase H â€” Cross-link ascii-wireframe/{feature}-wireframe-index.md (náº¿u tá»“n táº¡i)

Náº¿u `docs/{feature}/ascii-wireframe/{feature}-wireframe-index.md` tá»“n táº¡i (feature cÅ©ng cĂ³ ASCII wireframe qua `/wireframe-ascii`), thĂªm/cáº­p nháº­t cá»™t `HTML wireframe` trong báº£ng Screens (L2 diff trÆ°á»›c khi edit) â€” chá»‰ Ä‘á»ƒ tra cá»©u chĂ©o, KHĂ”NG pháº£i quan há»‡ phá»¥ thuá»™c. KhĂ´ng tá»“n táº¡i â†’ bá» qua bÆ°á»›c nĂ y, khĂ´ng táº¡o má»›i.

### Phase I â€” Activity log

TrÆ°á»›c Write set env `CLAUDE_SKILL_NAME=/wireframe-html` + `CLAUDE_CHANGELOG_AUTHOR={@author}` + `CLAUDE_CHANGELOG_NOTE=[all] generated {N} flows: {slug-1}, {slug-2}, ...` (â‰¤80 kĂ½ tá»±). Hook ghĂ©p cáº£ dĂ²ng vĂ o `docs/_shared/activity.log`:

```
{date} | /wireframe-html | {@author} | {file-path} | [all] generated {N} flows: ...
```

---

## Element Mapping (Má»¥c 2 â†’ HTML)

Skill Ä‘á»c báº£ng Má»¥c 2 "Screen description" vĂ  map má»—i row thĂ nh HTML element tÆ°Æ¡ng á»©ng.

### Mapping table

| Má»¥c 2 "Items" label | Data type | HTML output |
|---|---|---|
| `(Textbox)` text thÆ°á»ng | Text | `<div class="field"><label>â€¦</label><input type="text" placeholder="â€¦"></div>` |
| `(Textbox)` cĂ³ "masked" / "password" | Text | `<div class="field"><label>â€¦</label><div class="input-pw"><input type="password"><span class="eye">(eye)</span></div></div>` (token chá»¯, KHĂ”NG emoji) |
| `(Checkbox)` | Boolean | `<label class="checkbox"><input type="checkbox"> label text</label>` |
| `(Button Primary)` | Click | `<button class="btn-primary">label</button>` |
| `(Button Secondary)` | Click | `<button class="btn-secondary">label</button>` |
| `(Link)` hoáº·c Navigate | Navigate | `<a class="wf-link">label</a>` |
| `(Label)` / `(Banner)` ReadOnly | ReadOnly | `<p class="info-label">text</p>` |
| `(Banner)` cĂ³ â„¹ / info | ReadOnly | `<div class="banner banner-info"><span>â„¹</span> text</div>` |
| `(Banner)` cĂ³ â  / warning | ReadOnly | `<div class="banner banner-warn"><span>â </span> text</div>` |
| Password policy checklist | ReadOnly | `<div class="pw-check"><span class="ok">âœ“ criterion</span> <span class="fail">âœ— criterion</span></div>` |
| Countdown / timer | ReadOnly | `<p class="hint-text">CĂ³ thá»ƒ gá»­i láº¡i sau 0:54</p>` |
| Divider / separator | â€” | `<div class="divider"><span>hoáº·c</span></div>` (infer tá»« ASCII "â”€â”€â”€ hoáº·c â”€â”€â”€") |
| Google button | Click | `<button class="btn-google"><span class="g-icon">G</span> label</button>` |
| `(Modal trigger)` | ReadOnly | Modal overlay box `<div class="modal-box">` |

### Infer tá»« Má»¥c 2 description column

Skill Ä‘á»c Description column Ä‘á»ƒ láº¥y:
- **Placeholder text**: `Placeholder "..."` â†’ `input placeholder="..."`
- **Disabled state text**: `Disabled khi ...` â†’ thĂªm `class="state-hint"` + text nhá» bĂªn dÆ°á»›i element (italic)
- **Display rule**: `Display rule: ...` â†’ thĂªm text nhá» italic bĂªn dÆ°á»›i
- **Error text** (E-xxx): KHĂ”NG render error inline â€” chá»‰ thĂªm tooltip-style `title="..."` attribute
- **Success** / navigate text: bá» qua (chá»‰ render static state)

### Modal box

Khi row cĂ³ `(Modal trigger)` â†’ render modal nhÆ° 1 box ná»•i lĂªn bĂªn trong screen frame:

```html
<div class="modal-box">
  <div class="modal-title">Modal title</div>
  <!-- modal elements tiáº¿p tá»¥c tá»« rows sau trong cĂ¹ng Má»¥c 2 -->
</div>
```

CĂ¡c row cĂ³ "(trong modal)" â†’ náº±m bĂªn trong `<div class="modal-box">` Ä‘Ă³.

---

## HTML Template

> **Template chuáº©n sá»‘ng á»Ÿ file riĂªng:** `_templates/wireframe-html-template.html`.
> Skill KHĂ”NG carry CSS/skeleton inline â€” luĂ´n Ä‘á»c template Ä‘Ă³ lĂ m nguá»“n render duy nháº¥t.

Trong Phase F, má»—i flow:

1. **Read** `_templates/wireframe-html-template.html` (full CSS B&W + skeleton + máº«u `{{SCREENS}}`).
2. **Thay placeholder** á»Ÿ khung ngoĂ i rá»“i Ä‘iá»n `{{SCREENS}}` báº±ng cĂ¡c khá»‘i screen:

   | Placeholder | GiĂ¡ trá»‹ |
   |---|---|
   | `{{LANG}}` | `vi` (default) / `en` náº¿u user nĂ³i "viáº¿t báº±ng tiáº¿ng Anh" |
   | `{{FEATURE}}` | feature slug |
   | `{{FLOW_TITLE}}` | tĂªn flow hiá»ƒn thá»‹ |
   | `{{FLOW_SLUG}}` | kebab-case slug |
   | `{{SCREEN_COUNT}}` | sá»‘ mĂ n hĂ¬nh trong flow |
   | `{{DATE}}` | ISO date |
   | `{{DEVICE}}` | `mobile` / `tablet` / `desktop` â€” tá»« `srs/{feature}-userflow.md` frontmatter `primary_device` (thiáº¿u â†’ `mobile`). Quyáº¿t Ä‘á»‹nh bá» rá»™ng frame (375/768/1024). |
   | `{{FLOW_DESC}}` | 1 cĂ¢u mĂ´ táº£ flow (brainstorm / UC) |
   | `{{SCREENS}}` | cĂ¡c `.wf-screen` (má»—i screen 1 frame bá» rá»™ng device, tá»± wrap) â€” máº«u náº±m cuá»‘i template |
   | `{{DESC_TABLE}}` | cĂ¡c `<tr>` báº£ng mĂ´ táº£ 5 cá»™t, chia theo Screen N â€” xem Phase F.5 + máº«u cuá»‘i template |

3. **Render element bĂªn trong má»—i screen** tá»« Má»¥c 2 Screen description (xem "Element Mapping" trĂªn).
4. **Báº¥t biáº¿n**: B&W strict (chá»‰ `#000 #fff #f0f0f0 #888 #ccc`), self-contained (inline háº¿t), frame rá»™ng Ä‘Ăºng device (`data-device`), screens tá»± wrap (KHĂ”NG Ă©p 3/row, KHĂ”NG mÅ©i tĂªn giá»¯a screen), icon = token chá»¯/SVG (KHĂ”NG emoji). KHĂ”NG tá»± bá»‹a class/mĂ u ngoĂ i template.
5. **Write** `docs/{feature}/html-wireframe/{flow-slug}.html`.

> Cáº§n Ä‘á»•i diá»‡n máº¡o wireframe (spacing, font, class má»›i) â†’ sá»­a **template file**, KHĂ”NG sá»­a trong skill â€” má»i flow tá»± káº¿ thá»«a.

---

## Naming

| Flow source | HTML filename |
|---|---|
| `userflow.md` Má»¥c 3 flow-slug | dĂ¹ng tháº³ng flow-slug lĂ m filename |
| Manual (`--flow` khĂ´ng khá»›p flow-slug nĂ o cĂ³ sáºµn) | kebab-case slug user nháº­p |

Collision: trĂ¹ng slug â†’ suffix `-2`.

## Gotchas

- **Äá»«ng tá»± chia flow.** Nguá»“n chia flow DUY NHáº¤T lĂ  `srs/{feature}-userflow.md` â€” náº¿u chÆ°a cĂ³/chÆ°a duyá»‡t, gá»i `/user-flow` trÆ°á»›c.
- **Äá»c láº¡i ASCII wireframe náº¿u Ä‘Ă£ cĂ³** (Phase B.5) â€” trĂ¡nh 2 skill tá»± suy luáº­n field/validation Ä‘á»™c láº­p rá»“i lá»‡ch nhau. CĂ¹ng schema 5 cá»™t nĂªn dĂ¹ng tháº³ng, KHĂ”NG cáº§n map; mĂ n ASCII Ä‘Ă£ táº£ thĂ¬ KHĂ”NG re-infer (single-source).
- **Screen thiáº¿u thĂ´ng tin tá»« nghiá»‡p vá»¥** â†’ render placeholder `<p class="hint-text">[ChÆ°a cĂ³ Ä‘á»§ thĂ´ng tin nghiá»‡p vá»¥]</p>`, Ä‘á»“ng thá»i há»i user theo Phase F.5 Gap check.
- **Modal elements** (suy luáº­n tá»« nghiá»‡p vá»¥ cĂ³ bÆ°á»›c xĂ¡c nháº­n/dialog) â†’ gom vĂ o `<div class="modal-box">`.
- **Form KHĂ”NG tráº£i rá»™ng háº¿t khung desktop.** Screen dáº¡ng form/auth/dialog (login, signup, forgot-password, modal) â†’ bá»c field+nĂºt trong `<div class="wf-form">` (box cÄƒn giá»¯a, max-width ~380px) Ä‘á»ƒ input/nĂºt full-width TRONG box Ä‘Ă³, KHĂ”NG kĂ©o dĂ i full 1024px cá»§a khung desktop (trĂ´ng sai, khĂ´ng giá»‘ng mĂ n tháº­t). Full-content screen (dashboard/list/table) thĂ¬ render tháº³ng, khĂ´ng cáº§n `.wf-form`. TrĂªn mobile 375 thĂ¬ `.wf-form` tá»± = gáº§n full width. ThĂªm class `.wf-form.card` náº¿u muá»‘n viá»n box rĂµ.
- **State loáº¡i trá»« nhau â†’ TĂCH SCREEN RIĂNG, KHĂ”NG side-by-side.** Náº¿u 1 mĂ n cĂ³ â‰¥2 káº¿t quáº£ loáº¡i trá»« (chá»‰ 1 hiá»‡n tĂ¹y Ä‘iá»u kiá»‡n â€” vd verify-email-result: thĂ nh cĂ´ng / háº¿t-háº¡n, payment-result: success / fail) â†’ render **má»—i state 1 `.wf-screen` riĂªng** (vd `verify-email-success`, `verify-email-expired`), KHĂ”NG nhá»“i 2 div cáº¡nh nhau trong 1 khung (gĂ¢y hiá»ƒu nháº§m "mĂ n cĂ³ cáº£ 2"). Ghi rĂµ trong screen-slug. Chá»‰ dĂ¹ng chung 1 khung khi cĂ¡c pháº§n **cĂ¹ng hiá»‡n Ä‘á»“ng thá»i** (khĂ´ng loáº¡i trá»«). Náº¿u `userflow.md` gá»™p chung 1 screen â†’ note Ä‘á» xuáº¥t tĂ¡ch + há»i user, hoáº·c tĂ¡ch ngáº§m vá»›i slug `{screen}-{state}`.
- **Google button**: detect khi nghiá»‡p vá»¥ mention "Google" hoáº·c "OAuth" â†’ render `.btn-google`.
- **Divider "hoáº·c"**: khi nghiá»‡p vá»¥ cĂ³ 2 phÆ°Æ¡ng thá»©c song song (vd Ä‘Äƒng nháº­p email hoáº·c Google) â†’ render `<div class="divider"><span>hoáº·c</span></div>`.
- **Back navigation**: khi mĂ n cĂ³ Ä‘Æ°á»ng quay láº¡i rĂµ trong `userflow.md` (nhĂ¡nh `-.->`) â†’ render `<div class="back-nav">â† text</div>`.
- **Font**: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` cho body text. KHĂ”NG dĂ¹ng emoji/icon libs.

## Workflow tiáº¿p theo

- **`/figma <feature> [<screen-slug>]`** â€” váº½ Figma tá»« ASCII (`/wireframe-ascii` báº¯t buá»™c cháº¡y trÆ°á»›c cho `/figma`; náº¿u chÆ°a cĂ³, `/figma` refuse).
- **`/prototype-html <feature>`** â€” HTML clickable prototype cĂ³ mĂ u sáº¯c + JS navigation (hi-fi).

## References

- @../../../_templates/wireframe-html-template.html (template chuáº©n per-flow â€” CSS B&W + skeleton + máº«u screens)
- @../../../_templates/wireframe-html-nav-template.html (template index Ä‘iá»u hÆ°á»›ng â€” sidebar TOC + flow map + iframe, Phase G.5)
- @../../rules/approval-gate.md
- @../../rules/kg-usage.md
- @../../rules/naming-conventions.md
- @../../rules/changelog.md
- @../../rules/feature-bootstrap.md
- @../../rules/ba-conventions.md
- @../user-flow/SKILL.md (nguá»“n chia flow â€” cháº¡y trÆ°á»›c náº¿u chÆ°a cĂ³)
- @../wireframe-ascii/SKILL.md (renderer ngang hĂ ng â€” Ä‘á»c láº¡i náº¿u Ä‘Ă£ cháº¡y trÆ°á»›c, xem Phase B.5)
- @../prototype-html/SKILL.md (high-fidelity HTML clickable)

