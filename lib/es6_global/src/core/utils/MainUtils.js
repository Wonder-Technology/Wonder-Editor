'use strict';

import * as Most                                      from "most";
import * as DefaultSceneUtils$WonderEditor            from "./DefaultSceneUtils.js";
import * as StateLogicService$WonderEditor            from "../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEngineService$WonderEditor           from "../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor           from "../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor           from "../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor           from "../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor        from "../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor      from "../../service/state/engine/GameObjectEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../service/state/editor/EngineStateDataEditorService.js";

function init(editorState) {
  return Most.forEach((function () {
                  return /* () */0;
                }), Most.merge(AssetEngineService$WonderEditor.loadToData(/* array */[
                        "./src/service/state/data/engine/runSetting.json",
                        "./node_modules/wonder.js/data/"
                      ], EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)), AssetEngineService$WonderEditor.loadToData(/* array */[
                        "./src/service/state/data/engine/setting.json",
                        "./node_modules/wonder.js/data/"
                      ], EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0)))).then((function () {
                StateEngineService$WonderEditor.setIsDebug(/* true */1);
                var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                var match = GameObjectEngineService$WonderEditor.create(editEngineState);
                var scene = match[1];
                var match$1 = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjectsForEditEngineState(scene, match[0]);
                StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(DefaultSceneUtils$WonderEditor.createDefaultSceneForEdit(scene, match$1[1], DefaultSceneUtils$WonderEditor.computeDiffValue(editorState, match$1[0])))));
                var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                var match$2 = GameObjectEngineService$WonderEditor.create(engineState);
                var scene$1 = match$2[1];
                StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(DefaultSceneUtils$WonderEditor.createDefaultSceneForRun(scene$1, match$2[0]))));
                return Promise.resolve(SceneEditorService$WonderEditor.setScene(scene$1, editorState$1));
              }));
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
              }));
}

export {
  init  ,
  start ,
  
}
/* most Not a pure module */
