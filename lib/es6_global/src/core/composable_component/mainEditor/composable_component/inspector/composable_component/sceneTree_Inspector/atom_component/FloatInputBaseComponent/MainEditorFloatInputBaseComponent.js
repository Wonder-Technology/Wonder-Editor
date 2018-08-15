

import * as Block from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FloatInput$WonderEditor from "../../../../../../../../atom_component/floatInput/FloatInput.js";
import * as FloatService$WonderEditor from "../../../../../../../../../service/atom/FloatService.js";
import * as StringService$WonderEditor from "../../../../../../../../../service/atom/StringService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";

var component = ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

function reducer(blurValueFunc, action, state) {
  Curry._1(blurValueFunc, state[/* componentValueForUndo */0]);
  return /* Update */Block.__(0, [/* record */[/* componentValueForUndo */action[0]]]);
}

function render(label, changeComponentValueFunc, param) {
  var send = param[/* send */3];
  return React.createElement("article", {
              className: "wonder-floatInput-base"
            }, ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(StringService$WonderEditor.floatToString(param[/* state */1][/* componentValueForUndo */0]), label, changeComponentValueFunc, (function (value) {
                        return Curry._1(send, /* TriggerBlur */[value]);
                      }), undefined, /* array */[])));
}

function make(label, getComponentValueFunc, changeComponentValueFunc, blurValueFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(label, changeComponentValueFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[/* componentValueForUndo */FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData(getComponentValueFunc), 5)];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(blurValueFunc, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
