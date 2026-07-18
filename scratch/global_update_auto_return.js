const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'd:/VietMec/docs/order-tracking/srs/states.md',
    'd:/VietMec/docs/order-tracking/spec/spec.md',
    'd:/VietMec/docs/order-tracking/srs/spec.md',
    'd:/VietMec/docs/order-tracking/brainstorms/order-tracking-brainstorm.md',
    'd:/VietMec/docs/order-tracking/srs/brainstorms/order-tracking-brainstorm.md',
    'd:/VietMec/docs/order-tracking/wireframes/order-management-dashboard.md',
    'd:/VietMec/docs/order-tracking/srs/wireframes/order-management-dashboard.md',
    'd:/VietMec/docs/order-tracking/srs/usecases/index.md'
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

filesToProcess.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Global State Name Replacements
        content = replaceAll(content, 'Giao Lỗi', 'Thất bại');
        content = replaceAll(content, 'Giao Thất Bại', 'Thất bại');
        content = replaceAll(content, 'Giao thất bại', 'Thất bại');

        // states.md
        if (file.includes('states.md')) {
            content = content.replace(/Sales bấm \[Yêu cầu Giao Lại\] \(Giao lại lần 2\)/g, 'Webhook 247Express (Tự động giao lại)');
            content = content.replace(/Sales bấm \[Xác nhận Hoàn Hàng\] \(Chờ Hoàn Hàng\)/g, 'Webhook 247Express (Tự động chuyển hoàn)');
            content = content.replace(/Bưu tá hoàn trả hàng thành công \(Đã Hoàn Hàng\)/g, 'Webhook 247Express (Đã Hoàn - Không tự cộng kho)');
        }

        // spec.md
        if (file.includes('spec.md')) {
            // Remove auto inventory add
            content = content.replace(/Hệ thống tự động cộng lại tồn kho thực tế ở vị trí kệ xuất cũ khi đơn hàng cập nhật trạng thái \*\*Đã Hoàn\*\* \(đơn vị vận chuyển đã hoàn lại hàng thành công cho nhà cung cấp\) hoặc bị \*\*Từ Chối\*\*\./g, 
                'Hệ thống KHÔNG tự động cộng lại tồn kho khi đơn hàng cập nhật trạng thái **Đã Hoàn**. Trạng thái **Từ Chối** thì cộng lại bình thường.');
            
            // Remove COD BR if exists
            content = content.replace(/\| \*\*BR-order-tracking-.*?\*\* \| Đối soát COD \|.*?\n/g, '');
        }

        // brainstorm.md
        if (file.includes('brainstorm.md')) {
            // Remove COD recon
            const reconIndex = content.indexOf('## 4. Đối soát COD (Bị Hủy)');
            if (reconIndex !== -1) {
                 // Remove till the end of section 4 or file end
                 const nextSection = content.indexOf('## 5', reconIndex);
                 if (nextSection !== -1) {
                     content = content.substring(0, reconIndex) + content.substring(nextSection);
                 } else {
                     content = content.substring(0, reconIndex);
                 }
            }
        }

        // order-management-dashboard.md
        if (file.includes('order-management-dashboard.md')) {
            content = content.replace(/│\s+\[ Yêu cầu Giao Lại \(lần 2\) \]\s+\[ Xác nhận Hoàn Hàng \]\s+│\n/g, '');
            content = content.replace(/<button.*?>Yêu cầu Giao Lại \(lần 2\)<\/button>\n/g, '');
            content = content.replace(/<button.*?>Xác nhận Hoàn Hàng<\/button>\n/g, '');
            content = content.replace(/Sales có thể chọn 1 trong 2 nút hành động:/, 'Hệ thống tự động cập nhật hành trình thông qua Webhook API.');
        }

        // index.md
        if (file.includes('index.md')) {
            content = content.replace(/Xử lý sự cố giao hàng thất bại \(Sales\)/, 'Đồng bộ tự động hành trình giao lại và hoàn hàng (System)');
            content = content.replace(/Sales tiếp nhận cảnh báo giao hàng thất bại, liên hệ khách hàng và xử lý trên hệ thống \(yêu cầu giao lại lần 2 hoặc xác nhận hoàn trả hàng toàn bộ\)\./, 
                'Hệ thống tự động nhận Webhook từ 247Express để cập nhật trạng thái đơn hàng khi giao hàng thất bại, shipper giao lại, hoặc chuyển hoàn.');
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${path.basename(file)}`);
    }
});
