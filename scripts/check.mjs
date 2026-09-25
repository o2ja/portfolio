// Runnable checks for the orbit maths and the Selected Work registry: `npm run check`.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { offset } from '../src/lib/orbit.js';
import { projects } from '../src/data/projects.js';
import { capabilities } from '../src/data/capabilities.js';

// orbit wraparound: every card is always within half a lap of the front, for any count
for (const n of [1, 2, 3, 4, 7]) {
  for (let r = -10; r <= 10; r += 0.25) {
    for (let i = 0; i < n; i++) {
      const d = offset(i, r, n);
      assert.ok(d >= -n / 2 && d < n / 2, `offset(${i}, ${r}, ${n}) = ${d}`);
    }
  }
}
assert.equal(offset(1, 0, 3), 1); // next card is one step right
assert.equal(offset(2, 0, 3), -1); // last card wraps round to the left
assert.equal(offset(0, 4, 3), -1); // unbounded positions wrap too

// registry: ids unique, assets present, every preview package wired up
const ids = new Set();
for (const p of projects) {
  assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
  ids.add(p.id);
  for (const file of [p.poster, p.posterSmall]) assert.ok(fs.existsSync(`public${file}`), `${p.id}: missing ${file}`);
  if (p.previewStrategy === 'isolated-build') {
    const dir = `previews/${p.slug}`;
    assert.equal(p.previewEntry, `/${dir}/`, `${p.id}: previewEntry must be /${dir}/`);
    for (const f of ['index.html', 'main.tsx', 'preview.json']) assert.ok(fs.existsSync(`${dir}/${f}`), `${p.id}: missing ${dir}/${f}`);
    const { source } = JSON.parse(fs.readFileSync(`${dir}/preview.json`, 'utf8'));
    assert.ok(fs.existsSync(`${dir}/${source}`), `${p.id}: export source ${source} not found`);
  }
}

// capability evidence must point at real projects
for (const c of capabilities) for (const e of c.evidence) assert.ok(ids.has(e.project), `${c.id}: unknown project ${e.project}`);

console.log(`ok: ${projects.length} projects, ${capabilities.length} capabilities`);
