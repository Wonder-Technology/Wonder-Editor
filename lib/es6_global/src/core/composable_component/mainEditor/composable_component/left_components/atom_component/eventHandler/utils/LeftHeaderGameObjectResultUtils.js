

import * as Result$WonderEditor from "../../../../../../../../module/Result.js";
import * as LogUtils$WonderEditor from "../../../../../../../utils/console/LogUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";

function getTargetGameObject() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    return Result$WonderEditor.Result[/* success */0](match);
  } else {
    return Result$WonderEditor.Result[/* fail */1](LogUtils$WonderEditor.buildErrorMessage("current gameObject should exist, but actual is None", "", "set current gameObject", ""));
  }
}

export {
  getTargetGameObject ,
  
}
/* LogUtils-WonderEditor Not a pure module */
