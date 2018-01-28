'use strict';

import * as Curry                                      from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AllStateData$WonderEditor                  from "../../state/AllStateData.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "./utils/MarkRedoUndoEventHandlerUtils.js";

function MakeEventHandler(EventItem) {
  var onSelect = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeUI(store);
    Curry._3(EventItem[/* onSelect */0], reduxTuple, prepareTuple, dataTuple);
    return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getAllState(/* () */0), store);
  };
  var onDrop = function (reduxTuple, prepareTuple, dataTuple) {
    MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeUI(reduxTuple[0]);
    return Curry._3(EventItem[/* onDrop */1], reduxTuple, prepareTuple, dataTuple);
  };
  var onMarkRedoUndo = function (reduxTuple, prepareTuple, dataTuple) {
    MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getAllState(/* () */0), reduxTuple[0]);
    return Curry._3(EventItem[/* onMarkRedoUndo */2], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* onSelect */onSelect,
          /* onDrop */onDrop,
          /* onMarkRedoUndo */onMarkRedoUndo
        ];
}

export {
  MakeEventHandler ,
  
}
/* AllStateData-WonderEditor Not a pure module */
