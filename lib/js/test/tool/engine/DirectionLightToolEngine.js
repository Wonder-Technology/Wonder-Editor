'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var DirectionLightAPI$Wonderjs = require("wonder.js/lib/js/src/api/light/DirectionLightAPI.js");

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

exports.createGameObject = createGameObject;
/* GameObjectAPI-Wonderjs Not a pure module */
