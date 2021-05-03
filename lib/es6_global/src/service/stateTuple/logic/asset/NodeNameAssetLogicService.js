

import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as NodeNameAssetService$WonderEditor from "../../../record/editor/asset/NodeNameAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as OperateTextureLogicService$WonderEditor from "../OperateTextureLogicService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../record/editor/asset/AssetBundleNodeAssetService.js";
import * as OperateMaterialLogicService$WonderEditor from "../material/OperateMaterialLogicService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeNameAssetService$WonderEditor from "../../../record/editor/asset/ScriptAttributeNodeNameAssetService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../record/editor/asset/ScriptEventFunctionNodeAssetService.js";
import * as ScriptEventFunctionNodeNameAssetService$WonderEditor from "../../../record/editor/asset/ScriptEventFunctionNodeNameAssetService.js";

function getFolderNodeName(node) {
  return FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(node));
}

function getWDBNodeName(node) {
  return WDBNodeAssetService$WonderEditor.getNodeName(WDBNodeAssetService$WonderEditor.getNodeData(node));
}

var getTextureNodeName = OperateTextureLogicService$WonderEditor.getName;

var getMaterialNodeName = OperateMaterialLogicService$WonderEditor.getName;

function getNodeName(node, engineState) {
  return NodeNameAssetService$WonderEditor.getNodeName(node, (function (param) {
                return OperateTextureLogicService$WonderEditor.getName(param, engineState);
              }), (function (param) {
                return (function (param$1) {
                    return OperateMaterialLogicService$WonderEditor.getName(param, param$1, engineState);
                  });
              }));
}

function isNodeEqualByName(sourceNode, targetNode, engineState) {
  return NodeNameAssetService$WonderEditor.isNodeEqualByName(sourceNode, targetNode, (function (param) {
                return OperateTextureLogicService$WonderEditor.getName(param, engineState);
              }), (function (param) {
                return (function (param$1) {
                    return OperateMaterialLogicService$WonderEditor.getName(param, param$1, engineState);
                  });
              }));
}

function isTargetNameNode(node, name, engineState) {
  return NodeNameAssetService$WonderEditor.isTargetNameNode(node, name, (function (param) {
                return OperateTextureLogicService$WonderEditor.getName(param, engineState);
              }), (function (param) {
                return (function (param$1) {
                    return OperateMaterialLogicService$WonderEditor.getName(param, param$1, engineState);
                  });
              }));
}

function updateNodeName(node, name, engineState) {
  return NodeAssetService$WonderEditor.handleNode(node, (function (nodeId, param) {
                return /* tuple */[
                        OperateTextureLogicService$WonderEditor.setName(param[/* textureComponent */0], name, engineState),
                        node
                      ];
              }), (function (nodeId, param) {
                return /* tuple */[
                        OperateMaterialLogicService$WonderEditor.setName(param[/* materialComponent */1], param[/* type_ */0], name, engineState),
                        node
                      ];
              }), (function (nodeId, nodeData) {
                return /* tuple */[
                        engineState,
                        ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, ScriptEventFunctionNodeNameAssetService$WonderEditor.rename(nodeData[/* name */0], nodeData))
                      ];
              }), (function (nodeId, nodeData) {
                return /* tuple */[
                        engineState,
                        ScriptAttributeNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, ScriptAttributeNodeNameAssetService$WonderEditor.rename(nodeData[/* name */0], nodeData))
                      ];
              }), (function (nodeId, nodeData) {
                return /* tuple */[
                        engineState,
                        WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, WDBNodeAssetService$WonderEditor.rename(name, nodeData))
                      ];
              }), (function (nodeId, nodeData) {
                return /* tuple */[
                        engineState,
                        AssetBundleNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, AssetBundleNodeAssetService$WonderEditor.rename(name, nodeData))
                      ];
              }), (function (nodeId, nodeData, children) {
                return /* tuple */[
                        engineState,
                        FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, FolderNodeAssetService$WonderEditor.rename(name, nodeData), children)
                      ];
              }));
}

export {
  getFolderNodeName ,
  getWDBNodeName ,
  getTextureNodeName ,
  getMaterialNodeName ,
  getNodeName ,
  isNodeEqualByName ,
  isTargetNameNode ,
  updateNodeName ,
  
}
/* WDBNodeAssetService-WonderEditor Not a pure module */
