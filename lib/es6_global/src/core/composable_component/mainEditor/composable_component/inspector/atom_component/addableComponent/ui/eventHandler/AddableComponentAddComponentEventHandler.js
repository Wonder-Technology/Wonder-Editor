

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../service/state/engine/StateEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as InspectorAddComponentUtils$WonderEditor from "../../../../utils/InspectorAddComponentUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, currentSceneTreeNode, type_) {
  var match = InspectorAddComponentUtils$WonderEditor.addComponentByType(type_, currentSceneTreeNode, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
      ]);
  StateEngineService$WonderEditor.setState(match[1]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
          return GameObjectEngineService$WonderEditor.initGameObject(currentSceneTreeNode, param);
        }));
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
