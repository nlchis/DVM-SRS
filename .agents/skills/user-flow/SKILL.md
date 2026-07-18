---
name: user-flow
description: Dùng khi cần phân tích nghiệp vụ ra user flow tổng (mermaid) phủ happy/error/edge case, chia sẵn feature thành các flow trước khi vẽ wireframe. Kích hoạt bằng /user-flow <feature>. Output là nguồn chia flow chung cho /wireframe-ascii và /wireframe-html.
---

# /user-flow â€” Nghiá»‡p vá»¥ â†’ User Flow (nguá»“n chia flow chung)

> **KHĂ”NG dĂ¹ng `context: fork`.** Skill PHáº¢I cháº¡y á»Ÿ main conversation vĂ¬ cĂ³ HITL tháº­t: clarify loop (Phase C, há»i user chá» tráº£ lá»i), duyá»‡t text (Phase E, max 3 vĂ²ng), vĂ  HARD STOP (chá»‘t/sá»­a/há»§y). Fork = khĂ´ng cĂ³ kĂªnh user tráº£ lá»i prompt â†’ má»i gate bá»‹ auto-skip â†’ skill tá»± Ä‘oĂ¡n nghiá»‡p vá»¥ hoáº·c tá»± Write khĂ´ng há»i (cĂ¹ng root cause bug CR-20260612-001). PhĂ¢n tĂ­ch náº·ng Ä‘Ă£ delegate cho `flow-reviewer` qua Task tool nĂªn khĂ´ng cáº§n fork toĂ n skill.

## Goal

Äi tá»« **nghiá»‡p vá»¥ trá»«u tÆ°á»£ng** (chá»‰ tĂªn tĂ­nh nÄƒng hoáº·c 1 Ä‘oáº¡n mĂ´ táº£) tá»›i **user flow tá»•ng Ä‘Ă£ duyá»‡t**: sÆ¡ Ä‘á»“ mermaid thá»ƒ hiá»‡n tÆ°Æ¡ng tĂ¡c giá»¯a cĂ¡c mĂ n hĂ¬nh, phá»§ Ä‘á»§ **happy / error / edge case**, vĂ  chia sáºµn feature thĂ nh cĂ¡c **flow** (flow-slug + danh sĂ¡ch screens/use case má»—i flow).

Output `docs/{feature}/srs/{feature}-userflow.md` lĂ  **nguá»“n chia flow DUY NHáº¤T** â€” `/wireframe-ascii` vĂ  `/wireframe-html` Ä‘á»u Ä‘á»c file nĂ y Ä‘á»ƒ biáº¿t flow nĂ o gá»“m nhá»¯ng mĂ n nĂ o, rá»“i má»—i skill tá»± váº½ wireframe Ä‘á»™c láº­p (KHĂ”NG Ä‘á»c láº«n nhau). `/user-flow` PHáº¢I cháº¡y trÆ°á»›c cáº£ hai â€” chÆ°a biáº¿t flow dá»± kiáº¿n thĂ¬ chÆ°a váº½ Ä‘Æ°á»£c wireframe Ä‘Ăºng scope.

> **User flow â‰  activity diagram.** User flow lĂ  view **UX** (tÆ°Æ¡ng tĂ¡c giá»¯a cĂ¡c MĂ€N HĂŒNH, phá»¥c vá»¥ chia flow Ä‘á»ƒ váº½ wireframe) â€” dĂ¹ng mermaid `flowchart` gá»n. Activity/quy trĂ¬nh nghiá»‡p vá»¥ Ä‘a vai trĂ² (ai lĂ m bÆ°á»›c nĂ o) lĂ  viá»‡c cá»§a `/activity` (Mermaid), `/activity-swimlane` (PlantUML swimlane) hoáº·c `/bpmn`, sá»‘ng á»Ÿ `srs/{feature}-flows.md`. Äá»«ng nhá»“i lane/actor nghiá»‡p vá»¥ vĂ o userflow.

## Constraints

- **HARD STOP sau khi flow Ä‘Æ°á»£c duyá»‡t.** Skill nĂ y CHá»ˆ dá»«ng á»Ÿ user flow â€” KHĂ”NG váº½ wireframe (Ä‘Ă³ lĂ  viá»‡c cá»§a `/wireframe-ascii` hoáº·c `/wireframe-html`, gá»i riĂªng hoáº·c qua `/srs`).
- **Há»i khi khĂ´ng rĂµ â€” KHĂ”NG Ä‘oĂ¡n.** Má»i Ä‘iá»ƒm mÆ¡ há»“ (luá»“ng, Ä‘iá»u kiá»‡n, giĂ¡ trá»‹ cá»¥ thá»ƒ, case lá»—i) pháº£i há»i user ngay trong chat (numbered list, 1 vĂ²ng/láº§n, chá» tráº£ lá»i) trÆ°á»›c khi Ä‘Æ°a vĂ o flow. Ăp dá»¥ng `resolve-oqs` tinh tháº§n: thĂ  ghi Open Question cĂ²n hÆ¡n bá»‹a.
- **Upstream priority**: brainstorm > URD > PRD/SRS > tá»± suy luáº­n. Soft gate â€” thiáº¿u váº«n proceed báº±ng suy luáº­n + clarify.
- **Skip L3 cho mermaid** â€” flow tá»•ng lĂ  mermaid `flowchart`, KHĂ”NG render Ä‘Æ°á»£c trong chat (khĂ¡c ASCII cÅ©). Write file tháº³ng sau khi user duyá»‡t ná»™i dung báº±ng mĂ´ táº£ text (xem Phase E).
- **flow-reviewer gate (Phase E.5)** â€” sau khi user OK ná»™i dung flow (mĂ´ táº£ text, chÆ°a pháº£i file), Báº®T BUá»˜C spawn agent `flow-reviewer` (persona "UX_Reviewer") review flow + case coverage + grouping trÆ°á»›c khi Ä‘Æ°a user confirm cuá»‘i. Skill nháº­n findings â†’ xá»­ lĂ½ láº¡i â†’ má»›i sang HARD STOP.
- **L1 plan preview** trÆ°á»›c khi Write file.
- **L2 diff** khi file Ä‘Ă£ tá»“n táº¡i (cháº¡y láº¡i tá»± Ä‘á»™ng vĂ o update mode).
- **Vietnamese-first** labels + prose. User nĂ³i "viáº¿t báº±ng tiáº¿ng Anh" Ä‘á»ƒ switch.
- **BA conventions** (must follow) â€” Owner resolution, no-re-ask rule, IT-BA framing (KHĂ”NG há»i DB/API/framework), Vietnamese typography ("Má»¥c N" khĂ´ng dĂ¹ng Â§), L1 prose preview. Per @../../rules/ba-conventions.md.
- **Mermaid syntax safety** â€” theo @../../rules/diagram-selection.md Má»¥c "Mermaid syntax safety". Quan trá»ng nháº¥t: **QUOTE PHĂ’NG THá»¦** â€” bá»c `"..."` má»i node label + edge label chá»©a kĂ½ tá»± Ä‘áº·c biá»‡t (`â‰¥ â‰¤ + / ? & ( ) :`), vd `d1{"...email/password"}`, `A -->|"fail â‰¥3 láº§n"| B` (nguá»“n lá»—i "Invalid mermaid syntax" #1, vĂ  `mmdc` verify Láº I tha nĂªn pháº£i phĂ²ng khi viáº¿t). KhĂ´ng HTML entity `&amp;` trong label, khĂ´ng `"..."` lá»“ng, `<br/>` cho newline.
- **Render-verify mermaid Báº®T BUá»˜C sau Write** (Phase F.5) â€” cháº¡y `mermaid-verify.mjs`, fail thĂ¬ tá»± sá»­a â‰¤2 láº§n. KHĂ”NG bĂ¡o "xong" khi mermaid chÆ°a compile OK.

## Inputs

```
/user-flow <feature-slug>                 # vd: /user-flow forgot-password
/user-flow "mĂ´ táº£ tĂ­nh nÄƒng tá»± do"        # vd: /user-flow "ngÆ°á»i dĂ¹ng quĂªn máº­t kháº©u, gá»­i OTP qua email, Ä‘áº·t láº¡i"
```

- Arg lĂ  **feature slug** (kebab-case) HOáº¶C **mĂ´ táº£ tĂ­nh nÄƒng** (free text). Skill tá»± nháº­n diá»‡n: náº¿u arg khá»›p folder `docs/{arg}/` tá»“n táº¡i â†’ coi lĂ  feature slug; náº¿u lĂ  cĂ¢u mĂ´ táº£ â†’ derive slug + confirm á»Ÿ L1. MĂ´ táº£ khĂ´ng suy ra slug rĂµ â†’ skill há»i láº¡i tĂªn feature slug mong muá»‘n trong cĂ¢u tráº£ lá»i.
- Cháº¡y láº¡i trĂªn feature Ä‘Ă£ cĂ³ `userflow.md` â†’ tá»± vĂ o update mode, L2 diff.
- Viáº¿t báº±ng tiáº¿ng Anh â†’ nĂ³i "viáº¿t báº±ng tiáº¿ng Anh".

## Context (dynamic)

Today: !`date +%Y-%m-%d`
Features cĂ³ sáºµn: !`ls -d docs/*/ 2>/dev/null | xargs -I{} basename {} | grep -v "^_" | head -20`
Features cĂ³ upstream (brainstorm/urd/prd â€” nguá»“n suy flow): !`for d in docs/*/; do f=$(basename "$d"); { [ -f "${d}$(basename "$d")-prd.md" ] || [ -f "${d}$(basename "$d")-urd.md" ] || ls "$d"brainstorms/*.md >/dev/null 2>&1; } && echo "$f"; done 2>/dev/null | grep -v "^_" | head -20`
Features Ä‘Ă£ cĂ³ userflow.md: !`for d in docs/*/srs/*-userflow.md; do [ -f "$d" ] && dirname "$d" | xargs dirname | xargs basename; done 2>/dev/null | head -20`

## Output

```
docs/{feature}/srs/{feature}-userflow.md
```

Slim frontmatter (`type: srs-userflow`, `feature`, `updated` + state fields). Sá»± kiá»‡n ghi vĂ o `docs/_shared/activity.log` qua hook (set env note trÆ°á»›c Write â€” khĂ´ng phá»¥ thuá»™c spec.md).

## Runtime flow (skill cháº¡y tháº¿ nĂ o)

```
/user-flow <arg>
        â”‚
        â–¼
[Phase A] Parse arg â†’ feature slug (existing folder?) hoáº·c derive tá»« mĂ´ táº£
        â”‚
        â–¼
[Phase A.5] Check docs/{feature}/srs/{feature}-userflow.md Ä‘Ă£ cĂ³ stage: flow-approved chÆ°a
            CĂ³ + flow_hash cĂ²n khá»›p Má»¥c 1 hiá»‡n táº¡i â†’ bĂ¡o "flow Ä‘Ă£ duyá»‡t, dĂ¹ng láº¡i
            luĂ´n" + dá»«ng (khĂ´ng há»i láº¡i). Lá»‡ch â†’ cáº£nh bĂ¡o, há»i user xĂ¡c nháº­n láº¡i.
            ChÆ°a cĂ³ â†’ tiáº¿p Phase B.
        â”‚
        â–¼
[Phase B] Äá»c upstream: brainstorm > URD > PRD/SRS (Glob docs/{feature}/**).
        â”‚
        â–¼
[Phase C] PhĂ¢n tĂ­ch nghiá»‡p vá»¥ â†’ Ä‘iá»ƒm mÆ¡ há»“ â†’ Há»I user (numbered, chá» tráº£ lá»i).
        â”‚
        â–¼
[Phase D] Sinh: (1) danh sĂ¡ch mĂ n hĂ¬nh dá»± kiáº¿n, (2) chia flow (flow-slug +
          screens/UC má»—i flow), (3) user flow mermaid tá»•ng (happy+error+edge).
        â”‚
        â–¼
[Phase E] Duyá»‡t ná»™i dung flow báº±ng mĂ´ táº£ text trong chat (max 3 vĂ²ng, KHĂ”NG
          pháº£i L3 mermaid render â€” chá»‰ lĂ  preview cĂ³ cáº¥u trĂºc).
        â”‚
        â–¼
[Phase E.5] Spawn flow-reviewer â†’ review flow + cases + flow grouping â†’ findings.
            Skill xá»­ lĂ½ láº¡i â†’ bĂ¡o user Ä‘Ă£ sá»­a gĂ¬. Tá»‘i Ä‘a 2 vĂ²ng náº¿u cĂ²n BLOCKING.
        â”‚
        â–¼
  â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HARD STOP â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
  â•‘ In flow (Ä‘Ă£ qua review) + danh sĂ¡ch mĂ n + flow mapâ•‘
  â•‘ + tĂ³m táº¯t findings Ä‘Ă£ xá»­ lĂ½. Há»i:                 â•‘
  â•‘ "Confirm Ä‘á»ƒ em ghi user flow? (chá»‘t / sá»­a / há»§y)" â•‘
  â•‘ Äá»£i user. KHĂ”NG tá»± Ä‘i tiáº¿p.                       â•‘
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
        â”‚ user "chá»‘t"
        â–¼
[Phase F] L1 plan preview â†’ Write userflow.md, set stage: flow-approved.
        â”‚
        â–¼
[Phase F.5] Render-verify mermaid (mermaid-verify.mjs) â†’ fail thĂ¬ tá»± sá»­a â‰¤2 láº§n.
        â”‚
        â–¼
[Phase G] Final report + recommend next (/wireframe-ascii, /wireframe-html, /srs).
```

## Approach (chi tiáº¿t tá»«ng phase)

### Phase A â€” Parse & resolve feature

1. Láº¥y arg sau `/user-flow`.
2. `Glob docs/*/` â€” náº¿u arg (slugify) khá»›p 1 folder tá»“n táº¡i â†’ `feature = arg`.
3. Náº¿u arg lĂ  mĂ´ táº£ tá»± do â†’ derive feature slug (kebab-case, ASCII, â‰¤50 kĂ½ tá»±, theo `naming-conventions.md`). Confirm slug á»Ÿ L1 cuá»‘i. User khĂ´ng Ä‘á»“ng Ă½ slug tá»± suy â†’ nĂ³i slug mong muá»‘n trong cĂ¢u tráº£ lá»i, skill dĂ¹ng luĂ´n.

### Phase A.5 â€” Check state Ä‘Ă£ duyá»‡t (trĂ¡nh phĂ¢n tĂ­ch láº¡i tá»« Ä‘áº§u)

> State artifact chá»‘ng máº¥t context khi turn bá»‹ ngáº¯t (compact, session má»›i, quay láº¡i sau nhiá»u ngĂ y). KHĂ”NG dá»±a vĂ o trĂ­ nhá»› há»™i thoáº¡i.

1. `Read docs/{feature}/srs/{feature}-userflow.md` náº¿u tá»“n táº¡i. KhĂ´ng tá»“n táº¡i â†’ tiáº¿p Phase B bĂ¬nh thÆ°á»ng.
2. CĂ³ tá»“n táº¡i + frontmatter cĂ³ `stage: flow-approved`:
   - TĂ­nh láº¡i hash ná»™i dung Má»¥c 1 "User Flow (tá»•ng)" hiá»‡n táº¡i, so vá»›i `flow_hash` Ä‘Ă£ lÆ°u.
   - **Khá»›p** â†’ in "Flow Ä‘Ă£ duyá»‡t tá»« {flow_approved_at}, dĂ¹ng láº¡i luĂ´n" rá»“i **dá»«ng á»Ÿ Ä‘Ă¢y** (khĂ´ng cháº¡y láº¡i Phase B-E.5-HARD STOP), trá»« khi user nĂ³i rĂµ muá»‘n rĂ  láº¡i (vd "cháº¡y láº¡i /user-flow", "rĂ  láº¡i flow") â€” coi nhÆ° Ä‘Ă£ xong, bĂ¡o user cháº¡y `/wireframe-ascii` hoáº·c `/wireframe-html` tiáº¿p.
   - **Lá»‡ch** (ai Ä‘Ă³ sá»­a Má»¥c 1 sau khi duyá»‡t â€” thá»§ cĂ´ng hoáº·c qua `/cr`) â†’ Cáº¢NH BĂO: "Flow Ä‘Ă£ Ä‘á»•i tá»« lĂºc duyá»‡t ({flow_approved_at})." Há»i user: dĂ¹ng flow hiá»‡n táº¡i lĂ m chuáº©n má»›i (tá»± cáº­p nháº­t `flow_hash`) hay rĂ  láº¡i tá»« Phase C.
3. CĂ³ tá»“n táº¡i nhÆ°ng KHĂ”NG cĂ³ `stage: flow-approved` (HARD STOP chÆ°a qua á»Ÿ láº§n cháº¡y trÆ°á»›c) â†’ tiáº¿p Phase B bĂ¬nh thÆ°á»ng.
4. User nĂ³i muá»‘n rĂ  láº¡i/cháº¡y láº¡i tá»« Ä‘áº§u (dĂ¹ Ä‘Ă£ khá»›p hash) â†’ tiáº¿p Phase B (rĂ  láº¡i cĂ³ chá»§ Ä‘Ă­ch), bá» qua nhĂ¡nh "khá»›p â†’ dá»«ng".

### Phase B â€” Äá»c upstream nghiá»‡p vá»¥

Äá»c theo thá»© tá»± Æ°u tiĂªn (dá»«ng khi Ä‘á»§ ngá»¯ cáº£nh, nhÆ°ng nĂªn Ä‘á»c thĂªm náº¿u cĂ³):
- **KG chá»n nguá»“n trÆ°á»›c (ráº» hÆ¡n scan):** cháº¡y `node .agents/skills/kg/engine/kg-query.mjs facts {feature}` vĂ  `node .agents/skills/kg/engine/kg-query.mjs neighbors <doc-path>` khi cĂ³ doc má»‘c Ä‘á»ƒ láº¥y danh sĂ¡ch candidate/coverage, rá»“i VáºªN Read Ä‘áº§y Ä‘á»§ prose file Ä‘Ă£ chá»n. TuĂ¢n `.agents/rules/kg-usage.md` (3 nghÄ©a vá»¥: `--all` khi bá»‹ cap Â· Ä‘á»c má»¥c "Pháº£i Read tay" Â· `KG-ERROR` â†’ scan trá»±c tiáº¿p nhÆ° cÅ©).

| Nguá»“n | Path | TrĂ­ch gĂ¬ |
|-------|------|----------|
| Brainstorm (Æ°u tiĂªn 1) | `docs/{feature}/brainstorms/*.md` | Core flows, scenario matrix, state transitions, decision points, error cases, giĂ¡ trá»‹ cá»¥ thá»ƒ |
| URD (Æ°u tiĂªn 2) | `docs/{feature}/{feature}-urd.md` | Personas, user needs, user journeys, success criteria |
| PRD/SRS (náº¿u cĂ³) | `docs/{feature}/{feature}-prd.md`, `docs/{feature}/srs/{feature}-spec.md` | Capabilities, FR, screens Ä‘Ă£ Ä‘á»‹nh nghÄ©a |

- CĂ³ upstream â†’ trĂ­ch nghiá»‡p vá»¥, KHĂ”NG há»i láº¡i cĂ¡i Ä‘Ă£ cĂ³ (no-re-ask).
- Thiáº¿u háº¿t â†’ **suy luáº­n mode**: skill tá»± dá»±ng giáº£ Ä‘á»‹nh nghiá»‡p vá»¥ tá»« tĂªn/mĂ´ táº£ tĂ­nh nÄƒng, rá»“i Phase C há»i xĂ¡c nháº­n giáº£ Ä‘á»‹nh.

### Phase C â€” PhĂ¢n tĂ­ch nghiá»‡p vá»¥ & clarify (KHĂ”NG Ä‘oĂ¡n)

1. Skill tĂ³m táº¯t **hiá»ƒu biáº¿t hiá»‡n táº¡i** vá» tĂ­nh nÄƒng (2-4 dĂ²ng): má»¥c tiĂªu, actor, luá»“ng chĂ­nh, nhĂ¡nh nghi ngá».
2. Liá»‡t kĂª **Ä‘iá»ƒm chÆ°a rĂµ** thĂ nh numbered list. Há»i tá»‘i Ä‘a 5-7 cĂ¢u/vĂ²ng, **1 vĂ²ng má»™t**, chá» tráº£ lá»i. CĂ¢u há»i báº±ng **ngĂ´n ngá»¯ nghiá»‡p vá»¥** (IT-BA framing).
3. Loop tá»›i khi Ä‘á»§ rĂµ HOáº¶C user nĂ³i "Ä‘á»§ rá»“i" â†’ pháº§n chÆ°a tráº£ lá»i ghi vĂ o Open Questions, KHĂ”NG bá»‹a ná»™i dung.

### Phase D â€” Sinh mĂ n hĂ¬nh + chia flow + user flow mermaid

0. **Primary device** (há»i 1 cĂ¢u á»Ÿ Phase C náº¿u chÆ°a rĂµ): feature nĂ y chá»§ yáº¿u cháº¡y trĂªn **mobile (375px)**, **tablet (768px)** hay **desktop (1024px+)**? ÄĂ¢y lĂ  nguá»“n DUY NHáº¤T cho `/wireframe-html` + `/prototype-html` render Ä‘Ăºng bá» rá»™ng khung. KhĂ´ng rĂµ â†’ default `mobile` (mobile-first). Ghi vĂ o frontmatter `primary_device`.
1. **Danh sĂ¡ch mĂ n hĂ¬nh dá»± kiáº¿n**: má»—i mĂ n 1 dĂ²ng (slug + má»¥c Ä‘Ă­ch 1 cĂ¢u). Bao gá»“m mĂ n tráº¡ng thĂ¡i (success, error page, empty, loading náº¿u cáº§n).
2. **Chia flow**: skill Tá»° nhĂ³m cĂ¡c mĂ n cĂ¹ng má»™t má»¥c tiĂªu nghiá»‡p vá»¥ thĂ nh 1 flow (vd `forgot-password-flow` = mĂ n nháº­p email â†’ OTP â†’ Ä‘áº·t máº­t kháº©u má»›i â†’ thĂ nh cĂ´ng). Má»—i flow cĂ³ 1 `flow-slug`. User duyá»‡t cĂ¡ch chia nĂ y á»Ÿ HARD STOP â€” Ä‘Ă¢y lĂ  quyáº¿t Ä‘á»‹nh quan trá»ng vĂ¬ `/wireframe-ascii` + `/wireframe-html` sáº½ táº¡o 1 file/flow theo Ä‘Ăºng cĂ¡ch chia nĂ y.
3. **User flow mermaid tá»•ng**: `flowchart TD` (hoáº·c `TB`) thá»ƒ hiá»‡n tÆ°Æ¡ng tĂ¡c giá»¯a mĂ n hĂ¬nh, phá»§ **Ä‘á»§ 3 loáº¡i case**:
   - **Happy case** â€” luá»“ng thĂ nh cĂ´ng chĂ­nh.
   - **Error case** â€” sai input, lá»—i há»‡ thá»‘ng, sai OTP, háº¿t háº¡n, vv.
   - **Edge case** â€” biĂªn: account khĂ´ng tá»“n táº¡i, Ä‘Ă£ dĂ¹ng OTP, double-submit, quay láº¡i giá»¯a chá»«ng, vv.
   DĂ¹ng style class riĂªng cho tá»«ng loáº¡i case (xem Má»¥c "Mermaid user flow convention").
   **QUOTE PHĂ’NG THá»¦ khi compose (báº¯t buá»™c â€” trĂ¡nh "Invalid mermaid syntax"):** bá»c `"..."` Má»ŒI node label vĂ  Má»ŒI edge label chá»©a kĂ½ tá»± Ä‘áº·c biá»‡t (`â‰¥ â‰¤ + / ? & ( ) :`). Vd `d1{"Kiá»ƒm tra<br/>email/password"}` vĂ  `A -->|"fail â‰¥3 láº§n"| B`. Máº·c Ä‘á»‹nh quote háº¿t cho cháº¯c â€” quote thá»«a vĂ´ háº¡i. ÄĂ¢y lĂ  nguá»“n lá»—i phá»• biáº¿n nháº¥t mĂ  `mmdc` (Phase F.5) láº¡i **tha**, nĂªn pháº£i phĂ²ng ngá»«a lĂºc viáº¿t, khĂ´ng dá»±a verify Ä‘á»ƒ phĂ¡t hiá»‡n. Chi tiáº¿t: `diagram-selection.md` Má»¥c "Mermaid syntax safety".
4. **Báº£ng chuyá»ƒn mĂ n (Má»¥c 3.5)**: rĂºt tá»« mermaid Má»¥c 1 thĂ nh báº£ng `Tá»« mĂ n [#] â†’ Äáº¿n mĂ n [#] | Trigger | Äiá»u kiá»‡n`, phá»§ cáº£ nhĂ¡nh happy/error/edge. ÄĂ¢y lĂ  nguá»“n DUY NHáº¤T cho `/wireframe-html` + `/prototype-html` ná»‘i Ä‘iá»u hÆ°á»›ng (edge NAVIGATES_TO) â€” Ä‘á»«ng Ä‘á»ƒ 3 nÆ¡i tá»± suy láº¡i. Má»—i cáº¡nh trong flowchart = 1 dĂ²ng báº£ng.

### Phase E â€” Duyá»‡t ná»™i dung flow (khĂ´ng pháº£i L3 mermaid render)

> Mermaid KHĂ”NG render trong chat â€” khĂ¡c ASCII trÆ°á»›c Ä‘Ă¢y. Thay vĂ¬ L3 render-vĂ -sá»­a, skill in **preview cĂ³ cáº¥u trĂºc báº±ng text** (khĂ´ng pháº£i code mermaid thĂ´) Ä‘á»ƒ user duyá»‡t ná»™i dung, rá»“i má»›i ghi mermaid tháº­t vĂ o file.

```
[/user-flow] Preview user flow â€” PhiĂªn báº£n 1:

Primary device: {mobile 375 / tablet 768 / desktop 1024}

Luá»“ng chĂ­nh (happy): {A} â†’ {B} â†’ {C} â†’ ThĂ nh cĂ´ng
NhĂ¡nh error: {Ä‘iá»ƒm ráº½} â†’ {error case 1}, {error case 2}
NhĂ¡nh edge: {Ä‘iá»ƒm ráº½} â†’ {edge case 1}, {edge case 2}

Danh sĂ¡ch mĂ n hĂ¬nh ({N}):
  1. {slug} â€” {má»¥c Ä‘Ă­ch}
  ...

Chia flow ({M} flow):
  - {flow-slug-1}: gá»“m {mĂ n a, b, c}
  - {flow-slug-2}: gá»“m {mĂ n d, e}

Äá»“ng Ă½ / Sá»­a: <mĂ´ táº£ thay Ä‘á»•i> / Há»§y:
```

- Max 3 vĂ²ng. User "Sá»­a: thĂªm case OTP háº¿t háº¡n" â†’ regen v2. VĂ²ng 3 Ă©p chá»‘t.
- Mermaid tháº­t (cĂº phĂ¡p Ä‘áº§y Ä‘á»§) Ä‘Æ°á»£c compose SAU khi ná»™i dung Ä‘Ă£ chá»‘t á»Ÿ bÆ°á»›c nĂ y â€” trĂ¡nh user pháº£i Ä‘á»c/sá»­a cĂº phĂ¡p mermaid thĂ´.

### Phase E.5 â€” flow-reviewer review (Báº®T BUá»˜C, trÆ°á»›c khi confirm)

Sau khi user "Äá»“ng Ă½" preview á»Ÿ Phase E, skill **spawn agent `flow-reviewer`** (persona "UX_Reviewer") Ä‘á»ƒ review chi tiáº¿t trÆ°á»›c khi Ä‘Æ°a user chá»‘t.

1. **Spawn agent** qua Task tool, `subagent_type: flow-reviewer`. Truyá»n vĂ o prompt:
   - Preview flow (luá»“ng chĂ­nh + nhĂ¡nh error/edge â€” dáº¡ng text nhÆ° Phase E).
   - Danh sĂ¡ch mĂ n hĂ¬nh (slug + má»¥c Ä‘Ă­ch).
   - Báº£ng chia flow (flow nĂ o gá»“m mĂ n nĂ o, phá»§ case nĂ o).
   - TĂ³m táº¯t nghiá»‡p vá»¥ + Open Questions hiá»‡n cĂ³.
   - Path upstream Ä‘á»ƒ agent tá»± Ä‘á»c: `docs/{feature}/brainstorms/`, `docs/{feature}/{feature}-urd.md`.
2. **Nháº­n findings** (format `review-format.md`: verdict + BLOCKING/WARNING/SUGGESTION + section "Missing screens/branches").
3. **Skill xá»­ lĂ½ láº¡i flow:**
   - Má»i **BLOCKING** + **Missing screens/branches** â†’ bá»• sung vĂ o flow + danh sĂ¡ch mĂ n + flow map (skill tá»± xá»­ lĂ½, KHĂ”NG há»i user tá»«ng cĂ¡i â€” trá»« khi cáº§n giĂ¡ trá»‹ nghiá»‡p vá»¥ chÆ°a biáº¿t thĂ¬ ghi Open Question).
   - **WARNING** â†’ Ă¡p dá»¥ng náº¿u rĂµ rĂ ng; náº¿u cáº§n quyáº¿t Ä‘á»‹nh nghiá»‡p vá»¥ â†’ ghi Open Question.
   - **SUGGESTION** â†’ cĂ¢n nháº¯c, khĂ´ng báº¯t buá»™c.
4. **BĂ¡o user** ngáº¯n gá»n Ä‘Ă£ sá»­a gĂ¬:
   ```
   đŸ” UX_Reviewer Ä‘Ă¡nh giĂ¡ flow (verdict: {revise}):
     ÄĂ£ bá»• sung theo review:
       - {nhĂ¡nh/mĂ n vá»«a thĂªm}
       - {case vá»«a phá»§}
     Ghi nháº­n Open Question: {náº¿u cĂ³}
   ```
5. **Loop**: náº¿u sau khi sá»­a váº«n cĂ²n BLOCKING báº£n cháº¥t, spawn láº¡i review láº§n 2. **Tá»‘i Ä‘a 2 vĂ²ng** â€” vĂ²ng 2 váº«n block â†’ ghi rĂµ Ä‘iá»ƒm tá»“n Ä‘á»ng vĂ o Open Question + Ä‘á»ƒ user quyáº¿t á»Ÿ HARD STOP.

> LÆ°u Ă½ phĂ¢n vai: `UX_Reviewer` lĂ m flow **tá»‘t hÆ¡n vá» UX/nghiá»‡p vá»¥**; **quyá»n chá»‘t váº«n lĂ  user** á»Ÿ HARD STOP.

### HARD STOP (sau Phase E.5)

```
âœ… User flow + {N} mĂ n hĂ¬nh + {M} flow (Ä‘Ă£ qua UX_Reviewer).
   Findings Ä‘Ă£ xá»­ lĂ½: {tĂ³m táº¯t 1-2 dĂ²ng}.

Em sáº½ ghi user flow vĂ o docs/{feature}/srs/{feature}-userflow.md.
Confirm? (chá»‘t / sá»­a / há»§y)
```

- `chá»‘t` / `ok` / `Y` â†’ sang Phase F.
- `sá»­a: ...` â†’ quay láº¡i Phase D/E.
- `há»§y` â†’ dá»«ng, KHĂ”NG write gĂ¬.

**KHĂ”NG Ä‘Æ°á»£c tá»± Ä‘i tiáº¿p khi chÆ°a cĂ³ "chá»‘t".**

### Phase F â€” L1 plan preview + Write

Theo `ba-conventions.md` Má»¥c 5 (prose, khĂ´ng báº£ng tag dĂ y):

```
Em sáº½ táº¡o file `docs/{feature}/srs/{feature}-userflow.md`:

**Primary device:** {mobile 375 / tablet 768 / desktop 1024} (dĂ¹ng cho wireframe/prototype render Ä‘Ăºng khung).

**User flow tá»•ng:** {N} mĂ n hĂ¬nh, chia {M} flow, phá»§ happy/error/edge.

**Chia flow:**
- {flow-slug-1}: {mĂ n a, b, c}
- {flow-slug-2}: {mĂ n d, e}

**CĂ¢u há»i má»Ÿ:** {K} cĂ¢u chÆ°a chá»‘t sáº½ ghi vĂ o file.

Apply? (Y / sá»­a)
```

User Y â†’ Write `docs/{feature}/srs/{feature}-userflow.md` (xem Má»¥c "Template userflow.md"). **Báº¯t buá»™c set state ngay lĂºc Write**: `primary_device: {mobile|tablet|desktop Ä‘Ă£ chá»‘t}`, `stage: flow-approved`, `flow_approved_at: {date}`, `flow_hash: {sha256 8 kĂ½ tá»± Ä‘áº§u cá»§a ná»™i dung Má»¥c 1 vá»«a ghi}`.

Set env `CLAUDE_CHANGELOG_NOTE` trÆ°á»›c Write â€” hook ghi activity.log (khĂ´ng phá»¥ thuá»™c spec.md tá»“n táº¡i hay chÆ°a).

### Phase F.5 â€” Render-verify mermaid (Báº®T BUá»˜C, cháº¡y ngay sau Write)

Flow tá»•ng lĂ  mermaid `flowchart` â€” KHĂ”NG render trong chat (lĂ½ do skip L3), nĂªn Ä‘Ă¢y lĂ  cĂ¡ch DUY NHáº¤T báº¯t lá»—i cĂº phĂ¡p TRÆ¯á»C khi bĂ¡o "xong", thay vĂ¬ Ä‘á»ƒ user tá»± phĂ¡t hiá»‡n khi má»Ÿ IDE/GitHub/Obsidian.

```bash
node .agents/scripts/mermaid-verify.mjs --file docs/{feature}/srs/{feature}-userflow.md
```

- **Pass** (compile OK) â†’ **kiá»ƒm thĂªm báº±ng máº¯t trÆ°á»›c khi bĂ¡o xong:** `mmdc` lenient hÆ¡n GitHub/Obsidian nĂªn compile OK váº«n cĂ³ thá»ƒ crash renderer tháº­t. RĂ  block Má»¥c 1: Má»ŒI node label + edge label chá»©a kĂ½ tá»± Ä‘áº·c biá»‡t (`â‰¥ â‰¤ + / ? & ( ) :`) Ä‘Ă£ bá»c `"..."` chÆ°a? ChÆ°a â†’ quote ngay (Ä‘Ă¢y Ä‘Ăºng lĂ  lá»—i "Invalid mermaid syntax" hay gáº·p nháº¥t, mmdc khĂ´ng báº¯t). Xong â†’ sang Phase G, report cĂ³ dĂ²ng "mermaid compile OK".
- **Fail** â†’ Ä‘á»c lá»—i dĂ²ng/cá»™t script tráº£ vá», sá»­a **chá»‰ block mermaid Má»¥c 1** (KHĂ”NG Ä‘á»¥ng Má»¥c 2/3/4), verify láº¡i. **Tá»± sá»­a tá»‘i Ä‘a 2 láº§n.** Lá»—i hay gáº·p (theo `diagram-selection.md` Má»¥c "Mermaid syntax safety"):
  - **KĂ½ tá»± Ä‘áº·c biá»‡t tráº§n (`â‰¥ + / ?`) trong node label `{...}`/`[...]` hoáº·c edge label `|...|`** â†’ bá»c cáº£ label trong `"..."`. Vd `d1{"...email/password"}`, `A -->|"fail â‰¥3 láº§n"| B`. (NguyĂªn nhĂ¢n #1.)
  - HTML entity trong label (`&amp;` `&lt;`) â†’ thay báº±ng chá»¯ thÆ°á»ng ("vĂ ", "nhá» hÆ¡n") hoáº·c bá».
  - Quote `"..."` Lá»’NG trong 1 label Ä‘Ă£ cĂ³ `"..."` â†’ bá» lá»›p trong, dĂ¹ng `<b>...</b>` náº¿u cáº§n nháº¥n.
  - KĂ½ tá»± `()[]{}` lĂ  ná»™i dung trong label â†’ bá»c `"..."` hoáº·c escape `#40;#41;#91;#93;#123;#125;`.
  - `\n` â†’ dĂ¹ng `<br/>`.
- **Váº«n fail sau 2 láº§n tá»± sá»­a** â†’ bĂ¡o user rĂµ lá»—i + Ä‘oáº¡n mermaid, gá»£i Ă½ paste mermaid.live Ä‘á»ƒ debug tay. **KHĂ”NG Ă¢m tháº§m Ä‘á»ƒ file lá»—i mĂ  bĂ¡o "xong".**

> Náº¿u Má»¥c 1 Ä‘Ă£ Ä‘á»•i do sá»­a cĂº phĂ¡p á»Ÿ bÆ°á»›c nĂ y â†’ **tĂ­nh láº¡i `flow_hash`** cho khá»›p ná»™i dung Má»¥c 1 cuá»‘i cĂ¹ng (trĂ¡nh Phase A.5 láº§n sau bĂ¡o "flow Ä‘Ă£ Ä‘á»•i" oan).

### Phase G â€” Final report

```
âœ… User flow hoĂ n táº¥t: docs/{feature}/srs/{feature}-userflow.md
   {N} mĂ n hĂ¬nh, {M} flow, cĂ¢u há»i má»Ÿ cĂ²n láº¡i: {K}
   Mermaid: compile OK Â· Primary device: {mobile|tablet|desktop}

Recommended next:
  - /wireframe-ascii {feature}   â€” wireframe ASCII lo-fi (duyá»‡t cáº¥u trĂºc nhanh)
  - /wireframe-html {feature}    â€” wireframe HTML lo-fi B&W (khung device {primary_device})
  - /prototype-html {feature}    â€” prototype hi-fi clickable (design tokens + JS)
  - /srs {feature}                â€” ká»¹ thuáº­t hoĂ¡ thĂ nh SRS Ä‘áº§y Ä‘á»§
```

## Mermaid user flow convention (cho userflow.md Má»¥c 1)

`flowchart TD`, Ä‘Ă¡nh sá»‘ `[n]` má»—i mĂ n hĂ¬nh (trong label, vĂ¬ Mermaid node id khĂ´ng nháº­n sá»‘ Ä‘á»©ng Ä‘áº§u â€” dĂ¹ng id dáº¡ng `n1`, `n2`...). Style class cho 3 loáº¡i case:

```mermaid
flowchart TD
    n1["[1] Nháº­p email<br/>(yĂªu cáº§u reset)"]
    n2{Kiá»ƒm tra email tá»“n}
    n3["[2] Nháº­p OTP<br/>(gá»­i OTP 6 sá»‘, 5 phĂºt)"]
    n4["BĂ¡o: Náº¿u email tá»“n táº¡i,<br/>Ä‘Ă£ gá»­i hÆ°á»›ng dáº«n"]
    n5{Kiá»ƒm tra OTP}
    n6["BĂ¡o OTP sai,<br/>cĂ²n N láº§n thá»­"]
    n7["BĂ¡o OTP háº¿t háº¡n,<br/>nĂºt Gá»­i láº¡i mĂ£"]
    n8["[3] Äáº·t máº­t kháº©u má»›i"]
    n9["[4] ThĂ nh cĂ´ng"]

    n1 -->|submit| n2
    n2 -->|tá»“n táº¡i| n3
    n2 -->|khĂ´ng tá»“n táº¡i| n4
    n3 -->|Ä‘Ăºng| n8
    n3 -->|sai| n6
    n3 -->|háº¿t háº¡n/sai 5 láº§n| n7
    n6 -.->|thá»­ láº¡i| n3
    n8 -->|há»£p lá»‡| n9

    classDef happy fill:#d4edda,stroke:#28a745
    classDef error fill:#f8d7da,stroke:#dc3545
    classDef edge fill:#fff3cd,stroke:#ffc107

    class n1,n3,n8,n9 happy
    class n6 error
    class n4,n7 edge
```

- Node label Ä‘Ă¡nh sá»‘ `[n]` cho mĂ n hĂ¬nh tháº­t; node quyáº¿t Ä‘á»‹nh (diamond `{...}`) vĂ  node thĂ´ng bĂ¡o khĂ´ng Ä‘Ă¡nh sá»‘.
- `-->` cho luá»“ng chĂ­nh, `-.->` cho quay láº¡i/retry.
- Style class `happy`/`error`/`edge` tĂ´ mĂ u theo loáº¡i case â€” Ă¡p cho node káº¿t quáº£ (khĂ´ng nháº¥t thiáº¿t Ă¡p cho node quyáº¿t Ä‘á»‹nh).
- Náº¿u flow quĂ¡ rá»™ng â†’ tĂ¡ch thĂ nh nhiá»u `flowchart` block theo flow-slug, má»—i block 1 heading `### Flow: {flow-slug}`.
- TuĂ¢n `diagram-selection.md` Má»¥c "Mermaid syntax safety" â€” KHĂ”NG dĂ¹ng `"..."` lá»“ng trong `[...]`, dĂ¹ng `<br/>` cho newline.

## Template `userflow.md`

```yaml
---
type: srs-userflow
feature: {feature}
updated: {date}
primary_device: mobile          # mobile (375) | tablet (768) | desktop (1024) â€” nguá»“n bá» rá»™ng khung cho /wireframe-html + /prototype-html
stage: flow-approved
flow_approved_at: {date}
flow_hash: "{sha256 8 kĂ½ tá»± Ä‘áº§u cá»§a ná»™i dung Má»¥c 1 táº¡i lĂºc user gĂµ 'chá»‘t' á»Ÿ HARD STOP}"
---

# {Feature} â€” User Flow

> Nguá»“n chia flow DUY NHáº¤T cho feature nĂ y. `/wireframe-ascii` vĂ  `/wireframe-html` Ä‘á»c file nĂ y Ä‘á»ƒ biáº¿t flow nĂ o gá»“m nhá»¯ng mĂ n nĂ o â€” KHĂ”NG tá»± chia flow riĂªng.

## 1. User Flow (tá»•ng)

> Phá»§ happy / error / edge cases. `[n]` = sá»‘ mĂ n hĂ¬nh Ä‘á»‘i chiáº¿u Má»¥c 2.

```mermaid
{mermaid flowchart â€” theo convention}
```

## 2. Danh sĂ¡ch mĂ n hĂ¬nh

> Cá»™t `Slug` = Ä‘á»‹nh danh mĂ¡y-Ä‘á»c DUY NHáº¤T cá»§a mĂ n (khá»›p `## Screen: {slug}` bĂªn wireframe + node KG). `[#]` chá»‰ Ä‘á»ƒ Ä‘á»‘i chiáº¿u Má»¥c 1/3.5.

| [#] | Slug | MĂ n hĂ¬nh | Má»¥c Ä‘Ă­ch | Thuá»™c flow |
|-----|------|----------|----------|------------|
| 1 | forgot-email | Nháº­p email | NgÆ°á»i dĂ¹ng nháº­p email Ä‘á»ƒ nháº­n OTP | forgot-password-flow |
| 2 | otp-input | Nháº­p OTP | XĂ¡c thá»±c mĂ£ gá»­i qua email | forgot-password-flow |
| ... | | | | |

## 3. Danh sĂ¡ch flow

| Flow-slug | TĂªn flow | MĂ n hĂ¬nh gá»“m | Cases phá»§ |
|-----------|----------|--------------|-----------|
| forgot-password-flow | QuĂªn máº­t kháº©u | forgot-email â†’ otp-input â†’ reset-form â†’ reset-done | happy, error (sai OTP), edge (háº¿t háº¡n, email khĂ´ng tá»“n táº¡i) |

## 3.5. Chuyá»ƒn mĂ n (transitions)

> Nguá»“n DUY NHáº¤T cho chuyá»ƒn mĂ n mĂ nâ†’mĂ n (edge NAVIGATES_TO). `/wireframe-html` + `/prototype-html` Ä‘á»c báº£ng nĂ y Ä‘á»ƒ ná»‘i nĂºt/Ä‘iá»u hÆ°á»›ng â€” KHĂ”NG tá»± suy láº¡i tá»« prose/mermaid (trĂ¡nh 3 nÆ¡i maintain lá»‡ch nhau). 1 dĂ²ng = 1 chuyá»ƒn; Ä‘á»§ phá»§ happy + error + edge cá»§a Má»¥c 1.

| Tá»« mĂ n [#] | Äáº¿n mĂ n [#] | Trigger | Äiá»u kiá»‡n |
|-----------|------------|---------|-----------|
| Nháº­p email [1] | Nháº­p OTP [2] | Submit email | email tá»“n táº¡i |
| Nháº­p email [1] | (giá»¯ nguyĂªn) [1] | Submit email | email khĂ´ng tá»“n táº¡i â†’ bĂ¡o lá»—i |
| Nháº­p OTP [2] | Äáº·t máº­t kháº©u [3] | Submit OTP | OTP Ä‘Ăºng, cĂ²n háº¡n |

## 4. Open Questions

- [ ] OQ-1: {cĂ¢u há»i nghiá»‡p vá»¥ chÆ°a chá»‘t}

(Trá»‘ng náº¿u nghiá»‡p vá»¥ Ä‘Ă£ rĂµ háº¿t.)
```

> **KHĂ”NG cĂ³ section Changelog trong file.** Lá»‹ch sá»­ thay Ä‘á»•i sá»‘ng á»Ÿ `docs/_shared/activity.log` táº­p trung (hook `auto-changelog.sh` lĂ  writer duy nháº¥t) â€” set env `CLAUDE_CHANGELOG_NOTE` trÆ°á»›c Write.

## Gotchas

- **KhĂ´ng váº½ wireframe á»Ÿ Ä‘Ă¢y.** `/user-flow` dá»«ng láº¡i á»Ÿ flow â€” váº½ ASCII/HTML lĂ  viá»‡c cá»§a `/wireframe-ascii` / `/wireframe-html`.
- **flow-reviewer cháº¡y TRÆ¯á»C HARD STOP.** Äá»«ng Ä‘Æ°a user confirm trÆ°á»›c khi review xong.
- **Review â‰  tá»± Ă½ Ä‘á»•i nghiá»‡p vá»¥.** Findings cáº§n giĂ¡ trá»‹ nghiá»‡p vá»¥ chÆ°a biáº¿t â†’ ghi Open Question, KHĂ”NG bá»‹a sá»‘.
- **Äá»«ng Ä‘oĂ¡n nghiá»‡p vá»¥.** MÆ¡ há»“ â†’ há»i ngay, chá» tráº£ lá»i. KhĂ´ng tráº£ lá»i â†’ Open Question.
- **Chia flow theo má»¥c tiĂªu nghiá»‡p vá»¥**, khĂ´ng theo mĂ n rá»i â€” quyáº¿t Ä‘á»‹nh nĂ y áº£nh hÆ°á»Ÿng trá»±c tiáº¿p `/wireframe-ascii` + `/wireframe-html` sau nĂ y.
- **Mermaid, khĂ´ng pháº£i ASCII** â€” khĂ¡c skill tiá»n nhiá»‡m `/wireframe-n-userflow`. KHĂ”NG render trong chat; Phase E dĂ¹ng preview text, khĂ´ng pháº£i mermaid thĂ´.
- **Verify mermaid sau Write (Phase F.5) â€” KHĂ”NG bá» qua.** Mermaid khĂ´ng render trong chat nĂªn lá»—i cĂº phĂ¡p chá»‰ lá»™ khi user má»Ÿ IDE/GitHub. Cháº¡y `mermaid-verify.mjs`, tá»± sá»­a â‰¤2 láº§n. Lá»—i hay gáº·p: `&amp;`/HTML entity trong label, quote lá»“ng `[...]`. Náº¿u sá»­a Má»¥c 1 â†’ tĂ­nh láº¡i `flow_hash`.
- **`flow_hash` lĂ  cÆ¡ cháº¿ chá»‘ng há»i láº¡i** â€” Phase A.5 dĂ¹ng nĂ³ Ä‘á»ƒ biáº¿t flow Ä‘Ă£ duyá»‡t chÆ°a, trĂ¡nh cháº¡y láº¡i toĂ n bá»™ phĂ¢n tĂ­ch má»—i láº§n `/wireframe-ascii` hay `/srs` cáº§n Ä‘á»c userflow.
- **User muá»‘n rĂ  láº¡i chá»§ Ä‘á»™ng** (dĂ¹ flow Ä‘Ă£ duyá»‡t vĂ  hash khá»›p) â†’ nĂ³i rĂµ trong cĂ¢u lá»‡nh ("cháº¡y láº¡i", "rĂ  láº¡i tá»« Ä‘áº§u"), skill luĂ´n cháº¡y láº¡i Phase B, L2 diff khi Write.
- **Folder chÆ°a tá»“n táº¡i** â†’ táº¡o `docs/{feature}/srs/`. Feature folder `docs/{feature}/` chÆ°a cĂ³ â†’ váº«n táº¡o (skill cĂ³ thá»ƒ cháº¡y trÆ°á»›c cáº£ brainstorm).

## References

- @../../rules/approval-gate.md
- @../../rules/kg-usage.md
- @../../rules/naming-conventions.md
- @../../rules/feature-bootstrap.md
- @../../rules/ba-conventions.md
- @../../rules/resolve-oqs.md (chá»‰ Ă¡p dá»¥ng TINH THáº¦N "thĂ  ghi Open Question cĂ²n hÆ¡n bá»‹a" â€” user-flow lĂ  Ä‘iá»ƒm-vĂ o sá»›m, KHĂ”NG cháº¡y Phase resolve-OQ Ä‘áº§y Ä‘á»§; resolve OQ lĂ  viá»‡c cá»§a `/urd` `/srs` sau)
- @../../rules/diagram-selection.md
- @../../rules/review-format.md (findings format UX_Reviewer dĂ¹ng)
- @../../scripts/mermaid-verify.mjs (render-verify sau Write â€” Phase F.5)
- @../../agents/flow-reviewer.md (UX_Reviewer â€” review flow á»Ÿ Phase E.5)
- @../wireframe-ascii/SKILL.md (Ä‘á»c userflow.md Ä‘á»ƒ chia flow)
- @../wireframe-html/SKILL.md (Ä‘á»c userflow.md Ä‘á»ƒ chia flow)

