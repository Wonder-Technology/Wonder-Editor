

import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";

function disposeCurrentSceneTreeNode(currentTreeNode) {
  var _iterateSceneGraphRemove = function (removedTreeNodeArr) {
    removedTreeNodeArr.forEach((function (param) {
            StateLogicService$WonderEditor.getAndSetEngineStateWithDiff(/* array */[/* record */[
                    /* arguments : array */[param[/* uid */1]],
                    /* type_ : GameObject */0
                  ]], GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometry);
            return _iterateSceneGraphRemove(param[/* children */2]);
          }));
    return /* () */0;
  };
  _iterateSceneGraphRemove(/* array */[currentTreeNode]);
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

export {
  disposeCurrentSceneTreeNode ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
