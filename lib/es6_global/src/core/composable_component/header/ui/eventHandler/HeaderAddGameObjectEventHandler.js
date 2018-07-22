

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../../utils/engine/SceneUtils.js";
import * as StoreUtils$WonderEditor from "../../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../service/state/editor/SceneEditorService.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../service/state/engine/PrimitiveEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, type_, _) {
  var dispatchFunc = param[1];
  var newGameObject = type_ === "box" ? SceneUtils$WonderEditor.addGameObject(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetScene), PrimitiveEngineService$WonderEditor.createBox) : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addGameObject", "specific type:" + (String(type_) + " should exist"), "", "", "type:" + (String(type_) + "")));
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
