

import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as CurrentNodeIdAssetService$WonderEditor from "../../../record/editor/asset/CurrentNodeIdAssetService.js";
import * as RootTreeAssetEditorService$WonderEditor from "./RootTreeAssetEditorService.js";

function getCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.getCurrentNodeId(editorState[/* assetRecord */2]);
}

function unsafeGetCurrentNodeId(editorState) {
  return CurrentNodeIdAssetService$WonderEditor.unsafeGetCurrentNodeId(editorState[/* assetRecord */2]);
}

function clearCurrentNodeId(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.clearCurrentNodeId(editorState[/* assetRecord */2]),
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
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function setCurrentNodeId(currentNodeId, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */CurrentNodeIdAssetService$WonderEditor.setCurrentNodeId(currentNodeId, editorState[/* assetRecord */2]),
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
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function couldRemoveCurrentNode(editorState) {
  var match = CurrentNodeIdAssetService$WonderEditor.getCurrentNodeId(editorState[/* assetRecord */2]);
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
