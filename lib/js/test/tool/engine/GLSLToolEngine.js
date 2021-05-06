'use strict';

var List = require("bs-platform/lib/js/list.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");

function getVsSource(shaderSource) {
  return List.nth(Sinon.getArgs(Sinon.getCall(0, shaderSource)), 1);
}

function getVsSourceByCount(shaderSource, count) {
  return List.nth(Sinon.getArgs(Sinon.getCall((count << 1), shaderSource)), 1);
}

function getFsSource(shaderSource) {
  return List.nth(Sinon.getArgs(Sinon.getCall(1, shaderSource)), 1);
}

function getFsSourceByCount(shaderSource, count) {
  return List.nth(Sinon.getArgs(Sinon.getCall((count << 1) + 1 | 0, shaderSource)), 1);
}

function containSpecifyCount(source, target, $staropt$star, param) {
  var count = $staropt$star !== undefined ? $staropt$star : 1;
  var match = source.match(new RegExp(target, "g"));
  if (match !== null) {
    return match.length === count;
  } else {
    return count === 0;
  }
}

function contain(source, targetLine) {
  return source.includes(targetLine.trim());
}

function containMultiline(source, targetLineArray) {
  return List.for_all((function (targetLine) {
                return source.includes(targetLine.trim());
              }), targetLineArray);
}

function getShaderSourceCallCount(glShaderSource) {
  return Sinon.getCallCount(glShaderSource) / 2 | 0;
}

exports.getVsSource = getVsSource;
exports.getVsSourceByCount = getVsSourceByCount;
exports.getFsSource = getFsSource;
exports.getFsSourceByCount = getFsSourceByCount;
exports.containSpecifyCount = containSpecifyCount;
exports.contain = contain;
exports.containMultiline = containMultiline;
exports.getShaderSourceCallCount = getShaderSourceCallCount;
/* Sinon Not a pure module */
