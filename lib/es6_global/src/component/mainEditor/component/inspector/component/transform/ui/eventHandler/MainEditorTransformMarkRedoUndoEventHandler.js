'use strict';

import * as Log$WonderLog                  from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor      from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";

function onMarkRedoUndo(_, _$1, _$2) {
  Log$WonderLog.print("finish");
  return /* () */0;
}

var MarkRedoUndoEventHandler_000 = /* onSelect */EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var MarkRedoUndoEventHandler_001 = /* onDrop */EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var MarkRedoUndoEventHandler = /* module */[
  MarkRedoUndoEventHandler_000,
  MarkRedoUndoEventHandler_001,
  /* onMarkRedoUndo */onMarkRedoUndo
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler(MarkRedoUndoEventHandler);

export {
  MarkRedoUndoEventHandler ,
  MakeEventHandler         ,
  
}
/* MakeEventHandler Not a pure module */
