'use strict';

import * as StateLogicService$WonderEditor        from "./StateLogicService.js";
import * as GameObjectEngineService$WonderEditor  from "../state/engine/GameObjectEngineService.js";
import * as CurrentGameObjectService$WonderEditor from "../primitive/CurrentGameObjectService.js";

function disposeCurrentGameObject(gameObject) {
  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
          return GameObjectEngineService$WonderEditor.disposeGameObject(gameObject, param);
        }));
  return StateLogicService$WonderEditor.getAndSetEditorState(CurrentGameObjectService$WonderEditor.clearCurrentGameObject);
}

export {
  disposeCurrentGameObject ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
