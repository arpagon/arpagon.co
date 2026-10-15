// Post-build guard: required files exist and no private data leaks into the public build.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const required = [
  '.well-known/matrix/server', '.well-known/matrix/client', '_headers', '_redirects',
  'index.html', 'es/index.html', 'pt/index.html', 'writing/index.html', 'writing/k8s-edge/index.html',
  'llms.txt', 'index.md', 'resume.json', 'rss.xml', 'sitemap-index.xml', 'og.png',
];
const banned = [
  /\+57[\s\d]{6,}/, /\b3\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/, // phone numbers
];
// Extra private patterns (one regex per line) live outside git: .banned-terms.local
if (existsSync('.banned-terms.local')) {
  for (const l of readFileSync('.banned-terms.local', 'utf8').split('\n').map((x) => x.trim()).filter((x) => x && !x.startsWith('#'))) banned.push(new RegExp(l, 'i'));
}
let failed = false;
for (const f of required) if (!existsSync(join(DIST, f))) { console.error(`missing: ${f}`); failed = true; }
JSON.parse(readFileSync(join(DIST, 'resume.json'), 'utf8'));
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk(DIST).filter((p) => /\.(html|txt|md|json|xml)$/.test(p))) {
  const s = readFileSync(f, 'utf8');
  for (const re of banned) if (re.test(s)) { console.error(`banned pattern ${re} in ${f}`); failed = true; }
}
if (failed) process.exit(1);
console.log('check-dist: ok');
