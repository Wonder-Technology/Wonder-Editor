

import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/TransformEngineService.js";

function execFuncAndGetEngineStateTuple(_, transformComponent, param) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg_002 = param[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                /* arguments : array */[transformComponent],
                /* type_ : Transform */1
              ]], (function (param, param$1) {
                return TransformEngineService$WonderEditor.setLocalPosition(partial_arg, param, param$1);
              }), /* tuple */[
              StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
              StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getRunEngineState(/* () */0))
            ]);
}

var CustomEventHandler_000 = /* execPrepareUndoFunc */EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var CustomEventHandler = /* module */[
  CustomEventHandler_000,
  /* execFuncAndGetEngineStateTuple */execFuncAndGetEngineStateTuple
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler(CustomEventHandler);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
