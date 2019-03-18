

import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function getSceneAllBasicCameraViews(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                })).map((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(gameObject, engineState);
              }));
}

function findGameObjectByName(name, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                var match = GameObjectEngineService$WonderEditor.getGameObjectName(gameObject, engineState);
                if (match !== undefined) {
                  return match === name;
                } else {
                  return false;
                }
              }));
}

export {
  getSceneAllBasicCameraViews ,
  findGameObjectByName ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
