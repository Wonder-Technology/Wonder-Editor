

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function empty() {
  return /* [] */0;
}

var count = List.length;

function addFirst(value, stack) {
  return /* :: */[
          value,
          stack
        ];
}

function addLast(value, stack) {
  return Pervasives.$at(stack, /* :: */[
              value,
              /* [] */0
            ]);
}

function first(stack) {
  var match = List.length(stack) === 0;
  if (match) {
    return undefined;
  } else {
    return Js_primitive.some(List.hd(stack));
  }
}

var removeFirstOrRaise = List.tl;

function sliceToFirst(countToFirst, stack) {
  var match = List.length(stack) <= countToFirst;
  if (match) {
    return stack;
  } else {
    var _count = countToFirst;
    var _stack = stack;
    var _resultStack = /* [] */0;
    while(true) {
      var resultStack = _resultStack;
      var stack$1 = _stack;
      var count = _count;
      var match$1 = count <= 0;
      if (match$1) {
        return resultStack;
      } else {
        var match$2 = first(stack$1);
        if (match$2 !== undefined) {
          _resultStack = addLast(Js_primitive.valFromOption(match$2), resultStack);
          _stack = List.tl(stack$1);
          _count = count - 1 | 0;
          continue ;
        } else {
          return resultStack;
        }
      }
    };
  }
}

var Stack = /* module */[
  /* empty */empty,
  /* count */count,
  /* addFirst */addFirst,
  /* addLast */addLast,
  /* first */first,
  /* removeFirstOrRaise */removeFirstOrRaise,
  /* sliceToFirst */sliceToFirst
];

export {
  Stack ,
  
}
/* No side effect */
