

import * as RecordSettingService$WonderEditor from "../../record/editor/setting/RecordSettingService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* inspectorCanvasRecord : record */[
            /* containerGameObject */undefined,
            /* basicSourceTextureCacheMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* materialSphereGameObjectInInspectorCanvas */undefined
          ],
          /* imgCanvasRecord : record */[/* imgContext */undefined],
          /* uiRecord : record */[
            /* messageIndex */0,
            /* intervalId */0,
            /* isHasMessage */false,
            /* messageArray : array */[]
          ],
          /* settingRecord */RecordSettingService$WonderEditor.create(/* () */0),
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */undefined,
            /* isShowChildrenMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* assetRecord : record */[
            /* nodeIndex */0,
            /* imageDataMapIndex */0,
            /* tree */undefined,
            /* currentNodeId */undefined,
            /* selectedFolderNodeIdInAssetTree */undefined,
            /* imageDataMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
            /* editCamera */undefined,
            /* transformGizmoData */undefined
          ],
          /* gameViewRecord : record */[
            /* viewRect */undefined,
            /* activedBasicCameraView */undefined
          ],
          /* eventRecord : record */[
            /* eventTarget : Other */2,
            /* inspectorEventTarget : Other */1
          ],
          /* imguiRecord : record */[
            /* gameViewIMGUIFunc */undefined,
            /* gameViewCustomData */undefined
          ],
          /* inspectorRecord : record */[/* componentTypeMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* consoleRecord : record */[
            /* consoleMessageArray : array */[],
            /* consoleCheckedCount */0
          ],
          /* transformRecord : record */[
            /* localEulerAngleMapX */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* localEulerAngleMapY */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
            /* localEulerAngleMapZ */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* pickingRecord : record */[/* sphereShapeMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* currentDragSource : tuple */[
            undefined,
            undefined
          ],
          /* currentSelectSource */undefined,
          /* loopId */-1,
          /* languageType */undefined
        ];
}

export {
  create ,
  
}
/* No side effect */
