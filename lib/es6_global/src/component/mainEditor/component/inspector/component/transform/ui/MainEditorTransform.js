'use strict';

import * as Curry                                              from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                              from "react";
import * as ReasonReact                                        from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as FloatInput$WonderEditor                            from "../../../../../../../ui/component/floatInput/FloatInput.js";
import * as OperateFloatUtils$WonderEditor                     from "../utils/OperateFloatUtils.js";
import * as MainEditorStateView$WonderEditor                   from "../../../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransformView$WonderEditor               from "../logic/view/MainEditorTransformView.js";
import * as MainEditorTransformChangeEventHandler$WonderEditor from "./eventHandler/MainEditorTransformChangeEventHandler.js";

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

var changeValue = MainEditorTransformChangeEventHandler$WonderEditor.MakeMainEditorTransformChangeEventHandler[/* onChange */3];

var Method = /* module */[
  /* truncateTransformValue */truncateTransformValue,
  /* getCurrentGameObjectLocalPosition */getCurrentGameObjectLocalPosition,
  /* changeValue */changeValue
];

var component = ReasonReact.statelessComponent("MainEditorTransform");

function render(store, dispatch, transformComponent, _) {
  var match = truncateTransformValue(MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(transformComponent, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[0]], /* Some */["X"], /* Some */[Curry._2(changeValue, /* tuple */[
                            store,
                            dispatch
                          ], /* tuple */[
                            transformComponent,
                            "x"
                          ])], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[1]], /* Some */["Y"], /* Some */[Curry._2(changeValue, /* tuple */[
                            store,
                            dispatch
                          ], /* tuple */[
                            transformComponent,
                            "y"
                          ])], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[2]], /* Some */["Z"], /* Some */[Curry._2(changeValue, /* tuple */[
                            store,
                            dispatch
                          ], /* tuple */[
                            transformComponent,
                            "z"
                          ])], /* array */[])));
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
