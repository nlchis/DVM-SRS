const fs = require('fs');

const flowsPath = 'd:/VietMec/docs/order-tracking/srs/flows.md';
let content = fs.readFileSync(flowsPath, 'utf8');

// Update Accountant
content = content.replace(/participant Accountant/, 'participant "Kế toán" as Accountant');

// Update Line 50
content = content.replace(
    /Tạo đơn thủ công \(Chọn hàng, CO\/CQ tùy chọn, hình thức mặc định SHIP COD\)/, 
    'Tạo đơn thủ công (Chọn hàng, Upload Hóa đơn, chọn phương thức vận chuyển 247Express)'
);

// Update PENDING_APPROVAL
content = content.replace(/PENDING_APPROVAL/g, 'Chờ Duyệt');

// Update PO
content = content.replace(/sinh Phiếu đặt hàng \(PO\)/, 'sinh Phiếu xuất kho');

// Move SMS step and update state
const altBlockRegex = /alt Admin phê duyệt đơn hàng\n    Admin -> Portal: Phê duyệt đơn \(Approve\)\n    activate Portal\n    Portal -> Portal: Trừ tồn kho thực tế, sinh Phiếu xuất kho\n    Portal -> KH: Gửi SMS thông báo Đặt hàng thành công cho khách\n    Portal -> Courier: Gọi API tạo vận đơn giao hàng \(Ship COD\)\n    activate Courier\n    Courier --> Portal: Trả về mã vận đơn \(Tracking ID\)\n    deactivate Courier\n    Portal -> Portal: Chuyển đơn sang AWAITING_SHIPPING\n    deactivate Portal/;

const newAltBlock = `alt Admin phê duyệt đơn hàng
    Admin -> Portal: Phê duyệt đơn (Approve)
    activate Portal
    Portal -> Portal: Trừ tồn kho thực tế, sinh Phiếu xuất kho
    Portal -> Courier: Gọi API tạo vận đơn giao hàng qua 247Express
    activate Courier
    Courier --> Portal: Trả về mã vận đơn (Tracking ID)
    deactivate Courier
    Portal -> Portal: Chuyển đơn sang Chờ Giao
    Portal -> KH: Gửi SMS thông báo Đặt hàng thành công cho khách
    deactivate Portal`;

content = content.replace(altBlockRegex, newAltBlock);

// Replace remaining AWAITING_SHIPPING and REJECTED
content = content.replace(/AWAITING_SHIPPING/g, 'Chờ Giao');
content = content.replace(/REJECTED/g, 'Từ Chối');

fs.writeFileSync(flowsPath, content, 'utf8');
console.log('flows.md updated successfully');
