

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function getNodeName(param, getMaterialNameFunc) {
  return Curry._2(getMaterialNameFunc, param[/* materialComponent */1], param[/* type_ */0]);
}

function buildNodeData(type_, materialComponent, imageDataIndex) {
  return /* record */[
          /* type_ */type_,
          /* materialComponent */materialComponent,
          /* imageDataIndex */imageDataIndex
        ];
}

function buildNode(nodeId, type_, materialComponent, imageDataIndex) {
  return /* MaterialNode */Block.__(3, [
            nodeId,
            /* record */[
              /* type_ */type_,
              /* materialComponent */materialComponent,
              /* imageDataIndex */imageDataIndex
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* MaterialNode */Block.__(3, [
            nodeId,
            nodeData
          ]);
}

function isMaterialNode(node) {
  if (node.tag === 3) {
    return true;
  } else {
    return false;
  }
}

function getNodeData(node) {
  if (node.tag === 3) {
    return node[1];
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be material node", "", "", ""));
  }
}

function getMaterialComponent(node) {
  return getNodeData(node)[/* materialComponent */1];
}

function getMaterialType(node) {
  return getNodeData(node)[/* type_ */0];
}

function getImageDataIndex(node) {
  return getNodeData(node)[/* imageDataIndex */2];
}

export {
  getNodeName ,
  buildNodeData ,
  buildNode ,
  buildNodeByNodeData ,
  isMaterialNode ,
  getNodeData ,
  getMaterialComponent ,
  getMaterialType ,
  getImageDataIndex ,
  
}
/* Log-WonderLog Not a pure module */
