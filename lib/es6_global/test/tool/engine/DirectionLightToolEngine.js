

import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/light/DirectionLightAPI.js";

function createGameObject(state) {
  var match = DirectionLightAPI$Wonderjs.createDirectionLight(state);
  var light = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          light
        ];
}

export {
  createGameObject ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
