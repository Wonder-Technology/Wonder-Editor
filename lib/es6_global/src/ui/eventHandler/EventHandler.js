'use strict';

import * as Curry                            from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateHistoryView$WonderEditor    from "../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor from "../../component/mainEditor/logic/view/MainEditorStateView.js";

function MakeEventHandler(EventItem) {
  var _storeAllState = function (store) {
    var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
    return StateHistoryView$WonderEditor.storeAllState(store, match[0], match[1]);
  };
  var onSelect = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onSelect */0], reduxTuple, prepareTuple, dataTuple);
  };
  var onDrag = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onDrag */1], reduxTuple, prepareTuple, dataTuple);
  };
  var onChange = function (reduxTuple, prepareTuple, dataTuple) {
    _storeAllState(reduxTuple[0]);
    return Curry._3(EventItem[/* onChange */2], reduxTuple, prepareTuple, dataTuple);
  };
  return /* module */[
          /* _storeAllState */_storeAllState,
          /* onSelect */onSelect,
          /* onDrag */onDrag,
          /* onChange */onChange
        ];
}

export {
  MakeEventHandler ,
  
}
/* StateHistoryView-WonderEditor Not a pure module */
