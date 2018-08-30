

import * as Color$WonderEditor from "../../../external/Color.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";

function setUndoValueToCopiedEngineState(_, _$1, value) {
  return /* tuple */[
          SceneEngineService$WonderEditor.setAmbientLightColor(Color$WonderEditor.convert16HexToRGBArr(value), StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getEditEngineState(/* () */0))),
          SceneEngineService$WonderEditor.setAmbientLightColor(Color$WonderEditor.convert16HexToRGBArr(value), StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getRunEngineState(/* () */0)))
        ];
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
