

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../stateTuple/logic/StateLogicService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeNameAssetService$WonderEditor from "../../../record/editor/asset/ScriptAttributeNodeNameAssetService.js";

function setNodeData(nodeId, nodeData, editorState) {
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, ScriptAttributeNodeAssetService$WonderEditor.buildNodeByNodeData, editorState);
}

var addScriptAttributeNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function isTreeScriptAttributeNodesHasTargetName(name, editorState) {
  return ScriptAttributeNodeNameAssetService$WonderEditor.isTreeScriptAttributeNodesHasTargetName(name, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function getNameAndAttribute(nodeId, editorState) {
  var match = ScriptAttributeNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
              return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
            })));
  return /* tuple */[
          match[/* name */0],
          match[/* attribute */1]
        ];
}

function findAllScriptAttributeNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, undefined, undefined, (function (node) {
                return true;
              }), undefined, undefined, undefined, /* () */0);
}

export {
  setNodeData ,
  addScriptAttributeNodeToAssetTree ,
  isTreeScriptAttributeNodesHasTargetName ,
  getNameAndAttribute ,
  findAllScriptAttributeNodes ,
  
}
/* ArrayService-WonderEditor Not a pure module */
