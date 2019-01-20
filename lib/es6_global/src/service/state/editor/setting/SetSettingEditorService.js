

import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../engine/StateEngineService.js";
import * as OperateSettingService$WonderEditor from "../../../record/editor/setting/OperateSettingService.js";

function setSetting(setting, editorState) {
  var isDebug = OperateSettingService$WonderEditor.unsafeGetIsDebug(setting);
  StateEditorService$WonderEditor.setStateIsDebug(isDebug);
  StateEngineService$WonderEditor.setIsDebug(isDebug);
  return /* record */[
          /* settingRecord */OperateSettingService$WonderEditor.setSetting(setting),
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

export {
  setSetting ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
