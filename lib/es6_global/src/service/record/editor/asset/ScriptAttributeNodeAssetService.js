

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function buildNode(nodeId, name, attribute) {
  return /* ScriptAttributeNode */Block.__(1, [
            nodeId,
            /* record */[
              /* name */name,
              /* attribute */attribute
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* ScriptAttributeNode */Block.__(1, [
            nodeId,
            nodeData
          ]);
}

function buildNodeData(name, attribute) {
  return /* record */[
          /* name */name,
          /* attribute */attribute
        ];
}

function getNodeData(node) {
  if (node.tag === 1) {
    return node[1];
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be scriptEventFunction node", "", "", ""));
  }
}

function getNodeName(node) {
  return getNodeData(node)[/* name */0];
}

function getNodeNameByData(nodeData) {
  return nodeData[/* name */0];
}

function getAttribute(node) {
  return getNodeData(node)[/* attribute */1];
}

function getAttributeByData(nodeData) {
  return nodeData[/* attribute */1];
}

function isScriptAttributeNode(node) {
  if (node.tag === 1) {
    return true;
  } else {
    return false;
  }
}

export {
  buildNode ,
  buildNodeByNodeData ,
  buildNodeData ,
  getNodeData ,
  getNodeName ,
  getNodeNameByData ,
  getAttribute ,
  getAttributeByData ,
  isScriptAttributeNode ,
  
}
/* Log-WonderLog Not a pure module */
