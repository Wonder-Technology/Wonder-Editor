

import * as Most from "most";
import * as RestoreJobUtils$WonderEditor from "./job/RestoreJobUtils.js";
import * as JobEngineService$WonderEditor from "../../../service/state/engine/JobEngineService.js";
import * as InitEventJobUtils$WonderEditor from "./job/InitEventJobUtils.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as InitEditorJobUtils$WonderEditor from "./job/InitEditorJobUtils.js";
import * as InitPickingJobUtil$WonderEditor from "./job/initPickingJob/InitPickingJobUtil.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as ParseSettingService$WonderEditor from "../../../service/record/editor/setting/ParseSettingService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as StateDataEngineService$WonderEditor from "../../../service/state/engine/StateDataEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";
import * as SetSettingEditorService$WonderEditor from "../../../service/state/editor/setting/SetSettingEditorService.js";
import * as PrepareRenderViewJobUtils$WonderEditor from "./job/PrepareRenderViewJobUtils.js";
import * as LoaderManagerEngineService$WonderEditor from "../../../service/state/engine/LoaderManagerEngineService.js";
import * as ReallocateCPUMemoryJobUtils$WonderEditor from "./job/ReallocateCPUMemoryJobUtils.js";

function _getLoadData() {
  return AssetEngineService$WonderEditor.loadConfig(/* array */[
              "./src/engine/config/setting.json",
              "./src/engine/config/"
            ], StateDataEngineService$WonderEditor.getEngineStateData(/* () */0));
}

function _handleEngineState(engineState) {
  var engineState$1 = JobEngineService$WonderEditor.registerNoWorkerLoopJob("restore", RestoreJobUtils$WonderEditor.restoreJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_game_view", PrepareRenderViewJobUtils$WonderEditor.prepareRenderGameViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_scene_view", PrepareRenderViewJobUtils$WonderEditor.prepareRenderSceneViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("reallocate_cpu_memory", ReallocateCPUMemoryJobUtils$WonderEditor.reallocateJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_picking", InitPickingJobUtil$WonderEditor.initJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_event_for_editor", InitEventJobUtils$WonderEditor.initEventForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_editor", InitEditorJobUtils$WonderEditor.initEditorJob, engineState)))))));
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
  return StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, engineState$1)));
}

var _hideLoading = function (loadingDomId){
                        document.querySelector("#" + loadingDomId).style.display = "none";
  };

function init() {
  return Most.drain(Most.map(_handleEngineState, Most.flatMap((function (engineState) {
                        return Most.fromPromise(fetch("./config/setting.json").then((function (response) {
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
  _handleEngineState ,
  _hideLoading ,
  init ,
  start ,
  
}
/* most Not a pure module */
