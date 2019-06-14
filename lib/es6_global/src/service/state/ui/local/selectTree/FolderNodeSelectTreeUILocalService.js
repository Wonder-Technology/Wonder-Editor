

import * as FolderNodeSelectTreeService$WonderEditor from "../../../../record/ui/selectTree/FolderNodeSelectTreeService.js";
import * as OperateTreeSelectTreeService$WonderEditor from "../../../../record/ui/selectTree/OperateTreeSelectTreeService.js";

function setNodeData(nodeId, nodeData, children, tree) {
  return OperateTreeSelectTreeService$WonderEditor.updateNode(nodeId, nodeData, (function (param) {
                return (function (param$1) {
                    var param$2 = param$1;
                    var param$3 = children;
                    return FolderNodeSelectTreeService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                  });
              }), tree);
}

export {
  setNodeData ,
  
}
/* FolderNodeSelectTreeService-WonderEditor Not a pure module */
