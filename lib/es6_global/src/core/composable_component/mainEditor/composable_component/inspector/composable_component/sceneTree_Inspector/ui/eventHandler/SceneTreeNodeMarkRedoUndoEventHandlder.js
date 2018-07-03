

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../../../../sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../service/state/engine/GameObjectEngineService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onMarkRedoUndoByStackLast(param, gameObject, newName) {
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ]], (function (param, param$1) {
          return GameObjectEngineService$WonderEditor.setGameObjectName(newName, param, param$1);
        }));
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[SceneTreeUtils$WonderEditor.renameSceneGraphData(gameObject, newName, SceneTreeUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]))]]
      ]);
  return /* () */0;
}

var MarkRedoUndoEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* onMarkRedoUndoByStackLast */onMarkRedoUndoByStackLast
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLast
    ]);

export {
  MarkRedoUndoEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
