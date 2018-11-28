

import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$WonderEditor from "../../../src/service/atom/ArrayService.js";

function _getDisposedIndex(disposedIndexArray) {
  return /* tuple */[
          disposedIndexArray,
          ArrayService$WonderEditor.getLast(disposedIndexArray)
        ];
}

function generateIndex(index, disposedIndexArray) {
  var match = ArrayService$WonderEditor.getLast(disposedIndexArray);
  if (match !== undefined) {
    return /* tuple */[
            Js_primitive.valFromOption(match),
            index,
            disposedIndexArray
          ];
  } else {
    return /* tuple */[
            index,
            index + 1 | 0,
            disposedIndexArray
          ];
  }
}

export {
  _getDisposedIndex ,
  generateIndex ,
  
}
/* ArrayService-WonderEditor Not a pure module */
