

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as MainEditorScriptAttribute$WonderEditor from "../atom_component/attribute/ui/MainEditorScriptAttribute.js";
import * as MainEditorScriptEventFunction$WonderEditor from "../atom_component/eventFunction/ui/MainEditorScriptEventFunction.js";

var component = ReasonReact.statelessComponent("MainEditorScript");

function render(param, script, self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return React.createElement("article", {
              key: "MainEditorScript",
              className: "wonder-inspector-script"
            }, ReasonReact.element(undefined, undefined, MainEditorScriptEventFunction$WonderEditor.make(uiState, dispatchFunc, script, /* array */[])), ReasonReact.element(undefined, undefined, MainEditorScriptAttribute$WonderEditor.make(uiState, dispatchFunc, script, /* array */[])));
}

function make(uiState, dispatchFunc, script, _children) {
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
                        ], script, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
