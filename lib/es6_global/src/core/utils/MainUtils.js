'use strict';

import * as Most                                          from "most";
import * as GameObjectUtils$WonderEditor                  from "./GameObjectUtils.js";
import * as HashMapService$WonderCommonlib                from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as StateLogicService$WonderEditor                from "../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEngineService$WonderEditor               from "../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor               from "../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor               from "../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor               from "../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor               from "../../service/state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor              from "../../service/state/engine/CameraEngineService.js";
import * as DirectorEngineService$WonderEditor            from "../../service/state/engine/DirectorEngineService.js";
import * as TransformEngineService$WonderEditor           from "../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor          from "../../service/state/engine/GameObjectEngineService.js";
import * as BasicMaterialEngineService$WonderEditor       from "../../service/state/engine/BasicMaterialEngineService.js";
import * as EngineStateDataEditorService$WonderEditor     from "../../service/state/editor/EngineStateDataEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../service/state/engine/GameObjectComponentEngineService.js";

function prepareSpecificGameObjectsForEditEngineState(scene, engineStateForEdit) {
  var match = CameraEngineService$WonderEditor.createCamera(engineStateForEdit);
  var camera = match[1];
  var engineState = match[0];
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState);
  return SceneEngineService$WonderEditor.setCurrentCameraGameObject(camera, GameObjectUtils$WonderEditor.addChild(scene, camera, TransformEngineService$WonderEditor.setLocalPosition(transform, /* tuple */[
                      20,
                      0,
                      100
                    ], engineState)));
}

function computeDiffUidAndIndex(editorState, engineState) {
  var diffMap = HashMapService$WonderCommonlib.set("material", 0, HashMapService$WonderCommonlib.set("transform", 1, HashMapService$WonderCommonlib.set("gameObject", 1, HashMapService$WonderCommonlib.createEmpty(/* () */0))));
  SceneEditorService$WonderEditor.setDiffMap(diffMap, editorState);
  return engineState;
}

function createDefaultSceneForEdit(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState, CameraEngineService$WonderEditor.createCameraBox);
  var camera = match[1];
  var engineState$1 = match[0];
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1);
  var material = GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(camera, engineState$1);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, camera, BasicMaterialEngineService$WonderEditor.setColor(material, /* float array */[
                          1,
                          0.1,
                          0.1
                        ], TransformEngineService$WonderEditor.setLocalPosition(transform, /* tuple */[
                              0,
                              0,
                              40
                            ], engineState$1)))));
}

function createDefaultSceneForRun(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState, CameraEngineService$WonderEditor.createCamera);
  var camera = match[1];
  var engineState$1 = match[0];
  var transform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(camera, engineState$1);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, camera, TransformEngineService$WonderEditor.setLocalPosition(transform, /* tuple */[
                          0,
                          0,
                          40
                        ], engineState$1))));
}

function init(editorState) {
  return Most.forEach((function () {
                  return /* () */0;
                }), Most.merge(AssetEngineService$WonderEditor.loadToData(/* array */[
                        "./src/service/state/data/engine/runSetting.json",
                        "./node_modules/wonder.js/data/"
                      ], EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)), AssetEngineService$WonderEditor.loadToData(/* array */[
                        "./src/service/state/data/engine/setting.json",
                        "./node_modules/wonder.js/data/"
                      ], EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0)))).then((function () {
                StateEngineService$WonderEditor.setIsDebug(/* true */1);
                var engineState = StateLogicService$WonderEditor.getEngineStateForEdit(/* () */0);
                var match = GameObjectEngineService$WonderEditor.create(engineState);
                var scene = match[1];
                StateLogicService$WonderEditor.setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultSceneForEdit(scene, computeDiffUidAndIndex(editorState, prepareSpecificGameObjectsForEditEngineState(scene, match[0]))))));
                var engineState$1 = StateLogicService$WonderEditor.getEngineStateForRun(/* () */0);
                var match$1 = GameObjectEngineService$WonderEditor.create(engineState$1);
                var scene$1 = match$1[1];
                StateLogicService$WonderEditor.setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultSceneForRun(scene$1, match$1[0]))));
                return Promise.resolve(SceneEditorService$WonderEditor.setScene(scene$1, editorState));
              }));
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
              }));
}

export {
  prepareSpecificGameObjectsForEditEngineState ,
  computeDiffUidAndIndex                       ,
  createDefaultSceneForEdit                    ,
  createDefaultSceneForRun                     ,
  init                                         ,
  start                                        ,
  
}
/* most Not a pure module */
