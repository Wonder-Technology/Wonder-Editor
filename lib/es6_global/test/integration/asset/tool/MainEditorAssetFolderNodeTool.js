

import * as FolderNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/FolderNodeAssetService.js";
import * as NodeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/NodeAssetEditorService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function getNoNameFolderName() {
  return "NoName Folder";
}

function _setNodeData(nodeId, nodeData, editorState) {
  var arg = FolderNodeAssetService$WonderEditor.getChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
  return NodeAssetEditorService$WonderEditor.setNodeData(nodeId, nodeData, (function (param) {
                return (function (param$1) {
                    var param$2 = param$1;
                    var param$3 = arg;
                    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                  });
              }), editorState);
}

function getFolderName(nodeId, editorState) {
  return NodeNameAssetLogicService$WonderEditor.getFolderNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

function setFolderName(nodeId, name, editorState) {
  return _setNodeData(nodeId, FolderNodeAssetService$WonderEditor.rename(name, FolderNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState))), editorState);
}

function getIsShowChildren(nodeId, editorState) {
  return FolderNodeAssetService$WonderEditor.getIsShowChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState));
}

var findChild = FolderNodeAssetService$WonderEditor.findChild;

export {
  getNoNameFolderName ,
  findChild ,
  _setNodeData ,
  getFolderName ,
  setFolderName ,
  getIsShowChildren ,
  
}
/* FolderNodeAssetService-WonderEditor Not a pure module */
