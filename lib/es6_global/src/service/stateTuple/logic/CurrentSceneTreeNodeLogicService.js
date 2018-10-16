

import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";

function disposeCurrentSceneTreeNode(currentTreeNode) {
  var _iterateSceneGraphRemove = function (removedTreeNodeArr) {
    removedTreeNodeArr.forEach((function (param) {
            var uid = param[/* uid */1];
            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                    return GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometry(uid, param);
                  }));
            return _iterateSceneGraphRemove(param[/* children */3]);
          }));
    return /* () */0;
  };
  _iterateSceneGraphRemove(/* array */[currentTreeNode]);
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

export {
  disposeCurrentSceneTreeNode ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
