

import * as CoordinateUtils$WonderEditor from "../../../coordinate/CoordinateUtils.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";

function getCameraPos(editorState, engineState) {
  return TransformGameObjectEngineService$WonderEditor.getPosition(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState), engineState);
}

var getCameraPosInLocalCoordSystem = CoordinateUtils$WonderEditor.convertPosFromWorldToLocalCoordSystem;

export {
  getCameraPos ,
  getCameraPosInLocalCoordSystem ,
  
}
/* CoordinateUtils-WonderEditor Not a pure module */
