const fs = require('fs');

const file = 'd:/VietMec/docs/order-tracking/srs/flows.md';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/:Đính kèm tệp CO\/CQ \(Tùy chọn\);/g, ':Đính kèm tệp Hóa đơn (Bắt buộc);');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed flows.md L167');
}
