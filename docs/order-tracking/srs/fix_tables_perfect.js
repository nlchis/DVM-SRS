const fs = require('fs');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');

let html = fs.readFileSync('online_srs.html', 'utf8');

// Strip all block-level tags that cause newlines inside tables
html = html.replace(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi, function(match, tag, content) {
    let cleanContent = content
      // Remove all tags that turndown might convert to newlines
      .replace(/<\/?p[^>]*>/gi, ' ')
      .replace(/<\/?div[^>]*>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' ')
      // Clean up whitespace
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return `<${tag}>${cleanContent}</${tag}>`;
});

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
console.log('Fixed markdown formatting in srs.md');
