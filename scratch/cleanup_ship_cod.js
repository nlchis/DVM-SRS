const fs = require('fs');

const files = [
    'd:/VietMec/docs/order-tracking/srs/usecases/UC-order-01_create-order-manual.md',
    'd:/VietMec/docs/order-tracking/srs/spec.md',
    'd:/VietMec/docs/order-tracking/spec/spec.md',
    'd:/VietMec/docs/order-tracking/srs/flows.md',
    'd:/VietMec/docs/order-tracking/srs/changelog.md',
    'd:/VietMec/docs/order-tracking/brainstorms/order-tracking-brainstorm.md',
    'd:/VietMec/docs/order-tracking/srs/brainstorms/order-tracking-brainstorm.md'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // UC-order-01
        content = content.replace(/mặc định hình thức giao hàng là thu hộ tiền mặt \(SHIP COD\)\./g, 'nhân viên chọn phương thức vận chuyển của 247Express.');
        content = content.replace(/note right: Hệ thống mặc định thanh toán SHIP COD/g, 'note right: Chọn phương thức vận chuyển');
        content = content.replace(/Hệ thống tự động đặt hình thức vận chuyển là thu hộ \(SHIP COD\)\./g, 'Sales chọn phương thức vận chuyển.');
        
        // spec.md (just in case the previous one didn't catch it)
        content = content.replace(/Tất cả các đơn hàng \(bao gồm đồng bộ tự động từ Web và tạo thủ công\) mặc định sử dụng duy nhất hình thức thanh toán SHIP COD \(Thanh toán khi nhận hàng\) qua hãng vận chuyển\./g, 
            'Khách hàng chỉ thanh toán tiền hàng (cho Kế toán/Sales). Phí vận chuyển công ty trả. Chọn phương thức vận chuyển của 247Express (Nhanh, Tiết kiệm, Hỏa tốc...).');
        
        // flows.md
        content = content.replace(/note right: Hệ thống mặc định hình thức SHIP COD/g, 'note right: Chọn phương thức vận chuyển');
        content = content.replace(/:Gọi API tạo vận đơn SHIP COD sang 247Express;/g, ':Gọi API tạo vận đơn sang 247Express;');
        
        // brainstorm
        content = content.replace(/Sales tạo đơn SHIP COD mặc định/g, 'Sales tạo đơn chọn phương thức vận chuyển');
        content = content.replace(/Tạo đơn \(Ship COD\)/g, 'Tạo đơn (Upload Hóa đơn)');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned SHIP COD in ${file}`);
    }
});
