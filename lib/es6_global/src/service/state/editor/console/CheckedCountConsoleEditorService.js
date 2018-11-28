

import * as CheckedCountConsoleService$WonderEditor from "../../../record/editor/console/CheckedCountConsoleService.js";
import * as MessageArrayConsoleService$WonderEditor from "../../../record/editor/console/MessageArrayConsoleService.js";

function getConsoleCheckedCount(editorState) {
  return CheckedCountConsoleService$WonderEditor.getConsoleCheckedCount(editorState[/* consoleRecord */8]);
}

function setConsoleCheckedCount(consoleCheckedCount, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */CheckedCountConsoleService$WonderEditor.setConsoleCheckedCount(consoleCheckedCount, editorState[/* consoleRecord */8]),
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function clearConsoleCheckedCount(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */CheckedCountConsoleService$WonderEditor.clearConsoleCheckedCount(editorState[/* consoleRecord */8]),
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function unreadConsoleMessage(editorState) {
  return MessageArrayConsoleService$WonderEditor.getConsoleMessageArrayLen(editorState[/* consoleRecord */8]) - CheckedCountConsoleService$WonderEditor.getConsoleCheckedCount(editorState[/* consoleRecord */8]) | 0;
}

export {
  getConsoleCheckedCount ,
  setConsoleCheckedCount ,
  clearConsoleCheckedCount ,
  unreadConsoleMessage ,
  
}
/* MessageArrayConsoleService-WonderEditor Not a pure module */
