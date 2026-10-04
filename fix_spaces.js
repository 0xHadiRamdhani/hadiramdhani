const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('app/tools', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Fix leading spaces inside h1
    content = content.replace(/<h1([^>]*)>\s+/g, '<h1$1>');
    // Fix spaces around where emojis used to be on buttons e.g. ">  "
    content = content.replace(/>\s+([A-Za-z])/g, '>$1'); // Be careful with this, maybe only replace > space space with > space
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed spaces:', filePath);
    }
  }
});
