const fs = require('fs');

let files = fs.readdirSync('./src/docs');
files = files.filter(x => x !== 'index.js').map(x => `  '${x}'`);

const filesAsArray = `export default [\n${files.join(',\n')}\n];\n`;

fs.writeFile('src/docNames.js', filesAsArray, () => console.log('read files ok!'));
