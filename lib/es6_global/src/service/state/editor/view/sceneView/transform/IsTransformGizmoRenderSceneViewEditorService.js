

import * as OptionService$WonderEditor from "../../../../../primitive/OptionService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../sceneTree/SceneTreeEditorService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "./RecordTransformGizmoSceneViewEditorService.js";

function _getData(sceneViewRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneViewRecord[/* transformGizmoData */3]);
}

function _isCurrentGizmoTranslation(editorState) {
  var match = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* currentGizmoType */0];
  return match === 0;
}

var isTransformGizmoRender = SceneTreeEditorService$WonderEditor.hasCurrentSceneTreeNode;

function isTranslationWholeGizmoRender(editorState) {
  if (SceneTreeEditorService$WonderEditor.hasCurrentSceneTreeNode(editorState)) {
    return _isCurrentGizmoTranslation(editorState);
  } else {
    return false;
  }
}

export {
  _getData ,
  _isCurrentGizmoTranslation ,
  isTransformGizmoRender ,
  isTranslationWholeGizmoRender ,
  
}
/* OptionService-WonderEditor Not a pure module */
