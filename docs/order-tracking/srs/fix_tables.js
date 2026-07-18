const fs = require('fs');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

const turndownService = new TurndownService({ headingStyle: 'atx' });
turndownService.use(turndownPluginGfm.gfm);

// Remove extra tags like span and inline styles
turndownService.addRule('removeEmptyLines', {
  filter: ['span', 'div'],
  replacement: function (content) {
    return content;
  }
});

// Fix newlines inside table cells which break markdown tables
turndownService.addRule('tableCellFix', {
  filter: ['th', 'td'],
  replacement: function (content) {
    // Replace newlines with spaces, and pipe chars with HTML entities to not break the table
    return ' ' + content.replace(/\n+/g, ' ').replace(/\|/g, '&#124;').trim() + ' ';
  }
});

let html = fs.readFileSync('online_srs.html', 'utf8');

// Convert HTML to Markdown
let md = turndownService.turndown(html);

// Decode any remaining entities using a simple replacer
const entities = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
  '&Agrave;': 'À', '&Aacute;': 'Á', '&Acirc;': 'Â', '&Atilde;': 'Ã',
  '&Egrave;': 'È', '&Eacute;': 'É', '&Ecirc;': 'Ê',
  '&Igrave;': 'Ì', '&Iacute;': 'Í',
  '&Ograve;': 'Ò', '&Oacute;': 'Ó', '&Ocirc;': 'Ô', '&Otilde;': 'Õ',
  '&Ugrave;': 'Ù', '&Uacute;': 'Ú',
  '&Yacute;': 'Ý',
  '&agrave;': 'à', '&aacute;': 'á', '&acirc;': 'â', '&atilde;': 'ã',
  '&egrave;': 'è', '&eacute;': 'é', '&ecirc;': 'ê',
  '&igrave;': 'ì', '&iacute;': 'í',
  '&ograve;': 'ò', '&oacute;': 'ó', '&ocirc;': 'ô', '&otilde;': 'õ',
  '&ugrave;': 'ù', '&uacute;': 'ú',
  '&yacute;': 'ý'
};

md = md.replace(/&[#A-Za-z0-9]+;/g, match => {
  if (match === '&#124;') return '|'; // Keep the pipe char intact for tables but wait, if it's inside td, it should be &#124; to not break MD table.
  // Actually, we should keep &#124; as HTML entity so markdown parser doesn't treat it as a column separator.
  if (match === '&#124;') return match;
  return entities[match] || match;
});

const srs = fs.readFileSync('srs.md', 'utf8');
const fmMatch = srs.match(/^(---[\s\S]*?---)/);
const fm = fmMatch ? fmMatch[1] : '';

// Preserve frontmatter and write
fs.writeFileSync('srs.md', fm + '\n\n' + md);
console.log('Fixed markdown formatting in srs.md');
