'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var PointLightAPI$Wonderjs = require("wonder.js/lib/js/src/api/light/PointLightAPI.js");

function createGameObject(engineState) {
  var match = PointLightAPI$Wonderjs.createPointLight(engineState);
  var light = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var engineState$1 = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, light, match$1[0]);
  return /* tuple */[
          engineState$1,
          gameObject,
          light
        ];
}

exports.createGameObject = createGameObject;
/* GameObjectAPI-Wonderjs Not a pure module */
