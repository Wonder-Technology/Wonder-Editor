

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as PointService$WonderEditor from "../../../../../../../service/primitive/PointService.js";
import * as RayIntersectUtils$WonderEditor from "../../../rayCaster/RayIntersectUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as AxisTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/AxisTranslationGizmoSceneViewEditorService.js";
import * as FindPlaneForCheckIntersectTranslationUtils$WonderEditor from "./FindPlaneForCheckIntersectTranslationUtils.js";
import * as MoveTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/MoveTranslationGizmoSceneViewEditorService.js";
import * as PlaneTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/PlaneTranslationGizmoSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function _getIntersectPointWithPlane(plane, ray, _) {
  return RayIntersectUtils$WonderEditor.checkIntersectPlane(plane, ray);
}

function _computeCurrentSceneTreeNodeNewPositionForMoveAxis(ray, axisVec, findMostOrthogonalPlaneForAxisFunc, param) {
  var engineState = param[1];
  var editorState = param[0];
  var plane = Curry._2(findMostOrthogonalPlaneForAxisFunc, ray, /* tuple */[
        editorState,
        engineState
      ]);
  var match = _getIntersectPointWithPlane(plane, ray, /* tuple */[
        editorState,
        engineState
      ]);
  if (match !== undefined) {
    var axisGameObjectStartPoint = MoveTranslationGizmoSceneViewEditorService$WonderEditor.unsafeAxisGizmoStartPoint(editorState);
    return Vector3Service$Wonderjs.add(/* Float */0, axisGameObjectStartPoint, Vector3Service$Wonderjs.sub(/* Float */0, PointService$WonderEditor.projectPointToLine(match, axisGameObjectStartPoint, axisVec), MoveTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartPoint(editorState)));
  }
  
}

function _computeCurrentSceneTreeNodeNewPositionForMoveXAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMoveAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForXAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _computeCurrentSceneTreeNodeNewPositionForMoveYAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMoveAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForYAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _computeCurrentSceneTreeNodeNewPositionForMoveZAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMoveAxis(ray, AxisTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), FindPlaneForCheckIntersectTranslationUtils$WonderEditor.findMostOrthogonalPlaneForZAxis, /* tuple */[
              editorState,
              engineState
            ]);
}

function _computeCurrentSceneTreeNodeNewPositionForMovePlane(ray, plane, param) {
  var editorState = param[0];
  var match = _getIntersectPointWithPlane(plane, ray, /* tuple */[
        editorState,
        param[1]
      ]);
  if (match !== undefined) {
    var currentSceneTreeNodeStartPoint = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartPoint(editorState);
    return Vector3Service$Wonderjs.add(/* Float */0, currentSceneTreeNodeStartPoint, Vector3Service$Wonderjs.sub(/* Float */0, match, MoveTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartPoint(editorState)));
  }
  
}

function _computeCurrentSceneTreeNodeNewPositionForMoveXYPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMovePlane(ray, PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState), /* tuple */[
              editorState,
              engineState
            ]);
}

function _computeCurrentSceneTreeNodeNewPositionForMoveXZPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMovePlane(ray, PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState), /* tuple */[
              editorState,
              engineState
            ]);
}

function _computeCurrentSceneTreeNodeNewPositionForMoveYZPlane(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return _computeCurrentSceneTreeNodeNewPositionForMovePlane(ray, PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState), /* tuple */[
              editorState,
              engineState
            ]);
}

function _moveCurrentSceneTreeNodeAndWholeTranslationGizmo(newPosition, editorState, engineState) {
  return TransformEngineService$WonderEditor.setPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState), newPosition, TransformEngineService$WonderEditor.setPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), newPosition, engineState));
}

function _affectTranslationGizmo(newPosition, param) {
  var engineState = param[1];
  var editorState = param[0];
  if (newPosition !== undefined) {
    var engineState$1 = _moveCurrentSceneTreeNodeAndWholeTranslationGizmo(newPosition, editorState, engineState);
    return /* tuple */[
            editorState,
            engineState$1
          ];
  } else {
    return /* tuple */[
            editorState,
            engineState
          ];
  }
}

function _affectTranslationAxisGizmo(newPosition, param) {
  return _affectTranslationGizmo(newPosition, /* tuple */[
              param[0],
              param[1]
            ]);
}

function _affectTranslationPlaneGizmo(newPosition, param) {
  return _affectTranslationGizmo(newPosition, /* tuple */[
              param[0],
              param[1]
            ]);
}

function _affectAxisGizmo(ray, editorState, engineState) {
  var match = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected(editorState);
  if (match) {
    return _affectTranslationAxisGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveXAxis(ray, /* tuple */[
                    editorState,
                    engineState
                  ]), /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationYAxisGizmoSelected(editorState);
    if (match$1) {
      return _affectTranslationAxisGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveYAxis(ray, /* tuple */[
                      editorState,
                      engineState
                    ]), /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationZAxisGizmoSelected(editorState);
      if (match$2) {
        return _affectTranslationAxisGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveZAxis(ray, /* tuple */[
                        editorState,
                        engineState
                      ]), /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return /* tuple */[
                editorState,
                engineState
              ];
      }
    }
  }
}

function _affectPlaneGizmo(ray, affectAxisGizmoFunc, editorState, engineState) {
  var match = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXYPlaneGizmoSelected(editorState);
  if (match) {
    return _affectTranslationPlaneGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveXYPlane(ray, /* tuple */[
                    editorState,
                    engineState
                  ]), /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXZPlaneGizmoSelected(editorState);
    if (match$1) {
      return _affectTranslationPlaneGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveXZPlane(ray, /* tuple */[
                      editorState,
                      engineState
                    ]), /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationYZPlaneGizmoSelected(editorState);
      if (match$2) {
        return _affectTranslationPlaneGizmo(_computeCurrentSceneTreeNodeNewPositionForMoveYZPlane(ray, /* tuple */[
                        editorState,
                        engineState
                      ]), /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return Curry._3(affectAxisGizmoFunc, ray, editorState, engineState);
      }
    }
  }
}

function affectTranslationGizmo($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  return _affectPlaneGizmo(ray, _affectAxisGizmo, editorState, engineState);
}

export {
  _getIntersectPointWithPlane ,
  _computeCurrentSceneTreeNodeNewPositionForMoveAxis ,
  _computeCurrentSceneTreeNodeNewPositionForMoveXAxis ,
  _computeCurrentSceneTreeNodeNewPositionForMoveYAxis ,
  _computeCurrentSceneTreeNodeNewPositionForMoveZAxis ,
  _computeCurrentSceneTreeNodeNewPositionForMovePlane ,
  _computeCurrentSceneTreeNodeNewPositionForMoveXYPlane ,
  _computeCurrentSceneTreeNodeNewPositionForMoveXZPlane ,
  _computeCurrentSceneTreeNodeNewPositionForMoveYZPlane ,
  _moveCurrentSceneTreeNodeAndWholeTranslationGizmo ,
  _affectTranslationGizmo ,
  _affectTranslationAxisGizmo ,
  _affectTranslationPlaneGizmo ,
  _affectAxisGizmo ,
  _affectPlaneGizmo ,
  affectTranslationGizmo ,
  
}
/* RayUtils-WonderEditor Not a pure module */
