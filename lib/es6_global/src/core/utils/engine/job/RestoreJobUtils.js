

import * as ViewEditorService$WonderEditor from "../../../../service/state/editor/view/ViewEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../service/state/engine/DeviceManagerEngineService.js";

function restoreJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var viewportData = ViewEditorService$WonderEditor.getSize(editorState);
  return DeviceManagerEngineService$WonderEditor.setScissorTest(false, DeviceManagerEngineService$WonderEditor.setViewport(viewportData, engineState));
}

export {
  restoreJob ,
  
}
/* ViewEditorService-WonderEditor Not a pure module */
