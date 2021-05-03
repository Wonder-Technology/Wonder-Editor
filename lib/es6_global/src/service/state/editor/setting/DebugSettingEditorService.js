

import * as OperateSettingService$WonderEditor from "../../../record/editor/setting/OperateSettingService.js";

function isShowMessage(param) {
  return OperateSettingService$WonderEditor.isShowMessage(param[/* settingRecord */3]);
}

function isNotShowMessage(editorState) {
  return !isShowMessage(editorState);
}

function setIsShowMessage(isShowMessage, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */OperateSettingService$WonderEditor.setIsShowMessage(isShowMessage, editorState[/* settingRecord */3]),
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
  isShowMessage ,
  isNotShowMessage ,
  setIsShowMessage ,
  
}
/* OperateSettingService-WonderEditor Not a pure module */
