

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as PregetGLSLDataJob$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/job/no_worker/init/PregetGLSLDataJob.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";

function setPrecision(precision, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */6];
  newrecord[/* gpuDetectRecord */6] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* precision */precision,
    /* maxTextureUnit */init[/* maxTextureUnit */2]
  ];
  return newrecord;
}

function preparePrecision(state) {
  return setPrecision(/* HIGHP */0, state);
}

function pregetGLSLData(state) {
  return PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state));
}

function prepareForInit() {
  var state = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  StateLogicService$WonderEditor.setEditEngineState(PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state)));
  var state$1 = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  return StateLogicService$WonderEditor.setRunEngineState(PregetGLSLDataJob$Wonderjs.execJob(1, setPrecision(/* HIGHP */0, state$1)));
}

export {
  setPrecision ,
  preparePrecision ,
  pregetGLSLData ,
  prepareForInit ,
  
}
/* PregetGLSLDataJob-Wonderjs Not a pure module */
