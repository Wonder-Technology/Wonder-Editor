

import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/ArcballCameraEngineService.js";

function setUndoValueToCopiedEngineState(_, arcballCameraController, distance) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                /* arguments : array */[arcballCameraController],
                /* type_ : ArcballCameraController */10
              ]], (function (param, param$1) {
                return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(distance, param, param$1);
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
