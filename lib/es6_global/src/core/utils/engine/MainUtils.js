

import * as Most from "most";
import * as RestoreJob$WonderEditor from "../../job/loop/RestoreJob.js";
import * as InitEventJob$WonderEditor from "../../job/init/InitEventJob.js";
import * as InitEditorJob$WonderEditor from "../../job/init/InitEditorJob.js";
import * as InitHotKeysJob$WonderEditor from "../../job/init/InitHotKeysJob.js";
import * as InitPickingJob$WonderEditor from "../../job/init/InitPickingJob.js";
import * as UpdateCameraJob$WonderEditor from "../../job/loop/UpdateCameraJob.js";
import * as InitScriptAPIJob$WonderEditor from "../../job/init/InitScriptAPIJob.js";
import * as JobEngineService$WonderEditor from "../../../service/state/engine/job/JobEngineService.js";
import * as SetOutlineDataJob$WonderEditor from "../../job/loop/SetOutlineDataJob.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as ParseSettingService$WonderEditor from "../../../service/record/editor/setting/ParseSettingService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as InitInspectorEngineJob$WonderEditor from "../../job/init/InitInspectorEngineJob.js";
import * as InitTransformGizmosJob$WonderEditor from "../../job/init/InitTransformGizmosJob.js";
import * as ReallocateCPUMemoryJob$WonderEditor from "../../job/loop/ReallocateCPUMemoryJob.js";
import * as StateDataEngineService$WonderEditor from "../../../service/state/engine/StateDataEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as InitCameraControllerJob$WonderEditor from "../../job/init/InitCameraControllerJob.js";
import * as SetSettingEditorService$WonderEditor from "../../../service/state/editor/setting/SetSettingEditorService.js";
import * as InitEventForInspectorJob$WonderEditor from "../../job/init/InitEventForInspectorJob.js";
import * as PrepareRenderGameViewJob$WonderEditor from "../../job/loop/PrepareRenderGameViewJob.js";
import * as RenderTransformGizmosJob$WonderEditor from "../../job/loop/RenderTransformGizmosJob.js";
import * as UpdateTransformGizmosJob$WonderEditor from "../../job/loop/UpdateTransformGizmosJob.js";
import * as PrepareRenderSceneViewJob$WonderEditor from "../../job/loop/PrepareRenderSceneViewJob.js";
import * as LoaderManagerEngineService$WonderEditor from "../../../service/state/engine/LoaderManagerEngineService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as StateDataInspectorEngineService$WonderEditor from "../../../service/state/inspectorEngine/StateDataInspectorEngineService.js";

function _getLoadEngineData(param) {
  return AssetEngineService$WonderEditor.loadConfig(/* array */[
              "./config/engine/setting.json",
              "./config/engine/"
            ], StateDataEngineService$WonderEditor.getStateData(/* () */0));
}

function _getLoadInspectorEngineData(param) {
  return AssetEngineService$WonderEditor.loadConfig(/* array */[
              "./config/inspectorEngine/setting.json",
              "./config/inspectorEngine/"
            ], StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0));
}

function _registerJobForEngine(engineState) {
  return JobEngineService$WonderEditor.registerNoWorkerLoopJob("restore", RestoreJob$WonderEditor.restoreJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("set_outline_data", SetOutlineDataJob$WonderEditor.setOutlineDataJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_game_view", PrepareRenderGameViewJob$WonderEditor.prepareRenderGameViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_scene_view", PrepareRenderSceneViewJob$WonderEditor.prepareRenderSceneViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("render_transform_gizmos", RenderTransformGizmosJob$WonderEditor.renderJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("update_transform_gizmos", UpdateTransformGizmosJob$WonderEditor.updateTransformJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("update_camera", UpdateCameraJob$WonderEditor.updateJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("reallocate_cpu_memory", ReallocateCPUMemoryJob$WonderEditor.reallocateJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_script_api", InitScriptAPIJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_camera_controller", InitCameraControllerJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_transform_gizmos", InitTransformGizmosJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_picking", InitPickingJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_transform_gizmos", InitTransformGizmosJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_hotkeys", InitHotKeysJob$WonderEditor.initHotKeysForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_event_for_editor", InitEventJob$WonderEditor.initEventForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_editor", InitEditorJob$WonderEditor.initEditorJob, engineState))))))))))))))));
}

function _registerJobForInspectorEngine(engineState) {
  return JobEngineService$WonderEditor.registerNoWorkerLoopJob("reallocate_cpu_memory", ReallocateCPUMemoryJob$WonderEditor.reallocateJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_event_for_editor_inspector", InitEventForInspectorJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_inspector_engine", InitInspectorEngineJob$WonderEditor.initInspectorEngineJob, engineState)));
}

function _handleEngineState(engineState) {
  var engineState$1 = _registerJobForEngine(engineState);
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
  return StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName(SceneEngineService$WonderEditor.getDefaultName(/* () */0), scene, engineState$1)));
}

function _handleInspectorEngineState(inspectorEngineState) {
  var inspectorEngineState$1 = _registerJobForInspectorEngine(inspectorEngineState);
  return StateInspectorEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(inspectorEngineState$1));
}

function initEngine(param) {
  return Most.drain(Most.flatMap((function (param) {
                    return Most.tap((function (inspectorEngineState) {
                                  _handleInspectorEngineState(inspectorEngineState);
                                  return /* () */0;
                                }), _getLoadInspectorEngineData(/* () */0));
                  }), Most.tap((function (engineState) {
                        _handleEngineState(engineState);
                        return /* () */0;
                      }), Most.flatMap((function (engineState) {
                            return Most.fromPromise(fetch("./config/editor/setting.json").then((function (response) {
                                              return response.json().then((function (json) {
                                                            var __x = ParseSettingService$WonderEditor.convertToRecord(json);
                                                            StateEditorService$WonderEditor.setState(SetSettingEditorService$WonderEditor.setSetting(__x, StateEditorService$WonderEditor.getState(/* () */0)));
                                                            return Promise.resolve(engineState);
                                                          }));
                                            })));
                          }), Most.flatMap((function (engineState) {
                                return Most.fromPromise(LoaderManagerEngineService$WonderEditor.loadIMGUIAsset("./public/font/empty.fnt", "./public/font/empty.png", /* array */[
                                                /* tuple */[
                                                  "./public/img/camera.png",
                                                  "camera"
                                                ],
                                                /* tuple */[
                                                  "./public/img/sun.png",
                                                  "directionLight"
                                                ],
                                                /* tuple */[
                                                  "./public/img/point.png",
                                                  "pointLight"
                                                ]
                                              ], (function (param, param$1) {
                                                  return /* () */0;
                                                }), engineState));
                              }), _getLoadEngineData(/* () */0))))));
}

export {
  _getLoadEngineData ,
  _getLoadInspectorEngineData ,
  _registerJobForEngine ,
  _registerJobForInspectorEngine ,
  _handleEngineState ,
  _handleInspectorEngineState ,
  initEngine ,
  
}
/* most Not a pure module */
