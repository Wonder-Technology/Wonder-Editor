'use strict';

import * as Curry                                from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateHistoryView$WonderEditor        from "../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor     from "../../component/mainEditor/logic/view/MainEditorStateView.js";
import * as FinishEventHandlerUtils$WonderEditor from "./utils/FinishEventHandlerUtils.js";

function MakeEventHandler(EventItem) {
  var _storeAllState = function (store) {
    FinishEventHandlerUtils$WonderEditor.clearFinishStack(/* () */0);
    var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
    return StateHistoryView$WonderEditor.storeAllState(store, match[0], match[1]);
  };
  var onSelect = function (reduxTuple, prepareTuple, dataTuple) {
    var store = reduxTuple[0];
    _storeAllState(store);
    Curry._3(EventItem[/* onSelect */0], reduxTuple, prepareTuple, dataTuple);
    return _storeAllState(store);
  };
  var onDrag = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onDrag */1], reduxTuple, prepareTuple, dataTuple);
  };
  var onChange = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onChange */2], reduxTuple, prepareTuple, dataTuple);
  };
  var onFinish = function (reduxTuple, prepareTuple, dataTuple) {
    FinishEventHandlerUtils$WonderEditor.finishEventHandler(reduxTuple[0]);
    return Curry._3(EventItem[/* onFinish */3], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* _storeAllState */_storeAllState,
          /* onSelect */onSelect,
          /* onDrag */onDrag,
          /* onChange */onChange,
          /* onFinish */onFinish
        ];
}

export {
  MakeEventHandler ,
  
}
/* StateHistoryView-WonderEditor Not a pure module */
