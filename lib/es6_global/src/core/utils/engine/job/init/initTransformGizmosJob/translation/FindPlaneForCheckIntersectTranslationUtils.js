

import * as FindPlaneForCheckIntersectUtils$WonderEditor from "../FindPlaneForCheckIntersectUtils.js";
import * as AxisTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/AxisTranslationGizmoSceneViewEditorService.js";
import * as PlaneTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/PlaneTranslationGizmoSceneViewEditorService.js";

function findMostOrthogonalPlaneForXAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState)
            ], /* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState)
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function findMostOrthogonalPlaneForYAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState)
            ], /* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXYPlane(editorState, engineState)
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function findMostOrthogonalPlaneForZAxis(ray, param) {
  var engineState = param[1];
  var editorState = param[0];
  return FindPlaneForCheckIntersectUtils$WonderEditor.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(/* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildYZPlane(editorState, engineState)
            ], /* tuple */[
              AxisTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState),
              PlaneTranslationGizmoSceneViewEditorService$WonderEditor.buildXZPlane(editorState, engineState)
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
