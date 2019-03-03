

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor from "../../../../utils/ui/ReactUtils.js";
import * as TreeNodeUtils$WonderEditor from "./utils/TreeNodeUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../utils/event/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../utils/ui/ReasonReactUtils.js";

function buildDragEndState(state) {
  return /* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", TreeNodeUtils$WonderEditor.getNoBorderCss(/* () */0), ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))];
}

function _renderDragableText(param, param$1, param$2) {
  var checkNodeRelationFunc = param$2[2];
  var isWidgetFunc = param$2[1];
  var onSelectFunc = param$2[0];
  var dragImg = param$1[2];
  var widget = param$1[1];
  var id = param$1[0];
  var send = param[1];
  return React.createElement("div", {
              className: "draggable-container" + (
                param$1[5] ? (
                    param$1[6] ? " select-active" : " select-not-active"
                  ) : ""
              ),
              draggable: true,
              style: param[0][/* style */0],
              onClick: (function (_event) {
                  return Curry._1(onSelectFunc, id);
                }),
              onDragEnd: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnd(/* DragEnd */3, _e));
                }),
              onDragEnter: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(id, /* tuple */[
                                  /* DragEnter */1,
                                  /* Nothing */0
                                ], /* tuple */[
                                  isWidgetFunc,
                                  checkNodeRelationFunc
                                ], _e));
                }),
              onDragLeave: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(id, /* DragLeave */2, _e));
                }),
              onDragOver: (function (e) {
                  return DragEventUtils$WonderEditor.handleDragOver("move", e);
                }),
              onDragStart: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(/* tuple */[
                                  id,
                                  /* DragStart */4,
                                  widget
                                ], /* tuple */[
                                  dragImg,
                                  "move"
                                ], _e));
                }),
              onDrop: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(id, /* tuple */[
                                  (function (targetId, removedId) {
                                      return /* DragDrop */Block.__(1, [
                                                targetId,
                                                removedId
                                              ]);
                                    }),
                                  /* DragLeave */2
                                ], /* tuple */[
                                  isWidgetFunc,
                                  checkNodeRelationFunc
                                ], _e));
                })
            }, DomHelper$WonderEditor.textEl(param$1[3]));
}

function _renderContent(param, param$1, param$2) {
  var isShowChildren = param$1[5];
  var icon = param$1[1];
  var id = param$1[0];
  var send = param[1];
  return React.createElement("li", undefined, param$1[6] ? TreeNodeUtils$WonderEditor.renderChildren(id, isShowChildren, send, /* TogggleChildren */Block.__(0, [id])) : React.createElement("div", {
                    className: "item-triangle"
                  }), icon !== undefined ? React.createElement("img", {
                    className: "treeNode-icon",
                    src: icon
                  }) : null, _renderDragableText(/* tuple */[
                  param[0],
                  send
                ], /* tuple */[
                  id,
                  param$1[2],
                  param$1[3],
                  param$1[4],
                  isShowChildren,
                  param$1[7],
                  param$1[8]
                ], /* tuple */[
                  param$2[0],
                  param$2[1],
                  param$2[2]
                ]));
}

var Method = /* module */[
  /* buildDragEndState */buildDragEndState,
  /* buildNotDragableUl */TreeNodeUtils$WonderEditor.buildNotDragableUl,
  /* _renderDragableText */_renderDragableText,
  /* _renderContent */_renderContent
];

var component = ReasonReact.reducerComponent("AssetTreeNode");

function reducer(isShowChildren, param, action) {
  var handleToggleShowTreeChildren = param[1];
  var onDropFunc = param[0];
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return (function (_state) {
              return /* NoUpdate */0;
            });
      case 1 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "3px solid coral", state[/* style */0])]]);
            });
      case 2 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", TreeNodeUtils$WonderEditor.getNoBorderCss(/* () */0), state[/* style */0])]]);
            });
      case 3 : 
          return (function (state) {
              return /* Update */Block.__(0, [buildDragEndState(state)]);
            });
      case 4 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
            });
      
    }
  } else if (action.tag) {
    var removedId = action[1];
    var targetId = action[0];
    return (function (state) {
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(buildDragEndState(state), (function (_state) {
                      return Curry._1(onDropFunc, /* tuple */[
                                  targetId,
                                  removedId
                                ]);
                    }));
      });
  } else {
    var targetId$1 = action[0];
    return (function (state) {
        return ReasonReactUtils$WonderEditor.sideEffects((function (param) {
                      return Curry._2(handleToggleShowTreeChildren, targetId$1, !isShowChildren);
                    }));
      });
  }
}

function render(param, param$1, treeChildren, param$2) {
  var isShowChildren = param[5];
  return TreeNodeUtils$WonderEditor.buildNotDragableUl(treeChildren, isShowChildren, _renderContent(/* tuple */[
                  param$2[/* state */1],
                  param$2[/* send */3]
                ], /* tuple */[
                  param[0],
                  param[4],
                  param[2],
                  param[3],
                  param[1],
                  isShowChildren,
                  param[6],
                  param[7],
                  param[8]
                ], /* tuple */[
                  param$1[0],
                  param$1[1],
                  param$1[2]
                ]));
}

function make(id, name, isSelected, isActive, dragImg, widget, icon, onSelect, onDrop, isWidget, isShowChildren, isHasChildren, checkNodeRelation, handleToggleShowTreeChildren, treeChildren, _children) {
  var partial_arg = /* tuple */[
    onDrop,
    handleToggleShowTreeChildren
  ];
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
                          id,
                          name,
                          widget,
                          dragImg,
                          icon,
                          isShowChildren,
                          isHasChildren,
                          isSelected,
                          isActive
                        ], /* tuple */[
                          onSelect,
                          isWidget,
                          checkNodeRelation
                        ], treeChildren, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* style */{ }];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(isShowChildren, partial_arg, param);
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
