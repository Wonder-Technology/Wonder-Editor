'use strict';

var Fs = require("fs");
var Path = require("path");
var Process = require("process");

function buildWDBPath(wdbName) {
  return Path.join(Process.cwd(), "./test/res/", "wdb/" + (String(wdbName) + ".wdb"));
}

function getWDBArrayBuffer(wdbName) {
  var uint8TypeArray = Fs.readFileSync(buildWDBPath(wdbName));
  return new Uint8Array(uint8TypeArray).buffer;
}

exports.buildWDBPath = buildWDBPath;
exports.getWDBArrayBuffer = getWDBArrayBuffer;
/* fs Not a pure module */
