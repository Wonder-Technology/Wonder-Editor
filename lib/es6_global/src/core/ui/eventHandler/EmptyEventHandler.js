

import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";

function handleSelfLogic(_, _$1, _$2) {
  return /* () */0;
}

function setUndoValueToCopiedEngineState(_, _$1, _$2) {
  return /* tuple */[
          StateLogicService$WonderEditor.getEditEngineState(/* () */0),
          StateLogicService$WonderEditor.getRunEngineState(/* () */0)
        ];
}

var EmptyEventHandler = /* module */[
  /* handleSelfLogic */handleSelfLogic,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

export {
  EmptyEventHandler ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
