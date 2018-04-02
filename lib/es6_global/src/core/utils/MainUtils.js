'use strict';

import * as Most                                      from "most";
import * as GameObjectUtils$WonderEditor              from "./GameObjectUtils.js";
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
                var editorState$1 = SceneEditorService$WonderEditor.setEditScene(scene, editorState);
                StateLogicService$WonderEditor.setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultScene(scene, match[0]))));
                var engineState$1 = StateLogicService$WonderEditor.getEngineStateForRun(/* () */0);
                var match$1 = GameObjectEngineService$WonderEditor.create(engineState$1);
                var scene$1 = match$1[1];
                var editorState$2 = SceneEditorService$WonderEditor.setRunScene(scene$1, editorState$1);
                StateLogicService$WonderEditor.setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(createDefaultScene(scene$1, match$1[0]))));
                return Promise.resolve(editorState$2);
              }));
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
              }));
}

export {
  createDefaultScene ,
  init               ,
  start              ,
  
}
/* most Not a pure module */
