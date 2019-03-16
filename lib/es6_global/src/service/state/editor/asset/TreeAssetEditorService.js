

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as RootTreeAssetService$WonderEditor from "../../../record/editor/asset/RootTreeAssetService.js";
import * as IndexAssetEditorService$WonderEditor from "./IndexAssetEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "./SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

function getTree(param) {
  return param[/* assetRecord */2][/* tree */2];
}

function unsafeGetTree(editorState) {
  return OptionService$WonderEditor.unsafeGet(getTree(editorState));
}

function setTree(tree, editorState) {
  var assetRecord = editorState[/* assetRecord */2];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord : record */[
            /* nodeIndex */assetRecord[/* nodeIndex */0],
            /* imageDataMapIndex */assetRecord[/* imageDataMapIndex */1],
            /* tree */tree,
            /* currentNodeId */assetRecord[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */assetRecord[/* imageDataMap */5],
            /* geometryData */assetRecord[/* geometryData */6],
            /* materialData */assetRecord[/* materialData */7]
          ],
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

function clearTree(editorState) {
  var assetRecord = editorState[/* assetRecord */2];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord : record */[
            /* nodeIndex */assetRecord[/* nodeIndex */0],
            /* imageDataMapIndex */assetRecord[/* imageDataMapIndex */1],
            /* tree */undefined,
            /* currentNodeId */assetRecord[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */assetRecord[/* imageDataMap */5],
            /* geometryData */assetRecord[/* geometryData */6],
            /* materialData */assetRecord[/* materialData */7]
          ],
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

function createTree(editorState) {
  var match = RootTreeAssetService$WonderEditor.buildRootNode(RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0), IndexAssetEditorService$WonderEditor.getNodeIndex(editorState));
  return IndexAssetEditorService$WonderEditor.setNodeIndex(match[2], setTree(match[1], editorState));
}

function getSelectedFolderNodeIdInAssetTree(editorState) {
  var match = SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState);
  if (match !== undefined) {
    return match;
  } else {
    return NodeAssetService$WonderEditor.getNodeId(RootTreeAssetService$WonderEditor.getRootNode(OptionService$WonderEditor.unsafeGet(getTree(editorState))));
  }
}

export {
  getTree ,
  unsafeGetTree ,
  setTree ,
  clearTree ,
  createTree ,
  getSelectedFolderNodeIdInAssetTree ,
  
}
/* OptionService-WonderEditor Not a pure module */
