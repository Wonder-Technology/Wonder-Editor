'use strict';

import * as Curry                                                    from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                                    from "react";
import * as Caml_obj                                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                              from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as FloatInput$WonderEditor                                  from "../../../../../../../ui/component/floatInput/FloatInput.js";
import * as OperateFloatUtils$WonderEditor                           from "../utils/OperateFloatUtils.js";
import * as MainEditorStateView$WonderEditor                         from "../../../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransformView$WonderEditor                     from "../logic/view/MainEditorTransformView.js";
import * as MainEditorTransformMarkRedoUndoEventHandler$WonderEditor from "./eventHandler/MainEditorTransformMarkRedoUndoEventHandler.js";

function truncateTransformValue(param) {
  return /* tuple */[
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[0], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[1], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[2], 6)
        ];
}

function getCurrentGameObjectLocalPosition(transformComponent) {
  return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
}

var onMarkRedoUndo = MainEditorTransformMarkRedoUndoEventHandler$WonderEditor.MakeEventHandler[/* onMarkRedoUndo */2];

function _setCurrentGameObjectLocalPosition(transformComponent, param) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorTransformView$WonderEditor.setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                  param[0],
                  param[1],
                  param[2]
                ], MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function changeX(transformComponent, value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              value,
              match[1],
              match[2]
            ]);
}

function changeY(transformComponent, value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              match[0],
              value,
              match[2]
            ]);
}

function changeZ(transformComponent, value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
              match[0],
              match[1],
              value
            ]);
}

var Method = /* module */[
  /* truncateTransformValue */truncateTransformValue,
  /* getCurrentGameObjectLocalPosition */getCurrentGameObjectLocalPosition,
  /* onMarkRedoUndo */onMarkRedoUndo,
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
  var match = truncateTransformValue(MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
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
