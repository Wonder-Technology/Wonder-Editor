'use strict';

import * as StateLogicService$WonderEditor     from "../../stateTuple/logic/StateLogicService.js";
import * as DirectorEngineService$WonderEditor from "./DirectorEngineService.js";

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

export {
  loopSetState ,
  loop         ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
