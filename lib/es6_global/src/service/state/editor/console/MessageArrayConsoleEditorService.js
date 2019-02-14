

import * as MessageArrayConsoleService$WonderEditor from "../../../record/editor/console/MessageArrayConsoleService.js";

function getConsoleMessageArray(editorState) {
  return MessageArrayConsoleService$WonderEditor.getConsoleMessageArray(editorState[/* consoleRecord */8]);
}

function setConsoleMessageArray(consoleMessageArray, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */MessageArrayConsoleService$WonderEditor.setConsoleMessageArray(consoleMessageArray, editorState[/* consoleRecord */8]),
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function clearConsoleMessageArray(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */MessageArrayConsoleService$WonderEditor.clearConsoleMessageArray(editorState[/* consoleRecord */8]),
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function addConsoleMessage(consoleMessage, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */MessageArrayConsoleService$WonderEditor.addConsoleMessage(consoleMessage, editorState[/* consoleRecord */8]),
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function getConsoleMessageArrayLen(editorState) {
  return MessageArrayConsoleService$WonderEditor.getConsoleMessageArrayLen(editorState[/* consoleRecord */8]);
}

export {
  getConsoleMessageArray ,
  setConsoleMessageArray ,
  clearConsoleMessageArray ,
  addConsoleMessage ,
  getConsoleMessageArrayLen ,
  
}
/* MessageArrayConsoleService-WonderEditor Not a pure module */
