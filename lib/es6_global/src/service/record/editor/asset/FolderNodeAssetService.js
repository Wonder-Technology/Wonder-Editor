

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";
import * as NodeAssetService$WonderEditor from "./NodeAssetService.js";
import * as UIStateAssetService$WonderEditor from "./UIStateAssetService.js";

function getNewFolderName(param) {
  return "New Folder";
}

function buildNode(nodeId, name, $staropt$star, param) {
  var children = $staropt$star !== undefined ? $staropt$star : UIStateAssetService$WonderEditor.build(undefined, undefined, /* () */0);
  return /* FolderNode */Block.__(3, [
            nodeId,
            /* record */[/* name */name],
            children
          ]);
}

function buildNodeByNodeData(nodeId, nodeData, children) {
  return /* FolderNode */Block.__(3, [
            nodeId,
            nodeData,
            children
          ]);
}

function _fatalShouldBeFolderNode(param) {
  return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be folder node", "", "", ""));
}

function getNodeData(folderNode) {
  if (folderNode.tag === 3) {
    return folderNode[1];
  } else {
    return _fatalShouldBeFolderNode(/* () */0);
  }
}

function isFolderNode(node) {
  if (node.tag === 3) {
    return true;
  } else {
    return false;
  }
}

function getChildren(folderNode) {
  if (folderNode.tag === 3) {
    return folderNode[2];
  } else {
    return _fatalShouldBeFolderNode(/* () */0);
  }
}

function getChildrenNodes(folderNode) {
  return UIStateAssetService$WonderEditor.get(getChildren(folderNode));
}

function rename(name, nodeData) {
  return /* record */[/* name */name];
}

function getNodeName(param) {
  return param[/* name */0];
}

function getIsShowChildren(folderNode) {
  if (folderNode.tag === 3) {
    return UIStateAssetService$WonderEditor.getIsShowChildrenByState(folderNode[2]);
  } else {
    return _fatalShouldBeFolderNode(/* () */0);
  }
}

function clearChildren(folderNode) {
  if (folderNode.tag === 3) {
    return /* FolderNode */Block.__(3, [
              folderNode[0],
              folderNode[1],
              UIStateAssetService$WonderEditor.map((function (param) {
                      return /* array */[];
                    }), folderNode[2])
            ]);
  } else {
    return _fatalShouldBeFolderNode(/* () */0);
  }
}

function hasChildren(folderNode) {
  return UIStateAssetService$WonderEditor.hasChildren(getChildren(folderNode));
}

function filterChildrenById(targetNodeId, children) {
  return UIStateAssetService$WonderEditor.filter((function (prim, prim$1) {
                return prim$1.filter(Curry.__1(prim));
              }), (function (child) {
                return !NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(child), targetNodeId);
              }), children);
}

function findChild(folderNode, targetNode) {
  return UIStateAssetService$WonderEditor.find((function (prim, prim$1) {
                return Caml_option.undefined_to_opt(prim$1.find(Curry.__1(prim)));
              }), (function (childNode) {
                return NodeAssetService$WonderEditor.isNodeEqualById(childNode, targetNode);
              }), getChildren(folderNode));
}

export {
  getNewFolderName ,
  buildNode ,
  buildNodeByNodeData ,
  _fatalShouldBeFolderNode ,
  getNodeData ,
  isFolderNode ,
  getChildren ,
  getChildrenNodes ,
  rename ,
  getNodeName ,
  getIsShowChildren ,
  clearChildren ,
  hasChildren ,
  filterChildrenById ,
  findChild ,
  
}
/* Log-WonderLog Not a pure module */
