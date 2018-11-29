

import * as Block from "../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_primitive from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as DomUtils$WonderEditor from "../../../../../../utils/ui/DomUtils.js";
import * as DomHelper$WonderEditor from "../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor from "../../../../../../utils/event/EventUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as HeaderAddGameObjectEventHandler$WonderEditor from "../../../../../header/eventHandler/HeaderAddGameObjectEventHandler.js";
import * as HeaderDisposeGameObjectEventHandler$WonderEditor from "../../../../../header/eventHandler/HeaderDisposeGameObjectEventHandler.js";

var addGameObjectByType = HeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* addGameObjectByType */addGameObjectByType,
  /* disposeCurrentSceneTreeNode */disposeCurrentSceneTreeNode
];

var component = ReasonReact.reducerComponent("MainEditorLeftHeader");

function reducer(action, state) {
  if (typeof action === "number") {
    if (action === 0) {
      var match = state[/* isSelectNav */0];
      if (match) {
        return /* Update */Block.__(0, [/* record */[
                    /* isSelectNav */false,
                    /* currentSelectItem : None */0,
                    /* streamSubscription */state[/* streamSubscription */2]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* isSelectNav */true,
                    /* currentSelectItem : None */0,
                    /* streamSubscription */state[/* streamSubscription */2]
                  ]]);
      }
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */false,
                  /* currentSelectItem : None */0,
                  /* streamSubscription */state[/* streamSubscription */2]
                ]]);
    }
  } else if (action.tag) {
    return /* Update */Block.__(0, [/* record */[
                /* isSelectNav */state[/* isSelectNav */0],
                /* currentSelectItem */action[0],
                /* streamSubscription */state[/* streamSubscription */2]
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* isSelectNav */state[/* isSelectNav */0],
                /* currentSelectItem */state[/* currentSelectItem */1],
                /* streamSubscription */Js_primitive.some(action[0])
              ]]);
  }
}

function _renderSelectNav(store, dispatchFunc, param) {
  var send = param[/* send */3];
  var match = param[/* state */1][/* currentSelectItem */1] === /* GameObject */1;
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._3(addGameObjectByType, /* tuple */[
                                  store,
                                  dispatchFunc
                                ], /* EmptyGameObject */1, /* () */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Create Empty"))), React.createElement("div", {
                  className: "content-section",
                  onMouseOver: (function () {
                      return Curry._1(send, /* HoverItem */Block.__(1, [/* GameObject */1]));
                    })
                }, React.createElement("div", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("3D GameObject")), React.createElement("div", {
                      className: "section-tail"
                    }, React.createElement("div", {
                          className: "tail-triangle"
                        })), match ? React.createElement("div", {
                        className: "section-childLayer"
                      }, React.createElement("div", {
                            className: "content-section",
                            onClick: (function () {
                                return Curry._3(addGameObjectByType, /* tuple */[
                                            store,
                                            dispatchFunc
                                          ], /* Box */0, /* () */0);
                              })
                          }, React.createElement("span", {
                                className: "section-header"
                              }, DomHelper$WonderEditor.textEl("Cube"))), React.createElement("div", {
                            className: "content-section",
                            onClick: (function () {
                                return Curry._3(addGameObjectByType, /* tuple */[
                                            store,
                                            dispatchFunc
                                          ], /* EmptyGameObject */1, /* () */0);
                              })
                          }, React.createElement("span", {
                                className: "section-header"
                              }, DomHelper$WonderEditor.textEl("Sphere")))) : null));
}

function render(store, dispatchFunc, self) {
  var send = self[/* send */3];
  var match = self[/* state */1][/* isSelectNav */0];
  var match$1 = Js_option.isNone(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode));
  return React.createElement("article", {
              key: "mainEditorScenetreeHeader",
              className: "wonder-left-components-header"
            }, React.createElement("div", {
                  className: "sceneTree-header-item",
                  onClick: (function () {
                      return Curry._1(send, /* ToggleShowNav */0);
                    })
                }, React.createElement("div", {
                      className: "item-canBeClick"
                    }, React.createElement("img", {
                          src: "./public/img/add.png"
                        })), match ? _renderSelectNav(store, dispatchFunc, self) : null), React.createElement("div", {
                  className: "sceneTree-header-item",
                  onClick: (function () {
                      var match = Js_option.isNone(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode));
                      if (match) {
                        return /* () */0;
                      } else {
                        return Curry._3(disposeCurrentSceneTreeNode, /* tuple */[
                                    store,
                                    dispatchFunc
                                  ], /* () */0, /* () */0);
                      }
                    })
                }, match$1 ? React.createElement("div", {
                        className: "item-notBeClick"
                      }, React.createElement("img", {
                            src: "./public/img/notRemove.png"
                          })) : React.createElement("div", {
                        className: "item-canBeClick"
                      }, React.createElement("img", {
                            src: "./public/img/remove.png"
                          }))));
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return EventUtils$WonderEditor.bindEventInDidMount((function (e) {
                            var target = e.target;
                            var targetArray = document.getElementsByClassName("sceneTree-header-item");
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, targetArray);
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* BlurNav */1);
                            }
                          }), (function (subscription) {
                            return Curry._1(send, /* SetSubscription */Block.__(0, [subscription]));
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */(function (param) {
              return EventUtils$WonderEditor.unmountStreamSubscription(param[/* state */1][/* streamSubscription */2]);
            }),
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isSelectNav */false,
                      /* currentSelectItem : None */0,
                      /* streamSubscription */undefined
                    ];
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
  _renderSelectNav ,
  render ,
  make ,
  
}
/* component Not a pure module */
