

import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* sceneRecord : record */[
            /* currentSceneTreeNode */undefined,
            /* diffMap */undefined,
            /* isRun */false
          ],
          /* assetRecord : record */[
            /* assetTreeRoot */undefined,
            /* index */0,
            /* removedAssetIdArray : array */[],
            /* currentNodeData */undefined,
            /* currentNodeParentId */undefined,
            /* textureNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* jsonNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* folderNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* wdbNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* imageBase64Map */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* geometryData : record */[
              /* defaultCubeGeometryIndex */-1,
              /* defaultSphereGeometryIndex */-1
            ]
          ],
          /* inspectorRecord : record */[/* componentTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* currentDragSource : tuple */[
            undefined,
            undefined
          ],
          /* currentSelectSource */undefined,
          /* loopId */-1
        ];
}

export {
  create ,
  
}
/* No side effect */
