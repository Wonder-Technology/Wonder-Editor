

import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";

function handleSelfLogic(param, prepareTuple, dataTuple) {
  return /* () */0;
}

function setUndoValueToCopiedEngineState(param, prepareTuple, dataTuple) {
  return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
}

var EmptyEventHandler = /* module */[
  /* handleSelfLogic */handleSelfLogic,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

export {
  EmptyEventHandler ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
