const fs = require('fs');
const path = require('path');

// 1. Parse data.tsx to get the mapping of id -> iconName
const dataContent = fs.readFileSync('app/tools/data.tsx', 'utf-8');
const tools = [];
const regex = /\{ id: "([^"]+)", name: "([^"]+)",.*?icon: <([A-Za-z0-9]+)/g;
let match;
while ((match = regex.exec(dataContent)) !== null) {
  tools.push({ id: match[1], name: match[2], iconName: match[3] });
}

// 2. Walk through the tools directory and update pages
tools.forEach(tool => {
  const pagePath = path.join('app/tools', tool.id, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // Add import if not exists
    if (!content.includes(tool.iconName)) {
      content = content.replace(/import \{([^}]+)\} from "lucide-react";/, (m, p1) => {
        if (!p1.includes(tool.iconName)) {
          return `import {${p1}, ${tool.iconName}} from "lucide-react";`;
        }
        return m;
      });
      // If there wasn't a lucide-react import at all, add one
      if (!content.includes('lucide-react')) {
         content = content.replace(/(import .*?;)/, `$1\nimport { ${tool.iconName} } from "lucide-react";`);
      }
    }

    // Replace <h1>Title</h1> with <h1><Icon/> Title</h1>
    // Need to find the exact h1
    const h1Regex = /<h1 className="([^"]+)">([^<]+)<\/h1>/;
    content = content.replace(h1Regex, (m, classes, text) => {
      // Add flex and gap if not there
      let newClasses = classes;
      if (!newClasses.includes('flex')) newClasses += ' flex items-center gap-3';
      return `<h1 className="${newClasses}">\n            <span className="text-primary bg-primary/10 p-2 rounded-xl flex items-center justify-center"><${tool.iconName} size={28} /></span>\n            {/* ${text.trim()} */}\n            ${text.trim()}\n          </h1>`;
    });

    fs.writeFileSync(pagePath, content);
    console.log(`Updated ${tool.id} with icon ${tool.iconName}`);
  }
});

