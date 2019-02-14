

import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as ArrayService$WonderEditor from "../../../../../../atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../primitive/OptionService.js";
import * as Vector3Service$WonderEditor from "../../../../../../primitive/Vector3Service.js";
import * as TransformEngineService$WonderEditor from "../../../../../engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../engine/gameObject/HierarchyGameObjectEngineService.js";
import * as RecordScaleGizmoSceneViewEditorService$WonderEditor from "./RecordScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "./OperateScaleGizmoSceneViewEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "../RecordTransformGizmoSceneViewEditorService.js";

function getAxisGizmoPos(editorState, engineState) {
  return TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState), engineState);
}

function _getAxisNormalizedVec(scaleAxisGizmo, param) {
  var engineState = param[1];
  return Vector3Service$WonderEditor.truncate(3, Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(scaleAxisGizmo, engineState)), engineState), engineState), getAxisGizmoPos(param[0], engineState))));
}

function getXAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function getYAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function getZAxisNormalizedVec(editorState, engineState) {
  return _getAxisNormalizedVec(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), /* tuple */[
              editorState,
              engineState
            ]);
}

function unsafeDragStartPointInLocalCoordinateSystem(editorState) {
  return OptionService$WonderEditor.unsafeGet(RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* dragStartPointInLocalCoordinateSystem */10]);
}

function setDragStartPointInLocalCoordinateSystem(dragStartPointInLocalCoordinateSystem, editorState) {
  var init = editorState[/* sceneViewRecord */3];
  var init$1 = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  var init$2 = RecordScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord : record */[
            /* viewRect */init[/* viewRect */0],
            /* gridPlane */init[/* gridPlane */1],
            /* editCamera */init[/* editCamera */2],
            /* transformGizmoData *//* record */[
              /* currentGizmoType */init$1[/* currentGizmoType */0],
              /* coordinateSystem */init$1[/* coordinateSystem */1],
              /* translationGizmoData */init$1[/* translationGizmoData */2],
              /* rotationGizmoData */init$1[/* rotationGizmoData */3],
              /* scaleGizmoData : record */[
                /* scaleWholeGizmo */init$2[/* scaleWholeGizmo */0],
                /* scaleXAxisGizmo */init$2[/* scaleXAxisGizmo */1],
                /* scaleYAxisGizmo */init$2[/* scaleYAxisGizmo */2],
                /* scaleZAxisGizmo */init$2[/* scaleZAxisGizmo */3],
                /* scaleCenterBoxGizmo */init$2[/* scaleCenterBoxGizmo */4],
                /* isScaleXAxisGizmoSelected */init$2[/* isScaleXAxisGizmoSelected */5],
                /* isScaleYAxisGizmoSelected */init$2[/* isScaleYAxisGizmoSelected */6],
                /* isScaleZAxisGizmoSelected */init$2[/* isScaleZAxisGizmoSelected */7],
                /* isScaleCenterBoxGizmoSelected */init$2[/* isScaleCenterBoxGizmoSelected */8],
                /* dragStartMouseLocation */init$2[/* dragStartMouseLocation */9],
                /* dragStartPointInLocalCoordinateSystem */dragStartPointInLocalCoordinateSystem,
                /* currentSceneTreeNodeStartLocalScale */init$2[/* currentSceneTreeNodeStartLocalScale */11],
                /* dragStartXAxisNormalizedVec */init$2[/* dragStartXAxisNormalizedVec */12],
                /* dragStartYAxisNormalizedVec */init$2[/* dragStartYAxisNormalizedVec */13],
                /* dragStartZAxisNormalizedVec */init$2[/* dragStartZAxisNormalizedVec */14],
                /* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */init$2[/* dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray */15]
              ]
            ]
          ],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

export {
  getAxisGizmoPos ,
  _getAxisNormalizedVec ,
  getXAxisNormalizedVec ,
  getYAxisNormalizedVec ,
  getZAxisNormalizedVec ,
  unsafeDragStartPointInLocalCoordinateSystem ,
  setDragStartPointInLocalCoordinateSystem ,
  
}
/* ArrayService-WonderEditor Not a pure module */
