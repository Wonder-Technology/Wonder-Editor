

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor from "../../../../utils/ui/ReactUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../utils/event/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../utils/ui/ReasonReactUtils.js";

function buildNotDragableUl(treeChildren, isShowChildren, content) {
  return React.createElement("ul", {
              className: "wonder-tree-node"
            }, content, isShowChildren ? treeChildren : null);
}

function buildDragableUl(param, param$1, content) {
  var dragImg = param$1[2];
  var widge = param$1[1];
  var uid = param$1[0];
  var send = param[1];
  return React.createElement("ul", {
              className: "wonder-tree-node",
              draggable: true,
              onDragEnd: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDrageEnd(_e));
                }),
              onDragStart: (function (_e) {
                  return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(uid, widge, dragImg, _e));
                })
            }, content, param$1[4] ? param$1[3] : null);
}

function getContent(param, param$1, param$2) {
  var handleRelationErrorFunc = param$2[2];
  var handleWidgeFunc = param$2[1];
  var onSelectFunc = param$2[0];
  var icon = param$1[1];
  var uid = param$1[0];
  var send = param[1];
  return React.createElement("li", {
              style: param[0][/* style */0]
            }, React.createElement("div", {
                  className: "item-ground",
                  draggable: true,
                  onClick: (function () {
                      return Curry._1(onSelectFunc, uid);
                    }),
                  onDragEnter: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(uid, handleWidgeFunc, handleRelationErrorFunc, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(uid, handleWidgeFunc, handleRelationErrorFunc, _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(uid, handleWidgeFunc, handleRelationErrorFunc, _e));
                    })
                }), param$1[5] ? React.createElement("div", {
                    className: "item-triangle",
                    onClick: (function () {
                        return Curry._1(send, /* TogggleChildren */Block.__(0, [uid]));
                      })
                  }, param$1[4] ? React.createElement("img", {
                          src: "./public/img/down.png"
                        }) : React.createElement("img", {
                          src: "./public/img/right.png"
                        })) : React.createElement("div", {
                    className: "item-triangle"
                  }), icon !== undefined ? React.createElement("img", {
                    className: "treeNode-icon",
                    src: icon
                  }) : null, DomHelper$WonderEditor.textEl(param$1[2]));
}

var Method = /* module */[
  /* buildNotDragableUl */buildNotDragableUl,
  /* buildDragableUl */buildDragableUl,
  /* getContent */getContent
];

var component = ReasonReact.reducerComponent("TreeNode");

function reducer(isShowChildren, param, action) {
  var handleToggleShowTreeChildren = param[1];
  var onDropFunc = param[0];
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return (function () {
              return /* NoUpdate */0;
            });
      case 1 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "3px solid coral", state[/* style */0])]]);
            });
      case 2 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "0px", state[/* style */0])]]);
            });
      case 3 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "0px", ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))]]);
            });
      case 4 : 
          return (function (state) {
              return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
            });
      
    }
  } else if (action.tag) {
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
  } else {
    var targetId$1 = action[0];
    return (function () {
        return ReasonReactUtils$WonderEditor.sideEffects((function () {
                      return Curry._2(handleToggleShowTreeChildren, targetId$1, !isShowChildren);
                    }));
      });
  }
}

function render(param, param$1, treeChildren, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var handleRelationErrorFunc = param$1[2];
  var handleWidgeFunc = param$1[1];
  var onSelectFunc = param$1[0];
  var isHasChildren = param[7];
  var isShowChildren = param[6];
  var isDragable = param[5];
  var icon = param[4];
  var dragImg = param[3];
  var widge = param[2];
  var name = param[1];
  var uid = param[0];
  if (isDragable !== undefined && !isDragable) {
    return buildNotDragableUl(treeChildren, isShowChildren, getContent(/* tuple */[
                    state,
                    send
                  ], /* tuple */[
                    uid,
                    icon,
                    name,
                    treeChildren,
                    isShowChildren,
                    isHasChildren
                  ], /* tuple */[
                    onSelectFunc,
                    handleWidgeFunc,
                    handleRelationErrorFunc
                  ]));
  } else {
    return buildDragableUl(/* tuple */[
                state,
                send
              ], /* tuple */[
                uid,
                widge,
                dragImg,
                treeChildren,
                isShowChildren
              ], getContent(/* tuple */[
                    state,
                    send
                  ], /* tuple */[
                    uid,
                    icon,
                    name,
                    treeChildren,
                    isShowChildren,
                    isHasChildren
                  ], /* tuple */[
                    onSelectFunc,
                    handleWidgeFunc,
                    handleRelationErrorFunc
                  ]));
  }
}

function initalState(isSelected, isActive) {
  if (isSelected) {
    if (isActive) {
      return /* record */[/* style */{
                background: "#5C7EA6"
              }];
    } else {
      return /* record */[/* style */{
                background: "rgba(255,255,255,0.2)"
              }];
    }
  } else {
    return /* record */[/* style */{
              border: "0px"
            }];
  }
}

function make(uid, name, isSelected, isActive, dragImg, widge, icon, isDragable, onSelect, onDrop, isWidge, isShowChildren, isHasChildren, handleRelationError, handleToggleShowTreeChildren, treeChildren, _) {
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
                          uid,
                          name,
                          widge,
                          dragImg,
                          icon,
                          isDragable,
                          isShowChildren,
                          isHasChildren
                        ], /* tuple */[
                          onSelect,
                          isWidge,
                          handleRelationError
                        ], treeChildren, self);
            }),
          /* initialState */(function () {
              return initalState(isSelected, isActive);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(isShowChildren, partial_arg, param);
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
/* component Not a pure module */
