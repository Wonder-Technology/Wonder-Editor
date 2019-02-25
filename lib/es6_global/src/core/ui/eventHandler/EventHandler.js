

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StoreHistoryUtils$WonderEditor from "./utils/StoreHistoryUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";

function MakeEventHandler(EventItem) {
  var pushUndoStackWithNoCopyEngineState = function (reduxTuple, prepareTuple, dataTuple) {
    StoreHistoryUtils$WonderEditor.storeHistoryStateWithNoCopyEngineState(reduxTuple[0], StateHistoryService$WonderEditor.getStateForHistory(/* () */0));
    return Curry._3(EventItem[/* handleSelfLogic */0], reduxTuple, prepareTuple, dataTuple);
  };
  var pushUndoStackWithCopiedEngineState = function (reduxTuple, prepareTuple, dataTuple) {
    var engineState = Curry._3(EventItem[/* setUndoValueToCopiedEngineState */1], reduxTuple, prepareTuple, dataTuple);
    StoreHistoryUtils$WonderEditor.storeHistoryStateWithCopiedEngineState(reduxTuple[0], /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          engineState
        ]);
    return /* () */0;
  };
  var pushUndoStackWithTwoHandleFunc = function (reduxTuple, prepareTuple, dataTuple) {
    var engineState = Curry._3(EventItem[/* setUndoValueToCopiedEngineState */1], reduxTuple, prepareTuple, dataTuple);
    StoreHistoryUtils$WonderEditor.storeHistoryStateWithCopiedEngineState(reduxTuple[0], /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          engineState
        ]);
    return Curry._3(EventItem[/* handleSelfLogic */0], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* pushUndoStackWithNoCopyEngineState */pushUndoStackWithNoCopyEngineState,
          /* pushUndoStackWithCopiedEngineState */pushUndoStackWithCopiedEngineState,
          /* pushUndoStackWithTwoHandleFunc */pushUndoStackWithTwoHandleFunc
        ];
}

export {
  MakeEventHandler ,
  
}
/* StoreHistoryUtils-WonderEditor Not a pure module */
