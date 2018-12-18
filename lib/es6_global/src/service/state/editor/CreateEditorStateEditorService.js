

import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordSettingService$WonderEditor from "../../record/editor/setting/RecordSettingService.js";

function create(param) {
  return /* record */[
          /* settingRecord */RecordSettingService$WonderEditor.create(/* () */0),
          /* sceneRecord : record */[/* currentSceneTreeNode */undefined],
          /* assetRecord : record */[
            /* assetTreeRoot */undefined,
            /* index */0,
            /* imageIndex */-1,
            /* removedAssetIdArray : array */[],
            /* currentNodeData */undefined,
            /* currentNodeParentId */undefined,
            /* textureNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* folderNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* wdbNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialNodeIdMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* imageNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* geometryData : record */[
              /* defaultCubeGeometryComponent */-1,
              /* defaultSphereGeometryComponent */-1
            ],
            /* materialData : record */[
              /* defaultBasicMaterialData */undefined,
              /* defaultLightMaterialData */undefined
            ]
          ],
          /* sceneViewRecord : record */[
            /* viewRect */undefined,
            /* gridPlane */undefined,
            /* editCamera */undefined
          ],
          /* gameViewRecord : record */[
            /* viewRect */undefined,
            /* activedBasicCameraView */undefined
          ],
          /* eventRecord : record */[/* eventTarget : Other */2],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */undefined,
            /* gameViewCustomData */undefined
          ],
          /* inspectorRecord : record */[/* componentTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* consoleRecord : record */[
            /* consoleMessageArray : array */[],
            /* consoleCheckedCount */0
          ],
          /* transformRecord : record */[
            /* localEulerAngleMapX */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* localEulerAngleMapY */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* localEulerAngleMapZ */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
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
