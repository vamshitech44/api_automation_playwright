const fs = require('fs');
for (const dir of ['playwright-report', 'test-results', 'dist']) {
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log('Cleaned generated artifacts.');
