

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function buildNode(nodeId, name, wdbGameObject, imageDataIndex) {
  return /* WDBNode */Block.__(4, [
            nodeId,
            /* record */[
              /* name */name,
              /* wdbGameObject */wdbGameObject,
              /* imageDataIndex */imageDataIndex
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* WDBNode */Block.__(4, [
            nodeId,
            nodeData
          ]);
}

function getNodeData(node) {
  if (node.tag === 4) {
    return node[1];
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be wdb node", "", "", ""));
  }
}

function isWDBNode(node) {
  if (node.tag === 4) {
    return true;
  } else {
    return false;
  }
}

function rename(name, nodeData) {
  return /* record */[
          /* name */name,
          /* wdbGameObject */nodeData[/* wdbGameObject */1],
          /* imageDataIndex */nodeData[/* imageDataIndex */2]
        ];
}

function getNodeName(param) {
  return param[/* name */0];
}

function getWDBGameObject(node) {
  return getNodeData(node)[/* wdbGameObject */1];
}

export {
  buildNode ,
  buildNodeByNodeData ,
  getNodeData ,
  isWDBNode ,
  rename ,
  getNodeName ,
  getWDBGameObject ,
  
}
/* Log-WonderLog Not a pure module */
