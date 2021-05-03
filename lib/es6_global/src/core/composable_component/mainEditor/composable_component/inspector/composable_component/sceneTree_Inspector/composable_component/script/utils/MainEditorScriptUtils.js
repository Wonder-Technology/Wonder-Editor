

import * as Caml_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";

function isNodeIdEqual(currentNodeIdOpt, targetNodeId) {
  if (currentNodeIdOpt !== undefined) {
    return NodeAssetService$WonderEditor.isIdEqual(Caml_option.valFromOption(currentNodeIdOpt), targetNodeId);
  } else {
    return false;
  }
}

export {
  isNodeIdEqual ,
  
}
/* No side effect */
