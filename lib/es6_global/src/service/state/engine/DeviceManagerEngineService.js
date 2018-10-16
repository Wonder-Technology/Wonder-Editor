

import * as DeviceManagerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/DeviceManagerAPI.js";

function getViewport(state) {
  return state[/* deviceManagerRecord */9][/* viewport */7];
}

var setViewport = DeviceManagerAPI$Wonderjs.setViewport;

var setScissor = DeviceManagerAPI$Wonderjs.setScissor;

var setScissorTest = DeviceManagerAPI$Wonderjs.setScissorTest;

var unsafeGetGl = DeviceManagerAPI$Wonderjs.unsafeGetGl;

export {
  getViewport ,
  setViewport ,
  unsafeGetGl ,
  setScissor ,
  setScissorTest ,
  
}
/* DeviceManagerAPI-Wonderjs Not a pure module */
