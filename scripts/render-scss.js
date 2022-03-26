'use strict'
const autoprefixer = require('autoprefixer');
const packageJSON = require('../package.json');
const fs = require('fs');
const upath = require('upath');
const postcss = require('postcss');
const sh = require('shelljs');
const sass = require('sass');

const stylesPath = '../src/scss/styles.scss';
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css')

module.exports = function renderSCSS() {

    const results = sass.renderSync({
        data: entryPoint,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ]
    })

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    postcss([ autoprefixer ]).process(results.css, {
        from: 'styles.css', to: 'styles.css'
    }).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString())
        })
        fs.writeFileSync(destPath, result.css.toString());
    }) 
};

const entryPoint = `/*!
* MC Design - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://michaelcajandig.com/LICENSE)
*/
@import "${stylesPath}"
`