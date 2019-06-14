

import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

var component = ReasonReact.statelessComponent("Text");

function render(param, bodyText) {
  return React.createElement("div", {
              className: "inspector-item"
            }, React.createElement("div", {
                  className: "item-header",
                  title: param[1]
                }, DomHelper$WonderEditor.textEl(param[0])), React.createElement("div", {
                  className: "item-content"
                }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl(bodyText))));
}

function make(headerText, headerTitle, bodyText, _children) {
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
          /* render */(function (_self) {
              return render(/* tuple */[
                          headerText,
                          headerTitle
                        ], bodyText);
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
