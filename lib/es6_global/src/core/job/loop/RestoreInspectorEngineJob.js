

import * as DeviceManagerEngineService$WonderEditor from "../../../service/state/engine/DeviceManagerEngineService.js";

function restoreInspectorEngineJob(param, engineState) {
  return DeviceManagerEngineService$WonderEditor.setScissorTest(false, engineState);
}

export {
  restoreInspectorEngineJob ,
  
}
/* DeviceManagerEngineService-WonderEditor Not a pure module */
