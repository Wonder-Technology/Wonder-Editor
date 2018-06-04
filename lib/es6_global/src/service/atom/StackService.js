

import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ListService$WonderEditor from "./ListService.js";

function count(param) {
  return param[/* count */0];
}

function first(param) {
  return ListService$WonderEditor.first(param[/* list */1]);
}

function firstOrRaise(param) {
  return ListService$WonderEditor.firstOrRaise(param[/* list */1]);
}

function addFirst(value, param) {
  return /* record */[
          /* count */param[/* count */0] + 1 | 0,
          /* list : :: */[
            value,
            param[/* list */1]
          ]
        ];
}

function empty() {
  return /* record */[
          /* count */0,
          /* list : [] */0
        ];
}

function fromList(list) {
  return /* record */[
          /* count */ListService$WonderEditor.count(list),
          /* list */list
        ];
}

function removeAll() {
  return /* record */[
          /* count */0,
          /* list : [] */0
        ];
}

function removeFirstOrRaise(param) {
  var list = param[/* list */1];
  return /* record */[
          /* count */param[/* count */0] - 1 | 0,
          /* list */list ? list[1] : Pervasives.failwith("stack is empty")
        ];
}

function $$return(value) {
  return /* record */[
          /* count */1,
          /* list : :: */[
            value,
            /* [] */0
          ]
        ];
}

function toList(param) {
  return param[/* list */1];
}

export {
  count ,
  first ,
  firstOrRaise ,
  addFirst ,
  empty ,
  fromList ,
  removeAll ,
  removeFirstOrRaise ,
  $$return ,
  toList ,
  
}
/* No side effect */
