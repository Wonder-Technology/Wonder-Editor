'use strict';

import * as Log$WonderLog                    from "../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StateFacade$WonderEditor         from "../../../../../../../../../facade/StateFacade.js";
import * as EventHandler$WonderEditor        from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor   from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as BadicMaterialFacade$WonderEditor from "../../../../../../../../../facade/BadicMaterialFacade.js";

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
  return StateFacade$WonderEditor.getAndSetState((function (param) {
                return BadicMaterialFacade$WonderEditor.setBasicMaterialColor(materialComponent, partial_arg, param);
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
