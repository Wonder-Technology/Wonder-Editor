

import * as Log$WonderLog from "../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByLastStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onMarkRedoUndoByFirstStack(_, _$1, _$2) {
  Log$WonderLog.print("finish");
  return /* () */0;
}

var MarkRedoUndoEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByLastStack */onMarkRedoUndoByLastStack,
  /* onMarkRedoUndoByFirstStack */onMarkRedoUndoByFirstStack
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
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
