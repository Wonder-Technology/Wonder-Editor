

import * as GameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../../../service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function createBasicGameObject(geometry, engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var gameObject = match[1];
  var match$1 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        MeshRendererEngineService$WonderEditor.create,
        BasicMaterialEngineService$WonderEditor.create
      ], match[0]);
  var renderGroup = match$1[1];
  return /* tuple */[
          RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
                GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent,
                GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent
              ], GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, geometry, match$1[0])),
          gameObject,
          renderGroup[/* material */1],
          renderGroup[/* meshRenderer */0]
        ];
}

function setToEditorState(param, param$1, param$2, editorState) {
  var match = param$2[1];
  var match$1 = param$1[1];
  var match$2 = param[2];
  var match$3 = param[1];
  var init = editorState[/* sceneViewRecord */6];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */editorState[/* assetRecord */5],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType : Translation */0,
              /* coordinateSystem : World */0,
              /* translationGizmoData : record */[
                /* translationWholeGizmo */param[0],
                /* translationXAxisGizmo */match$3[0],
                /* translationYAxisGizmo */match$3[1],
                /* translationZAxisGizmo */match$3[2],
                /* translationXYPlaneGizmo */match$2[0],
                /* translationXZPlaneGizmo */match$2[1],
                /* translationYZPlaneGizmo */match$2[2],
                /* isTranslationXAxisGizmoSelected */false,
                /* isTranslationYAxisGizmoSelected */false,
                /* isTranslationZAxisGizmoSelected */false,
                /* isTranslationXYPlaneGizmoSelected */false,
                /* isTranslationXZPlaneGizmoSelected */false,
                /* isTranslationYZPlaneGizmoSelected */false,
                /* currentSceneTreeNodeStartPoint */undefined,
                /* axisGameObjectStartPoint */undefined,
                /* dragStartPoint */undefined,
                /* currentSceneTreeNodeStartLocalPosition */undefined
              ],
              /* rotationGizmoData : record */[
                /* rotationWholeGizmo */param$1[0],
                /* rotationXZCircle */match$1[1],
                /* rotationXYCircle */match$1[2],
                /* rotationYZCircle */match$1[0],
                /* isXZCircleGizmoSelected */false,
                /* isXYCircleGizmoSelected */false,
                /* isYZCircleGizmoSelected */false,
                /* dragStartPoint */undefined,
                /* lastTotalAngle */undefined,
                /* currentSceneTreeNodeStartLocalEulerAngles */undefined
              ],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */param$2[0],
                /* scaleXAxisGizmo */match[0],
                /* scaleYAxisGizmo */match[1],
                /* scaleZAxisGizmo */match[2],
                /* scaleCenterBoxGizmo */param$2[2],
                /* isScaleXAxisGizmoSelected */false,
                /* isScaleYAxisGizmoSelected */false,
                /* isScaleZAxisGizmoSelected */false,
                /* isScaleCenterBoxGizmoSelected */false,
                /* dragStartMouseLocation */undefined,
                /* dragStartPointInLocalCoordinateSystem */undefined,
                /* currentSceneTreeNodeStartLocalScale */undefined,
                /* dragStartXAxisNormalizedVec */undefined,
                /* dragStartYAxisNormalizedVec */undefined,
                /* dragStartZAxisNormalizedVec */undefined,
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */undefined
              ]
            ]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

export {
  createBasicGameObject ,
  setToEditorState ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
