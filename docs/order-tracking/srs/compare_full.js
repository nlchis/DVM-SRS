const fs = require('fs');
let html = fs.readFileSync('online_srs.html', 'utf8');

// Basic markdown conversion for the whole document
let md = html
  .replace(/<h1.*?>/gi, '# ')
  .replace(/<h2.*?>/gi, '\n## ')
  .replace(/<h3.*?>/gi, '\n### ')
  .replace(/<h4.*?>/gi, '\n#### ')
  .replace(/<\/h[1-4]>/gi, '\n\n')
  .replace(/<p.*?>/gi, '\n')
  .replace(/<\/p>/gi, '\n')
  .replace(/<strong.*?>/gi, '**')
  .replace(/<\/strong>/gi, '**')
  .replace(/<li.*?>/gi, '\n* ')
  .replace(/<\/li>/gi, '')
  .replace(/<ul.*?>/gi, '')
  .replace(/<\/ul>/gi, '\n')
  .replace(/<ol.*?>/gi, '')
  .replace(/<\/ol>/gi, '\n')
  .replace(/<td.*?>/gi, '| ')
  .replace(/<th.*?>/gi, '| **')
  .replace(/<\/td>/gi, ' ')
  .replace(/<\/th>/gi, '** ')
  .replace(/<tr.*?>/gi, '\n')
  .replace(/<\/tr>/gi, ' |')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '\"')
  .replace(/&Acirc;/g, 'Â')
  .replace(/&Ecirc;/g, 'Ê')
  .replace(/&Otilde;/g, 'Õ')
  .replace(/&Agrave;/g, 'À')
  .replace(/&iacute;/g, 'í')
  .replace(/&aacute;/g, 'á')
  .replace(/\n\s*\n/g, '\n\n');

fs.writeFileSync('online_srs_full.md', md);
console.log('Saved online_srs_full.md');
