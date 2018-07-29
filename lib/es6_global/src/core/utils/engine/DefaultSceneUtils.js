

import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../service/state/engine/CameraEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../service/state/engine/PrimitiveEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../service/state/engine/ArcballCameraEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../service/state/engine/LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function prepareSpecificGameObjectsForEditEngineState(editorState, engineStateForEdit) {
  var match = CameraEngineService$WonderEditor.createCamera(editorState, engineStateForEdit);
  var camera = match[2];
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0], match[1]);
  var box = match$1[2];
  var match$2 = ArcballCameraEngineService$WonderEditor.create(match$1[1]);
  var arcballController = match$2[1];
  var engineState = match$2[0];
  var engineState$1 = SceneEngineService$WonderEditor.setCurrentCameraGameObject(camera, SceneEngineService$WonderEditor.addSceneChild(box, SceneEngineService$WonderEditor.addSceneChild(camera, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(80, arcballController, LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(/* array */[
                        1,
                        0.1,
                        0.1
                      ], GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent(box, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                            20,
                            0,
                            100
                          ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState), engineState))))));
  var match$3 = GameObjectLogicService$WonderEditor.addArcballCameraControllerComponent(camera, arcballController, /* tuple */[
        match$1[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          box
        ];
}

function computeDiffValue(editorState, engineState) {
  var diffMap = HashMapService$WonderCommonlib.set("texture", 0, HashMapService$WonderCommonlib.set("arcballCameraController", 1, HashMapService$WonderCommonlib.set("directionLight", 0, HashMapService$WonderCommonlib.set("lightMaterial", 1, HashMapService$WonderCommonlib.set("basicMaterial", 0, HashMapService$WonderCommonlib.set("meshRenderer", 2, HashMapService$WonderCommonlib.set("transform", 2, HashMapService$WonderCommonlib.set("gameObject", 2, HashMapService$WonderCommonlib.createEmpty(/* () */0)))))))));
  return /* tuple */[
          SceneEditorService$WonderEditor.setDiffMap(diffMap, editorState),
          engineState
        ];
}

function createDefaultScene(editorState, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(editorState, engineState, CameraEngineService$WonderEditor.createCamera);
  var directionLight = match[5];
  var camera = match[2];
  var engineState$1 = match[1];
  return /* tuple */[
          match[0],
          SceneEngineService$WonderEditor.addSceneChild(directionLight, SceneEngineService$WonderEditor.addSceneChild(match[4], SceneEngineService$WonderEditor.addSceneChild(match[3], SceneEngineService$WonderEditor.addSceneChild(camera, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                10,
                                4,
                                10
                              ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(directionLight, engineState$1), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                    0,
                                    0,
                                    40
                                  ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1), engineState$1)))))),
          camera
        ];
}

export {
  prepareSpecificGameObjectsForEditEngineState ,
  computeDiffValue ,
  createDefaultScene ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
