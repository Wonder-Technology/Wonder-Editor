

import * as NodeAssetService$WonderEditor from "./NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "./WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "./FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "./TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "./MaterialNodeAssetService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "./AssetBundleNodeAssetService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "./ScriptAttributeNodeAssetService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "./ScriptEventFunctionNodeAssetService.js";

function getNodeName(node, getTextureNameFunc, getMaterialNameFunc) {
  switch (node.tag | 0) {
    case 0 : 
        return ScriptEventFunctionNodeAssetService$WonderEditor.getNodeNameByData(node[1]);
    case 1 : 
        return ScriptAttributeNodeAssetService$WonderEditor.getNodeNameByData(node[1]);
    case 2 : 
        return TextureNodeAssetService$WonderEditor.getNodeName(node[1], getTextureNameFunc);
    case 3 : 
        return MaterialNodeAssetService$WonderEditor.getNodeName(node[1], getMaterialNameFunc);
    case 4 : 
        return WDBNodeAssetService$WonderEditor.getNodeName(node[1]);
    case 5 : 
        return AssetBundleNodeAssetService$WonderEditor.getNodeName(node[1]);
    case 6 : 
        return FolderNodeAssetService$WonderEditor.getNodeName(node[1]);
    
  }
}

function isNodeEqualByName(sourceNode, targetNode, getTextureNameFunc, getMaterialNameFunc) {
  return NodeAssetService$WonderEditor.isNodeEqual(/* tuple */[
              NodeAssetService$WonderEditor.isEqual,
              (function (param) {
                  return getNodeName(param, getTextureNameFunc, getMaterialNameFunc);
                })
            ], sourceNode, targetNode);
}

function isTargetNameNode(node, name, getTextureNameFunc, getMaterialNameFunc) {
  return getNodeName(node, getTextureNameFunc, getMaterialNameFunc) === name;
}

export {
  getNodeName ,
  isNodeEqualByName ,
  isTargetNameNode ,
  
}
/* WDBNodeAssetService-WonderEditor Not a pure module */
