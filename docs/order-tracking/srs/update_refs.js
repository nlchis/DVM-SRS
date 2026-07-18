const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

walk('d:/VietMec/docs/order-tracking/srs', (filePath) => {
    if (filePath.endsWith('.md') || filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let oldContent = content;
        
        // 1. Chờ xuất -> Chờ duyệt
        content = content.replace(/Bản ghi Xuất kho \(Chờ xuất\)/gi, 'Bản ghi Xuất kho (Chờ duyệt)');
        content = content.replace(/bản ghi xuất kho Chờ xuất/gi, 'bản ghi xuất kho Chờ duyệt');
        content = content.replace(/chỉ trừ tồn kho khi Đã xuất/g, 'chỉ trừ tồn kho khi Đã duyệt');
        content = content.replace(/thành Đã xuất/g, 'thành Đã duyệt');
        content = content.replace(/sang Đã xuất/g, 'sang Đã duyệt');

        // 2. Vị trí kệ
        content = content.replace(/, vị trí kệ xuất đã gán/gi, '');
        content = content.replace(/và gán vị trí kệ xuất kho /gi, '');
        content = content.replace(/và gán vị trí kệ /gi, '');
        content = content.replace(/\(kèm vị trí kệ\)/gi, '');
        content = content.replace(/lấy hàng theo vị trí kệ xuất kho,/gi, 'lấy hàng,');
        content = content.replace(/ở vị trí kệ xuất cũ /gi, '');
        content = content.replace(/chứa thông tin vị trí kệ hàng và /gi, 'và ');
        content = content.replace(/về vị trí kệ kho xuất ban đầu/gi, 'về kho');
        content = content.replace(/, vị trí kệ và thực hiện/gi, ' và thực hiện');

        // 3. Webhook phrases (for spec.md, srs.md, usecases)
        content = content.replace(/Webhook Shipper lấy hàng/gi, 'Nhận thông tin [Đã lấy hàng] từ 247');
        content = content.replace(/Webhook 247Express nhận hàng/gi, 'Nhận thông tin [Đã lấy hàng] từ 247');
        content = content.replace(/Webhook Đang vận chuyển/gi, 'Nhận thông tin [Đang vận chuyển] từ 247');
        content = content.replace(/Webhook Đang đi phát/gi, 'Nhận thông tin [Đang đi phát] từ 247');
        content = content.replace(/Webhook Giao thành công/gi, 'Nhận thông tin [Phát thành công] từ 247');
        content = content.replace(/Webhook Giao thất bại lần 1/gi, 'Nhận thông tin [Chờ xử lý] từ 247');
        content = content.replace(/Webhook Tự động giao lại/gi, 'Nhận thông tin [Đang đi phát] từ 247 (giao lại)');
        content = content.replace(/Webhook Tự động chuyển hoàn \(quá hạn\)/gi, 'Nhận thông tin [Chờ chuyển hoàn] từ 247');
        content = content.replace(/Webhook Tự động hoàn \(quá hạn\)/gi, 'Nhận thông tin [Chờ chuyển hoàn] từ 247');
        content = content.replace(/Webhook Hoàn kho thành công/gi, 'Nhận thông tin [Đã chuyển hoàn] từ 247');

        if (content !== oldContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
