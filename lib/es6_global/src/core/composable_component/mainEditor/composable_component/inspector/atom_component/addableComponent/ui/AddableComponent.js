

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as Index from "antd/lib/message/index";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AddableComponentBox$WonderEditor from "../atom_component/addableComponentBox/ui/AddableComponentBox.js";
import * as OperateComponentUtils$WonderEditor from "../../../utils/OperateComponentUtils.js";
import * as InspectorHasComponentUtils$WonderEditor from "../../../utils/InspectorHasComponentUtils.js";
import * as AddableComponentAddComponentEventHandler$WonderEditor from "./eventHandler/AddableComponentAddComponentEventHandler.js";

function addSpecificComponent(param, currentSceneTreeNode, type_) {
  var type_$1 = OperateComponentUtils$WonderEditor.getInspectorComponentType(type_);
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return InspectorHasComponentUtils$WonderEditor.isHasSpecificComponentByType(type_$1, currentSceneTreeNode, param);
        }));
  if (match) {
    var messageObj = Index.default;
    return messageObj.warn("the game object already have this component !", 4);
  } else {
    return Curry._3(AddableComponentAddComponentEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], currentSceneTreeNode, type_$1);
  }
}

function buildGameObjectAddableComponent(param, currentSceneTreeNode, componentArr) {
  var dispatchFunc = param[1];
  var store = param[0];
  return componentArr.map((function (param) {
                var partial_arg = /* tuple */[
                  store,
                  dispatchFunc
                ];
                return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, AddableComponentBox$WonderEditor.make(param[/* type_ */0], param[/* components */1], (function (param) {
                                  return addSpecificComponent(partial_arg, currentSceneTreeNode, param);
                                }), /* array */[]));
              }));
}

var Method = /* module */[
  /* addSpecificComponent */addSpecificComponent,
  /* buildGameObjectAddableComponent */buildGameObjectAddableComponent
];

var component = ReasonReact.reducerComponent("AddableComponent");

function reducer(_, state) {
  return /* Update */Block.__(0, [/* record */[/* isShowAddableComponent */!state[/* isShowAddableComponent */0]]]);
}

function render(param, currentSceneTreeNode, addableComponentList, param$1) {
  var send = param$1[/* send */3];
  var match = param$1[/* state */1][/* isShowAddableComponent */0];
  return React.createElement("article", {
              className: "wonder-addable-component"
            }, React.createElement("div", {
                  className: "addable-component-content"
                }, React.createElement("button", {
                      className: "addable-btn",
                      onClick: (function () {
                          return Curry._1(send, /* ToggleAddableComponent */0);
                        })
                    }, DomHelper$WonderEditor.textEl("Add Component")), match ? React.createElement("div", {
                        className: "component-list"
                      }, buildGameObjectAddableComponent(/* tuple */[
                            param[0],
                            param[1]
                          ], currentSceneTreeNode, addableComponentList)) : null));
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
              return /* record */[/* isShowAddableComponent */false];
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
