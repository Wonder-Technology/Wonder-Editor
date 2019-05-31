

import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as CurrentNodeIdAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeIdAssetService.js";
import * as RootTreeAssetEditorService$WonderEditor from "./RootTreeAssetEditorService.js";

function getCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.getCurrentNodeId(editorState[/* assetRecord */5]);
}

function unsafeGetCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.unsafeGetCurrentNodeId(editorState[/* assetRecord */5]);
}

function clearCurrentNodeId(editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.clearCurrentNodeId(editorState[/* assetRecord */5]),
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

function setCurrentNodeId(currentNodeId, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.setCurrentNodeId(currentNodeId, editorState[/* assetRecord */5]),
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

function couldRemoveCurrentNode(editorState) {
  var match = CurrentNodeIdAssetService$WonderEditor.getCurrentNodeId(editorState[/* assetRecord */5]);
  if (match !== undefined) {
    return !NodeAssetService$WonderEditor.isIdEqual(match, NodeAssetService$WonderEditor.getNodeId(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState)));
  } else {
    return false;
  }
}

export {
  getCurrentNodeId ,
  unsafeGetCurrentNodeId ,
  clearCurrentNodeId ,
  setCurrentNodeId ,
  couldRemoveCurrentNode ,
  
}
/* CurrentNodeIdAssetService-WonderEditor Not a pure module */
