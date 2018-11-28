

import * as AssetTreeUtils$WonderEditor from "./AssetTreeUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../utils/FolderNodeUtils.js";

function addMaterialNodeToAssetTree(material, param, editorState) {
  var newNodeId = param[1];
  var targetTreeNodeId = param[0];
  return AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(targetTreeNodeId, newNodeId, /* Material */3, FolderNodeUtils$WonderEditor.addMaterialIntoNodeMap(newNodeId, targetTreeNodeId, material, editorState));
}

export {
  addMaterialNodeToAssetTree ,
  
}
/* AssetTreeUtils-WonderEditor Not a pure module */
