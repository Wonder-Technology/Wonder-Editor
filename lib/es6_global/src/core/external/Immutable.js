

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function empty(param) {
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
    return Caml_option.some(List.hd(stack));
  }
}

var removeFirstOrRaise = List.tl;

function _slice(_count, _stack, _resultStack) {
  while(true) {
    var resultStack = _resultStack;
    var stack = _stack;
    var count = _count;
    var match = count <= 0;
    if (match) {
      return resultStack;
    } else {
      var match$1 = first(stack);
      if (match$1 !== undefined) {
        _resultStack = addLast(Caml_option.valFromOption(match$1), resultStack);
        _stack = List.tl(stack);
        _count = count - 1 | 0;
        continue ;
      } else {
        return resultStack;
      }
    }
  };
}

function sliceToFirst(countToFirst, stack) {
  var match = List.length(stack) <= countToFirst;
  if (match) {
    return stack;
  } else {
    return _slice(countToFirst, stack, /* [] */0);
  }
}

var Stack = /* module */[
  /* empty */empty,
  /* count */count,
  /* addFirst */addFirst,
  /* addLast */addLast,
  /* first */first,
  /* removeFirstOrRaise */removeFirstOrRaise,
  /* _slice */_slice,
  /* sliceToFirst */sliceToFirst
];

export {
  Stack ,
  
}
/* No side effect */
