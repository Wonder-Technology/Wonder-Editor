

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as MainEditorSceneTree$WonderEditor from "../composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as MainEditorLeftHeader$WonderEditor from "../atom_component/header/MainEditorLeftHeader.js";

var component = ReasonReact.statelessComponent("MainEditorLeftComponents");

function render(param, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return React.createElement("article", {
              key: "MainEditorLeftComponents",
              className: "inline-component wonder-left-components"
            }, ReasonReact.element(undefined, undefined, MainEditorLeftHeader$WonderEditor.make(uiState, dispatchFunc, /* array */[])), ReasonReact.element(undefined, undefined, MainEditorSceneTree$WonderEditor.make(uiState, dispatchFunc, /* array */[])));
}

function make(uiState, dispatchFunc, _children) {
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
                        ], self);
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
