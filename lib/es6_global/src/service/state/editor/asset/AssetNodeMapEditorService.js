'use strict';

import * as SparseMapService$WonderEditor    from "../../../atom/SparseMapService.js";
import * as NodeMapAssetService$WonderEditor from "../../../record/editor/asset/NodeMapAssetService.js";

function unsafeGetNodeMap(editorState) {
  return NodeMapAssetService$WonderEditor.unsafeGetNodeMap(editorState[/* assetRecord */0]);
}

function setResult(index, result, state) {
  var assetRecord = state[/* assetRecord */0];
  return /* record */[
          /* assetRecord : record */[
            /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
            /* index */assetRecord[/* index */1],
            /* currentNodeId */assetRecord[/* currentNodeId */2],
            /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
            /* nodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* nodeMap */4])
          ],
          /* sceneRecord */state[/* sceneRecord */1],
          /* currentDragSource */state[/* currentDragSource */2],
          /* currentSelectSource */state[/* currentSelectSource */3],
          /* loopId */state[/* loopId */4]
        ];
}

export {
  unsafeGetNodeMap ,
  setResult        ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
