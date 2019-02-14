

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";

function isEqual(value1, value2) {
  return value1 === value2;
}

function isNodeEqual(param, sourceNode, targetNode) {
  var getNodeJudgeDataFunc = param[1];
  return Curry._2(param[0], Curry._1(getNodeJudgeDataFunc, sourceNode), Curry._1(getNodeJudgeDataFunc, targetNode));
}

function getNodeId(node) {
  return node[0];
}

function isNodeEqualById(sourceNode, targetNode) {
  return isNodeEqual(/* tuple */[
              isEqual,
              getNodeId
            ], sourceNode, targetNode);
}

function handleNode(node, textureNodeFunc, materialNodeFunc, wdbNodeFunc, folderNodeFunc) {
  switch (node.tag | 0) {
    case 0 : 
        return Curry._2(textureNodeFunc, node[0], node[1]);
    case 1 : 
        return Curry._2(materialNodeFunc, node[0], node[1]);
    case 2 : 
        return Curry._2(wdbNodeFunc, node[0], node[1]);
    case 3 : 
        return Curry._3(folderNodeFunc, node[0], node[1], node[2]);
    
  }
}

var isIdEqual = isEqual;

export {
  isEqual ,
  isIdEqual ,
  isNodeEqual ,
  getNodeId ,
  isNodeEqualById ,
  handleNode ,
  
}
/* No side effect */
