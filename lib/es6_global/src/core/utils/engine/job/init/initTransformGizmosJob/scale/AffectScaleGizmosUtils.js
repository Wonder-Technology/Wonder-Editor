

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as CenterBoxUtils$WonderEditor from "./CenterBoxUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../service/primitive/Vector3Service.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as AxisScaleGizmoUtils$WonderEditor from "./AxisScaleGizmoUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as AxisScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/AxisScaleGizmoSceneViewEditorService.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as CenterBoxScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/CenterBoxScaleGizmoSceneViewEditorService.js";

function _scaleCurrentSceneTreeNode(newScale, editorState, engineState) {
  var engineState$1 = TransformEngineService$WonderEditor.setLocalScale(newScale, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function _getDirection(theAxisSegOfIntersectedPointWithAxisInLocalCoordinateSystem) {
  var match = theAxisSegOfIntersectedPointWithAxisInLocalCoordinateSystem > 0;
  if (match) {
    return 1;
  } else {
    return -1;
  }
}

function _getReplacedZeroFactor() {
  return 0.001;
}

function _isFactorNearlyZero(scaleFactor) {
  return Math.abs(scaleFactor) <= 0.001;
}

function _avoidZero(scaleFactor) {
  var match = Math.abs(scaleFactor) <= 0.001;
  if (match) {
    return 0.001;
  } else {
    return scaleFactor;
  }
}

function _computeCurrentSceneTreeNodeNewScaleForXAxis(ray, param) {
  var editorState = param[0];
  var match = AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis(ray, /* tuple */[
        editorState,
        param[1]
      ]);
  var intersectedPointWithAxisInLocalCoordinateSystemX = match[0];
  var match$1 = AxisScaleGizmoSceneViewEditorService$WonderEditor.unsafeDragStartPointInLocalCoordinateSystem(editorState);
  var direction = _getDirection(intersectedPointWithAxisInLocalCoordinateSystemX);
  var match$2 = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState);
  return /* tuple */[
          _avoidZero(match$2[0] * direction * Math.abs(intersectedPointWithAxisInLocalCoordinateSystemX / match$1[0])),
          match$2[1],
          match$2[2]
        ];
}

function _computeCurrentSceneTreeNodeNewScaleForYAxis(ray, param) {
  var editorState = param[0];
  var match = AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis(ray, /* tuple */[
        editorState,
        param[1]
      ]);
  var intersectedPointWithAxisInLocalCoordinateSystemY = match[1];
  var match$1 = AxisScaleGizmoSceneViewEditorService$WonderEditor.unsafeDragStartPointInLocalCoordinateSystem(editorState);
  var direction = _getDirection(intersectedPointWithAxisInLocalCoordinateSystemY);
  var match$2 = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState);
  return /* tuple */[
          match$2[0],
          _avoidZero(match$2[1] * direction * Math.abs(intersectedPointWithAxisInLocalCoordinateSystemY / match$1[1])),
          match$2[2]
        ];
}

function _computeCurrentSceneTreeNodeNewScaleForZAxis(ray, param) {
  var editorState = param[0];
  var match = AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis(ray, /* tuple */[
        editorState,
        param[1]
      ]);
  var intersectedPointWithAxisInLocalCoordinateSystemZ = match[2];
  var match$1 = AxisScaleGizmoSceneViewEditorService$WonderEditor.unsafeDragStartPointInLocalCoordinateSystem(editorState);
  var direction = _getDirection(intersectedPointWithAxisInLocalCoordinateSystemZ);
  var match$2 = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState);
  return /* tuple */[
          match$2[0],
          match$2[1],
          _avoidZero(match$2[2] * direction * Math.abs(intersectedPointWithAxisInLocalCoordinateSystemZ / match$1[2]))
        ];
}

function _affectAxisGizmo($$event, editorState, engineState) {
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  var match = SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected(editorState);
  if (match) {
    return _scaleCurrentSceneTreeNode(_computeCurrentSceneTreeNodeNewScaleForXAxis(ray, /* tuple */[
                    editorState,
                    engineState
                  ]), editorState, engineState);
  } else {
    var match$1 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleYAxisGizmoSelected(editorState);
    if (match$1) {
      return _scaleCurrentSceneTreeNode(_computeCurrentSceneTreeNodeNewScaleForYAxis(ray, /* tuple */[
                      editorState,
                      engineState
                    ]), editorState, engineState);
    } else {
      var match$2 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleZAxisGizmoSelected(editorState);
      if (match$2) {
        return _scaleCurrentSceneTreeNode(_computeCurrentSceneTreeNodeNewScaleForZAxis(ray, /* tuple */[
                        editorState,
                        engineState
                      ]), editorState, engineState);
      } else {
        return /* tuple */[
                editorState,
                engineState
              ];
      }
    }
  }
}

function _avoidVectorFactorZero(scale) {
  var z = scale[2];
  var y = scale[1];
  var x = scale[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scaleX,scaleY,scaleZ should be nearly zero together", "not"), (function () {
                        var match = Math.abs(x) <= 0.001 || Math.abs(y) <= 0.001 || Math.abs(z) <= 0.001;
                        if (match) {
                          Contract$WonderLog.assertTrue(Math.abs(x) <= 0.001);
                          Contract$WonderLog.assertTrue(Math.abs(y) <= 0.001);
                          return Contract$WonderLog.assertTrue(Math.abs(z) <= 0.001);
                        } else {
                          return Contract$WonderLog.assertPass(/* () */0);
                        }
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = Math.abs(x) <= 0.001 && Math.abs(y) <= 0.001 && Math.abs(z) <= 0.001;
  if (match) {
    return /* tuple */[
            0.001,
            0.001,
            0.001
          ];
  } else {
    return scale;
  }
}

function _computeCurrentSceneTreeNodeNewScaleForCenterBox($$event, param) {
  var editorState = param[0];
  var match = CenterBoxUtils$WonderEditor.getDragStartMouseLocationInViewForCenterBox($$event);
  var match$1 = CenterBoxScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartMouseLocation(editorState);
  var startLocalScale = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState);
  return _avoidVectorFactorZero(Vector3Service$WonderEditor.multiplyScalar(startLocalScale, 1 + (match[0] - match$1[0] | 0) / 40.0 + (match$1[1] - match[1] | 0) / 40.0));
}

function _affectCenterBoxGizmo($$event, affectAxisGizmoFunc, editorState, engineState) {
  var match = SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleCenterBoxGizmoSelected(editorState);
  if (match) {
    return _scaleCurrentSceneTreeNode(_computeCurrentSceneTreeNodeNewScaleForCenterBox($$event, /* tuple */[
                    editorState,
                    engineState
                  ]), editorState, engineState);
  } else {
    return Curry._3(affectAxisGizmoFunc, $$event, editorState, engineState);
  }
}

function affectScaleGizmo($$event, param) {
  return _affectCenterBoxGizmo($$event, _affectAxisGizmo, param[0], param[1]);
}

export {
  _scaleCurrentSceneTreeNode ,
  _getDirection ,
  _getReplacedZeroFactor ,
  _isFactorNearlyZero ,
  _avoidZero ,
  _computeCurrentSceneTreeNodeNewScaleForXAxis ,
  _computeCurrentSceneTreeNodeNewScaleForYAxis ,
  _computeCurrentSceneTreeNodeNewScaleForZAxis ,
  _affectAxisGizmo ,
  _avoidVectorFactorZero ,
  _computeCurrentSceneTreeNodeNewScaleForCenterBox ,
  _affectCenterBoxGizmo ,
  affectScaleGizmo ,
  
}
/* Log-WonderLog Not a pure module */
