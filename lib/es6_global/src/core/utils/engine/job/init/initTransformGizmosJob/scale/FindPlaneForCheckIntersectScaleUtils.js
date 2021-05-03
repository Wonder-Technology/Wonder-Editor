

import * as FindPlaneForCheckIntersectUtils$WonderEditor from "../FindPlaneForCheckIntersectUtils.js";
import * as PlaneScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/PlaneScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";

function findMostOrthogonalPlaneForXAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartYAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState)
            ], /* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartZAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState)
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function findMostOrthogonalPlaneForYAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartXAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState)
            ], /* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartZAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState)
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function findMostOrthogonalPlaneForZAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartXAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState)
            ], /* tuple */[
              OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartYAxisNormalizedVec(editorState),
              PlaneScaleGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState)
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

export {
  findMostOrthogonalPlaneForXAxis ,
  findMostOrthogonalPlaneForYAxis ,
  findMostOrthogonalPlaneForZAxis ,
  
}
/* FindPlaneForCheckIntersectUtils-WonderEditor Not a pure module */
