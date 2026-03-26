import fs from 'fs';

const produtos = fs.readFileSync('src/data/produtos.js', 'utf8');
const keys = [...produtos.matchAll(/'([^']+)':/g)].map(m => m[1]);

const productsJSX = fs.readFileSync('src/pages/Products.jsx', 'utf8');
const jsxIds = [...productsJSX.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
const uniqueJsxIds = [...new Set(jsxIds)];

const ignore = ['premium-oxford', 'luxo-cetim', 'bases-pedestais', 'mastros-acessorios', 'kits-promocionais', 'bandeira-mesa', 'kit-base-chao', 'bandeira-personalizada'];
const missing = uniqueJsxIds.filter(id => !keys.includes(id) && !ignore.includes(id));
fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
