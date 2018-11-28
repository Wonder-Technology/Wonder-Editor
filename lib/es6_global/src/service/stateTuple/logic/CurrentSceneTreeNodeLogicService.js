

import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as CameraLogicService$WonderEditor from "./CameraLogicService.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor from "../../state/engine/camera/CameraEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";

function disposeCurrentSceneTreeNode(currentTreeNode) {
  var _iterateSceneGraphRemove = function (removedTreeNodeArr) {
    removedTreeNodeArr.forEach((function (param) {
            var uid = param[/* uid */1];
            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
            var match = CameraEngineService$WonderEditor.hasCameraGroup(uid, engineState);
            var match$1 = match ? CameraLogicService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(uid, editorState, engineState) : /* tuple */[
                editorState,
                engineState
              ];
            var engineState$1 = GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometry(uid, match$1[1]);
            StateEditorService$WonderEditor.setState(match$1[0]);
            StateEngineService$WonderEditor.setState(engineState$1);
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
