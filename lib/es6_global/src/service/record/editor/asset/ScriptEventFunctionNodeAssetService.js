

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function buildNode(nodeId, name, eventFunctionData) {
  return /* ScriptEventFunctionNode */Block.__(0, [
            nodeId,
            /* record */[
              /* name */name,
              /* eventFunctionData */eventFunctionData
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* ScriptEventFunctionNode */Block.__(0, [
            nodeId,
            nodeData
          ]);
}

function buildNodeData(name, eventFunctionData) {
  return /* record */[
          /* name */name,
          /* eventFunctionData */eventFunctionData
        ];
}

function getNodeData(node) {
  if (node.tag) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be scriptEventFunction node", "", "", ""));
  } else {
    return node[1];
  }
}

function getNodeName(node) {
  return getNodeData(node)[/* name */0];
}

function getNodeNameByData(nodeData) {
  return nodeData[/* name */0];
}

function isScriptEventFunctionNode(node) {
  if (node.tag) {
    return false;
  } else {
    return true;
  }
}

function getEventFunctionData(node) {
  return getNodeData(node)[/* eventFunctionData */1];
}

export {
  buildNode ,
  buildNodeByNodeData ,
  buildNodeData ,
  getNodeData ,
  getNodeName ,
  getNodeNameByData ,
  isScriptEventFunctionNode ,
  getEventFunctionData ,
  
}
/* Log-WonderLog Not a pure module */
