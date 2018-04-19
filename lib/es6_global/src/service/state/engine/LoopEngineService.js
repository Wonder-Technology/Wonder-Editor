'use strict';

import * as LoopEditorService$WonderEditor     from "../editor/LoopEditorService.js";
import * as StateLogicService$WonderEditor     from "../../stateTuple/logic/StateLogicService.js";
import * as DirectorEngineService$WonderEditor from "./DirectorEngineService.js";

var loopSetState = DirectorEngineService$WonderEditor.loopBody;

function _loopSetLoopId(id) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return LoopEditorService$WonderEditor.setLoopId(id, param);
              }));
}

function loop() {
  var _loopRequest = function () {
    var id = requestAnimationFrame((function (time) {
            StateLogicService$WonderEditor.getAndSetEditAndRunEngineState((function (param) {
                    return DirectorEngineService$WonderEditor.loopBody(time, param);
                  }));
            return _loopRequest(time);
          }));
    return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return LoopEditorService$WonderEditor.setLoopId(id, param);
                }));
  };
  _loopRequest(0);
  return /* () */0;
}

function stopLoop(loopId) {
  cancelAnimationFrame(loopId);
  return /* () */0;
}

export {
  loopSetState   ,
  _loopSetLoopId ,
  loop           ,
  stopLoop       ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
