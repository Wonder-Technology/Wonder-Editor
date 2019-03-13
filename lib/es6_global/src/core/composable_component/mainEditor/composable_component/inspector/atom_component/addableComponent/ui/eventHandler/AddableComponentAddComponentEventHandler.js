

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as AddableComponentUtils$WonderEditor from "../utils/AddableComponentUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as InspectorAddComponentUtils$WonderEditor from "../../../../utils/InspectorAddComponentUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, currentSceneTreeNode, type_) {
  var dispatchFunc = param[1];
  var match = InspectorAddComponentUtils$WonderEditor.addComponentByType(type_, currentSceneTreeNode, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
      ]);
  StateEngineService$WonderEditor.setState(match[1]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
          return GameObjectEngineService$WonderEditor.initGameObject(currentSceneTreeNode, param);
        }));
  var match$1 = AddableComponentUtils$WonderEditor.isNeedUpdateSceneTree(type_);
  if (match$1) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[
              /* Inspector */2,
              /* SceneTree */6
            ]]
        ]);
    return /* () */0;
  } else {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Inspector */2]]
        ]);
    return /* () */0;
  }
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
