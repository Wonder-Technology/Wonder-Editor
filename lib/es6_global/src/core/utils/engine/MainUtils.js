

import * as Most from "most";
import * as RestoreJob$WonderEditor from "../../job/loop/RestoreJob.js";
import * as InitEventJob$WonderEditor from "../../job/init/InitEventJob.js";
import * as InitEditorJob$WonderEditor from "../../job/init/InitEditorJob.js";
import * as InitHotKeysJob$WonderEditor from "../../job/init/InitHotKeysJob.js";
import * as InitPickingJob$WonderEditor from "../../job/init/InitPickingJob.js";
import * as JobEngineService$WonderEditor from "../../../service/state/engine/job/JobEngineService.js";
import * as SetOutlineDataJob$WonderEditor from "../../job/loop/SetOutlineDataJob.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as ParseSettingService$WonderEditor from "../../../service/record/editor/setting/ParseSettingService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as InitTransformGizmosJob$WonderEditor from "../../job/init/InitTransformGizmosJob.js";
import * as ReallocateCPUMemoryJob$WonderEditor from "../../job/loop/ReallocateCPUMemoryJob.js";
import * as StateDataEngineService$WonderEditor from "../../../service/state/engine/StateDataEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as InitCameraControllerJob$WonderEditor from "../../job/init/InitCameraControllerJob.js";
import * as SetSettingEditorService$WonderEditor from "../../../service/state/editor/setting/SetSettingEditorService.js";
import * as PrepareRenderGameViewJob$WonderEditor from "../../job/loop/PrepareRenderGameViewJob.js";
import * as RenderTransformGizmosJob$WonderEditor from "../../job/loop/RenderTransformGizmosJob.js";
import * as UpdateTransformGizmosJob$WonderEditor from "../../job/loop/UpdateTransformGizmosJob.js";
import * as PrepareRenderSceneViewJob$WonderEditor from "../../job/loop/PrepareRenderSceneViewJob.js";
import * as LoaderManagerEngineService$WonderEditor from "../../../service/state/engine/LoaderManagerEngineService.js";

function _getLoadData() {
  return AssetEngineService$WonderEditor.loadConfig(/* array */[
              "./src/config/engine/setting.json",
              "./src/config/engine/"
            ], StateDataEngineService$WonderEditor.getEngineStateData(/* () */0));
}

function _registerJob(engineState) {
  return JobEngineService$WonderEditor.registerNoWorkerLoopJob("restore", RestoreJob$WonderEditor.restoreJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("set_outline_data", SetOutlineDataJob$WonderEditor.setOutlineDataJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_game_view", PrepareRenderGameViewJob$WonderEditor.prepareRenderGameViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_scene_view", PrepareRenderSceneViewJob$WonderEditor.prepareRenderSceneViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("render_transform_gizmos", RenderTransformGizmosJob$WonderEditor.renderJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("update_transform_gizmos", UpdateTransformGizmosJob$WonderEditor.updateTransformJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("reallocate_cpu_memory", ReallocateCPUMemoryJob$WonderEditor.reallocateJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_camera_controller", InitCameraControllerJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_transform_gizmos", InitTransformGizmosJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_picking", InitPickingJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_transform_gizmos", InitTransformGizmosJob$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_hotkeys", InitHotKeysJob$WonderEditor.initHotKeysForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_event_for_editor", InitEventJob$WonderEditor.initEventForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_editor", InitEditorJob$WonderEditor.initEditorJob, engineState))))))))))))));
}

function _handleEngineState(engineState) {
  var engineState$1 = _registerJob(engineState);
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
  return StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, engineState$1)));
}

var _hideLoading = function (loadingDomId){
                        document.querySelector("#" + loadingDomId).style.display = "none";
  };

function init() {
  return Most.drain(Most.map(_handleEngineState, Most.flatMap((function (engineState) {
                        return Most.fromPromise(fetch("./src/config/editor/setting.json").then((function (response) {
                                          return response.json().then((function (json) {
                                                        var __x = ParseSettingService$WonderEditor.convertToRecord(json);
                                                        StateEditorService$WonderEditor.setState(SetSettingEditorService$WonderEditor.setSetting(__x, StateEditorService$WonderEditor.getState(/* () */0)));
                                                        return Promise.resolve(engineState);
                                                      }));
                                        })));
                      }), Most.tap((function () {
                            _hideLoading("loading");
                            return /* () */0;
                          }), Most.flatMap((function (engineState) {
                                return Most.fromPromise(LoaderManagerEngineService$WonderEditor.loadIMGUIAsset("./public/font/Lato-Regular-64.fnt", "./public/font/lato.png", /* array */[
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
                                              ], (function (_, _$1) {
                                                  return /* () */0;
                                                }), engineState));
                              }), _getLoadData(/* () */0))))));
}

function start() {
  return init(/* () */0);
}

export {
  _getLoadData ,
  _registerJob ,
  _handleEngineState ,
  _hideLoading ,
  init ,
  start ,
  
}
/* most Not a pure module */
