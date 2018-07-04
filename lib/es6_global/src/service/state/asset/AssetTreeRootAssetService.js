

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";
import * as IndexAssetService$WonderEditor from "./IndexAssetService.js";

function getAssetTreeRoot(assetState) {
  return assetState[/* assetTreeRoot */0];
}

function unsafeGetAssetTreeRoot(assetState) {
  return OptionService$WonderEditor.unsafeGet(assetState[/* assetTreeRoot */0]);
}

function setAssetTreeRoot(assetTreeRoot, assetState) {
  return /* record */[
          /* assetTreeRoot : Some */[assetTreeRoot],
          /* index */assetState[/* index */1],
          /* currentNodeId */assetState[/* currentNodeId */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* nodeMap */assetState[/* nodeMap */4]
        ];
}

function getRootTreeNodeId(assetState) {
  var match = assetState[/* assetTreeRoot */0];
  if (match) {
    return match[0][/* id */0];
  } else {
    return IndexAssetService$WonderEditor.getIndex(assetState);
  }
}

export {
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  getRootTreeNodeId ,
  
}
/* OptionService-WonderEditor Not a pure module */
