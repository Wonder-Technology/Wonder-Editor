

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as DragGameObjectUtils$WonderEditor from "../../../../../../../utils/dragGameObject/DragGameObjectUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, param$1, param$2) {
  var dragPosition = param$2[2];
  var draggedGameObject = param$2[1];
  var targetGameObject = param$2[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return SceneEngineService$WonderEditor.isSceneGameObject(targetGameObject, param);
        }));
  var engineState$1 = match ? DragGameObjectUtils$WonderEditor.handleDragToBeSceneGameObjectChild(dragPosition, targetGameObject, draggedGameObject, engineState) : DragGameObjectUtils$WonderEditor.handleDragToBeTargetGameObjectSib(dragPosition, targetGameObject, draggedGameObject, engineState);
  StateLogicService$WonderEditor.refreshEngineState(engineState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
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
