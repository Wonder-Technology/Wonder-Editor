

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";

function buildNodeByNodeData(nodeId, nodeData) {
  return /* ValueNode */Block.__(1, [
            nodeId,
            nodeData
          ]);
}

function buildNode(nodeId, name, isSelect, type_, value) {
  return /* ValueNode */Block.__(1, [
            nodeId,
            /* record */[
              /* isSelect */isSelect,
              /* name */name,
              /* type_ */type_,
              /* value */value
            ]
          ]);
}

function getIsSelect(nodeData) {
  return nodeData[/* isSelect */0];
}

function setIsSelect(isSelect, nodeData) {
  return /* record */[
          /* isSelect */isSelect,
          /* name */nodeData[/* name */1],
          /* type_ */nodeData[/* type_ */2],
          /* value */nodeData[/* value */3]
        ];
}

function getType(nodeData) {
  return nodeData[/* type_ */2];
}

function getValue(nodeData) {
  return nodeData[/* value */3];
}

export {
  buildNodeByNodeData ,
  buildNode ,
  getIsSelect ,
  setIsSelect ,
  getType ,
  getValue ,
  
}
/* No side effect */
