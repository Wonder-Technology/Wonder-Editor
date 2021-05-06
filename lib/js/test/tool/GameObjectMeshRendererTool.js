'use strict';

var ArrayService$WonderEditor = require("../../src/service/atom/ArrayService.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

function getAllGameObjectMeshRendererComponent(gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, resultArr) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (resultArr, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
                  var resultArr$1 = match ? ArrayService$WonderEditor.push(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState), resultArr) : resultArr;
                  return _iterateGameObjectArr(HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState), resultArr$1);
                }), resultArr, gameObjectArr);
  };
  return _iterateGameObjectArr(/* array */[gameObject], /* array */[]);
}

exports.getAllGameObjectMeshRendererComponent = getAllGameObjectMeshRendererComponent;
/* ArrayService-WonderEditor Not a pure module */
