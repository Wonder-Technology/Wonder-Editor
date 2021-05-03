

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as AssetWidgetService$WonderEditor from "../../../record/editor/widget/AssetWidgetService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../sceneTree/SceneTreeEditorService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "./CurrentNodeIdAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../CurrentSelectSourceEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "./SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

function enterFolder(nodeId, editorState) {
  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(AssetWidgetService$WonderEditor.getWidget(/* () */0), SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.setSelectedFolderNodeIdInAssetTree(nodeId, CurrentNodeIdAssetEditorService$WonderEditor.setCurrentNodeId(nodeId, editorState))));
}

var addFolderNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function findAllFolderNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, undefined, undefined, undefined, undefined, undefined, (function (node) {
                return true;
              }), /* () */0);
}

export {
  enterFolder ,
  addFolderNodeToAssetTree ,
  findAllFolderNodes ,
  
}
/* ArrayService-WonderEditor Not a pure module */
