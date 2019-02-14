

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function getNodeName(param, getTextureNameFunc) {
  return Curry._1(getTextureNameFunc, param[/* textureComponent */0]);
}

function buildNodeData(textureComponent, imageDataIndex) {
  return /* record */[
          /* textureComponent */textureComponent,
          /* imageDataIndex */imageDataIndex
        ];
}

function buildNode(nodeId, textureComponent, imageDataIndex) {
  return /* TextureNode */Block.__(0, [
            nodeId,
            /* record */[
              /* textureComponent */textureComponent,
              /* imageDataIndex */imageDataIndex
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* TextureNode */Block.__(0, [
            nodeId,
            nodeData
          ]);
}

function isTextureNode(node) {
  if (node.tag) {
    return false;
  } else {
    return true;
  }
}

function getNodeData(node) {
  if (node.tag) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be texture node", "", "", ""));
  } else {
    return node[1];
  }
}

function getTextureComponent(node) {
  return getNodeData(node)[/* textureComponent */0];
}

export {
  getNodeName ,
  buildNodeData ,
  buildNode ,
  buildNodeByNodeData ,
  isTextureNode ,
  getNodeData ,
  getTextureComponent ,
  
}
/* Log-WonderLog Not a pure module */
