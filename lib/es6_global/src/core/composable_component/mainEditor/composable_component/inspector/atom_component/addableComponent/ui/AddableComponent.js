

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_list from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_list.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as AddableComponentAddComponentEventHandler$WonderEditor from "./eventHandler/AddableComponentAddComponentEventHandler.js";

var addSpecificComponent = AddableComponentAddComponentEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildGameObjectAddableComponent(param, currentSceneTreeNode, componentList) {
  var dispatchFunc = param[1];
  var store = param[0];
  var match = Js_list.length(componentList);
  if (match !== 0) {
    return Js_list.foldLeft((function (componentArray, type_) {
                  return ArrayService$WonderEditor.push(React.createElement("div", {
                                  key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                                  onClick: (function () {
                                      return Curry._3(addSpecificComponent, /* tuple */[
                                                  store,
                                                  dispatchFunc
                                                ], type_, currentSceneTreeNode);
                                    })
                                }, DomHelper$WonderEditor.textEl(type_)), componentArray);
                }), /* array */[], componentList);
  } else {
    return /* array */[];
  }
}

function toggleAddableComponent() {
  return /* ToggleAddableComponent */0;
}

var Method = /* module */[
  /* addSpecificComponent */addSpecificComponent,
  /* buildGameObjectAddableComponent */buildGameObjectAddableComponent,
  /* toggleAddableComponent */toggleAddableComponent
];

var component = ReasonReact.reducerComponent("addableComponent");

function reducer(_, state) {
  return /* Update */Block.__(0, [/* record */[
              /* isShowAddableComponent */!state[/* isShowAddableComponent */0],
              /* isListEmpty */state[/* isListEmpty */1]
            ]]);
}

function render(param, currentSceneTreeNode, addableComponentList, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var match = state[/* isShowAddableComponent */0];
  return React.createElement("article", {
              className: "wonder-addable-component"
            }, React.createElement("button", {
                  disabled: state[/* isListEmpty */1],
                  onClick: (function () {
                      return Curry._1(send, /* ToggleAddableComponent */0);
                    })
                }, DomHelper$WonderEditor.textEl("add component")), match ? buildGameObjectAddableComponent(/* tuple */[
                    param[0],
                    param[1]
                  ], currentSceneTreeNode, addableComponentList) : null);
}

function make(reduxTuple, currentSceneTreeNode, addableComponentList, _) {
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
              return render(reduxTuple, currentSceneTreeNode, addableComponentList, self);
            }),
          /* initialState */(function () {
              var match = Js_list.length(addableComponentList);
              if (match !== 0) {
                return /* record */[
                        /* isShowAddableComponent */false,
                        /* isListEmpty */false
                      ];
              } else {
                return /* record */[
                        /* isShowAddableComponent */false,
                        /* isListEmpty */true
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
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
