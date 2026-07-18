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
        
        // Use simpler replacements without \b since Vietnamese characters break \b
        content = content.replace(/Chờ Giao/g, 'Đã tiếp nhận');
        content = content.replace(/Chờ giao/g, 'Đã tiếp nhận');
        content = content.replace(/chờ giao/g, 'đã tiếp nhận');
        
        content = content.replace(/Đang Giao/g, 'Đang đi phát');
        content = content.replace(/Đang giao/g, 'Đang đi phát');
        
        // Thất bại -> Chờ xử lý
        content = content.replace(/Thất Bại/g, 'Chờ xử lý');
        content = content.replace(/trạng thái Thất bại/gi, 'trạng thái Chờ xử lý');
        content = content.replace(/Trạng thái: THẤT BẠI/gi, 'Trạng thái: CHỜ XỬ LÝ');
        content = content.replace(/\|\s*\*?Thất bại\*?\s*\|/g, '| **Chờ xử lý** |');
        
        content = content.replace(/Đang Hoàn/g, 'Chờ chuyển hoàn');
        content = content.replace(/Đang hoàn/g, 'Chờ chuyển hoàn');
        
        content = content.replace(/Đã Hoàn/g, 'Đã chuyển hoàn');
        content = content.replace(/Đã hoàn/g, 'Đã chuyển hoàn');
        
        content = content.replace(/Đã Giao/g, 'Phát thành công');
        content = content.replace(/Đã giao/g, 'Phát thành công');
        
        if (content !== oldContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
