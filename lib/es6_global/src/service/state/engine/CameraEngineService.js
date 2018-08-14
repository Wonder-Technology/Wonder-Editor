

import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../editor/scene/SceneEditorService.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as CameraGroupEngineService$WonderEditor from "./CameraGroupEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "./ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "./PerspectiveCameraProjectionEngineService.js";

function createPerspectiveCamera(engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.create(engineState);
  var cameraProjection = match[1];
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(1, cameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(60, cameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(1000, cameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(0.1, cameraProjection, match[0]))));
  return /* tuple */[
          engineState$1,
          cameraProjection
        ];
}

function createCameraGroup(engineState) {
  return CameraGroupEngineService$WonderEditor.createCameraGroup(/* tuple */[
              BasicCameraViewEngineService$WonderEditor.create,
              createPerspectiveCamera
            ], engineState);
}

function createCameraForEditEngineState(engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForEditEngineState(engineState);
  var gameObject = match[1];
  var match$1 = createCameraGroup(match[0]);
  var engineState$1 = GameObjectLogicService$WonderEditor.addCameraGroupForEditEngineState(gameObject, match$1[1], GameObjectEngineService$WonderEditor.setGameObjectName("camera", gameObject, match$1[0]));
  return /* tuple */[
          engineState$1,
          gameObject
        ];
}

function createCameraForRunEngineState(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForRunEngineState(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var gameObject = match$1[1];
  var match$2 = createCameraGroup(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("camera", gameObject, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addCameraGroupForRunEngineState(gameObject, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          gameObject
        ];
}

function hasCameraGroup(gameObject, engineState) {
  return CameraGroupEngineService$WonderEditor.hasCameraGroupComponents(gameObject, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent,
              GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent
            ], engineState);
}

function getEditEngineStateEditCamera(editEngineState) {
  return ArrayService$WonderEditor.getFirst(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents(editEngineState).map((function (basicCameraView) {
                    return BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(basicCameraView, editEngineState);
                  })));
}

function _bindEventIfInRunMode(gameObject, lastBasicCameraView, runEngineState) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
  if (match) {
    return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponent(BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(lastBasicCameraView, runEngineState), ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponent(gameObject, runEngineState));
  } else {
    return runEngineState;
  }
}

function _setLastCameraToBeActiveAndBindEvent(gameObject, targetRemoveBasicCameraView, runEngineState) {
  var lastBasicCameraView = ArrayService$WonderEditor.getLast(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents(runEngineState).filter((function (component) {
              return component !== targetRemoveBasicCameraView;
            })));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(lastBasicCameraView, _bindEventIfInRunMode(gameObject, lastBasicCameraView, runEngineState));
}

function prepareForRemoveCameraGroup(gameObject, runEngineState) {
  var targetRemoveBasicCameraView = GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(gameObject, runEngineState);
  var match = BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(targetRemoveBasicCameraView, runEngineState);
  if (match) {
    return _setLastCameraToBeActiveAndBindEvent(gameObject, targetRemoveBasicCameraView, runEngineState);
  } else {
    return runEngineState;
  }
}

export {
  createPerspectiveCamera ,
  createCameraGroup ,
  createCameraForEditEngineState ,
  createCameraForRunEngineState ,
  hasCameraGroup ,
  getEditEngineStateEditCamera ,
  _bindEventIfInRunMode ,
  _setLastCameraToBeActiveAndBindEvent ,
  prepareForRemoveCameraGroup ,
  
}
/* ArrayService-WonderEditor Not a pure module */
