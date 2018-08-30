

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DeviceManagerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/DeviceManagerAPI.js";
import * as DeviceManagerService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/device/DeviceManagerService.js";

function setViewport(viewportData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */10] = DeviceManagerService$Wonderjs.setViewportData(viewportData, DeviceManagerService$Wonderjs.setViewportOfGl(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */10]), viewportData, state[/* deviceManagerRecord */10]));
  return newrecord;
}

function getViewport(state) {
  return state[/* deviceManagerRecord */10][/* viewport */5];
}

var unsafeGetGl = DeviceManagerAPI$Wonderjs.unsafeGetGl;

export {
  setViewport ,
  getViewport ,
  unsafeGetGl ,
  
}
/* DeviceManagerAPI-Wonderjs Not a pure module */
