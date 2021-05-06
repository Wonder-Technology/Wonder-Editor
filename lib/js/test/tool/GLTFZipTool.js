'use strict';

var Fs = require("fs");
var Path = require("path");
var Process = require("process");

function buildPath(name) {
  return Path.join(Process.cwd(), "./test/res/gltf/", "" + (String(name) + ""));
}

function getArrayBuffer(name) {
  return Fs.readFileSync(buildPath(name)).buffer;
}

exports.buildPath = buildPath;
exports.getArrayBuffer = getArrayBuffer;
/* fs Not a pure module */
