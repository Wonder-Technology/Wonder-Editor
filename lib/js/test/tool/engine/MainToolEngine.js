'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var SinonTool$WonderEditor = require("../SinonTool.js");
var StateDataMain$Wonderjs = require("wonder.js/lib/js/src/service/state/main/data/StateDataMain.js");
var IsDebugMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/state/IsDebugMainService.js");

function createGetContextStub(fakeGl, sandbox) {
  return Sinon.returns(fakeGl, Curry._1(Sinon.createEmptyStub, sandbox[0]));
}

function buildFakeGl(sandbox) {
  return {
          VERTEX_SHADER: 0,
          FRAGMENT_SHADER: 1,
          HIGH_FLOAT: 2,
          MEDIUM_FLOAT: 3,
          viewport: Curry._1(Sinon.createEmptyStub, sandbox[0]),
          getShaderPrecisionFormat: Sinon.returns({
                precision: 1
              }, Curry._1(Sinon.createEmptyStub, sandbox[0])),
          getExtension: Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]))
        };
}

function buildFakeCanvas(id, gl, sandbox) {
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
          width: 0,
          height: 0,
          getContext: createGetContextStub(gl, sandbox)
        };
}

function buildFakeDomForPassCanvasId($staropt$star, sandbox) {
  var id = $staropt$star !== undefined ? $staropt$star : "webgl";
  var canvasDom = buildFakeCanvas(id, buildFakeGl(sandbox), sandbox);
  var querySelectorAll = Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll");
  Sinon.returns(/* array */[], querySelectorAll);
  return Sinon.returns(/* array */[canvasDom], Sinon.withOneArg("#" + (String(id) + ""), querySelectorAll));
}

function buildFakeDomForNotPassCanvasId(sandbox) {
  var fakeGl = buildFakeGl(sandbox);
  var canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  var div = {
    innerHTML: "",
    firstChild: canvasDom
  };
  var body = {
    prepend: Curry._1(Sinon.createEmptyStub, sandbox[0]),
    style: {
      cssText: ""
    }
  };
  Sinon.returns(div, Sinon.withOneArg("div", Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "createElement")));
  Sinon.returns(/* :: */[
        body,
        /* [] */0
      ], Sinon.withOneArg("body", Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll")));
  return /* tuple */[
          canvasDom,
          fakeGl,
          div,
          body
        ];
}

function buildMainConfig($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var bufferConfig = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var gpuConfig = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var canvasId = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var isDebug = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var contextConfig = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  return {
          bufferConfig: bufferConfig,
          gpuConfig: gpuConfig,
          canvasId: canvasId,
          isDebug: isDebug,
          contextConfig: contextConfig
        };
}

function getIsDebug(param) {
  return IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData);
}

exports.createGetContextStub = createGetContextStub;
exports.buildFakeGl = buildFakeGl;
exports.buildFakeCanvas = buildFakeCanvas;
exports.buildFakeDomForPassCanvasId = buildFakeDomForPassCanvasId;
exports.buildFakeDomForNotPassCanvasId = buildFakeDomForNotPassCanvasId;
exports.buildMainConfig = buildMainConfig;
exports.getIsDebug = getIsDebug;
/* Sinon Not a pure module */
