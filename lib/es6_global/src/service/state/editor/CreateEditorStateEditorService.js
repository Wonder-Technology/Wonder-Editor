

import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordSettingService$WonderEditor from "../../record/editor/setting/RecordSettingService.js";

function create() {
  return /* record */[
          /* settingRecord */RecordSettingService$WonderEditor.create(/* () */0),
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */undefined,
            /* isShowChildrenMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* assetRecord : record */[
            /* nodeIndex */0,
            /* imageDataMapIndex */0,
            /* tree */undefined,
            /* currentNodeId */undefined,
            /* selectedFolderNodeIdInAssetTree */undefined,
            /* imageDataMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
          /* pickingRecord : record */[/* sphereShapeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)],
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
