

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../record/editor/asset/MaterialNodeAssetService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";

function setNodeData(nodeId, nodeData, editorState) {
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, MaterialNodeAssetService$WonderEditor.buildNodeByNodeData, editorState);
}

function updateMaterialNodeData(nodeId, targetMaterial, targetMaterialType, editorState) {
  var node = OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState);
  var init = MaterialNodeAssetService$WonderEditor.getNodeData(node);
  return setNodeData(nodeId, /* record */[
              /* type_ */targetMaterialType,
              /* materialComponent */targetMaterial,
              /* imageDataIndex */init[/* imageDataIndex */2]
            ], editorState);
}

var addMaterialNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function findAllMaterialNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, (function (node) {
                return true;
              }), undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function getMaterialComponentsByType(materialType, editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, undefined, (function (node) {
                  var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                  return match[/* type_ */0] === materialType;
                }), undefined, undefined, undefined, undefined, undefined, /* () */0).map((function (node) {
                return MaterialNodeAssetService$WonderEditor.getNodeData(node)[/* materialComponent */1];
              }));
}

export {
  setNodeData ,
  updateMaterialNodeData ,
  addMaterialNodeToAssetTree ,
  findAllMaterialNodes ,
  getMaterialComponentsByType ,
  
}
/* ArrayService-WonderEditor Not a pure module */
