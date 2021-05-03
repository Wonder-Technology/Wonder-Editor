

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomUtils$WonderEditor from "../../../../../../../utils/ui/DomUtils.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor from "../../../../../../../utils/event/EventUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as AddableComponentBox$WonderEditor from "../atom_component/addableComponentBox/ui/AddableComponentBox.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as OperateComponentUtils$WonderEditor from "../../../utils/OperateComponentUtils.js";
import * as InspectorHasComponentUtils$WonderEditor from "../../../utils/InspectorHasComponentUtils.js";
import * as AddableComponentAddComponentEventHandler$WonderEditor from "./eventHandler/AddableComponentAddComponentEventHandler.js";

function addSpecificComponent(param, currentSceneTreeNode, type_) {
  var type_$1 = OperateComponentUtils$WonderEditor.getInspectorComponentType(type_, StateEditorService$WonderEditor.getState(/* () */0));
  var match = StateLogicService$WonderEditor.getStateToGetData((function (param) {
          return InspectorHasComponentUtils$WonderEditor.isHasSpecificComponentByType(type_$1, currentSceneTreeNode, param);
        }));
  if (match) {
    var partial_arg = LanguageUtils$WonderEditor.getMessageLanguageDataByType("add-component-duplicate", StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType));
    return StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                }));
  } else {
    return Curry._3(AddableComponentAddComponentEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                param[0],
                param[1]
              ], currentSceneTreeNode, type_$1);
  }
}

function buildGameObjectAddableComponent(param, currentSceneTreeNode, componentArr) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return componentArr.map((function (param) {
                var partial_arg = /* tuple */[
                  uiState,
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

function reducer(action, state) {
  if (typeof action === "number") {
    if (action !== 0) {
      return /* Update */Block.__(0, [/* record */[
                  /* isShowAddableComponent */!state[/* isShowAddableComponent */0],
                  /* streamSubscription */state[/* streamSubscription */1]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isShowAddableComponent */false,
                  /* streamSubscription */state[/* streamSubscription */1]
                ]]);
    }
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* isShowAddableComponent */state[/* isShowAddableComponent */0],
                /* streamSubscription */Caml_option.some(action[0])
              ]]);
  }
}

function render(param, currentSceneTreeNode, addableComponentList, param$1) {
  var send = param$1[/* send */3];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = param$1[/* state */1][/* isShowAddableComponent */0];
  return React.createElement("article", {
              className: "wonder-addable-component"
            }, React.createElement("div", {
                  className: "addable-component-content"
                }, React.createElement("div", {
                      className: "content-btn"
                    }, React.createElement("button", {
                          className: "addable-btn",
                          onClick: (function (_e) {
                              return Curry._1(send, /* ToggleAddableComponent */1);
                            })
                        }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getInspectorLanguageDataByType("add-component", languageType)))), match ? React.createElement("div", {
                        className: "content-components"
                      }, React.createElement("div", {
                            className: "component-list"
                          }, buildGameObjectAddableComponent(/* tuple */[
                                param[0],
                                param[1]
                              ], currentSceneTreeNode, addableComponentList))) : null));
}

function make(reduxTuple, currentSceneTreeNode, addableComponentList, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return EventUtils$WonderEditor.bindEventInDidMount((function (e) {
                            var target = e.target;
                            var targetArray = document.getElementsByClassName("addable-btn");
                            var notCloseArray = document.getElementsByClassName("component-list");
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, targetArray) || DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, notCloseArray);
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* HideAddableComponent */0);
                            }
                          }), (function (subscription) {
                            return Curry._1(send, /* SetSubscription */[subscription]);
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (param) {
              return EventUtils$WonderEditor.unmountStreamSubscription(param[/* state */1][/* streamSubscription */1]);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(reduxTuple, currentSceneTreeNode, addableComponentList, self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isShowAddableComponent */false,
                      /* streamSubscription */undefined
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
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
