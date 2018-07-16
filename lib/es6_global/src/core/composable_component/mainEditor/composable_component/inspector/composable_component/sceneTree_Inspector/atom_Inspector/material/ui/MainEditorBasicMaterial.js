

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as MainEditorBasicMaterialColor$WonderEditor from "../atom_component/MainEditorBasicMaterialColor.js";
import * as MainEditorBasicMaterialTexture$WonderEditor from "../atom_component/MainEditorBasicMaterialTexture.js";

var component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

function render(param, materialComponent, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              className: "wonder-inspector-material"
            }, ReasonReact.element(/* None */0, /* None */0, MainEditorBasicMaterialColor$WonderEditor.make(store, dispatchFunc, materialComponent, /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorBasicMaterialTexture$WonderEditor.make(store, dispatchFunc, materialComponent, /* array */[])));
}

function make(store, dispatchFunc, materialComponent, _) {
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
                          store,
                          dispatchFunc
                        ], materialComponent, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
