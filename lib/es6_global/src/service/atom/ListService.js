

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";

function addFirst(value, list) {
  return /* :: */[
          value,
          list
        ];
}

function countImpl(_list, _count) {
  while(true) {
    var count = _count;
    var list = _list;
    if (list) {
      _count = count + 1 | 0;
      _list = list[1];
      continue ;
    } else {
      return count;
    }
  };
}

function count(list) {
  return countImpl(list, 0);
}

function empty() {
  return /* [] */0;
}

function isEmpty(list) {
  if (list) {
    return false;
  } else {
    return true;
  }
}

function isNotEmpty(list) {
  if (list) {
    return true;
  } else {
    return false;
  }
}

function findOrRaise(f, _list) {
  while(true) {
    var list = _list;
    if (list) {
      var head = list[0];
      if (Curry._1(f, head)) {
        return head;
      } else {
        _list = list[1];
        continue ;
      }
    } else {
      return Pervasives.failwith("not found");
    }
  };
}

function first(list) {
  if (list) {
    return /* Some */[list[0]];
  } else {
    return /* None */0;
  }
}

function firstOrRaise(list) {
  if (list) {
    return list[0];
  } else {
    return Pervasives.failwith("empty");
  }
}

function removeAll() {
  return /* [] */0;
}

function removeFirstOrRaise(list) {
  if (list) {
    return list[1];
  } else {
    return Pervasives.failwith("List is empty");
  }
}

function $$return(value) {
  return /* :: */[
          value,
          /* [] */0
        ];
}

function some(f, _list) {
  while(true) {
    var list = _list;
    if (list) {
      if (Curry._1(f, list[0])) {
        return true;
      } else {
        _list = list[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

export {
  addFirst ,
  countImpl ,
  count ,
  empty ,
  isEmpty ,
  isNotEmpty ,
  findOrRaise ,
  first ,
  firstOrRaise ,
  removeAll ,
  removeFirstOrRaise ,
  $$return ,
  some ,
  
}
/* No side effect */
