'use strict';

import * as Curry                                      from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AllStateData$WonderEditor                  from "../../state/AllStateData.js";
import * as StateHistoryView$WonderEditor              from "../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor           from "../../component/mainEditor/logic/view/MainEditorStateView.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "./utils/MarkRedoUndoEventHandlerUtils.js";

function MakeEventHandler(EventItem) {
  var _storeAllState = function (store) {
    MarkRedoUndoEventHandlerUtils$WonderEditor.clearMarkRedoUndoStack(AllStateData$WonderEditor.getAllState(/* () */0));
    var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
    return AllStateData$WonderEditor.setAllState(StateHistoryView$WonderEditor.storeAllState(store, match[0], match[1], AllStateData$WonderEditor.getAllState(/* () */0)));
  };
  var onSelect = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    _storeAllState(store);
    Curry._3(EventItem[/* onSelect */0], reduxTuple, prepareTuple, dataTuple);
    return _storeAllState(store);
  };
  var onDrop = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onDrop */1], reduxTuple, prepareTuple, dataTuple);
  };
  var onMarkRedoUndo = function (reduxTuple, prepareTuple, dataTuple) {
    MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoEventHandler(AllStateData$WonderEditor.getAllState(/* () */0), reduxTuple[0]);
    return Curry._3(EventItem[/* onMarkRedoUndo */2], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* _storeAllState */_storeAllState,
          /* onSelect */onSelect,
          /* onDrop */onDrop,
          /* onMarkRedoUndo */onMarkRedoUndo
        ];
}

export {
  MakeEventHandler ,
  
}
/* AllStateData-WonderEditor Not a pure module */
