

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as FloatInput$WonderEditor from "./FloatInput.js";
import * as StringService$WonderEditor from "../../../service/atom/StringService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";

var component = ReasonReact.reducerComponent("ThreeFloatInput");

function reducer(param, param$1, action, state) {
  var dragDropFunc = param$1[2];
  var blurEventFunc = param$1[1];
  var gameObjectComponent = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  switch (action.tag | 0) {
    case 0 : 
        Curry._3(blurEventFunc, /* tuple */[
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
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
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
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
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */state[/* y */1],
                    /* z */action[0]
                  ]]);
    case 3 : 
        Curry._3(dragDropFunc, /* tuple */[
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */action[0],
                    /* y */state[/* y */1],
                    /* z */state[/* z */2]
                  ]]);
    case 4 : 
        Curry._3(dragDropFunc, /* tuple */[
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
              state[/* x */0],
              state[/* y */1],
              state[/* z */2]
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */action[0],
                    /* z */state[/* z */2]
                  ]]);
    case 5 : 
        Curry._3(dragDropFunc, /* tuple */[
              uiState,
              dispatchFunc
            ], gameObjectComponent, /* tuple */[
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
  var canBeZero = param$1[2];
  var gameObjectComponent = param$1[0];
  return React.createElement("article", {
              className: "inspector-item wonder-three-float-input"
            }, React.createElement("div", {
                  className: "item-header"
                }, DomHelper$WonderEditor.textEl(param$1[1])), React.createElement("div", {
                  className: "item-content"
                }, ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(canBeZero, (function (value) {
                            return Curry._1(send, /* DragDropX */Block.__(3, [value]));
                          }), StringService$WonderEditor.floatToString(state[/* x */0]), "X", Curry._1(param$2[0], gameObjectComponent), (function (value) {
                            return Curry._1(send, /* BlurX */Block.__(0, [value]));
                          }), /* array */[])), ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(canBeZero, (function (value) {
                            return Curry._1(send, /* DragDropY */Block.__(4, [value]));
                          }), StringService$WonderEditor.floatToString(state[/* y */1]), "Y", Curry._1(param$2[1], gameObjectComponent), (function (value) {
                            return Curry._1(send, /* BlurY */Block.__(1, [value]));
                          }), /* array */[])), ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(canBeZero, (function (value) {
                            return Curry._1(send, /* DragDropZ */Block.__(5, [value]));
                          }), StringService$WonderEditor.floatToString(state[/* z */2]), "Z", Curry._1(param$2[2], gameObjectComponent), (function (value) {
                            return Curry._1(send, /* BlurZ */Block.__(2, [value]));
                          }), /* array */[]))));
}

function make(uiState, dispatchFunc, label, gameObjectComponent, changeXFunc, changeYFunc, changeZFunc, getDataFunc, blurEventFunc, dragDropFunc, canBeZero, _children) {
  var partial_arg = /* tuple */[
    gameObjectComponent,
    blurEventFunc,
    dragDropFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
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
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          gameObjectComponent,
                          label,
                          canBeZero
                        ], /* tuple */[
                          changeXFunc,
                          changeYFunc,
                          changeZFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              var match = StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getDataFunc, gameObjectComponent));
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
