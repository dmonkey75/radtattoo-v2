'user strict'
 const sh = require('shelljs');
 const upath = require('upath');
 const renderPug = require('./render-pug.js')

 const srcPath = upath.resolve(upath.dirname(__filename), '../src');

 sh.find(srcPath).forEach(_processFile);

 function _processFile(filePath) {
     if (
         filePath.match(/\.pug$/)
         && !filePath.match(/include/)
         && !filePath.match(/\layout.pug/)
     ) {
         renderPug(filePath);
     }
 }

