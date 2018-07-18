

import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/SceneEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";

function disposeCurrentSceneTreeNode(removedTreeNode) {
  var _iterateSceneGraphRemove = function (removedTreeNode) {
    removedTreeNode.forEach((function (param) {
            StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                    /* arguments : array */[param[/* uid */1]],
                    /* type_ : GameObject */0
                  ]], GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrder);
            return _iterateSceneGraphRemove(param[/* children */2]);
          }));
    return /* () */0;
  };
  _iterateSceneGraphRemove(/* array */[removedTreeNode]);
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

export {
  disposeCurrentSceneTreeNode ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
