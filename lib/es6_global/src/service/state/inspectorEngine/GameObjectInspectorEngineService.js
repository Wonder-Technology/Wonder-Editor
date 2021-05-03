

import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as SceneEngineService$WonderEditor from "../engine/SceneEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../engine/gameObject/HierarchyGameObjectEngineService.js";

function unsafeGetCamera(inspectorEngineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(inspectorEngineState), inspectorEngineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, inspectorEngineState);
                  })));
}

export {
  unsafeGetCamera ,
  
}
/* ArrayService-WonderEditor Not a pure module */
