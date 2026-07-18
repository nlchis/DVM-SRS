const fs = require('fs');
const html = fs.readFileSync('online_srs.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
console.log($('table').eq(2).html());
