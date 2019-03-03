

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as AssetWidgetService$WonderEditor from "../../../record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../CurrentDragSourceEditorService.js";

function setNodeData(nodeId, nodeData, editorState) {
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, WDBNodeAssetService$WonderEditor.buildNodeByNodeData, editorState);
}

function unsafeGetNodeData(nodeId, editorState) {
  return WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var addWDBNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function findAllWDBNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, undefined, (function (node) {
                return true;
              }), undefined, /* () */0);
}

function isWDBAssetFile(param) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  var startNodeId = match[1];
  var widget = match[0];
  if (widget !== undefined && startNodeId !== undefined && widget === AssetWidgetService$WonderEditor.getWidget(/* () */0)) {
    return OptionService$WonderEditor.eitherWithNoData(WDBNodeAssetService$WonderEditor.isWDBNode, (function (param) {
                  return false;
                }), OperateTreeAssetEditorService$WonderEditor.findNodeById(startNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  } else {
    return false;
  }
}

export {
  setNodeData ,
  unsafeGetNodeData ,
  addWDBNodeToAssetTree ,
  findAllWDBNodes ,
  isWDBAssetFile ,
  
}
/* ArrayService-WonderEditor Not a pure module */
