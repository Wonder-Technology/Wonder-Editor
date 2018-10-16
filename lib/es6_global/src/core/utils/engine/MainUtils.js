

import * as Most from "most";
import * as RestoreJobUtils$WonderEditor from "./job/RestoreJobUtils.js";
import * as JobEngineService$WonderEditor from "../../../service/state/engine/JobEngineService.js";
import * as InitEventJobUtils$WonderEditor from "./job/InitEventJobUtils.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as InitEditorJobUtils$WonderEditor from "./job/InitEditorJobUtils.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as StateDataEngineService$WonderEditor from "../../../service/state/engine/StateDataEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";
import * as PrepareRenderViewJobUtils$WonderEditor from "./job/PrepareRenderViewJobUtils.js";
import * as LoaderManagerEngineService$WonderEditor from "../../../service/state/engine/LoaderManagerEngineService.js";

function _getLoadData() {
  return AssetEngineService$WonderEditor.loadToData(/* array */[
              "./src/engine/config/setting.json",
              "./src/engine/config/"
            ], StateDataEngineService$WonderEditor.getEngineStateData(/* () */0));
}

function handleEngineState(engineState) {
  var engineState$1 = JobEngineService$WonderEditor.registerNoWorkerLoopJob("restore", RestoreJobUtils$WonderEditor.restoreJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_game_view", PrepareRenderViewJobUtils$WonderEditor.prepareRenderGameViewJob, JobEngineService$WonderEditor.registerNoWorkerLoopJob("prepare_render_scene_view", PrepareRenderViewJobUtils$WonderEditor.prepareRenderSceneViewJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_event_for_editor", InitEventJobUtils$WonderEditor.initEventForEditorJob, JobEngineService$WonderEditor.registerNoWorkerInitJob("init_editor", InitEditorJobUtils$WonderEditor.initEditorJob, engineState)))));
  StateEngineService$WonderEditor.setIsDebug(true);
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
  return StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, engineState$1)));
}

var _hideLoading = function (loadingDomId){
                        document.querySelector("#" + loadingDomId).style.display = "none";
  };

function init() {
  return Most.drain(Most.map(handleEngineState, Most.tap((function () {
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
                          }), _getLoadData(/* () */0)))));
}

function start() {
  return init(/* () */0);
}

export {
  _getLoadData ,
  handleEngineState ,
  _hideLoading ,
  init ,
  start ,
  
}
/* most Not a pure module */
