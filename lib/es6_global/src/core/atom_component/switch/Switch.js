'use strict';

import * as Block                  from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                  from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                  from "react";
import * as ReasonReact            from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function changeState() {
  return /* ChangeState */0;
}

var Method = /* module */[/* changeState */changeState];

var component = ReasonReact.reducerComponent("Switch");

function reducer(openFunc, closeFunc, _, state) {
  var match = state[/* switchState */0];
  if (match !== 0) {
    return /* UpdateWithSideEffects */Block.__(3, [
              /* record */[/* switchState */1 - state[/* switchState */0]],
              (function () {
                  return Curry._1(closeFunc, /* () */0);
                })
            ]);
  } else {
    return /* UpdateWithSideEffects */Block.__(3, [
              /* record */[/* switchState */1 - state[/* switchState */0]],
              (function () {
                  return Curry._1(openFunc, /* () */0);
                })
            ]);
  }
}

function render(openText, closeText, param) {
  var reduce = param[/* reduce */3];
  var match = param[/* state */4][/* switchState */0];
  return React.createElement("article", {
              className: "wonder-switch"
            }, match !== 0 ? React.createElement("button", {
                    onClick: Curry._1(reduce, changeState)
                  }, DomHelper$WonderEditor.textEl(closeText)) : React.createElement("button", {
                    onClick: Curry._1(reduce, changeState)
                  }, DomHelper$WonderEditor.textEl(openText)));
}

function make(openText, openFunc, closeText, closeFunc, initState, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(openText, closeText, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* switchState */initState];
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(openFunc, closeFunc, param, param$1);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
