

import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as SceneTreeInspector$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/ui/SceneTreeInspector.js";

function renameGameObject(name, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return SceneTreeInspector$WonderEditor.Method[/* reNameGameObjectBlurEvent */0](/* tuple */[
              store,
              dispatchFunc
            ], gameObject, name);
}

export {
  renameGameObject ,
  
}
/* TestTool-WonderEditor Not a pure module */
