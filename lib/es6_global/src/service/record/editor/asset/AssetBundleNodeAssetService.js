

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";

function getNodeName(param) {
  return param[/* name */0];
}

function getTypeStr(param) {
  switch (param[/* type_ */1]) {
    case 0 : 
        return "RAB";
    case 1 : 
        return "SAB";
    case 2 : 
        return "WAB";
    
  }
}

function getNodeData(node) {
  if (node.tag === 5) {
    return node[1];
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should be assetBundle node", "", "", ""));
  }
}

function buildNodeData(name, assetBundle, type_) {
  return /* record */[
          /* name */name,
          /* type_ */type_,
          /* assetBundle */assetBundle
        ];
}

function buildNode(nodeId, name, assetBundle, type_) {
  return /* AssetBundleNode */Block.__(5, [
            nodeId,
            /* record */[
              /* name */name,
              /* type_ */type_,
              /* assetBundle */assetBundle
            ]
          ]);
}

function buildNodeByNodeData(nodeId, nodeData) {
  return /* AssetBundleNode */Block.__(5, [
            nodeId,
            nodeData
          ]);
}

function rename(name, nodeData) {
  return /* record */[
          /* name */name,
          /* type_ */nodeData[/* type_ */1],
          /* assetBundle */nodeData[/* assetBundle */2]
        ];
}

function isAssetBundleNode(node) {
  if (node.tag === 5) {
    return true;
  } else {
    return false;
  }
}

function getType(node) {
  return getNodeData(node)[/* type_ */1];
}

function getAssetBundle(node) {
  return getNodeData(node)[/* assetBundle */2];
}

export {
  getNodeName ,
  getTypeStr ,
  getNodeData ,
  buildNodeData ,
  buildNode ,
  buildNodeByNodeData ,
  rename ,
  isAssetBundleNode ,
  getType ,
  getAssetBundle ,
  
}
/* Log-WonderLog Not a pure module */
