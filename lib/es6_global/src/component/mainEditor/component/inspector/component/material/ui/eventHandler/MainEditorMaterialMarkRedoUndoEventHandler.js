'use strict';

import * as Log$WonderLog                       from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor           from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor      from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor      from "../../../../../../../../state/utils/OperateStateUtils.js";
import * as MainEditorMaterialView$WonderEditor from "../../logic/view/MainEditorMaterialView.js";

function onMarkRedoUndo(_, materialComponent, value) {
  Log$WonderLog.print(value);
  var partial_arg = /* float array */[
    0.4,
    0.6,
    0.7
  ];
  return OperateStateUtils$WonderEditor.getAndSetState((function (param) {
                return MainEditorMaterialView$WonderEditor.setBasicMaterialColor(materialComponent, partial_arg, param);
              }));
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
