'use strict';

import * as Log$WonderLog                  from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor      from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrag = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function onFinish(_, _$1, _$2) {
  Log$WonderLog.print("finish");
  return /* () */0;
}

var FinishEventHandler_002 = /* onChange */EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var FinishEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrag */onDrag,
  FinishEventHandler_002,
  /* onFinish */onFinish
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrag,
      onFinish
    ]);

export {
  FinishEventHandler ,
  MakeEventHandler   ,
  
}
/* MakeEventHandler Not a pure module */
