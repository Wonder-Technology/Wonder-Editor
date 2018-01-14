'use strict';

import * as React                                from "react";
import * as ReasonReact                          from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as FloatInput$WonderEditor              from "../../../../../../../ui/component/floatInput/FloatInput.js";
import * as OperateFloatUtils$WonderEditor       from "../utils/OperateFloatUtils.js";
import * as MainEditorStateView$WonderEditor     from "../../../../../logic/view/MainEditorStateView.js";
import * as MainEditorTransformView$WonderEditor from "../logic/view/MainEditorTransformView.js";

function truncateTransformValue(param) {
  return /* tuple */[
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[0], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[1], 6),
          OperateFloatUtils$WonderEditor.truncateFloatValue(param[2], 6)
        ];
}

function getCurrentGameObjectLocalPosition() {
  return MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(MainEditorStateView$WonderEditor.prepareState(/* () */0));
}

function setCurrentGameObjectLocalPosition(x, y, z) {
  return MainEditorStateView$WonderEditor.finishState(MainEditorTransformView$WonderEditor.setCurrentGameObjectLocalPosition(/* tuple */[
                  x,
                  y,
                  z
                ], MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function changeX(value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return setCurrentGameObjectLocalPosition(value, match[1], match[2]);
}

function changeY(value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return setCurrentGameObjectLocalPosition(match[0], value, match[2]);
}

function changeZ(value) {
  var match = MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(MainEditorStateView$WonderEditor.prepareState(/* () */0));
  return setCurrentGameObjectLocalPosition(match[0], match[1], value);
}

var Method = /* module */[
  /* truncateTransformValue */truncateTransformValue,
  /* getCurrentGameObjectLocalPosition */getCurrentGameObjectLocalPosition,
  /* setCurrentGameObjectLocalPosition */setCurrentGameObjectLocalPosition,
  /* changeX */changeX,
  /* changeY */changeY,
  /* changeZ */changeZ
];

var component = ReasonReact.statelessComponent("MainEditorTransform");

function render(_, _$1, _$2) {
  var match = truncateTransformValue(MainEditorTransformView$WonderEditor.getCurrentGameObjectLocalPosition(MainEditorStateView$WonderEditor.prepareState(/* () */0)));
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[0]], /* Some */["X"], /* Some */[changeX], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[1]], /* Some */["Y"], /* Some */[changeY], /* array */[])), ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(/* Some */[match[2]], /* Some */["Z"], /* Some */[changeZ], /* array */[])));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
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
