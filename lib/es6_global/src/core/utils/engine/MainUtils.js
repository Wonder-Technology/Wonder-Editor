

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DefaultSceneUtils$WonderEditor from "./DefaultSceneUtils.js";
import * as SetIMGUIFuncUtils$WonderEditor from "./SetIMGUIFuncUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";
import * as LoaderManagerEngineService$WonderEditor from "../../../service/state/engine/LoaderManagerEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/BasicCameraViewEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../../service/state/data/EngineStateDataEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function _getLoadData(type_) {
  var engineDataDir = "./src/engine/data/";
  switch (type_) {
    case "edit" : 
        return AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/engine/setting/editSetting.json",
                    engineDataDir
                  ], EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0));
    case "run" : 
        return AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/engine/setting/runSetting.json",
                    engineDataDir
                  ], EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getLoadData", "the type_ is not find", "", "check the param", "type:" + (String(type_) + "")));
  }
}

function _buildSetStateFuncForEditEngineState(setEngineStateFunc) {
  return (function (state) {
      var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
      var state$1 = match ? state : DirectorEngineService$WonderEditor.loopBody(0, state);
      Curry._1(setEngineStateFunc, state$1);
      return state$1;
    });
}

function _buildSetStateFuncForRunEngineState(setEngineStateFunc) {
  return (function (state) {
      Curry._1(setEngineStateFunc, state);
      return state;
    });
}

function _setUnsafeGetStateFuncAndSetStateFuncForEvent(getEngineStateFunc, setEngineStateFunc, buildSetStateFunc, engineState) {
  return StateEngineService$WonderEditor.setSetStateFunc(Curry._1(buildSetStateFunc, setEngineStateFunc), StateEngineService$WonderEditor.setUnsafeGetStateFunc((function () {
                    return Curry._1(getEngineStateFunc, /* () */0);
                  }), engineState));
}

function _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(editEngineState) {
  return _setUnsafeGetStateFuncAndSetStateFuncForEvent(StateLogicService$WonderEditor.getEditEngineState, StateLogicService$WonderEditor.setEditEngineState, _buildSetStateFuncForEditEngineState, editEngineState);
}

function _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(runEngineState) {
  return _setUnsafeGetStateFuncAndSetStateFuncForEvent(StateLogicService$WonderEditor.getRunEngineState, StateLogicService$WonderEditor.setRunEngineState, _buildSetStateFuncForRunEngineState, runEngineState);
}

function handleEditEngineState(editorState, editEngineState) {
  StateEngineService$WonderEditor.setIsDebug(true);
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(editEngineState);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjectsForEditEngineState(editEngineState);
  var editEngineState$1 = DefaultSceneUtils$WonderEditor.createDefaultSceneForEditEngineState(match[0]);
  var match$1 = DefaultSceneUtils$WonderEditor.computeDiffValue(editorState, editEngineState$1);
  var editEngineState$2 = match$1[1];
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, SetIMGUIFuncUtils$WonderEditor.setIMGUIFunc(_setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(match[1], editEngineState$2), editEngineState$2)))))));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return /* () */0;
}

function handleRunEngineState(runEngineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var scene = SceneEngineService$WonderEditor.getSceneGameObject(runEngineState);
  var match = DefaultSceneUtils$WonderEditor.createDefaultSceneForRunEngineState(editorState, runEngineState);
  StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(match[1])))));
  StateEditorService$WonderEditor.setState(match[0]);
  return /* () */0;
}

function init(editorState) {
  return Most.drain(Most.map((function (editEngineState) {
                        return handleEditEngineState(editorState, editEngineState);
                      }), Most.flatMap((function (editEngineState) {
                            return Most.fromPromise(LoaderManagerEngineService$WonderEditor.loadIMGUIAsset("./public/font/myFont.fnt", "./public/font/myFont.png", /* array */[
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
                                          ], editEngineState));
                          }), _getLoadData("edit"))).concat(Most.map(handleRunEngineState, _getLoadData("run")))).then((function () {
                return Promise.resolve(StateEditorService$WonderEditor.getState(/* () */0));
              }));
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
              }));
}

export {
  _getLoadData ,
  _buildSetStateFuncForEditEngineState ,
  _buildSetStateFuncForRunEngineState ,
  _setUnsafeGetStateFuncAndSetStateFuncForEvent ,
  _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent ,
  _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent ,
  handleEditEngineState ,
  handleRunEngineState ,
  init ,
  start ,
  
}
/* most Not a pure module */
