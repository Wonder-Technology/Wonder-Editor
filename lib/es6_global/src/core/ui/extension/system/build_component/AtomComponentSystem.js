'use strict';

import * as React                   from "react";
import * as ReasonReact             from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog           from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor  from "../../../../external/DomHelper.js";
import * as FloatInput$WonderEditor from "../../../component/floatInput/FloatInput.js";

function buildFloatInput(label, defaultValue, onChange) {
  return ReasonReact.element(/* None */0, /* None */0, FloatInput$WonderEditor.make(defaultValue, label, onChange, /* None */0, /* array */[]));
}

function buildButton(text, _) {
  if (text) {
    return React.createElement("button", undefined, DomHelper$WonderEditor.textEl(text[0]));
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("buildButton", "the button component: text is empty", "", "check extension->panelExtension->render->name->button should add text", "button text: null"));
    return null;
  }
}

function buildDiv(text) {
  if (text) {
    return React.createElement("div", {
                key: DomHelper$WonderEditor.getRandomKey(/* () */0)
              }, DomHelper$WonderEditor.textEl(text[0]));
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("buildDiv", "the div component: text is empty", "", "check extension->panelExtension->render->name->div should add text", "div text: null"));
    return null;
  }
}

export {
  buildFloatInput ,
  buildButton     ,
  buildDiv        ,
  
}
/* react Not a pure module */
