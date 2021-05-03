

import * as OptionService$WonderEditor from "../../../../../primitive/OptionService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../sceneTree/SceneTreeEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../engine/gameObject/GameObjectComponentEngineService.js";
import * as RecordTransformGizmoSceneViewEditorService$WonderEditor from "./RecordTransformGizmoSceneViewEditorService.js";

function _getData(sceneViewRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneViewRecord[/* transformGizmoData */3]);
}

function _isCurrentGizmoTranslation(editorState) {
  var match = RecordTransformGizmoSceneViewEditorService$WonderEditor.unsafeGetData(editorState)[/* currentGizmoType */0];
  return match === 0;
}

function isTransformGizmoRender(editorState, engineState) {
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    return !GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(match, engineState);
  } else {
    return false;
  }
}

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
