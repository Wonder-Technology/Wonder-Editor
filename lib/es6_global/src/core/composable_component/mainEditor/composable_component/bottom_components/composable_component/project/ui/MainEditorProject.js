

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as MainEditorAsset$WonderEditor from "../composable_component/asset/ui/MainEditorAsset.js";

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorProject");

function render(param, _self) {
  return React.createElement("article", {
              key: "MainEditorProject",
              className: "wonder-bottom-project"
            }, ReasonReact.element(undefined, undefined, MainEditorAsset$WonderEditor.make(param[0], param[1], /* array */[])));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* Project */4, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(store, dispatchFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(store)],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  render ,
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
