

import * as PlaneTransformGizmoSceneViewEditorService$WonderEditor from "../PlaneTransformGizmoSceneViewEditorService.js";
import * as AxisTranslationGizmoSceneViewEditorService$WonderEditor from "./AxisTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "./OperateTranslationGizmoSceneViewEditorService.js";

function buildXYPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(AxisTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState);
}

function buildXZPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(AxisTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState);
}

function buildYZPlane(editorState, engineState) {
  return PlaneTransformGizmoSceneViewEditorService$WonderEditor.buildPlane(AxisTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState);
}

export {
  buildXYPlane ,
  buildXZPlane ,
  buildYZPlane ,
  
}
/* PlaneTransformGizmoSceneViewEditorService-WonderEditor Not a pure module */
