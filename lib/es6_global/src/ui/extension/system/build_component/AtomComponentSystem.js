'use strict';

import * as React                   from "react";
import * as ReasonReact             from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor  from "../../../../external/DomHelper.js";
import * as FloatInput$WonderEditor from "../../../component/floatInput/FloatInput.js";

function buildFloatInput(label, defaultValue, onChange) {
  return ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(defaultValue, label, onChange, /* array */[]));
}

function buildButton(text, _) {
  if (text) {
    return React.createElement("button", undefined, DomHelper$WonderEditor.textEl(text[0]));
  } else {
    console.warn("button component:the text is empty");
    return null;
  }
}

function buildDiv(text) {
  if (text) {
    return React.createElement("div", {
                key: DomHelper$WonderEditor.getRandomKey(/* () */0)
              }, DomHelper$WonderEditor.textEl(text[0]));
  } else {
    console.warn("div component:the text is empty");
    return null;
  }
}

export {
  buildFloatInput ,
  buildButton     ,
  buildDiv        ,
  
}
/* react Not a pure module */
