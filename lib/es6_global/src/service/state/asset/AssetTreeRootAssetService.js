

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
          /* assetTreeRoot */assetTreeRoot,
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function getRootTreeNodeId(assetState) {
  var match = assetState[/* assetTreeRoot */0];
  if (match !== undefined) {
    return match[/* id */0];
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
