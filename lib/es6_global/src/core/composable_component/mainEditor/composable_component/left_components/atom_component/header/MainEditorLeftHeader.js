

import * as Block from "../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomUtils$WonderEditor from "../../../../../../utils/ui/DomUtils.js";
import * as DomHelper$WonderEditor from "../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor from "../../../../../../utils/event/EventUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as LeftHeaderAddGameObjectEventHandler$WonderEditor from "../eventHandler/LeftHeaderAddGameObjectEventHandler.js";
import * as LeftHeaderCloneGameObjectEventHandler$WonderEditor from "../eventHandler/LeftHeaderCloneGameObjectEventHandler.js";
import * as LeftHeaderDisposeGameObjectEventHandler$WonderEditor from "../eventHandler/LeftHeaderDisposeGameObjectEventHandler.js";

var addGameObjectByType = LeftHeaderAddGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var disposeCurrentSceneTreeNode = LeftHeaderDisposeGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var cloneCurrentSceneTreeNode = LeftHeaderCloneGameObjectEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

var Method = /* module */[
  /* addGameObjectByType */addGameObjectByType,
  /* disposeCurrentSceneTreeNode */disposeCurrentSceneTreeNode,
  /* cloneCurrentSceneTreeNode */cloneCurrentSceneTreeNode
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
                /* streamSubscription */Caml_option.some(action[0])
              ]]);
  }
}

function _renderSelectNav(param, state, send) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var match = state[/* currentSelectItem */1] === /* GameObject */1;
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._3(addGameObjectByType, /* tuple */[
                                  uiState,
                                  dispatchFunc
                                ], /* EmptyGameObject */2, /* () */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Create Empty"))), React.createElement("div", {
                  className: "content-section",
                  onMouseOver: (function (e) {
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
                            onClick: (function (_e) {
                                return Curry._3(addGameObjectByType, /* tuple */[
                                            uiState,
                                            dispatchFunc
                                          ], /* Cube */0, /* () */0);
                              })
                          }, React.createElement("span", {
                                className: "section-header"
                              }, DomHelper$WonderEditor.textEl("Cube"))), React.createElement("div", {
                            className: "content-section",
                            onClick: (function (_e) {
                                return Curry._3(addGameObjectByType, /* tuple */[
                                            uiState,
                                            dispatchFunc
                                          ], /* Sphere */1, /* () */0);
                              })
                          }, React.createElement("span", {
                                className: "section-header"
                              }, DomHelper$WonderEditor.textEl("Sphere")))) : null));
}

function _renderAddGameObjectComponent(param, state, send) {
  var match = state[/* isSelectNav */0];
  return React.createElement("div", {
              className: "sceneTree-header-item",
              onClick: (function (_e) {
                  return Curry._1(send, /* ToggleShowNav */0);
                })
            }, React.createElement("div", {
                  className: "item-canBeClick"
                }, React.createElement("img", {
                      src: "./public/img/add.png"
                    })), match ? _renderSelectNav(/* tuple */[
                    param[0],
                    param[1]
                  ], state, send) : null);
}

function _renderRemoveGameObjectComponent(reduxTuple, isCurrentSceneTreeNodeSceneChildren) {
  return React.createElement("div", {
              className: "sceneTree-header-item",
              title: "remove",
              onClick: (function (_e) {
                  if (isCurrentSceneTreeNodeSceneChildren) {
                    return Curry._3(disposeCurrentSceneTreeNode, reduxTuple, /* () */0, /* () */0);
                  } else {
                    return /* () */0;
                  }
                })
            }, isCurrentSceneTreeNodeSceneChildren ? React.createElement("div", {
                    className: "item-notBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/remove.png"
                      })) : React.createElement("div", {
                    className: "item-canBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/notRemove.png"
                      })));
}

function _renderCloneGameObjectComponent(reduxTuple, isCurrentSceneTreeNodeSceneChildren) {
  return React.createElement("div", {
              className: "sceneTree-header-item",
              title: "clone",
              onClick: (function (_e) {
                  if (isCurrentSceneTreeNodeSceneChildren) {
                    return Curry._3(cloneCurrentSceneTreeNode, reduxTuple, /* () */0, /* () */0);
                  } else {
                    return /* () */0;
                  }
                })
            }, isCurrentSceneTreeNodeSceneChildren ? React.createElement("div", {
                    className: "item-notBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/clone.png"
                      })) : React.createElement("div", {
                    className: "item-canBeClick"
                  }, React.createElement("img", {
                        src: "./public/img/notClone.png"
                      })));
}

function render(reduxTuple, self) {
  var isCurrentSceneTreeNodeSceneChildren = StateLogicService$WonderEditor.getStateToGetData(GameObjectLogicService$WonderEditor.isCurrentSceneTreeNodeSceneChildren);
  return React.createElement("article", {
              key: "mainEditorScenetreeHeader",
              className: "wonder-left-components-header"
            }, _renderAddGameObjectComponent(reduxTuple, self[/* state */1], self[/* send */3]), _renderRemoveGameObjectComponent(reduxTuple, isCurrentSceneTreeNodeSceneChildren), _renderCloneGameObjectComponent(reduxTuple, isCurrentSceneTreeNodeSceneChildren));
}

function make(uiState, dispatchFunc, _children) {
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isSelectNav */false,
                      /* currentSelectItem : None */0,
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
  _renderSelectNav ,
  _renderAddGameObjectComponent ,
  _renderRemoveGameObjectComponent ,
  _renderCloneGameObjectComponent ,
  render ,
  make ,
  
}
/* component Not a pure module */
