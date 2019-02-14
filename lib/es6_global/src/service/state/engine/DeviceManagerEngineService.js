

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DeviceManagerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/DeviceManagerAPI.js";
import * as DeviceManagerService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/device/DeviceManagerService.js";

function getViewport(engineState) {
  return engineState[/* deviceManagerRecord */9][/* viewport */8];
}

var setViewport = DeviceManagerAPI$Wonderjs.setViewport;

function getGl(engineState) {
  return engineState[/* deviceManagerRecord */9][/* gl */0];
}

var setScissor = DeviceManagerAPI$Wonderjs.setScissor;

var setScissorTest = DeviceManagerAPI$Wonderjs.setScissorTest;

function setDepthTest(test, engineState) {
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setDepthTest(DeviceManagerAPI$Wonderjs.unsafeGetGl(engineState), test, engineState[/* deviceManagerRecord */9]);
  return newrecord;
}

function setDepthWrite(writeDepth, engineState) {
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setDepthWrite(DeviceManagerAPI$Wonderjs.unsafeGetGl(engineState), writeDepth, engineState[/* deviceManagerRecord */9]);
  return newrecord;
}

function setBlend(isBlend, engineState) {
  var gl = DeviceManagerAPI$Wonderjs.unsafeGetGl(engineState);
  if (isBlend) {
    gl.enable(gl.BLEND);
  } else {
    gl.disable(gl.BLEND);
  }
  return engineState;
}

function setBlendFunc(srcFactor, dstFactor, engineState) {
  DeviceManagerAPI$Wonderjs.unsafeGetGl(engineState).blendFunc(srcFactor, dstFactor);
  return engineState;
}

var unsafeGetGl = DeviceManagerAPI$Wonderjs.unsafeGetGl;

var setSide = DeviceManagerAPI$Wonderjs.setSide;

export {
  getViewport ,
  setViewport ,
  unsafeGetGl ,
  getGl ,
  setScissor ,
  setScissorTest ,
  setDepthTest ,
  setDepthWrite ,
  setSide ,
  setBlend ,
  setBlendFunc ,
  
}
/* DeviceManagerAPI-Wonderjs Not a pure module */
