

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../service/state/engine/PrimitiveEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, type_, _) {
  var dispatchFunc = param[1];
  var newGameObject = type_ ? SceneUtils$WonderEditor.addGameObject(PrimitiveEngineService$WonderEditor.createEmptyGameObjectForEditEngineState, PrimitiveEngineService$WonderEditor.createEmptyGameObjectForRunEngineState) : SceneUtils$WonderEditor.addGameObject(PrimitiveEngineService$WonderEditor.createBoxForEditEngineState, PrimitiveEngineService$WonderEditor.createBoxForRunEngineState);
  var partial_arg = StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return SceneTreeUtils$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, partial_arg, param);
                }))]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */3]]
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
