

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$WonderEditor from "../../../src/service/atom/ArrayService.js";

function _getDisposedIndex(disposedIndexArray) {
  return /* tuple */[
          disposedIndexArray,
          ArrayService$WonderEditor.getLast(disposedIndexArray)
        ];
}

function computeGeneratedIndex(index, disposedIndexArray) {
  var match = ArrayService$WonderEditor.getLast(disposedIndexArray);
  if (match !== undefined) {
    return /* tuple */[
            Caml_option.valFromOption(match),
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
  computeGeneratedIndex ,
  
}
/* ArrayService-WonderEditor Not a pure module */
