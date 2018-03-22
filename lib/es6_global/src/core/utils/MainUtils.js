'use strict';

import * as Most                                      from "most";
import * as Log$WonderLog                             from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GameObjectUtils$WonderEditor              from "./GameObjectUtils.js";
import * as LoopEditorService$WonderEditor            from "../../service/state/editor/LoopEditorService.js";
import * as LoopEngineService$WonderEditor            from "../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor            from "../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEngineService$WonderEditor           from "../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor           from "../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor           from "../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor           from "../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor           from "../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor        from "../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor      from "../../service/state/engine/GameObjectEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../service/state/editor/EngineStateDataEditorService.js";

function createDefaultScene(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, match[1], match[0])));
}

function init(editorState) {
  return Most.forEach((function () {
                  return /* () */0;
                }), AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/service/state/data/engine/setting.json",
                    "./node_modules/wonder.js/data/"
                  ], EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))).then((function () {
                StateEngineService$WonderEditor.setIsDebug(/* true */1);
                var engineState = StateLogicService$WonderEditor.getEngineStateForEdit(/* () */0);
                var match = GameObjectEngineService$WonderEditor.create(engineState);
                var scene = match[1];
                var editorState$1 = SceneEditorService$WonderEditor.setScene(scene, editorState);
                var engineState$1 = createDefaultScene(scene, match[0]);
                return Promise.resolve(/* tuple */[
                            editorState$1,
                            DirectorEngineService$WonderEditor.init(engineState$1)
                          ]);
              }));
}

function run() {
  return Most.forEach((function () {
                  return /* () */0;
                }), AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/service/state/data/engine/runSetting.json",
                    "./node_modules/wonder.js/data/"
                  ], EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))).then((function () {
                EngineStateDataEditorService$WonderEditor.setIsRun(/* true */1);
                var engineState = StateLogicService$WonderEditor.getEngineStateForRun(/* () */0);
                var match = GameObjectEngineService$WonderEditor.create(engineState);
                var engineState$1 = createDefaultScene(match[1], match[0]);
                StateLogicService$WonderEditor.setEngineStateForRun(DirectorEngineService$WonderEditor.init(engineState$1));
                return Promise.resolve(LoopEngineService$WonderEditor.loop(/* () */0));
              }));
}

function stop() {
  EngineStateDataEditorService$WonderEditor.setIsRun(/* false */0);
  Log$WonderLog.print(StateLogicService$WonderEditor.getEditorState(LoopEditorService$WonderEditor.getLoopId));
  return /* () */0;
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (param) {
                var engineState = DirectorEngineService$WonderEditor.loopBody(0, param[1]);
                return Promise.resolve(/* tuple */[
                            StateEditorService$WonderEditor.setState(param[0]),
                            StateLogicService$WonderEditor.setEngineStateForEdit(engineState)
                          ]);
              }));
}

export {
  createDefaultScene ,
  init               ,
  run                ,
  stop               ,
  start              ,
  
}
/* most Not a pure module */
