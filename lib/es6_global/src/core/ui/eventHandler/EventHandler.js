'use strict';

import * as Curry                                      from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateFacade$WonderEditor                   from "../../../facade/StateFacade.js";
import * as AllStateData$WonderEditor                  from "../../state/AllStateData.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "./utils/MarkRedoUndoEventHandlerUtils.js";

function MakeEventHandler(EventItem) {
  var onSelect = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    StateFacade$WonderEditor.getState((function (param) {
            return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeUI(store, param);
          }));
    return Curry._3(EventItem[/* onSelect */0], reduxTuple, prepareTuple, dataTuple);
  };
  var onDrop = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    StateFacade$WonderEditor.getState((function (param) {
            return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeUI(store, param);
          }));
    return Curry._3(EventItem[/* onDrop */1], reduxTuple, prepareTuple, dataTuple);
  };
  var onClick = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    StateFacade$WonderEditor.getState((function (param) {
            return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeUI(store, param);
          }));
    return Curry._3(EventItem[/* onClick */2], reduxTuple, prepareTuple, dataTuple);
  };
  var onMarkRedoUndo = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    var partial_arg = AllStateData$WonderEditor.getHistoryState(/* () */0);
    StateFacade$WonderEditor.getState((function (param) {
            return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(partial_arg, store, param);
          }));
    return Curry._3(EventItem[/* onMarkRedoUndo */3], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* onSelect */onSelect,
          /* onDrop */onDrop,
          /* onClick */onClick,
          /* onMarkRedoUndo */onMarkRedoUndo
        ];
}

export {
  MakeEventHandler ,
  
}
/* StateFacade-WonderEditor Not a pure module */
