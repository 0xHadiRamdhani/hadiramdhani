const fs = require('fs');
let code = fs.readFileSync('app/tools/data.tsx', 'utf-8');

// The file exports categories array.
// I will use regex or AST to remove non-live tools, but it's simpler to just rewrite it.
