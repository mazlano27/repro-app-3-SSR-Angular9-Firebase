const fs = require('fs-extra');

(async () => {
  const src = '../dist';
  const copy = './dist';
  const index = '../dist/browser/index.html';

  await fs.remove(copy);
  await fs.copy(src, copy);
  await fs.remove(index);
})();
