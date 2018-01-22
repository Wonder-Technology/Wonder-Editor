'use strict';

import * as Curry                                              from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                              from "react";
import * as ReasonReact                                        from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                                      from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FloatInput$WonderEditor                            from "../../../../../../../ui/component/floatInput/FloatInput.js";
import * as OperateFloatUtils$WonderEditor                     from "../utils/OperateFloatUtils.js";
import * as MainEditorStateView$WonderEditor                   from "../../../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransformView$WonderEditor               from "../logic/view/MainEditorTransformView.js";
import * as MainEditorTransformFinishEventHandler$WonderEditor from "./eventHandler/MainEditorTransformFinishEventHandler.js";

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

var onFinish = MainEditorTransformFinishEventHandler$WonderEditor.MakeEventHandler[/* onFinish */4];

function _setCurrentGameObjectLocalPosition(transformComponent, param) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorTransformView$WonderEditor.setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                  param[0],
                  param[1],
                  param[2]
                ], MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function onChange(param, value) {
  var type_ = param[1];
  var transformComponent = param[0];
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0));
  var z = match[2];
  var y = match[1];
  var x = match[0];
  switch (type_) {
    case "x" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    value,
                    y,
                    z
                  ]);
    case "y" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    x,
                    value,
                    z
                  ]);
    case "z" : 
        return _setCurrentGameObjectLocalPosition(transformComponent, /* tuple */[
                    x,
                    y,
                    value
                  ]);
    default:
      return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("onChange", "TransformEventHandler type:" + (String(type_) + " is error"), "", "set type:" + (String(type_) + " in (x,y,z)"), "type:" + (String(type_) + "")));
  }
}

var Method = /* module */[
  /* truncateTransformValue */truncateTransformValue,
  /* getCurrentGameObjectLocalPosition */getCurrentGameObjectLocalPosition,
  /* onFinish */onFinish,
  /* _setCurrentGameObjectLocalPosition */_setCurrentGameObjectLocalPosition,
  /* onChange */onChange
];

var component = ReasonReact.statelessComponent("MainEditorTransform");

function render(store, dispatch, transformComponent, _) {
  var match = truncateTransformValue(MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
  var partial_arg = /* tuple */[
    transformComponent,
    "x"
  ];
  var partial_arg$1 = /* tuple */[
    transformComponent,
    "y"
  ];
  var partial_arg$2 = /* tuple */[
    transformComponent,
    "z"
  ];
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[0]], /* Some */["X"], /* Some */[(function (param) {
                          return onChange(partial_arg, param);
                        })], /* Some */[Curry._2(onFinish, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[1]], /* Some */["Y"], /* Some */[(function (param) {
                          return onChange(partial_arg$1, param);
                        })], /* Some */[Curry._2(onFinish, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[2]], /* Some */["Z"], /* Some */[(function (param) {
                          return onChange(partial_arg$2, param);
                        })], /* Some */[Curry._2(onFinish, /* tuple */[
                            store,
                            dispatch
                          ], /* () */0)], /* array */[])));
}

function make(store, dispatch, transformComponent, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, transformComponent, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
