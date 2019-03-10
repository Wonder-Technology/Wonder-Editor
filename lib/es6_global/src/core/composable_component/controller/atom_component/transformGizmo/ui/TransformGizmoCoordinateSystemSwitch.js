

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../utils/ui/ReasonReactUtils.js";

function getText(coordinateSystem) {
  if (coordinateSystem) {
    return "Local";
  } else {
    return "World";
  }
}

function _getReverse(coordinateSystem) {
  if (coordinateSystem) {
    return /* World */0;
  } else {
    return /* Local */1;
  }
}

function change(param, onChangeFunc) {
  return Curry._1(param[1], /* Change */[
              param[0][/* selectedCoordinateSystem */0] ? /* World */0 : /* Local */1,
              onChangeFunc
            ]);
}

var Method = /* module */[
  /* getText */getText,
  /* _getReverse */_getReverse,
  /* change */change
];

var component = ReasonReact.reducerComponent("TransformGizmoSwitch");

function reducer(action, state) {
  var onChangeFunc = action[1];
  var coordinateSystem = action[0];
  return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* selectedCoordinateSystem */coordinateSystem], (function (_state) {
                return Curry._1(onChangeFunc, coordinateSystem);
              }));
}

function render(isDisable, onChangeFunc, self) {
  var send = self[/* send */3];
  var state = self[/* state */1];
  return React.createElement("article", {
              key: "TransformGizmoCoordinateSystemSwitch",
              className: "transform-gizmo-coordinate-system-switch"
            }, React.createElement("button", {
                  title: "switch coordinate system",
                  disabled: isDisable,
                  onClick: (function (_e) {
                      return change(/* tuple */[
                                  state,
                                  send
                                ], onChangeFunc);
                    })
                }, DomHelper$WonderEditor.textEl(state[/* selectedCoordinateSystem */0] ? "Local" : "World")));
}

function make(defaultCoordinateSystem, isDisable, onChange, _children) {
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
              return render(isDisable, onChange, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* selectedCoordinateSystem */defaultCoordinateSystem];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
