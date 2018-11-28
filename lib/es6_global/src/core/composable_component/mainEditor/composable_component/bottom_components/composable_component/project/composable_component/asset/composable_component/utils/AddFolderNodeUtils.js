

import * as AssetTreeUtils$WonderEditor from "./AssetTreeUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../utils/FolderNodeUtils.js";

function addFolderNodeToAssetTree(name, param, param$1) {
  var newNodeId = param[1];
  var targetTreeNodeId = param[0];
  return AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(targetTreeNodeId, newNodeId, /* Folder */0, FolderNodeUtils$WonderEditor.addFolderIntoNodeMap(newNodeId, targetTreeNodeId, name, /* tuple */[
                  param$1[0],
                  param$1[1]
                ]));
}

export {
  addFolderNodeToAssetTree ,
  
}
/* AssetTreeUtils-WonderEditor Not a pure module */
