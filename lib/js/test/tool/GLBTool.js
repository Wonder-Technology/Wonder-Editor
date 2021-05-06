'use strict';

var Fs = require("fs");
var Path = require("path");
var Process = require("process");

function buildGLBPath(glbName) {
  return Path.join(Process.cwd(), "./test/res/glb/", "" + (String(glbName) + ".glb"));
}

function getGLBArrayBuffer(glbName) {
  return Fs.readFileSync(buildGLBPath(glbName)).buffer;
}

exports.buildGLBPath = buildGLBPath;
exports.getGLBArrayBuffer = getGLBArrayBuffer;
/* fs Not a pure module */
