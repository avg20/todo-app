#!/usr/bin/env node

const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

co(function *configGenerate() {
  const port = yield prompt('Port: ');
  const host = yield prompt('Host: ');
  const dbHost = yield prompt('DB host: ');
  
  return `'use strcit';\n\nmodule.exports.port = ${port};\nmodule.exports.host = 'http://${host}:${port}';\nmodule.exports.dbHost = '${dbHost}';\n`;
}).then((fileText) => {
  fs.writeFile('server/config.js', fileText, (err) => {
    if (err) return console.log(err); // eslint-disable-line

    console.log('File server/config.js generated'); // eslint-disable-line
    process.exit();
    return null;
  });
}, (err) => {
  console.error(err.stack); // eslint-disable-line
});
