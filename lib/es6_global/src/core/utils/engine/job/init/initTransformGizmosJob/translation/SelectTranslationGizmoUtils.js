

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../../console/LogUtils.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as MeshUtils$WonderEditor from "../../initPickingJob/MeshUtils.js";
import * as PointService$WonderEditor from "../../../../../../../service/primitive/PointService.js";
import * as AABBShapeUtils$WonderEditor from "../../initPickingJob/AABBShapeUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../service/primitive/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RayIntersectUtils$WonderEditor from "../../../rayCaster/RayIntersectUtils.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../service/state/engine/GeometryEngineService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as AxisTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/AxisTranslationGizmoSceneViewEditorService.js";
import * as FindPlaneForCheckIntersectTranslationUtils$WonderEditor from "./FindPlaneForCheckIntersectTranslationUtils.js";
import * as MoveTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/MoveTranslationGizmoSceneViewEditorService.js";
import * as PlaneTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/PlaneTranslationGizmoSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function isIntersectMesh(gameObject, ray, engineState) {
  return Js_option.isSome(MeshUtils$WonderEditor.checkIntersectMesh(ray, /* tuple */[
                  GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState),
                  TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState),
                  /* None */2
                ], engineState));
}

function isSelectTranslationAxisGizmo(translationAxisGizmo, ray, engineState, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (isSelect, gameObject) {
                if (isSelect) {
                  return isSelect;
                } else {
                  var aabb = AABBShapeUtils$WonderEditor.setFromPoints(GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState), engineState));
                  var halfExtendsLength = Vector3Service$WonderEditor.length(AABBShapeUtils$WonderEditor.getHalfExtends(aabb));
                  return RayIntersectUtils$WonderEditor.isIntersectOBB(AABBShapeUtils$WonderEditor.expandByScalar(0.3 * halfExtendsLength, aabb), TransformEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState), ray);
                }
              }), false, HierarchyGameObjectEngineService$WonderEditor.getAllChildren(translationAxisGizmo, engineState));
}

function _isSelectTranslationPlaneGizmo(translationPlaneGizmo, ray, engineState, editorState) {
  return isIntersectMesh(translationPlaneGizmo, ray, engineState);
}

function _unsafeGetIntersectPointWithPlane(plane, ray, param) {
  var match = RayIntersectUtils$WonderEditor.checkIntersectPlane(plane, ray);
  if (match !== undefined) {
    return match;
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should intersect with plane", "", "", ""));
  }
}

function _getMoveStartDataForAxis(ray, axisVec, findMostOrthogonalPlaneForAxisFunc, param) {
  var engineState = param[1];
  var editorState = param[0];
  var plane = Curry._2(findMostOrthogonalPlaneForAxisFunc, ray, /* tuple */[
        editorState,
        engineState
      ]);
  var point = _unsafeGetIntersectPointWithPlane(plane, ray, /* tuple */[
        editorState,
        engineState
      ]);
  var axisGameObjectStartPoint = AxisTranslationGizmoSceneViewEditorService$WonderEditor.getAxisGizmoPos(editorState, engineState);
  return /* tuple */[
          axisGameObjectStartPoint,
          PointService$WonderEditor.projectPointToLine(point, axisGameObjectStartPoint, axisVec)
        ];
}

function _getMoveStartDataForXAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _getMoveStartDataForAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForXAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _getMoveStartDataForYAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _getMoveStartDataForAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForYAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _getMoveStartDataForZAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _getMoveStartDataForAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForZAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _getMoveStartDataForXYPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _unsafeGetIntersectPointWithPlane(PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState), ray, /* tuple */[
              editorState,
              engineState
            ]);
}

function _getMoveStartDataForXZPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _unsafeGetIntersectPointWithPlane(PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState), ray, /* tuple */[
              editorState,
              engineState
            ]);
}

function _getMoveStartDataForYZPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _unsafeGetIntersectPointWithPlane(PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState), ray, /* tuple */[
              editorState,
              engineState
            ]);
}

function _selectAxisGizmo(ray, param, param$1) {
  var editorState = Curry._1(param[1], param$1[0]);
  var engineState = Curry._2(param[0], editorState, param$1[1]);
  var match = Curry._2(param[2], ray, /* tuple */[
        editorState,
        engineState
      ]);
  return MoveTranslationGizmoSceneViewEditorService$WonderEditor.setAxisGizmoStartPoint(match[0], MoveTranslationGizmoSceneViewEditorService$WonderEditor.setDragStartPoint(match[1], editorState));
}

function _selectPlaneGizmo(ray, param, param$1) {
  var editorState = Curry._1(param[1], param$1[0]);
  var engineState = Curry._2(param[0], editorState, param$1[1]);
  var dragStartPoint = Curry._2(param[2], ray, /* tuple */[
        editorState,
        engineState
      ]);
  return MoveTranslationGizmoSceneViewEditorService$WonderEditor.setDragStartPoint(dragStartPoint, editorState);
}

function _handleSelectAxisGizmo(ray, editorState, engineState) {
  var match = isSelectTranslationAxisGizmo(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), ray, engineState, editorState);
  if (match) {
    var partial_arg = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), engineState), engineState);
    return _selectAxisGizmo(ray, /* tuple */[
                (function (param, param$1) {
                    return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg, param, param$1);
                  }),
                SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationXAxisGizmo,
                _getMoveStartDataForXAxis
              ], /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = isSelectTranslationAxisGizmo(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), ray, engineState, editorState);
    if (match$1) {
      var partial_arg$1 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), engineState), engineState);
      return _selectAxisGizmo(ray, /* tuple */[
                  (function (param, param$1) {
                      return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$1, param, param$1);
                    }),
                  SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationYAxisGizmo,
                  _getMoveStartDataForYAxis
                ], /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = isSelectTranslationAxisGizmo(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), ray, engineState, editorState);
      if (match$2) {
        var partial_arg$2 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), engineState), engineState);
        return _selectAxisGizmo(ray, /* tuple */[
                    (function (param, param$1) {
                        return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$2, param, param$1);
                      }),
                    SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationZAxisGizmo,
                    _getMoveStartDataForZAxis
                  ], /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return SelectTranslationGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyTranslationGizmo(editorState);
      }
    }
  }
}

function _handleSelectPlaneGizmo(ray, handleSelectAxisGizmoFunc, editorState, engineState) {
  var match = isIntersectMesh(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), ray, engineState);
  if (match) {
    var partial_arg = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), engineState), engineState);
    return _selectPlaneGizmo(ray, /* tuple */[
                (function (param, param$1) {
                    return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg, param, param$1);
                  }),
                SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationXYPlaneGizmo,
                _getMoveStartDataForXYPlane
              ], /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = isIntersectMesh(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), ray, engineState);
    if (match$1) {
      var partial_arg$1 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), engineState), engineState);
      return _selectPlaneGizmo(ray, /* tuple */[
                  (function (param, param$1) {
                      return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$1, param, param$1);
                    }),
                  SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationXZPlaneGizmo,
                  _getMoveStartDataForXZPlane
                ], /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = isIntersectMesh(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), ray, engineState);
      if (match$2) {
        var partial_arg$2 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), engineState), engineState);
        return _selectPlaneGizmo(ray, /* tuple */[
                    (function (param, param$1) {
                        return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$2, param, param$1);
                      }),
                    SelectTranslationGizmoSceneViewEditorService$WonderEditor.onlySelectTranslationYZPlaneGizmo,
                    _getMoveStartDataForYZPlane
                  ], /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return Curry._3(handleSelectAxisGizmoFunc, ray, editorState, engineState);
      }
    }
  }
}

function selectTranslationGizmo($$event, engineState, editorState) {
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  return _handleSelectPlaneGizmo(ray, _handleSelectAxisGizmo, editorState, engineState);
}

export {
  isIntersectMesh ,
  isSelectTranslationAxisGizmo ,
  _isSelectTranslationPlaneGizmo ,
  _unsafeGetIntersectPointWithPlane ,
  _getMoveStartDataForAxis ,
  _getMoveStartDataForXAxis ,
  _getMoveStartDataForYAxis ,
  _getMoveStartDataForZAxis ,
  _getMoveStartDataForXYPlane ,
  _getMoveStartDataForXZPlane ,
  _getMoveStartDataForYZPlane ,
  _selectAxisGizmo ,
  _selectPlaneGizmo ,
  _handleSelectAxisGizmo ,
  _handleSelectPlaneGizmo ,
  selectTranslationGizmo ,
  
}
/* Log-WonderLog Not a pure module */
