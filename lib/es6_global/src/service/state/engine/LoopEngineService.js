'use strict';

import * as Log$WonderLog                      from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
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
    return requestAnimationFrame((function (time) {
                  Log$WonderLog.print("fck");
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
/* Log-WonderLog Not a pure module */
