'use strict';

import * as EventHandler$WonderEditor               from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor          from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor          from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByFirstStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onMarkRedoUndoByLastStack(_, materialComponent, _$1) {
  var partial_arg = /* float array */[
    0.4,
    0.6,
    0.7
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineState((function (param) {
                return BasicMaterialEngineService$WonderEditor.setColor(materialComponent, partial_arg, param);
              }));
}

var MarkRedoUndoEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByFirstStack */onMarkRedoUndoByFirstStack,
  /* onMarkRedoUndoByLastStack */onMarkRedoUndoByLastStack
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByFirstStack,
      onMarkRedoUndoByLastStack
    ]);

export {
  MarkRedoUndoEventHandler ,
  MakeEventHandler         ,
  
}
/* MakeEventHandler Not a pure module */
