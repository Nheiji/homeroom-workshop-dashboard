var express = require('express');
var fs = require('fs');

var app = express();

var workshop_dir = process.env.WORKSHOP_DIR || '/opt/app-root/src/workshop';

var slides_dir = process.env.SLIDES_DIR;

if (slides_dir) {
    if (!fs.existsSync(slides_dir + '/index.html')) {
        slides_dir = undefined;
    }
}

if (!slides_dir) {
    if (fs.existsSync(workshop_dir + 'slides/index.html')) {
        slides_dir = workshop_dir + '/slides';
    }
    else if (fs.existsSync('/opt/app-root/workshop/slides/index.html')) {
        slides_dir = '/opt/app-root/workshop/slides';
    }
}

if (slides_dir) {
    app.use(express.static(slides_dir));
    app.use(express.static('/opt/workshop/reveal.js'));
}

module.exports = app
