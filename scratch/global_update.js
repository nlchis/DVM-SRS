const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'd:/VietMec/docs/order-tracking/srs/srs.md',
    'd:/VietMec/docs/order-tracking/spec/spec.md',
    'd:/VietMec/docs/order-tracking/srs/spec.md',
    'd:/VietMec/docs/order-tracking/brainstorms/order-tracking-brainstorm.md',
    'd:/VietMec/docs/order-tracking/srs/brainstorms/order-tracking-brainstorm.md',
    'd:/VietMec/docs/order-tracking/wireframes/order-management-dashboard.md',
    'd:/VietMec/docs/order-tracking/srs/wireframes/order-management-dashboard.md',
    'd:/VietMec/docs/order-tracking/srs/usecases/index.md',
    'd:/VietMec/docs/order-tracking/srs/usecases/UC-order-01_create-order-manual.md',
    'd:/VietMec/docs/order-tracking/srs/usecases/UC-order-02_approve-reject-order.md',
    'd:/VietMec/docs/order-tracking/srs/usecases/UC-order-04_edit-pending-order.md'
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

filesToProcess.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // --- GLOBAL REPLACEMENTS ---
        content = replaceAll(content, 'Chờ Phê Duyệt', 'Chờ Duyệt');
        content = replaceAll(content, 'Chờ Giao Hàng', 'Chờ Giao');
        content = replaceAll(content, 'Từ Chối Duyệt', 'Từ Chối');
        content = replaceAll(content, 'Giao Thành Công', 'Thành Công');
        content = replaceAll(content, 'Giao Thất Bại', 'Giao Lỗi');
        content = replaceAll(content, 'Chờ Hoàn Hàng', 'Chờ Hoàn');
        content = replaceAll(content, 'Đã Hoàn Hàng', 'Đã Hoàn');
        content = replaceAll(content, 'Đang Giao Hàng', 'Đang Giao');
        
        // --- PO & Phiếu xuất kho ---
        content = replaceAll(content, 'Phiếu đặt hàng \\(PO\\)', 'Phiếu xuất kho');
        content = replaceAll(content, 'Phiếu đặt hàng', 'Phiếu xuất kho');
        content = replaceAll(content, 'Purchase Order', 'Phiếu xuất kho');

        // --- File Upload: CO/CQ -> Hóa đơn ---
        content = replaceAll(content, 'CO/CQ', 'Hóa đơn');
        content = replaceAll(content, 'chứng từ chất lượng Hóa đơn', 'Hóa đơn');
        content = replaceAll(content, 'file_co_cq_qua_lon', 'file_hoa_don_qua_lon');
        content = replaceAll(content, 'Xem_File_CO_CQ', 'Xem_Hoa_Don');

        // --- SPECIFIC FILE MODIFICATIONS ---
        if (file.includes('srs.md')) {
            content = content.replace(/\| \*\*PO\*\* \| .*?\n/, '');
            content = content.replace(/\| \*\*COD\*\* \| .*?\n/, '');
        }

        if (file.includes('spec.md')) {
            content = content.replace(/hỗ trợ đính kèm Hóa đơn tùy chọn/, 'yêu cầu import Hóa đơn đơn hàng và chọn phương thức vận chuyển');
            content = content.replace(/Hình thức thanh toán mặc định: Tất cả các đơn hàng tạo thủ công mặc định sử dụng duy nhất hình thức thanh toán SHIP COD.*/, 
                'Phương thức vận chuyển: Khách hàng chỉ thanh toán tiền hàng (cho Kế toán/Sales). Phí vận chuyển công ty trả. Chọn phương thức vận chuyển của 247Express (Nhanh, Tiết kiệm, Hỏa tốc...).');
        }

        if (file.includes('brainstorm.md')) {
            content = content.replace(/mặc định hình thức thanh toán SHIP COD, tải chứng từ Hóa đơn tùy chọn/, 'import Hóa đơn, chọn phương thức vận chuyển');
            content = content.replace(/Ngay sau khi được Admin duyệt/, 'Ngay sau khi đơn chuyển sang trạng thái Chờ Giao');
        }

        if (file.includes('index.md')) {
            content = content.replace(/tải chứng từ Hóa đơn tùy chọn/, 'import Hóa đơn và chọn PT vận chuyển');
        }

        if (file.includes('order-management-dashboard.md')) {
            content = content.replace(/│ Hình thức:   \[ SHIP COD \]/g, '│ Vận chuyển:  [ Chuyển phát nhanh (247) ▾ ]');
        }

        if (file.includes('UC-order-01')) {
            content = content.replace(/tải Hóa đơn \(nếu có - tùy chọn\)/, 'tải Hóa đơn (Bắt buộc)');
            content = content.replace(/tùy chọn\)\. Dung lượng tệp phải ≤ 5 MB/, 'bắt buộc). Dung lượng tệp phải ≤ 5 MB');
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${path.basename(file)}`);
    }
});
