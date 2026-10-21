// node morning-brief/tests/run.js  — exits 1 if any check fails.
const fs = require('fs');
const path = require('path');
const { runChecks } = require('./checks.js');

const wf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'workflow.json'), 'utf8'));
const results = runChecks(wf);
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.ok ? '' : '\n     ' + r.info.slice(0, 400)}`);
const failed = results.filter(r => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
