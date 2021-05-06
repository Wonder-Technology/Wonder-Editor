'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_Console$WonderLog = require("wonder-log/lib/js/src/Wonder_Console.js");
var PregetGLSLDataJob$Wonderjs = require("wonder.js/lib/js/src/job/no_worker/init/PregetGLSLDataJob.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

function setPrecision(precision, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */precision,
    /* maxTextureUnit */init[/* maxTextureUnit */3]
  ];
  return newrecord;
}

function preparePrecision(state) {
  return setPrecision(/* HIGHP */0, state);
}

function pregetGLSLData(state) {
  return PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state));
}

function prepareForInit(param) {
  Wonder_Console$WonderLog.makeObjInToWindow(/* () */0);
  var state = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state)));
  return /* () */0;
}

function prepareForInitInspectorEngineState(param) {
  var state = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateInspectorEngineService$WonderEditor.setState(PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state)));
  return /* () */0;
}

exports.setPrecision = setPrecision;
exports.preparePrecision = preparePrecision;
exports.pregetGLSLData = pregetGLSLData;
exports.prepareForInit = prepareForInit;
exports.prepareForInitInspectorEngineState = prepareForInitInspectorEngineState;
/* StateEngineService-WonderEditor Not a pure module */
