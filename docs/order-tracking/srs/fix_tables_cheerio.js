const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

let html = fs.readFileSync('online_srs.html', 'utf8');

// Strip tags that cause turndown to add newlines inside tables
html = html.replace(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi, function(match, tag, content) {
    let cleanContent = content
      .replace(/<\/?p[^>]*>/gi, ' ')
      .replace(/<\/?div[^>]*>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return `<${tag}>${cleanContent}</${tag}>`;
});

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
                    
                    // If it's a spanned cell, we can prefix it or just copy the content
                    // To keep it clean, we just copy the content
                    grid[targetRow][targetCol] = { html: cellHtml, isTh: isTh };
                }
            }
            
            // Remove rowspan and colspan
            $cell.removeAttr('rowspan');
            $cell.removeAttr('colspan');
        });
    });
    
    // Rebuild table body
    let $tbody = $('<tbody></tbody>');
    grid.forEach((row, rIndex) => {
        let $tr = $('<tr></tr>');
        row.forEach(cellObj => {
            if (!cellObj) cellObj = { html: '', isTh: false };
            let tag = cellObj.isTh ? 'th' : 'td';
            $tr.append(`<${tag}>${cellObj.html}</${tag}>`);
        });
        $tbody.append($tr);
    });
    
    $(table).empty().append($tbody);
});

html = $.html();

const turndownService = new TurndownService({ headingStyle: 'atx' });
turndownService.use(turndownPluginGfm.gfm);

// Convert HTML to Markdown
let md = turndownService.turndown(html);

// Decode entities
const entities = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ',
  '&Agrave;': 'À', '&Aacute;': 'Á', '&Acirc;': 'Â', '&Atilde;': 'Ã',
  '&Egrave;': 'È', '&Eacute;': 'É', '&Ecirc;': 'Ê',
  '&Igrave;': 'Ì', '&Iacute;': 'Í',
  '&Ograve;': 'Ò', '&Oacute;': 'Ó', '&Ocirc;': 'Ô', '&Otilde;': 'Õ',
  '&Ugrave;': 'Ù', '&Uacute;': 'Ú', '&Yacute;': 'Ý',
  '&agrave;': 'à', '&aacute;': 'á', '&acirc;': 'â', '&atilde;': 'ã',
  '&egrave;': 'è', '&eacute;': 'é', '&ecirc;': 'ê',
  '&igrave;': 'ì', '&iacute;': 'í',
  '&ograve;': 'ò', '&oacute;': 'ó', '&ocirc;': 'ô', '&otilde;': 'õ',
  '&ugrave;': 'ù', '&uacute;': 'ú', '&yacute;': 'ý'
};

md = md.replace(/&[#A-Za-z0-9]+;/g, match => entities[match] || match);

const srs = fs.readFileSync('srs.md', 'utf8');
const fmMatch = srs.match(/^(---[\s\S]*?---)/);
const fm = fmMatch ? fmMatch[1] : '';

fs.writeFileSync('srs.md', fm + '\n\n' + md);
console.log('Fixed markdown formatting with cheerio in srs.md');
