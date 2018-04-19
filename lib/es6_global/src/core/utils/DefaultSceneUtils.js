'use strict';

import * as GameObjectUtils$WonderEditor                  from "./GameObjectUtils.js";
import * as HashMapService$WonderCommonlib                from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SceneEditorService$WonderEditor               from "../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor               from "../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor               from "../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor              from "../../service/state/engine/CameraEngineService.js";
import * as TransformEngineService$WonderEditor           from "../../service/state/engine/TransformEngineService.js";
import * as BasicMaterialEngineService$WonderEditor       from "../../service/state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../service/state/engine/GameObjectComponentEngineService.js";

function prepareSpecificGameObjectsForEditEngineState(scene, engineStateForEdit) {
  var match = CameraEngineService$WonderEditor.createCamera(engineStateForEdit);
  var camera = match[1];
  var engineState = match[0];
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState);
  return SceneEngineService$WonderEditor.setCurrentCameraGameObject(camera, GameObjectUtils$WonderEditor.addChild(scene, camera, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                      20,
                      0,
                      100
                    ], transform, engineState)));
}

function computeDiffValue(editorState, engineState) {
  var diffMap = HashMapService$WonderCommonlib.set("material", 0, HashMapService$WonderCommonlib.set("transform", 1, HashMapService$WonderCommonlib.set("gameObject", 1, HashMapService$WonderCommonlib.createEmpty(/* () */0))));
  StateEditorService$WonderEditor.setState(SceneEditorService$WonderEditor.setDiffMap(diffMap, editorState));
  return engineState;
}

function createDefaultSceneForEdit(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState, CameraEngineService$WonderEditor.createCameraBox);
  var camera = match[1];
  var engineState$1 = match[0];
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, camera, BasicMaterialEngineService$WonderEditor.setColor(/* float array */[
                          1,
                          0.1,
                          0.1
                        ], GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(camera, engineState$1), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                              0,
                              0,
                              40
                            ], GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1), engineState$1)))));
}

function createDefaultSceneForRun(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState, CameraEngineService$WonderEditor.createCamera);
  var camera = match[1];
  var engineState$1 = match[0];
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, camera, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                          0,
                          0,
                          40
                        ], transform, engineState$1))));
}

export {
  prepareSpecificGameObjectsForEditEngineState ,
  computeDiffValue                             ,
  createDefaultSceneForEdit                    ,
  createDefaultSceneForRun                     ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
