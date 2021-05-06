'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Base64Tool$WonderEditor = require("./Base64Tool.js");

function getInspectorCanvasFakeBase64Str(param) {
  return Base64Tool$WonderEditor.buildFakeBase64_1(/* () */0);
}

function getImgCanvasFakeBase64Str(param) {
  return Base64Tool$WonderEditor.buildFakeBase64_2(/* () */0);
}

function _buildFakeContext(sandbox) {
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          clearRect: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          fillStyle: 0,
          fillRect: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          translate: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function getFakeCanvasDom(id, param, sandbox) {
  return {
          id: id,
          nodeType: 1,
          style: {
            left: "",
            top: "",
            width: "",
            height: "",
            position: "static"
          },
          width: param[0],
          height: param[1],
          getContext: (function (param) {
              return _buildFakeContext(sandbox);
            }),
          toDataURL: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function buildFakeCanvas(sandbox) {
  var canvasDom = getFakeCanvasDom("a", /* tuple */[
        0,
        0
      ], sandbox);
  var createElementStub = document.createElement;
  Sinon.returns(canvasDom, Sinon.withOneArg("canvas", createElementStub));
  return canvasDom;
}

exports.getInspectorCanvasFakeBase64Str = getInspectorCanvasFakeBase64Str;
exports.getImgCanvasFakeBase64Str = getImgCanvasFakeBase64Str;
exports._buildFakeContext = _buildFakeContext;
exports.getFakeCanvasDom = getFakeCanvasDom;
exports.buildFakeCanvas = buildFakeCanvas;
/* Sinon Not a pure module */
