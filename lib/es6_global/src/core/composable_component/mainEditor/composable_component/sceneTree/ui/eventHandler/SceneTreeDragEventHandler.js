

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../utils/SceneTreeUtils.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../utils/engine/GameObjectUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, param$1) {
  var dragedUid = param$1[1];
  var targetUid = param$1[0];
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
          /* arguments : array */[
            targetUid,
            dragedUid
          ],
          /* type_ : GameObject */0
        ]], GameObjectUtils$WonderEditor.setParentKeepOrder);
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[SceneTreeUtils$WonderEditor.getDragedSceneGraphData(targetUid, dragedUid, SceneTreeUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]))]
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
