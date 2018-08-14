

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as InspectorAddComponentUtils$WonderEditor from "../../../../utils/InspectorAddComponentUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, currentSceneTreeNode, type_) {
  StateLogicService$WonderEditor.setEditEngineState(InspectorAddComponentUtils$WonderEditor.addComponentByTypeForEditEngineState(type_, StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
  var match = InspectorAddComponentUtils$WonderEditor.addComponentByTypeForRunEngineState(type_, currentSceneTreeNode, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  StateLogicService$WonderEditor.setRunEngineState(match[1]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateLogicService$WonderEditor.getAndSetEngineStateWithDiff(/* array */[/* record */[
          /* arguments : array */[currentSceneTreeNode],
          /* type_ : GameObject */0
        ]], GameObjectEngineService$WonderEditor.initGameObject);
  StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */1]]
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
