const fs = require('fs');

['app/tools/code-screenshot/page.tsx', 'app/tools/palette-gen/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/import \{ Code \} from "lucide-react";\n/g, '');
  content = content.replace(/import \{ Palette \} from "lucide-react";\n/g, '');
  
  if (file.includes('code-screenshot')) {
    content = content.replace('import { Copy, Check, Download } from "lucide-react";', 'import { Copy, Check, Download, Code } from "lucide-react";');
  } else {
    content = content.replace('import { Copy, Check } from "lucide-react";', 'import { Copy, Check, Palette } from "lucide-react";');
  }
  fs.writeFileSync(file, content);
});
