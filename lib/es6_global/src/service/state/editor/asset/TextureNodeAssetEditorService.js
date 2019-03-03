

import * as List from "../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as NodeAssetEditorService$WonderEditor from "./NodeAssetEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../record/editor/asset/TextureNodeAssetService.js";
import * as IterateTreeAssetEditorService$WonderEditor from "./IterateTreeAssetEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";

function setNodeData(nodeId, nodeData, editorState) {
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, TextureNodeAssetService$WonderEditor.buildNodeByNodeData, editorState);
}

function unsafeGetNodeData(nodeId, editorState) {
  return TextureNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var addTextureNodeToAssetTree = NodeAssetEditorService$WonderEditor.addNodeToAssetTree;

function doesAnyTextureUseImage(targetImageDataIndex, editorState) {
  return List.length(IterateTreeAssetService$WonderEditor.filter(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), /* [] */0, (function (node, acc) {
                    return /* :: */[
                            node,
                            acc
                          ];
                  }), (function (node) {
                    var match = TextureNodeAssetService$WonderEditor.getNodeData(node);
                    return match[/* imageDataIndex */1] === targetImageDataIndex;
                  }), undefined, undefined, undefined, /* () */0)) > 0;
}

function getDataByTextureComponent(targetTextureComponent, editorState) {
  return Js_option.map(TextureNodeAssetService$WonderEditor.getNodeData, IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), (function (node) {
                    var match = TextureNodeAssetService$WonderEditor.getNodeData(node);
                    return match[/* textureComponent */0] === targetTextureComponent;
                  }), undefined, undefined, undefined, /* () */0));
}

function findAllTextureNodes(editorState) {
  return IterateTreeAssetEditorService$WonderEditor.filter(editorState, /* array */[], ArrayService$WonderEditor.push, (function (node) {
                return true;
              }), undefined, undefined, undefined, /* () */0);
}

function getTextureComponents(editorState) {
  return findAllTextureNodes(editorState).map((function (node) {
                return TextureNodeAssetService$WonderEditor.getNodeData(node)[/* textureComponent */0];
              }));
}

export {
  setNodeData ,
  unsafeGetNodeData ,
  addTextureNodeToAssetTree ,
  doesAnyTextureUseImage ,
  getDataByTextureComponent ,
  findAllTextureNodes ,
  getTextureComponents ,
  
}
/* ArrayService-WonderEditor Not a pure module */
