

import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../engine/state/StateEngineService.js";
import * as OperateSettingService$WonderEditor from "../../../record/editor/setting/OperateSettingService.js";

function setSetting(setting, editorState) {
  var isDebug = OperateSettingService$WonderEditor.unsafeGetIsDebug(setting);
  StateEditorService$WonderEditor.setStateIsDebug(isDebug);
  StateEngineService$WonderEditor.setIsDebug(isDebug);
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */setting,
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

export {
  setSetting ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
