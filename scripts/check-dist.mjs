// Post-build guard: required files exist and no private data leaks into the public build.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { privacyPatterns } from './privacy-patterns.mjs';
import { checkWriting } from './check-writing.mjs';

const DIST = 'dist';
const required = [
  '.well-known/matrix/server', '.well-known/matrix/client', '_headers', '_redirects',
  'index.html', 'es/index.html', 'pt/index.html', 'writing/index.html', 'writing/k8s-edge/index.html',
  'pi/index.html', 'demos/index.html', 'es/demos/index.html', 'pt/demos/index.html',
  'demos/acceso/index.html', 'demos/privado/index.html', '404.html', 'llms.txt', 'index.md', 'resume.json', 'rss.xml', 'sitemap-index.xml', 'og.png',
];
const banned = [...privacyPatterns];
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
// Demo library: private cards must never ship a video URL or poster in the public build.
const demoData = JSON.parse(readFileSync('src/data/demos.json', 'utf8'));
for (const d of demoData.demos) {
  if (d.visibility !== 'publico' && (d.videos.length || d.poster)) { console.error(`demo ${d.id}: non-public card ships media`); failed = true; }
  for (const v of d.videos) if (!v.src.startsWith('https://arpagon.co/demos/media/')) { console.error(`demo ${d.id}: unexpected video host`); failed = true; }
}
for (const page of ['demos/acceso/index.html', 'demos/privado/index.html']) {
  if (!readFileSync(join(DIST, page), 'utf8').includes('noindex')) { console.error(`${page} must be noindex`); failed = true; }
}
if (failed) process.exit(1);
checkWriting(DIST);
console.log('check-dist: ok');
