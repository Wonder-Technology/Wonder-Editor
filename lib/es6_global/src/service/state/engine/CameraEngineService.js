

import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "./PerspectiveCameraProjectionEngineService.js";

function createPerspectiveCamera(engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.create(engineState);
  var cameraProjection = match[1];
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(cameraProjection, 1, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(cameraProjection, 60, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(cameraProjection, 1000, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(cameraProjection, 0.1, match[0]))));
  return /* tuple */[
          engineState$1,
          cameraProjection
        ];
}

function createCamera(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var gameObject = match$1[1];
  var match$2 = BasicCameraViewEngineService$WonderEditor.create(match$1[0]);
  var match$3 = createPerspectiveCamera(match$2[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("camera", gameObject, match$3[0]);
  var match$4 = GameObjectLogicService$WonderEditor.addPerspectiveCameraProjectionComponent(gameObject, match$3[1], GameObjectLogicService$WonderEditor.addBasicCameraViewComponent(gameObject, match$2[1], /* tuple */[
            match[0],
            engineState$1
          ]));
  return /* tuple */[
          match$4[0],
          match$4[1],
          gameObject
        ];
}

var isCamera = GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent;

export {
  createPerspectiveCamera ,
  createCamera ,
  isCamera ,
  
}
/* GameObjectLogicService-WonderEditor Not a pure module */
