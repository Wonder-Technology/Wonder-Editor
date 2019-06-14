

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as AddableComponentRemoveComponentEventHandler$WonderEditor from "../../addableComponent/ui/eventHandler/AddableComponentRemoveComponentEventHandler.js";

var removeComponent = AddableComponentRemoveComponentEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function changeShowComponentByType(param, type_, value) {
  return Curry._1(param[1], [
              AppStore$WonderEditor.InspectorAction,
              /* SetShowComponent */[
                type_,
                value
              ]
            ]);
}

var Method = /* module */[
  /* removeComponent */removeComponent,
  /* changeShowComponentByType */changeShowComponentByType
];

var component = ReasonReact.reducerComponent("ComponentBox");

function reducer(reduxTuple, type_, action) {
  return (function (state) {
      var match = state[/* isShowComponent */0];
      if (match) {
        return ReasonReactUtils$WonderEditor.sideEffects((function (param) {
                      return changeShowComponentByType(reduxTuple, type_, false);
                    }));
      } else {
        return ReasonReactUtils$WonderEditor.sideEffects((function (param) {
                      return changeShowComponentByType(reduxTuple, type_, true);
                    }));
      }
    });
}

function render(reduxTuple, param, param$1, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var title = param$1[3];
  var type_ = param$1[2];
  var gameObject = param$1[0];
  var match = state[/* isShowComponent */0];
  return React.createElement("article", {
              className: "componentBox-component"
            }, React.createElement("div", {
                  className: "component-header"
                }, React.createElement("div", {
                      className: "header-triangle",
                      onClick: (function (_e) {
                          return Curry._1(send, /* ToggleShowComponent */0);
                        })
                    }, React.createElement("span", {
                          className: state[/* triangleDirection */1]
                        })), React.createElement("div", {
                      className: "header-title",
                      title: title !== undefined ? title : ""
                    }, DomHelper$WonderEditor.textEl(param[0])), param[1] ? React.createElement("div", {
                        className: "header-close"
                      }, React.createElement("img", {
                            src: "./public/img/close.png",
                            onClick: (function (_e) {
                                return Curry._3(removeComponent, reduxTuple, gameObject, type_);
                              })
                          })) : null), match ? param$1[1] : null);
}

function make(reduxTuple, header, isDisposable, gameObject, gameObjectUIComponent, isShowComponent, type_, title, _children) {
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
              return render(reduxTuple, /* tuple */[
                          header,
                          isDisposable
                        ], /* tuple */[
                          gameObject,
                          gameObjectUIComponent,
                          type_,
                          title
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isShowComponent */isShowComponent,
                      /* triangleDirection */isShowComponent ? "triangle-bottom" : "triangle-right"
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(reduxTuple, type_, param);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
