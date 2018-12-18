

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_Console$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as PregetGLSLDataJob$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/job/no_worker/init/PregetGLSLDataJob.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";

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
  Curry._1(Wonder_Console$WonderLog.makeObjInToWindow, /* () */0);
  var state = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state)));
  return /* () */0;
}

export {
  setPrecision ,
  preparePrecision ,
  pregetGLSLData ,
  prepareForInit ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
