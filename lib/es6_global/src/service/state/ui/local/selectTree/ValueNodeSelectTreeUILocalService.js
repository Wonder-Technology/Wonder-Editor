

import * as ValueNodeSelectTreeService$WonderEditor from "../../../../record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as OperateTreeSelectTreeService$WonderEditor from "../../../../record/ui/selectTree/OperateTreeSelectTreeService.js";

function setNodeData(nodeId, nodeData, tree) {
  return OperateTreeSelectTreeService$WonderEditor.updateNode(nodeId, nodeData, ValueNodeSelectTreeService$WonderEditor.buildNodeByNodeData, tree);
}

export {
  setNodeData ,
  
}
/* OperateTreeSelectTreeService-WonderEditor Not a pure module */
