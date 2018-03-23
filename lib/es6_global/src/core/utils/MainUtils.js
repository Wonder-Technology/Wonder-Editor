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
                var editorState$1 = SceneEditorService$WonderEditor.setScene(scene, editorState);
                StateLogicService$WonderEditor.setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultScene(scene, match[0]))));
                Log$WonderLog.print("fck this");
                var engineState$1 = StateLogicService$WonderEditor.getEngineStateForRun(/* () */0);
                var match$1 = GameObjectEngineService$WonderEditor.create(engineState$1);
                StateLogicService$WonderEditor.setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultScene(match$1[1], match$1[0]))));
                Log$WonderLog.print("fck init ");
                return Promise.resolve(editorState$1);
              }));
}

function run() {
  EngineStateDataEditorService$WonderEditor.setIsRun(/* true */1);
  return Promise.resolve(LoopEngineService$WonderEditor.loop(/* () */0));
}

function stop() {
  EngineStateDataEditorService$WonderEditor.setIsRun(/* false */0);
  Log$WonderLog.print(StateLogicService$WonderEditor.getEditorState(LoopEditorService$WonderEditor.getLoopId));
  return /* () */0;
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
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
