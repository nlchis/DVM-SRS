const fs = require('fs');

const file = 'd:/VietMec/docs/order-tracking/srs/flows.md';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace state names in flows.md
    content = content.replace(/DELIVERING/g, 'Đang Giao');
    content = content.replace(/SUCCESS/g, 'Thành Công');
    content = content.replace(/FAILED/g, 'Giao Lỗi');
    content = content.replace(/RETURNING/g, 'Chờ Hoàn');
    content = content.replace(/RETURNED/g, 'Đã Hoàn');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed English states in flows.md');
}
