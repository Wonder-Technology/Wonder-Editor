

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../stateTuple/logic/StateLogicService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as ScriptEventFunctionNodeNameAssetService$WonderEditor from "../../../record/editor/asset/ScriptEventFunctionNodeNameAssetService.js";

function setNodeData(nodeId, nodeData, editorState) {
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeByNodeData, editorState);
}

var addScriptEventFunctionNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function isTreeScriptEventFunctionNodesHasTargetName(name, editorState) {
  return ScriptEventFunctionNodeNameAssetService$WonderEditor.isTreeScriptEventFunctionNodesHasTargetName(name, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function findAllScriptEventFunctionNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, undefined, (function (node) {
                return true;
              }), undefined, undefined, undefined, undefined, /* () */0);
}

function getNameAndData(nodeId, editorState) {
  var match = ScriptEventFunctionNodeAssetService$WonderEditor.getNodeData(StateLogicService$WonderEditor.getEditorState((function (param) {
              return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, param);
            })));
  return /* tuple */[
          match[/* name */0],
          match[/* eventFunctionData */1]
        ];
}

export {
  setNodeData ,
  addScriptEventFunctionNodeToAssetTree ,
  isTreeScriptEventFunctionNodesHasTargetName ,
  findAllScriptEventFunctionNodes ,
  getNameAndData ,
  
}
/* ArrayService-WonderEditor Not a pure module */
