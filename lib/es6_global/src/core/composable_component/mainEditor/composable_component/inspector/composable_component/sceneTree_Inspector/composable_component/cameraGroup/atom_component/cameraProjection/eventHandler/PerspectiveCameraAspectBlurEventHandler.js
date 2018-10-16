

import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function setUndoValueToCopiedEngineState(_, perspectiveComponent, value) {
  return PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(value, perspectiveComponent, StateEngineService$WonderEditor.deepCopyForRestore(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
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
