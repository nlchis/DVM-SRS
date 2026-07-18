const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const he = require('he');

// Read raw html
let html = fs.readFileSync('online_srs.html', 'utf8');

// Decode all HTML entities perfectly
html = he.decode(html);

// Strip all block-level tags that cause newlines inside tables
html = html.replace(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi, function(match, tag, content) {
    let cleanContent = content
      .replace(/<\/?p[^>]*>/gi, ' ')
      .replace(/<\/?div[^>]*>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return `<${tag} ${match.substring(1, match.indexOf('>'))}>${cleanContent}</${tag}>`;
});

// Replace Confluence images with local img tags
html = html.replace(/<ac:image[^>]*>[\s\S]*?<ri:attachment[^>]*ri:filename="([^"]+)"[^>]*>[\s\S]*?<\/ac:image>/gi, '<img src="images/$1" alt="$1" />');

// Use cheerio to unroll rowspan and colspan
const $ = cheerio.load(html);

$('table').each((i, table) => {
    let grid = [];
    
    $(table).find('tr').each((rIndex, tr) => {
        let row = grid[rIndex] || [];
        grid[rIndex] = row;
        
        let colIndex = 0;
        
        $(tr).find('th, td').each((cIndex, cell) => {
            let $cell = $(cell);
            let rowspan = parseInt($cell.attr('rowspan')) || 1;
            let colspan = parseInt($cell.attr('colspan')) || 1;
            let cellHtml = $cell.html();
            let isTh = cell.tagName === 'th';
            
            // Find next empty spot
            while(row[colIndex] !== undefined) {
                colIndex++;
            }
            
            for (let r = 0; r < rowspan; r++) {
                for (let c = 0; c < colspan; c++) {
                    let targetRow = rIndex + r;
                    let targetCol = colIndex + c;
                    
                    if (!grid[targetRow]) {
                        grid[targetRow] = [];
                    }
                    
                    grid[targetRow][targetCol] = { html: cellHtml, isTh: isTh };
                }
            }
        });
    });
    
    // Rebuild table body
    let $tbody = $('<tbody></tbody>');
    grid.forEach((row, rIndex) => {
        let $tr = $('<tr></tr>');
        let maxCols = row.length;
        for (let c = 0; c < maxCols; c++) {
            let cellObj = row[c] || { html: '', isTh: false };
            let tag = cellObj.isTh ? 'th' : 'td';
            $tr.append(`<${tag}>${cellObj.html}</${tag}>`);
        }
        $tbody.append($tr);
    });
    
    $(table).empty().append($tbody);
});

html = $.html();

const turndownService = new TurndownService({ headingStyle: 'atx' });
turndownService.use(turndownPluginGfm.gfm);

turndownService.addRule('zoomable-images', {
    filter: 'img',
    replacement: function (content, node) {
        const alt = node.getAttribute('alt');
        return `\n![${alt}](./images/${alt})\n`;
    }
});

// Prevent escaping of characters
turndownService.escape = function (string) { return string; };

let md = turndownService.turndown(html);

const srs = fs.readFileSync('srs.md', 'utf8');
const fmMatch = srs.match(/^(---[\s\S]*?---)/);
const fm = fmMatch ? fmMatch[1] : '';

// Manually fix known broken strings if they appear
md = md.replace(/th\uFFFD+c thu/g, 'thực thu');
md = md.replace(/nhập li\uFFFD+/g, 'nhập liệu');

fs.writeFileSync('srs.md', fm + '\n\n' + md, 'utf8');
console.log('Fixed markdown formatting with cheerio and he in srs.md, unescaped everything properly');
