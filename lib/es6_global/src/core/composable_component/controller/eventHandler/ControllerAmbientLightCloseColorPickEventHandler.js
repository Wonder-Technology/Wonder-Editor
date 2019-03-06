

import * as Color$WonderEditor from "../../../external/Color.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/state/StateEngineService.js";

function setUndoValueToCopiedEngineState(param, param$1, value) {
  return SceneEngineService$WonderEditor.setAmbientLightColor(Color$WonderEditor.convert16HexToRGBArr(value), StateEngineService$WonderEditor.deepCopyForRestore(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
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
