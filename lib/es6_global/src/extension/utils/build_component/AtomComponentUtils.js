

import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../core/utils/console/LogUtils.js";
import * as DomHelper$WonderEditor from "../../../core/external/DomHelper.js";
import * as FloatInput$WonderEditor from "../../../core/atom_component/floatInput/FloatInput.js";

function buildFloatInput(label, defaultValue, onChange) {
  return ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make(defaultValue, label, onChange, undefined, undefined, /* array */[]));
}

function buildButton(text, _) {
  if (text !== undefined) {
    return React.createElement("button", undefined, DomHelper$WonderEditor.textEl(text));
  } else {
    Log$WonderLog.error(LogUtils$WonderEditor.buildErrorMessage("the button component: text is empty", "", "check extension->panelExtension->render->name->button should add text", "button text: null"));
    return null;
  }
}

function buildDiv(text) {
  if (text !== undefined) {
    return React.createElement("div", {
                key: DomHelper$WonderEditor.getRandomKey(/* () */0)
              }, DomHelper$WonderEditor.textEl(text));
  } else {
    Log$WonderLog.error(LogUtils$WonderEditor.buildErrorMessage("the div component: text is empty", "", "check extension->panelExtension->render->name->div should add text", "div text: null"));
    return null;
  }
}

export {
  buildFloatInput ,
  buildButton ,
  buildDiv ,
  
}
/* react Not a pure module */
