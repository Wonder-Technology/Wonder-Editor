

import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";

function setUndoValueToCopiedEngineState(_, materialComponent, value) {
  var partial_arg = BasicMaterialEngineService$WonderEditor.convert16HexToRGBArr(value);
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                /* arguments : array */[materialComponent],
                /* type_ : Material */2
              ]], (function (param, param$1) {
                return BasicMaterialEngineService$WonderEditor.setColor(partial_arg, param, param$1);
              }), /* tuple */[
              StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
              StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getRunEngineState(/* () */0))
            ]);
}

var CustomEventHandler_000 = /* handleSelfLogic */EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var CustomEventHandler = /* module */[
  CustomEventHandler_000,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler(CustomEventHandler);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
