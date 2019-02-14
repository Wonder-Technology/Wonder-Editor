

import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(_, currentSceneTreeNode, param) {
  return StateLogicService$WonderEditor.refreshEngineState(GameObjectComponentEngineService$WonderEditor.addGeometryComponent(currentSceneTreeNode, param[1], GameObjectComponentEngineService$WonderEditor.removeGeometryComponent(currentSceneTreeNode, param[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
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
