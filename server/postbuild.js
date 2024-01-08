import fs from 'fs';
import path from 'path';

function addJsExtension(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      addJsExtension(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Adjust the regex to match local relative imports
      content = content.replace(/from '\.\/(.+?)'/g, "from './$1.js'");
      content = content.replace(/from '\.\.\/(.+?)'/g, "from '../$1.js'");
      fs.writeFileSync(filePath, content);
    }
  });
}

addJsExtension(path.join(process.cwd(), 'dist'));