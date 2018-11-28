

import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../engine/StateEngineService.js";
import * as OperateSettingService$WonderEditor from "../../../record/editor/setting/OperateSettingService.js";

function setSetting(setting, editorState) {
  var isDebug = OperateSettingService$WonderEditor.unsafeGetIsDebug(setting);
  StateEditorService$WonderEditor.setStateIsDebug(isDebug);
  StateEngineService$WonderEditor.setIsDebug(isDebug);
  return /* record */[
          /* settingRecord */OperateSettingService$WonderEditor.setSetting(setting),
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

export {
  setSetting ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
