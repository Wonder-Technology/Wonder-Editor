

import * as CheckedCountConsoleService$WonderEditor from "../../../record/editor/console/CheckedCountConsoleService.js";
import * as MessageArrayConsoleService$WonderEditor from "../../../record/editor/console/MessageArrayConsoleService.js";

function getConsoleCheckedCount(editorState) {
  return CheckedCountConsoleService$WonderEditor.getConsoleCheckedCount(editorState[/* consoleRecord */11]);
}

function setConsoleCheckedCount(consoleCheckedCount, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */CheckedCountConsoleService$WonderEditor.setConsoleCheckedCount(consoleCheckedCount, editorState[/* consoleRecord */11]),
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function clearConsoleCheckedCount(editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */CheckedCountConsoleService$WonderEditor.clearConsoleCheckedCount(editorState[/* consoleRecord */11]),
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function unreadConsoleMessage(editorState) {
  return MessageArrayConsoleService$WonderEditor.getConsoleMessageArrayLen(editorState[/* consoleRecord */11]) - CheckedCountConsoleService$WonderEditor.getConsoleCheckedCount(editorState[/* consoleRecord */11]) | 0;
}

export {
  getConsoleCheckedCount ,
  setConsoleCheckedCount ,
  clearConsoleCheckedCount ,
  unreadConsoleMessage ,
  
}
/* MessageArrayConsoleService-WonderEditor Not a pure module */
