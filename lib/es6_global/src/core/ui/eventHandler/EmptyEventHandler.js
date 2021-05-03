

import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";

function handleSelfLogic(param, prepareTuple, dataTuple) {
  return /* () */0;
}

function setUndoValueToCopiedEngineState(param, prepareTuple, dataTuple) {
  return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
}

function setUndoValueToCopiedEngineStateForPromise(param, prepareTuple, dataTuple) {
  return new Promise((function (resolve, reject) {
                return resolve(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
              }));
}

var EmptyEventHandler = /* module */[
  /* handleSelfLogic */handleSelfLogic,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise
];

export {
  EmptyEventHandler ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
