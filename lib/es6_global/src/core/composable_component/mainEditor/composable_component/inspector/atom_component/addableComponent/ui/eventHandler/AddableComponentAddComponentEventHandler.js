

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as InspectorComponentUtils$WonderEditor from "../../../../utils/InspectorComponentUtils.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByFirstStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByLastStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onClick(param, type_, currentSceneTreeNode) {
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[currentSceneTreeNode], /* GameObject */0, (function (param, param$1) {
          return InspectorComponentUtils$WonderEditor.addComponentByType(type_, param, param$1);
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var AddComponentEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByFirstStack */onMarkRedoUndoByFirstStack,
  /* onMarkRedoUndoByLastStack */onMarkRedoUndoByLastStack,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByFirstStack,
      onMarkRedoUndoByLastStack
    ]);

export {
  AddComponentEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
