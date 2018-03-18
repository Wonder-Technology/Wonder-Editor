'use strict';

import * as Most                                 from "most";
import * as GameObjectUtils$WonderEditor         from "./GameObjectUtils.js";
import * as AssetEngineService$WonderEditor      from "../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor      from "../../service/state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor      from "../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor      from "../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor      from "../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor   from "../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../service/state/engine/GameObjectEngineService.js";

function createDefaultScene(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, match[1], match[0])));
}

function init(editorState) {
  return Most.forEach((function () {
                  return /* () */0;
                }), AssetEngineService$WonderEditor.load(/* array */[
                    "./src/service/state/data/engine/setting.json",
                    "./node_modules/wonder.js/data/"
                  ])).then((function () {
                var engineState = StateEngineService$WonderEditor.getState(/* () */0);
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

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (param) {
                var engineState = DirectorEngineService$WonderEditor.loopBody(0, param[1]);
                return Promise.resolve(/* tuple */[
                            StateEditorService$WonderEditor.setState(param[0]),
                            StateEngineService$WonderEditor.setState(engineState)
                          ]);
              }));
}

export {
  createDefaultScene ,
  init               ,
  start              ,
  
}
/* most Not a pure module */
