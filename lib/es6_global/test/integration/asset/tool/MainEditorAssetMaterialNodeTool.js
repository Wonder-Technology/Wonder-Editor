

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as NodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/IterateTreeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function getMaterialComponent(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* materialComponent */1];
}

function getMaterialName(nodeId, $staropt$star, $staropt$star$1, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
  return NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[/* materialComponent */1], match[/* type_ */0], engineState);
}

function getMaterialType(nodeId, $staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))[/* type_ */0];
}

function _findNodeByMaterialComponentAndType(material, materialType, editorState) {
  return IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (node) {
                var match = MaterialNodeAssetService$WonderEditor.getNodeData(node);
                if (match[/* materialComponent */1] === material) {
                  return materialType === match[/* type_ */0];
                } else {
                  return false;
                }
              }), undefined, undefined, /* () */0);
}

function hasMaterialComponent(material, materialType, editorState) {
  return Js_option.isSome(_findNodeByMaterialComponentAndType(material, materialType, editorState));
}

function findNodeIdByMaterialComponentAndType(material, materialType, editorState) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, _findNodeByMaterialComponentAndType(material, materialType, editorState));
}

export {
  getMaterialComponent ,
  getMaterialName ,
  getMaterialType ,
  _findNodeByMaterialComponentAndType ,
  hasMaterialComponent ,
  findNodeIdByMaterialComponentAndType ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
