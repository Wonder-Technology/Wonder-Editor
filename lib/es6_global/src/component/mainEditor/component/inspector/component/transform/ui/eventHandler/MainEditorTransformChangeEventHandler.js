'use strict';

import * as Log$WonderLog                  from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EventHandler$WonderEditor      from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";

function onFinish(_, _$1, _$2) {
  Log$WonderLog.print("finish");
  return /* () */0;
}

var ChangeEventHandler_000 = /* onSelect */EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var ChangeEventHandler_001 = /* onDrag */EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var ChangeEventHandler_002 = /* onChange */EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var ChangeEventHandler = /* module */[
  ChangeEventHandler_000,
  ChangeEventHandler_001,
  ChangeEventHandler_002,
  /* onFinish */onFinish
];

var MakeMainEditorTransformChangeEventHandler = EventHandler$WonderEditor.MakeEventHandler(ChangeEventHandler);

export {
  ChangeEventHandler                        ,
  MakeMainEditorTransformChangeEventHandler ,
  
}
/* MakeMainEditorTransformChangeEventHandler Not a pure module */
