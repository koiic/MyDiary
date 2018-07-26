const fs = require('fs');

const file = fs.createReadStream('sample-env');
const newFile = fs.createWriteStream('.env');

file.pipe(newFile);
