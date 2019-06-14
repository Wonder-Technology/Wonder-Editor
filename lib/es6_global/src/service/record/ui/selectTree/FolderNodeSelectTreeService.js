

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function _fatalShouldBeFolderNode(param) {
  return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be folder node", "", "", ""));
}

function buildNodeByNodeData(nodeId, nodeData, children) {
  return /* FolderNode */Block.__(0, [
            nodeId,
            nodeData,
            children
          ]);
}

function buildNode(nodeId, name, isSelect, $staropt$star, param) {
  var children = $staropt$star !== undefined ? $staropt$star : /* array */[];
  return /* FolderNode */Block.__(0, [
            nodeId,
            /* record */[
              /* name */name,
              /* isSelect */isSelect
            ],
            children
          ]);
}

function isFolderNode(node) {
  if (node.tag) {
    return false;
  } else {
    return true;
  }
}

function getChildren(folderNode) {
  if (folderNode.tag) {
    return _fatalShouldBeFolderNode(/* () */0);
  } else {
    return folderNode[2];
  }
}

function setIsSelect(isSelect, nodeData) {
  return /* record */[
          /* name */nodeData[/* name */0],
          /* isSelect */isSelect
        ];
}

export {
  _fatalShouldBeFolderNode ,
  buildNodeByNodeData ,
  buildNode ,
  isFolderNode ,
  getChildren ,
  setIsSelect ,
  
}
/* Log-WonderLog Not a pure module */
