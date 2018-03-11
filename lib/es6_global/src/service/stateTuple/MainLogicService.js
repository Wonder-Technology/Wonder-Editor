'use strict';

import * as GameObjectUtils$WonderEditor         from "../../core/component/mainEditor/utils/GameObjectUtils.js";
import * as LoopEngineService$WonderEditor       from "../state/engine/LoopEngineService.js";
import * as MainEngineService$WonderEditor       from "../state/engine/MainEngineService.js";
import * as SceneEditorService$WonderEditor      from "../state/editor/SceneEditorService.js";
import * as SceneEngineService$WonderEditor      from "../state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor      from "../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor      from "../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor   from "../state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../state/engine/GameObjectEngineService.js";

function createDefaultScene(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState);
  return GameObjectUtils$WonderEditor.addChild(scene, match[3], GameObjectUtils$WonderEditor.addChild(scene, match[2], GameObjectUtils$WonderEditor.addChild(scene, match[1], match[0])));
}

function init(editorState) {
  var engineState = MainEngineService$WonderEditor.init("webgl", true);
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var scene = match[1];
  var editorState$1 = SceneEditorService$WonderEditor.setScene(scene, editorState);
  var engineState$1 = createDefaultScene(scene, match[0]);
  return /* tuple */[
          editorState$1,
          DirectorEngineService$WonderEditor.init(engineState$1)
        ];
}

function start() {
  var match = init(StateEditorService$WonderEditor.getState(/* () */0));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* tuple */[
          StateEditorService$WonderEditor.setState(match[0]),
          StateEngineService$WonderEditor.setState(match[1])
        ];
}

export {
  createDefaultScene ,
  init               ,
  start              ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
