'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var BasicCameraViewAPI$Wonderjs = require("wonder.js/lib/js/src/api/camera/BasicCameraViewAPI.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("wonder.js/lib/js/src/api/camera/PerspectiveCameraProjectionAPI.js");

function createBasicCameraViewPerspectiveCamera(state) {
  var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
  var perspectiveCameraProjection = match[1];
  var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
  var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 1000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, match$1[0]))));
  return /* tuple */[
          state$1,
          match$1[1],
          perspectiveCameraProjection
        ];
}

function createCameraGameObject(state) {
  var match = createBasicCameraViewPerspectiveCamera(state);
  var perspectiveCameraProjection = match[2];
  var basicCameraView = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, match$1[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, state$1);
  var state$3 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, state$2);
  return /* tuple */[
          state$3,
          gameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$3),
          /* tuple */[
            basicCameraView,
            perspectiveCameraProjection
          ]
        ];
}

exports.createBasicCameraViewPerspectiveCamera = createBasicCameraViewPerspectiveCamera;
exports.createCameraGameObject = createCameraGameObject;
/* GameObjectAPI-Wonderjs Not a pure module */
