

import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "./scale/SelectScaleGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "./rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "./translation/SelectTranslationGizmoSceneViewEditorService.js";

function markNotSelectAnyTransformGizmo(editorState) {
  return SelectScaleGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyScaleGizmo(SelectRotationGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyRotationGizmo(SelectTranslationGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyTranslationGizmo(editorState)));
}

function isSelectAnyTransformGizmo(editorState) {
  if (SelectTranslationGizmoSceneViewEditorService$WonderEditor.isSelectAnyTranslationGizmo(editorState) || SelectRotationGizmoSceneViewEditorService$WonderEditor.isSelectAnyRotationGizmo(editorState)) {
    return true;
  } else {
    return SelectScaleGizmoSceneViewEditorService$WonderEditor.isSelectAnyScaleGizmo(editorState);
  }
}

export {
  markNotSelectAnyTransformGizmo ,
  isSelectAnyTransformGizmo ,
  
}
/* SelectScaleGizmoSceneViewEditorService-WonderEditor Not a pure module */
