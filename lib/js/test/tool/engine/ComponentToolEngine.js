'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ArrayService$WonderEditor = require("../../../src/service/atom/ArrayService.js");

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

exports._getDisposedIndex = _getDisposedIndex;
exports.computeGeneratedIndex = computeGeneratedIndex;
/* ArrayService-WonderEditor Not a pure module */
