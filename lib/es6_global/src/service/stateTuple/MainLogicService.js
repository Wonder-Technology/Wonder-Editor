'use strict';

import * as SceneService$WonderEditor            from "../primitive/SceneService.js";
import * as MainEngineService$WonderEditor       from "../state/engine/MainEngineService.js";
import * as StateLogicService$WonderEditor       from "./StateLogicService.js";
import * as SceneEngineService$WonderEditor      from "../state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor      from "../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor      from "../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor   from "../state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../state/engine/GameObjectEngineService.js";

function createDefaultScene(scene, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(engineState);
  return GameObjectEngineService$WonderEditor.addChild(scene, match[3], GameObjectEngineService$WonderEditor.addChild(scene, match[2], GameObjectEngineService$WonderEditor.addChild(scene, match[1], match[0])));
}

function init(editorState) {
  var engineState = MainEngineService$WonderEditor.init("webgl", true);
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var scene = match[1];
  var editorState$1 = SceneService$WonderEditor.setScene(scene, editorState);
  var engineState$1 = createDefaultScene(scene, match[0]);
  return /* tuple */[
          editorState$1,
          DirectorEngineService$WonderEditor.init(engineState$1)
        ];
}

var loopSetState = DirectorEngineService$WonderEditor.loopBody;

function loop() {
  var _loopRequest = function () {
    return requestAnimationFrame((function (time) {
                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                          return DirectorEngineService$WonderEditor.loopBody(time, param);
                        }));
                  _loopRequest(time);
                  return /* () */0;
                }));
  };
  _loopRequest(0);
  return /* () */0;
}

function start() {
  var match = init(StateEditorService$WonderEditor.getState(/* () */0));
  loop(/* () */0);
  return /* tuple */[
          StateEditorService$WonderEditor.setState(match[0]),
          StateEngineService$WonderEditor.setState(match[1])
        ];
}

export {
  createDefaultScene ,
  init               ,
  loopSetState       ,
  loop               ,
  start              ,
  
}
/* SceneService-WonderEditor Not a pure module */
