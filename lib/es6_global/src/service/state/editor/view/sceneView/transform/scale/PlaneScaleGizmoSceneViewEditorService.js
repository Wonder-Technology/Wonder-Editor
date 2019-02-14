

import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "./OperateScaleGizmoSceneViewEditorService.js";
import * as PlaneTransformGizmoSceneViewEditorService$WonderEditor from "../PlaneTransformGizmoSceneViewEditorService.js";

function buildXYPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartZAxisNormalizedVec(editorState), OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
}

function buildXZPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartYAxisNormalizedVec(editorState), OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
}

function buildYZPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartXAxisNormalizedVec(editorState), OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
}

export {
  buildXYPlane ,
  buildXZPlane ,
  buildYZPlane ,
  
}
/* OperateScaleGizmoSceneViewEditorService-WonderEditor Not a pure module */
