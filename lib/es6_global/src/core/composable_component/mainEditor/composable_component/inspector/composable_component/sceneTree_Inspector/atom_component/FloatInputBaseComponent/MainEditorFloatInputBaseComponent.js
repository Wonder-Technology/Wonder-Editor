

import * as Block from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FloatInput$WonderEditor from "../../../../../../../../atom_component/floatInput/FloatInput.js";
import * as FloatService$WonderEditor from "../../../../../../../../../service/atom/FloatService.js";
import * as StringService$WonderEditor from "../../../../../../../../../service/atom/StringService.js";

var component = ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

function reducer(param, action, state) {
  if (action.tag) {
    Curry._1(param[1], state[/* componentValue */0]);
    return /* Update */Block.__(0, [/* record */[/* componentValue */action[0]]]);
  } else {
    Curry._1(param[0], state[/* componentValue */0]);
    return /* Update */Block.__(0, [/* record */[/* componentValue */action[0]]]);
  }
}

function render(label, title, changeComponentValueFunc, param) {
  var send = param[/* send */3];
  return ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(undefined, (function (value) {
                    return Curry._1(send, /* TriggerDragDrop */Block.__(1, [value]));
                  }), StringService$WonderEditor.floatToString(param[/* state */1][/* componentValue */0]), label, changeComponentValueFunc, (function (value) {
                    return Curry._1(send, /* TriggerBlur */Block.__(0, [value]));
                  }), title !== undefined ? title : "", /* array */[]));
}

function make(dragDropFunc, label, defaultValue, changeComponentValueFunc, blurValueFunc, title, _children) {
  var partial_arg = /* tuple */[
    blurValueFunc,
    dragDropFunc
  ];
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
              return render(label, title, changeComponentValueFunc, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* componentValue */FloatService$WonderEditor.truncateFloatValue(defaultValue, 5)];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
