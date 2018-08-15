

import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../service/state/engine/CameraEngineService.js";
import * as GeometryEngineService$WonderEditor from "../../../service/state/engine/GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function prepareSpecificGameObjectsForEditEngineState(engineStateForEdit) {
  var match = GeometryEngineService$WonderEditor.createGridPlaneGameObject(/* tuple */[
        300,
        10,
        0
      ], /* array */[
        0.6,
        0.6,
        0.6
      ], engineStateForEdit);
  var match$1 = CameraEngineService$WonderEditor.createCameraForEditEngineState(match[0]);
  var camera = match$1[1];
  var match$2 = ArcballCameraEngineService$WonderEditor.create(match$1[0]);
  var arcballCameraController = match$2[1];
  var engineState = match$2[0];
  var engineState$1 = GameObjectLogicService$WonderEditor.addArcballCameraControllerForEditEngineState(camera, arcballCameraController, SceneEngineService$WonderEditor.addSceneChild(camera, SceneEngineService$WonderEditor.addSceneChild(match[1], ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEvent(arcballCameraController, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, Math.PI / 5, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerWheelSpeed(arcballCameraController, 8, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(200, arcballCameraController, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                    20,
                                    0,
                                    100
                                  ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState), engineState))))))));
  return /* tuple */[
          engineState$1,
          camera
        ];
}

function computeDiffValue(editorState, engineState) {
  var diffMap = HashMapService$WonderCommonlib.set("texture", 0, HashMapService$WonderCommonlib.set("arcballCameraController", 1, HashMapService$WonderCommonlib.set("perspectiveCamera", 1, HashMapService$WonderCommonlib.set("basicCameraView", 1, HashMapService$WonderCommonlib.set("pointLight", 0, HashMapService$WonderCommonlib.set("directionLight", 0, HashMapService$WonderCommonlib.set("lightMaterial", 0, HashMapService$WonderCommonlib.set("basicMaterial", 1, HashMapService$WonderCommonlib.set("meshRenderer", 1, HashMapService$WonderCommonlib.set("transform", 2, HashMapService$WonderCommonlib.set("gameObject", 2, HashMapService$WonderCommonlib.createEmpty(/* () */0))))))))))));
  return /* tuple */[
          SceneEditorService$WonderEditor.setDiffMap(diffMap, editorState),
          engineState
        ];
}

function _prepareEngineState(param, engineState) {
  var directionLight = param[1];
  var camera = param[0];
  return SceneEngineService$WonderEditor.addSceneChild(directionLight, SceneEngineService$WonderEditor.addSceneChild(param[3], SceneEngineService$WonderEditor.addSceneChild(param[2], SceneEngineService$WonderEditor.addSceneChild(camera, TransformEngineService$WonderEditor.setTransformLocalEulerAngles(/* tuple */[
                              45,
                              0,
                              0
                            ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(directionLight, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                  30,
                                  4,
                                  10
                                ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(directionLight, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                      0,
                                      0,
                                      40
                                    ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState), BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(camera, engineState), engineState))))))));
}

function createDefaultSceneForEditEngineState(engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjectsForEditEngineState(engineState);
  return _prepareEngineState(/* tuple */[
              match[1],
              match[4],
              match[2],
              match[3]
            ], match[0]);
}

function createDefaultSceneForRunEngineState(editorState, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjectsForRunEngineState(editorState, engineState);
  return /* tuple */[
          match[0],
          _prepareEngineState(/* tuple */[
                match[2],
                match[5],
                match[3],
                match[4]
              ], match[1])
        ];
}

export {
  prepareSpecificGameObjectsForEditEngineState ,
  computeDiffValue ,
  _prepareEngineState ,
  createDefaultSceneForEditEngineState ,
  createDefaultSceneForRunEngineState ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
