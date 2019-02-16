

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as ParseComponentUtils$WonderEditor from "../../../extension/utils/parse_component/ParseComponentUtils.js";

var component = ReasonReact.statelessComponent("UserExtension");

function render(record, name, uiState, _) {
  Curry._1(record[/* willRender */4], /* () */0);
  return React.createElement("article", {
              key: "panelExtension"
            }, ParseComponentUtils$WonderEditor.buildSpecificComponents(record[/* render */2], name, uiState));
}

function make(record, name, uiState, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              return Curry._1(record[/* didMount */5], /* () */0);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(record, name, uiState, self);
            }),
          /* initialState */(function () {
              return Curry._1(record[/* initialState */3], /* () */0);
            }),
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
