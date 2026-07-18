const fs = require('fs');

const flowsPath = 'd:/VietMec/docs/order-tracking/srs/flows.md';
let content = fs.readFileSync(flowsPath, 'utf8');

// Replace everything from `else Trường hợp B` to the end of the plantuml block.
// To do this safely, I'll use index slicing since it's at the end of the file.

const startStr = 'else Trường hợp B: Giao hàng thất bại / Khách từ chối nhận toàn bộ (Edge Case 3)';
const endStr = '@enduml';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newText = `else Trường hợp B: Giao hàng thất bại / Khách từ chối nhận toàn bộ (Edge Case 3)
    Courier -> Portal: Cập nhật thất bại (Webhook: FAILED)
    activate Portal
    Portal -> Portal: Cập nhật trạng thái Thất bại + Lưu lý do
    Portal -> Sales: Bắn cảnh báo Telegram đơn giao thất bại
    deactivate Portal
    alt Shipper tự động giao lại (Tối đa 3 lần)
        Courier -> Portal: Cập nhật đang giao (Webhook: DELIVERING kèm số lần)
        activate Portal
        Portal -> Portal: Chuyển trạng thái đơn về Đang Giao
        deactivate Portal
    else Shipper tự động chuyển hoàn (Quá số lần/ngày lưu kho)
        Courier -> Portal: Bắt đầu chuyển hoàn (Webhook: RETURNING)
        activate Portal
        Portal -> Portal: Chuyển trạng thái đơn thành Chờ Hoàn
        deactivate Portal
        Courier -> Portal: Hoàn hàng về kho công ty (Webhook: RETURNED)
        activate Portal
        Portal -> Portal: Chuyển trạng thái đơn thành Đã Hoàn (Thủ kho tự kiểm đếm cộng kho thủ công)
        deactivate Portal
    end
end

Accountant -> Portal: Xem đơn hàng trạng thái Thành Công
Accountant -> Portal: Phát hành Hóa đơn VAT (Lưu thông tin lên Portal)
Portal -> Portal: Ghi nhận doanh thu đơn hàng
`;

    content = content.substring(0, startIndex) + newText + content.substring(endIndex);
    fs.writeFileSync(flowsPath, content, 'utf8');
    console.log('flows.md updated successfully');
} else {
    console.log('Could not find start or end strings in flows.md');
}

// Global replacement of "Giao Lỗi" -> "Thất bại" in flows.md just in case
content = fs.readFileSync(flowsPath, 'utf8');
content = content.replace(/Giao Lỗi/g, 'Thất bại');
fs.writeFileSync(flowsPath, content, 'utf8');
