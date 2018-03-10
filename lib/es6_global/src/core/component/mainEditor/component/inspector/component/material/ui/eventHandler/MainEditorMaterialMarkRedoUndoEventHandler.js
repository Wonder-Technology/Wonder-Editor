'use strict';

import * as Log$WonderLog                           from "../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor               from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor          from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor          from "../../../../../../../../../service/stateTuple/StateLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function onMarkRedoUndo(_, materialComponent, value) {
  Log$WonderLog.print(value);
  var partial_arg = /* float array */[
    0.4,
    0.6,
    0.7
  ];
  return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                return BasicMaterialEngineService$WonderEditor.setColor(materialComponent, partial_arg, param);
              }));
}

var MarkRedoUndoEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  MarkRedoUndoEventHandler ,
  MakeEventHandler         ,
  
}
/* MakeEventHandler Not a pure module */
