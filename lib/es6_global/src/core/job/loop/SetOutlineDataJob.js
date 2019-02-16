

import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as JobDataEngineService$WonderEditor from "../../../service/state/engine/JobDataEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _getOutlineColor() {
  return /* array */[
          1,
          1,
          0
        ];
}

function setOutlineDataJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    return JobDataEngineService$WonderEditor.setGameObjectsNeedDrawOutline(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(match, engineState), JobDataEngineService$WonderEditor.setOutlineColor(/* array */[
                    1,
                    1,
                    0
                  ], engineState));
  } else {
    return JobDataEngineService$WonderEditor.setGameObjectsNeedDrawOutline(/* array */[], engineState);
  }
}

export {
  _getOutlineColor ,
  setOutlineDataJob ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
