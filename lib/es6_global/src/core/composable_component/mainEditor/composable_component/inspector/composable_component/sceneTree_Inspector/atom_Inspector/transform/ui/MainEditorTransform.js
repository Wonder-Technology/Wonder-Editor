

import * as Block from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_format from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FloatInput$WonderEditor from "../../../../../../../../../atom_component/floatInput/FloatInput.js";
import * as TransformUtils$WonderEditor from "../utils/TransformUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";
import * as MainEditorTransformMarkRedoUndoEventHandler$WonderEditor from "./eventHandler/MainEditorTransformMarkRedoUndoEventHandler.js";

var blurTransformEvent = MainEditorTransformMarkRedoUndoEventHandler$WonderEditor.MakeEventHandler[/* onMarkRedoUndoByStackFirst */3];

function _setCurrentSceneTreeNodeLocalPosition(transformComponent, param) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg_002 = param[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[transformComponent],
                /* type_ : Transform */1
              ]], (function (param, param$1) {
                return TransformEngineService$WonderEditor.setLocalPosition(partial_arg, param, param$1);
              }));
}

function changeX(transformComponent, value) {
  var match = TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent);
  Log$WonderLog.print(/* tuple */[
        "change x",
        value
      ]);
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              value,
              match[1],
              match[2]
            ]);
}

function changeY(transformComponent, value) {
  var match = TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent);
  var x = match[0];
  Log$WonderLog.print(/* tuple */[
        "change y",
        /* tuple */[
          x,
          value
        ]
      ]);
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              x,
              value,
              match[2]
            ]);
}

function changeZ(transformComponent, value) {
  var match = TransformUtils$WonderEditor.getSceneTreeNodeLocalPosition(transformComponent);
  return _setCurrentSceneTreeNodeLocalPosition(transformComponent, /* tuple */[
              match[0],
              match[1],
              value
            ]);
}

var Method = /* module */[
  /* blurTransformEvent */blurTransformEvent,
  /* _setCurrentSceneTreeNodeLocalPosition */_setCurrentSceneTreeNodeLocalPosition,
  /* changeX */changeX,
  /* changeY */changeY,
  /* changeZ */changeZ
];

var component = ReasonReact.reducerComponent("MainEditorTransform");

function reducer(param, transformComponent, action, state) {
  var dispatchFunc = param[1];
  var store = param[0];
  switch (action.tag | 0) {
    case 0 : 
        Curry._3(blurTransformEvent, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              Caml_format.caml_float_of_string(state[/* x */0]),
              Caml_format.caml_float_of_string(state[/* y */1]),
              Caml_format.caml_float_of_string(state[/* z */2])
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */Pervasives.string_of_float(action[0]),
                    /* y */state[/* y */1],
                    /* z */state[/* z */2]
                  ]]);
    case 1 : 
        Curry._3(blurTransformEvent, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              Caml_format.caml_float_of_string(state[/* x */0]),
              Caml_format.caml_float_of_string(state[/* y */1]),
              Caml_format.caml_float_of_string(state[/* z */2])
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */Pervasives.string_of_float(action[0]),
                    /* z */state[/* z */2]
                  ]]);
    case 2 : 
        Curry._3(blurTransformEvent, /* tuple */[
              store,
              dispatchFunc
            ], transformComponent, /* tuple */[
              Caml_format.caml_float_of_string(state[/* x */0]),
              Caml_format.caml_float_of_string(state[/* y */1]),
              Caml_format.caml_float_of_string(state[/* z */2])
            ]);
        return /* Update */Block.__(0, [/* record */[
                    /* x */state[/* x */0],
                    /* y */state[/* y */1],
                    /* z */Pervasives.string_of_float(action[0])
                  ]]);
    
  }
}

function render(_, transformComponent, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              className: "wonder-inspector-transform"
            }, ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[state[/* x */0]], /* Some */["X"], /* Some */[(function (param) {
                          return changeX(transformComponent, param);
                        })], /* Some */[(function (value) {
                          return Curry._1(send, /* TransformBlurX */Block.__(0, [value]));
                        })], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[state[/* y */1]], /* Some */["Y"], /* Some */[(function (param) {
                          return changeY(transformComponent, param);
                        })], /* Some */[(function (value) {
                          return Curry._1(send, /* TransformBlurY */Block.__(1, [value]));
                        })], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[state[/* z */2]], /* Some */["Z"], /* Some */[(function (param) {
                          return changeZ(transformComponent, param);
                        })], /* Some */[(function (value) {
                          return Curry._1(send, /* TransformBlurZ */Block.__(2, [value]));
                        })], /* array */[])));
}

function make(store, dispatchFunc, transformComponent, _) {
  var partial_arg = /* tuple */[
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
                        ], transformComponent, self);
            }),
          /* initialState */(function () {
              var match = TransformUtils$WonderEditor.getCurrentTransformData(transformComponent);
              var z = match[2];
              var y = match[1];
              var x = match[0];
              Log$WonderLog.print("init state");
              Log$WonderLog.print(/* tuple */[
                    x,
                    y,
                    z
                  ]);
              return /* record */[
                      /* x */x,
                      /* y */y,
                      /* z */z
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, transformComponent, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
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
