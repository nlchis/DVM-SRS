---
name: diagram
description: Kích hoạt khi người dùng muốn vẽ bất kỳ sơ đồ nào. Skill này đóng vai trò Orchestrator (Điều phối viên) — tự động rà soát tài liệu, sử dụng ma trận quyết định để chọn loại sơ đồ phù hợp nhất trong 11 loại, hỏi người dùng xác nhận, sau đó trực tiếp áp dụng skill chuyên biệt tương ứng để vẽ.
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep]
user-invocable: true
argument-hint: "\"<mô tả sơ đồ>\" [--feature <slug>]"
---

# /diagram — Diagram Orchestrator

## Goal
- Đóng vai trò là điểm vào (entry point) duy nhất khi người dùng muốn vẽ sơ đồ nhưng chưa biết chọn loại nào.
- Tự động phân tích ngữ cảnh từ tài liệu hiện có trong feature để đề xuất loại diagram phù hợp nhất dựa trên **Ma trận quyết định** (11 loại sơ đồ).
- Sau khi được người dùng xác nhận, Orchestrator sẽ tự động đóng vai trò như skill chuyên biệt được chọn để hoàn tất quy trình vẽ, đảm bảo tuân thủ nghiêm ngặt chuẩn mực của skill đó.

## Constraints (Ràng buộc Cứng)
1. **Rà soát tài liệu tự động**: Ngay sau khi kích hoạt, bắt buộc quét các file trong thư mục `docs/{feature}/` để hiểu rõ ngữ cảnh nghiệp vụ.
2. **Dựa vào Decision Matrix**: Tuyệt đối sử dụng `@../../rules/diagram-selection.md` làm kim chỉ nam để đề xuất sơ đồ. Hệ thống hiện có 11 loại (Sequence, State, Activity-swimlane, Activity-mermaid, Activity-D2, BPMN, Usecase, ERD-mermaid, ERD-D2, DBML, Architect-D2).
3. **L1 Approval cho Đề xuất**:
   - Trình bày kết quả phân tích: đề xuất loại sơ đồ nào, ứng với skill gì (ví dụ `/bpmn`), lý do chọn dựa trên ma trận.
   - Bắt buộc hỏi người dùng xác nhận (Y/N/Chọn loại khác). Chỉ tiếp tục khi người dùng đồng ý.
4. **Thực thi trực tiếp (Delegation by Adoption)**: 
   - Sau khi người dùng xác nhận loại sơ đồ, BẠN (Orchestrator) sẽ **tự động đọc file `SKILL.md` của skill chuyên biệt tương ứng** (ví dụ `.agents/skills/bpmn/SKILL.md`).
   - BẠN sẽ trực tiếp thực hiện các bước trong phần `Approach` của skill chuyên biệt đó (từ bước thu thập fact-list, preview plan, generate file, đến verify và inline self-review). 
   - Không được spawn subagent, bạn tự làm từ đầu đến cuối theo đúng quy trình của skill con.

## Inputs
```
/diagram "<mô tả ngắn gọn về sơ đồ cần vẽ>" [--feature <slug>]
/diagram  # Tự động trích xuất feature đang làm việc
```

## Context (dynamic)
Features hiện có: !`ls -d docs/*/ 2>/dev/null | xargs -I{} basename {} | head -20`

## Approach (Quy trình thực hiện)
1. **Phân tích yêu cầu**: Nhận diện tham số `--feature` và nội dung mô tả.
2. **Quét tài liệu (Scan)**: Đọc các file spec hoặc usecase hiện tại trong thư mục `docs/{feature}/` để thu thập thông tin về luồng, thực thể, roles.
3. **Phân tích & Đề xuất**:
   - Đọc kỹ **Ma trận Quyết định** tại `@../../rules/diagram-selection.md`.
   - Đối chiếu ngữ cảnh với 11 tình huống trong ma trận để chọn 1 loại diagram tối ưu (và skill tương ứng, ví dụ `/activity-swimlane`).
4. **Hỏi xác nhận (Prompt Confirmation)**:
   - In ra đề xuất và lý do chọn. Hỏi người dùng: "Bạn có đồng ý sử dụng sơ đồ loại này không? (Y / Chọn loại khác)".
   - Dừng và chờ phản hồi.
5. **Đọc Skill Chuyên Biệt**: 
   - Sau khi có chữ "Y", tự động mở và đọc nội dung của skill chuyên biệt tương ứng tại `.agents/skills/<tên-skill>/SKILL.md`.
6. **Thực thi như Skill Chuyên Biệt**:
   - Áp dụng hoàn toàn `Approach`, `Constraints` và `Gotchas` của skill chuyên biệt vừa đọc để tiếp tục công việc.
   - Các bước tiếp theo sẽ phụ thuộc 100% vào quy trình của skill con, bao gồm cả việc Verify, Inline Self-Review và ghi Changelog.
