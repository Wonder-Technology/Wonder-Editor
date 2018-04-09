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
    console.log(window.requestAnimationFrame)
    return requestAnimationFrame((function (time) {
                  StateLogicService$WonderEditor.getAndSetEditAndRunEngineState((function (param) {
                          return DirectorEngineService$WonderEditor.loopBody(time, param);
                        }));
                  var id = _loopRequest(time);
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return LoopEditorService$WonderEditor.setLoopId(id, param);
                              }));
                }));
  };
  var id = _loopRequest(0);
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return LoopEditorService$WonderEditor.setLoopId(id, param);
              }));
}

export {
  loopSetState   ,
  _loopSetLoopId ,
  loop           ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
