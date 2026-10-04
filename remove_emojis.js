const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|\uD83E[\uDE00-\uDEFF])/g;

walkDir('app/tools', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Replace emojis. We should be careful not to break anything.
    content = content.replace(emojiRegex, '');
    
    // Clean up empty spaces left after emoji removal (e.g. " <h1>  Image..." -> "<h1> Image...")
    // Let's just remove the emojis.
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Cleaned:', filePath);
    }
  }
});
