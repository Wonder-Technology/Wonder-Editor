

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as MainEditorCameraView$WonderEditor from "../atom_component/cameraView/ui/MainEditorCameraView.js";
import * as MainEditorCameraProjection$WonderEditor from "../atom_component/cameraProjection/ui/MainEditorCameraProjection.js";

var component = ReasonReact.statelessComponent("MainEditorCameraGroup");

function render(param, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  return React.createElement("article", {
              key: "MainEditorCameraGroup",
              className: "wonder-camera-group"
            }, React.createElement("div", {
                  className: ""
                }, React.createElement("div", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl("CameView : "))), ReasonReact.element(undefined, undefined, MainEditorCameraView$WonderEditor.make(store, dispatchFunc, /* array */[])), React.createElement("hr", undefined), React.createElement("div", {
                  className: ""
                }, React.createElement("div", {
                      className: ""
                    }, DomHelper$WonderEditor.textEl("Projection : ")), ReasonReact.element(undefined, undefined, MainEditorCameraProjection$WonderEditor.make(store, dispatchFunc, /* array */[]))));
}

function make(store, dispatchFunc, _) {
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
                        ], self);
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
