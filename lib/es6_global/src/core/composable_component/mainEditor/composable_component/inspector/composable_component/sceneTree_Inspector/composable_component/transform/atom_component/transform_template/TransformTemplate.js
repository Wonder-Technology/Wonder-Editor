

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FloatInput$WonderEditor from "../../../../../../../../../../atom_component/floatInput/FloatInput.js";
import * as StringService$WonderEditor from "../../../../../../../../../../../service/atom/StringService.js";

var component = ReasonReact.reducerComponent("TransformTemplate");

function reducer(param, param$1, action, state) {
  var blurEventFunc = param$1[1];
  var transformComponent = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  switch (action.tag | 0) {
    case 0 : 
        Curry._3(blurEventFunc, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */action[0],
                    /* y */state[/* y */1],
                    /* z */state[/* z */2]
                  ]]);
    case 1 : 
        Curry._3(blurEventFunc, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */action[0],
                    /* z */state[/* z */2]
                  ]]);
    case 2 : 
        Curry._3(blurEventFunc, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */state[/* y */1],
                    /* z */action[0]
                  ]]);
    
  }
}

function render(param, param$1, param$2, param$3) {
  var send = param$3[/* send */3];
  var state = param$3[/* state */1];
  var canBeZero = param$1[1];
  var transformComponent = param$1[0];
  return React.createElement("article", {
              className: "wonder-transform-template"
            }, ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(StringService$WonderEditor.floatToString(state[/* x */0]), "X", Curry._1(param$2[0], transformComponent), (function (value) {
                        return Curry._1(send, /* TransformBlurX */Block.__(0, [value]));
                      }), canBeZero, /* array */[])), ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(StringService$WonderEditor.floatToString(state[/* y */1]), "Y", Curry._1(param$2[1], transformComponent), (function (value) {
                        return Curry._1(send, /* TransformBlurY */Block.__(1, [value]));
                      }), canBeZero, /* array */[])), ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(StringService$WonderEditor.floatToString(state[/* z */2]), "Z", Curry._1(param$2[2], transformComponent), (function (value) {
                        return Curry._1(send, /* TransformBlurZ */Block.__(2, [value]));
                      }), canBeZero, /* array */[])));
}

function make(store, dispatchFunc, transformComponent, changeXFunc, changeYFunc, changeZFunc, getDataFunc, blurEventFunc, canBeZero, _children) {
  var partial_arg = /* tuple */[
    transformComponent,
    blurEventFunc
  ];
  var partial_arg$1 = /* tuple */[
    store,
    dispatchFunc
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
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], /* tuple */[
                          transformComponent,
                          canBeZero
                        ], /* tuple */[
                          changeXFunc,
                          changeYFunc,
                          changeZFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              var match = Curry._1(getDataFunc, transformComponent);
              return /* record */[
                      /* x */match[0],
                      /* y */match[1],
                      /* z */match[2]
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg$1, partial_arg, param, param$1);
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
