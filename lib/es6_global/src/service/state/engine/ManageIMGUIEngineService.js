

import * as ManageIMGUIAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/imgui/ManageIMGUIAPI.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/imgui/ManageIMGUIMainService.js";
import * as DeviceManagerEngineService$WonderEditor from "./DeviceManagerEngineService.js";

function sendUniformProjectionMatData(canvasSize, state) {
  return ManageIMGUIAPI$Wonderjs.sendUniformProjectionMatData(DeviceManagerEngineService$WonderEditor.unsafeGetGl(state), canvasSize, state);
}

var getIMGUIFunc = ManageIMGUIMainService$Wonderjs.getIMGUIFunc;

var setIMGUIFunc = ManageIMGUIAPI$Wonderjs.setIMGUIFunc;

var getSetting = ManageIMGUIAPI$Wonderjs.getSetting;

var setSetting = ManageIMGUIAPI$Wonderjs.setSetting;

var getCustomData = ManageIMGUIMainService$Wonderjs.getCustomData;

export {
  getIMGUIFunc ,
  setIMGUIFunc ,
  getSetting ,
  setSetting ,
  sendUniformProjectionMatData ,
  getCustomData ,
  
}
/* ManageIMGUIAPI-Wonderjs Not a pure module */
