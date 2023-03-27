// This is solely to fix https://github.com/openexchangerates/accounting.js because electron-builder breaks with the package.json
// It should be {} not [] and yarn doesn't like it. While we could switch to npm, I'd rather not. And the package should never have had it as [] to begin.

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../app/node_modules/accounting/package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.dependencies = {};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4), 'utf8');
console.log("Fixed accounting dependencies package.json");