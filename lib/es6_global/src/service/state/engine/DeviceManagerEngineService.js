

import * as DeviceManagerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/DeviceManagerAPI.js";

function getViewport(engineState) {
  return engineState[/* deviceManagerRecord */9][/* viewport */7];
}

var setViewport = DeviceManagerAPI$Wonderjs.setViewport;

function getGl(engineState) {
  return engineState[/* deviceManagerRecord */9][/* gl */0];
}

var setScissor = DeviceManagerAPI$Wonderjs.setScissor;

var setScissorTest = DeviceManagerAPI$Wonderjs.setScissorTest;

var unsafeGetGl = DeviceManagerAPI$Wonderjs.unsafeGetGl;

export {
  getViewport ,
  setViewport ,
  unsafeGetGl ,
  getGl ,
  setScissor ,
  setScissorTest ,
  
}
/* DeviceManagerAPI-Wonderjs Not a pure module */
