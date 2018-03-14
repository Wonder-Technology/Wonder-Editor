'use strict';

import * as Curry                            from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor            from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor        from "../../../../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor      from "../../utils/SceneTreeUtils.js";
import * as GameObjectUtils$WonderEditor     from "../../../../../../utils/GameObjectUtils.js";
import * as EmptyEventHandler$WonderEditor   from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor   from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneTreeStoreUtils$WonderEditor from "../../utils/SceneTreeStoreUtils.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onDrop(param, _, param$1) {
  var dragedUid = param$1[1];
  var targetUid = param$1[0];
  var dispatch = param[1];
  var match = StateLogicService$WonderEditor.getEngineState((function (param) {
          return SceneTreeUtils$WonderEditor.isGameObjectRelationError(targetUid, dragedUid, param);
        }));
  if (match !== 0) {
    Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    return /* () */0;
  } else {
    StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
            return GameObjectUtils$WonderEditor.setParentKeepOrder(targetUid, dragedUid, param);
          }));
    Curry._1(dispatch, [
          AppStore$WonderEditor.SceneTreeAction,
          /* SetSceneGraph */[/* Some */[SceneTreeUtils$WonderEditor.getDragedSceneGraphData(targetUid, dragedUid, SceneTreeStoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]))]]
        ]);
    return /* () */0;
  }
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onDrop */onDrop
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  DragEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
