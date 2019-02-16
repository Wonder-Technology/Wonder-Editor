

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function getNodeName(param, getMaterialNameFunc) {
  return Curry._2(getMaterialNameFunc, param[/* materialComponent */1], param[/* type_ */0]);
}

function buildNodeData(type_, materialComponent) {
  return /* record */[
          /* type_ */type_,
          /* materialComponent */materialComponent
        ];
}

function buildNode(nodeId, type_, materialComponent) {
  return /* MaterialNode */Block.__(1, [
            nodeId,
            /* record */[
              /* type_ */type_,
              /* materialComponent */materialComponent
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* MaterialNode */Block.__(1, [
            nodeId,
            nodeData
          ]);
}

function isMaterialNode(node) {
  if (node.tag === 1) {
    return true;
  } else {
    return false;
  }
}

function getNodeData(node) {
  if (node.tag === 1) {
    return node[1];
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be material node", "", "", ""));
  }
}

export {
  getNodeName ,
  buildNodeData ,
  buildNode ,
  buildNodeByNodeData ,
  isMaterialNode ,
  getNodeData ,
  
}
/* Log-WonderLog Not a pure module */
