

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor from "../../../../utils/ui/ReactUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../utils/event/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../utils/ui/ReasonReactUtils.js";

Css$WonderEditor.importCss("./css/treeNode.css");

function buildNotDragableUl(treeChildren, content) {
  return React.createElement("ul", {
              className: "wonder-tree-node"
            }, content, treeChildren);
}

function buildDragableUl(send, param, content) {
  var dragImg = param[2];
  var flag = param[1];
  var uid = param[0];
  return React.createElement("ul", {
              className: "wonder-tree-node",
              draggable: true,
              onDragEnd: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDrageEnd(_e));
                }),
              onDragStart: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(uid, flag, dragImg, _e));
                })
            }, content, param[3]);
}

function getContent(param, param$1, param$2) {
  var handleRelationErrorFunc = param$2[2];
  var handleFlagFunc = param$2[1];
  var onSelectFunc = param$2[0];
  var icon = param$1[1];
  var uid = param$1[0];
  var send = param[1];
  return React.createElement("li", {
              style: param[0][/* style */0],
              onClick: (function () {
                  return Curry._1(onSelectFunc, uid);
                })
            }, React.createElement("div", {
                  className: "item-ground",
                  draggable: true,
                  onDragEnter: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(uid, handleFlagFunc, handleRelationErrorFunc, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(uid, handleFlagFunc, handleRelationErrorFunc, _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(uid, handleFlagFunc, handleRelationErrorFunc, _e));
                    })
                }), icon !== undefined ? React.createElement("img", {
                    src: icon
                  }) : null, DomHelper$WonderEditor.textEl(param$1[2]));
}

var Method = /* module */[
  /* buildNotDragableUl */buildNotDragableUl,
  /* buildDragableUl */buildDragableUl,
  /* getContent */getContent
];

var component = ReasonReact.reducerComponent("TreeNode");

function reducer(onDropFunc, action) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return (function () {
              return /* NoUpdate */0;
            });
      case 1 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
            });
      case 2 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
            });
      case 3 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))]]);
            });
      case 4 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
            });
      
    }
  } else {
    var removedId = action[1];
    var targetId = action[0];
    return (function () {
        return ReasonReactUtils$WonderEditor.sideEffects((function () {
                      return Curry._1(onDropFunc, /* tuple */[
                                  targetId,
                                  removedId
                                ]);
                    }));
      });
  }
}

function render(param, param$1, treeChildren, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var handleRelationErrorFunc = param$1[2];
  var handleFlagFunc = param$1[1];
  var onSelectFunc = param$1[0];
  var isDragable = param[5];
  var icon = param[4];
  var dragImg = param[3];
  var flag = param[2];
  var name = param[1];
  var uid = param[0];
  if (isDragable !== undefined && !isDragable) {
    return buildNotDragableUl(treeChildren, getContent(/* tuple */[
                    state,
                    send
                  ], /* tuple */[
                    uid,
                    icon,
                    name
                  ], /* tuple */[
                    onSelectFunc,
                    handleFlagFunc,
                    handleRelationErrorFunc
                  ]));
  } else {
    return buildDragableUl(send, /* tuple */[
                uid,
                flag,
                dragImg,
                treeChildren
              ], getContent(/* tuple */[
                    state,
                    send
                  ], /* tuple */[
                    uid,
                    icon,
                    name
                  ], /* tuple */[
                    onSelectFunc,
                    handleFlagFunc,
                    handleRelationErrorFunc
                  ]));
  }
}

function initalState(isSelected, isActive) {
  if (isSelected) {
    if (isActive) {
      return /* record */[/* style */{
                background: "red"
              }];
    } else {
      return /* record */[/* style */{
                background: "#c0c0c0"
              }];
    }
  } else {
    return /* record */[/* style */{
              border: "1px solid red"
            }];
  }
}

function make(uid, name, isSelected, isActive, dragImg, flag, icon, isDragable, onSelect, onDrop, isFlag, handleRelationError, treeChildren, _) {
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
                          uid,
                          name,
                          flag,
                          dragImg,
                          icon,
                          isDragable
                        ], /* tuple */[
                          onSelect,
                          isFlag,
                          handleRelationError
                        ], treeChildren, self);
            }),
          /* initialState */(function () {
              return initalState(isSelected, isActive);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(onDrop, param);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  initalState ,
  make ,
  
}
/*  Not a pure module */
