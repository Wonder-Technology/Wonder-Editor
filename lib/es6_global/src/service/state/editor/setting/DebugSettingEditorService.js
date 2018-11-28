

import * as OperateSettingService$WonderEditor from "../../../record/editor/setting/OperateSettingService.js";

function isShowMessage(param) {
  return OperateSettingService$WonderEditor.isShowMessage(param[/* settingRecord */0]);
}

function isNotShowMessage(editorState) {
  return !isShowMessage(editorState);
}

function setIsShowMessage(isShowMessage, editorState) {
  return /* record */[
          /* settingRecord */OperateSettingService$WonderEditor.setIsShowMessage(isShowMessage, editorState[/* settingRecord */0]),
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
  isShowMessage ,
  isNotShowMessage ,
  setIsShowMessage ,
  
}
/* OperateSettingService-WonderEditor Not a pure module */
