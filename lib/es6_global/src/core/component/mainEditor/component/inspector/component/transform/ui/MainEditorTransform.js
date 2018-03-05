'use strict';

import * as Curry                                                    from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                                    from "react";
import * as Caml_obj                                                 from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                              from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as FloatInput$WonderEditor                                  from "../../../../../../../ui/component/floatInput/FloatInput.js";
import * as StateFacade$WonderEditor                                 from "../../../../../../../../facade/StateFacade.js";
import * as OperateFloatUtils$WonderEditor                           from "../utils/OperateFloatUtils.js";
import * as MainEditorTransformView$WonderEditor                     from "../logic/view/MainEditorTransformView.js";
import * as MainEditorTransformMarkRedoUndoEventHandler$WonderEditor from "./eventHandler/MainEditorTransformMarkRedoUndoEventHandler.js";

function truncateTransformValue(param) {
  return /* tuple */[
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[0], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[1], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[2], 6)
        ];
}

var onMarkRedoUndo = MainEditorTransformMarkRedoUndoEventHandler$WonderEditor.MakeEventHandler[/* onMarkRedoUndo */3];

function getCurrentGameObjectLocalPosition(transformComponent) {
  return StateFacade$WonderEditor.getState((function (param) {
                return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, param);
              }));
}

function _setCurrentGameObjectLocalPosition(transformComponent, param) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg_002 = param[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  return StateFacade$WonderEditor.getAndSetState((function (param) {
                return MainEditorTransformView$WonderEditor.setCurrentGameObjectLocalPosition(transformComponent, partial_arg, param);
              }));
}

function changeX(transformComponent, value) {
  var match = StateFacade$WonderEditor.getState((function (param) {
          return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, param);
        }));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              value,
              match[1],
              match[2]
            ]);
}

function changeY(transformComponent, value) {
  var match = StateFacade$WonderEditor.getState((function (param) {
          return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, param);
        }));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              match[0],
              value,
              match[2]
            ]);
}

function changeZ(transformComponent, value) {
  var match = StateFacade$WonderEditor.getState((function (param) {
          return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, param);
        }));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              match[0],
              match[1],
              value
            ]);
}

var Method = /* module */[
  /* truncateTransformValue */truncateTransformValue,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* getCurrentGameObjectLocalPosition */getCurrentGameObjectLocalPosition,
  /* _setCurrentGameObjectLocalPosition */_setCurrentGameObjectLocalPosition,
  /* changeX */changeX,
  /* changeY */changeY,
  /* changeZ */changeZ
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorTransform");

function render(store, dispatch, transformComponent, self) {
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[self[/* retainedProps */5][/* x */0]], /* Some */["X"], /* Some */[(function (param) {
                          return changeX(transformComponent, param);
                        })], /* Some */[Curry._2(onMarkRedoUndo, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[self[/* retainedProps */5][/* y */1]], /* Some */["Y"], /* Some */[(function (param) {
                          return changeY(transformComponent, param);
                        })], /* Some */[Curry._2(onMarkRedoUndo, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[self[/* retainedProps */5][/* z */2]], /* Some */["Z"], /* Some */[(function (param) {
                          return changeZ(transformComponent, param);
                        })], /* Some */[Curry._2(onMarkRedoUndo, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, transformComponent, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, transformComponent, self);
    });
  var match = truncateTransformValue(StateFacade$WonderEditor.getState((function (param) {
              return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, param);
            })));
  newrecord[/* retainedProps */11] = /* record */[
    /* x */match[0],
    /* y */match[1],
    /* z */match[2]
  ];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/* component Not a pure module */
