

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../../console/LogUtils.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as RayIntersectUtils$WonderEditor from "../../../rayCaster/RayIntersectUtils.js";
import * as FindPlaneForCheckIntersectScaleUtils$WonderEditor from "./FindPlaneForCheckIntersectScaleUtils.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";

function _unsafeGetIntersectPointWithPlane(plane, ray, _) {
  var match = RayIntersectUtils$WonderEditor.checkIntersectPlane(plane, ray);
  if (match !== undefined) {
    return match;
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("should intersect with plane", "", "", ""));
  }
}

function _onlyRemainX(param) {
  return /* tuple */[
          param[0],
          0,
          0
        ];
}

function _onlyRemainY(param) {
  return /* tuple */[
          0,
          param[1],
          0
        ];
}

function _onlyRemainZ(param) {
  return /* tuple */[
          0,
          0,
          param[2]
        ];
}

function _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(ray, _, param, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var plane = Curry._2(param[0], ray, /* tuple */[
        editorState,
        engineState
      ]);
  var point = _unsafeGetIntersectPointWithPlane(plane, ray, /* tuple */[
        editorState,
        engineState
      ]);
  return Curry._1(param[1], Vector3Service$Wonderjs.transformMat4Tuple(point, OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(editorState)));
}

function getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis(ray, param) {
  var editorState = param[0];
  return _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(ray, OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartXAxisNormalizedVec(editorState), /* tuple */[
              FindPlaneForCheckIntersectScaleUtils$WonderEditor.findMostOrthogonalPlaneForXAxis,
              _onlyRemainX
            ], /* tuple */[
              editorState,
              param[1]
            ]);
}

function getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis(ray, param) {
  var editorState = param[0];
  return _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(ray, OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartYAxisNormalizedVec(editorState), /* tuple */[
              FindPlaneForCheckIntersectScaleUtils$WonderEditor.findMostOrthogonalPlaneForYAxis,
              _onlyRemainY
            ], /* tuple */[
              editorState,
              param[1]
            ]);
}

function getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis(ray, param) {
  var editorState = param[0];
  return _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(ray, OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartZAxisNormalizedVec(editorState), /* tuple */[
              FindPlaneForCheckIntersectScaleUtils$WonderEditor.findMostOrthogonalPlaneForZAxis,
              _onlyRemainZ
            ], /* tuple */[
              editorState,
              param[1]
            ]);
}

export {
  _unsafeGetIntersectPointWithPlane ,
  _onlyRemainX ,
  _onlyRemainY ,
  _onlyRemainZ ,
  _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis ,
  getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis ,
  getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis ,
  getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis ,
  
}
/* Log-WonderLog Not a pure module */
