

import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";

function handleSelfLogic(_, _$1, _$2) {
  return /* () */0;
}

function setUndoValueToCopiedEngineState(_, _$1, _$2) {
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
