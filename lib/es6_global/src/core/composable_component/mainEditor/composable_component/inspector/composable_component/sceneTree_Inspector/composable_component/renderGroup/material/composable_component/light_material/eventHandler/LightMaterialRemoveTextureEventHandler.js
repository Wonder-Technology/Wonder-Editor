

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, materialComponent) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(OperateTextureLogicService$WonderEditor.handleLightMaterialComponentFromHasDiffuseMapToNoMap(materialComponent, engineState));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
