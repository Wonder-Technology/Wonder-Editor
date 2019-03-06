

import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as DragWDBEventHandlerUtils$WonderEditor from "../../../../../../../utils/dragGameObject/DragWDBEventHandlerUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, param$1, param$2) {
  return DragWDBEventHandlerUtils$WonderEditor.handleSelfLogic(/* tuple */[
              param[0],
              param[1]
            ], /* () */0, /* tuple */[
              param$2[0],
              param$2[1],
              param$2[2]
            ]);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
