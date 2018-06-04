

import * as GameObjectUtils$WonderEditor from "./GameObjectUtils.js";
import * as HashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SceneEditorService$WonderEditor from "../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../service/state/engine/CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "../../service/state/engine/PrimitiveEngineService.js";
import * as TransformEngineService$WonderEditor from "../../service/state/engine/TransformEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../service/state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../service/state/engine/GameObjectComponentEngineService.js";

function prepareSpecificGameObjectsForEditEngineState(scene, engineStateForEdit) {
  var match = CameraEngineService$WonderEditor.createCamera(engineStateForEdit);
  var camera = match[1];
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0]);
  var box = match$1[1];
  var engineState = match$1[0];
  var engineState$1 = SceneEngineService$WonderEditor.setCurrentCameraGameObject(camera, GameObjectUtils$WonderEditor.addChild(scene, box, GameObjectUtils$WonderEditor.addChild(scene, camera, BasicMaterialEngineService$WonderEditor.setColor(/* array */[
                    1,
                    0.1,
                    0.1
                  ], GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(box, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                        20,
                        0,
                        100
                      ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState), engineState)))));
  return /* tuple */[
          engineState$1,
          box
        ];
}

function computeDiffValue(editorState, engineState) {
  var diffMap = HashMapService$WonderCommonlib.set("material", 1, HashMapService$WonderCommonlib.set("transform", 2, HashMapService$WonderCommonlib.set("gameObject", 2, HashMapService$WonderCommonlib.createEmpty(/* () */0))));
  return /* tuple */[
          SceneEditorService$WonderEditor.setDiffMap(diffMap, editorState),
          engineState
        ];
}

function createDefaultScene(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState, CameraEngineService$WonderEditor.createCamera);
  var camera = match[1];
  var engineState$1 = match[0];
  return /* tuple */[
          GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, camera, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                            0,
                            0,
                            40
                          ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1), engineState$1)))),
          camera
        ];
}

export {
  prepareSpecificGameObjectsForEditEngineState ,
  computeDiffValue ,
  createDefaultScene ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
