

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../../../utils/ui/ReactUtils.js";
import * as TreeNodeUtils$WonderEditor from "./utils/TreeNodeUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../utils/event/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "../../../../utils/event/DragEventBaseUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../service/state/editor/CurrentDragSourceEditorService.js";

function buildDragEndState(state) {
  return /* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", TreeNodeUtils$WonderEditor.getNoBorderCss(/* () */0), ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))];
}

function handleDragStart(id, widget, dragImg, effectAllowd, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, widget, dragImg, effectAllowd, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, param, $$event) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, param[0], param[1]) || Curry._1(param[2], /* () */0);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, $$event) {
  return /* DragLeave */2;
}

function handleDrageEnd(_event) {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource);
  return /* DragEnd */3;
}

function handleDrop(id, param, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  DomHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(id, startId, param[0], param[1]);
  if (match) {
    return /* DragGameObject */Block.__(1, [
              id,
              startId
            ]);
  } else {
    var match$1 = Curry._1(param[2], /* () */0);
    if (match$1) {
      var param$1 = SparseMapService$WonderCommonlib.unsafeGet(startId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
      return /* DragWDB */Block.__(2, [
                id,
                param$1[/* wdbGameObject */2]
              ]);
    } else {
      return /* DragLeave */2;
    }
  }
}

function _renderDragableText(param, param$1, param$2) {
  var isAssetWDBFileFunc = param$2[3];
  var handleRelationErrorFunc = param$2[2];
  var handleWidgetFunc = param$2[1];
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
              onDragEnd: (function (_e) {
                  return Curry._1(send, (StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource), /* DragEnd */3));
                }),
              onDragEnter: (function (_e) {
                  return Curry._1(send, handleDragEnter(id, /* tuple */[
                                  handleWidgetFunc,
                                  handleRelationErrorFunc,
                                  isAssetWDBFileFunc
                                ], _e));
                }),
              onDragLeave: (function (_e) {
                  return Curry._1(send, /* DragLeave */2);
                }),
              onDragOver: (function (e) {
                  return DragEventUtils$WonderEditor.handleDragOver("move", e);
                }),
              onDragStart: (function (_e) {
                  return Curry._1(send, handleDragStart(id, widget, dragImg, "move", _e));
                }),
              onDrop: (function (_e) {
                  return Curry._1(send, handleDrop(id, /* tuple */[
                                  handleWidgetFunc,
                                  handleRelationErrorFunc,
                                  isAssetWDBFileFunc
                                ], _e));
                }),
              onMouseDown: (function (_event) {
                  return Curry._1(onSelectFunc, id);
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
                  param$2[2],
                  param$2[3]
                ]));
}

var Method = /* module */[
  /* buildDragEndState */buildDragEndState,
  /* handleDragStart */handleDragStart,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDrageEnd */handleDrageEnd,
  /* handleDrop */handleDrop,
  /* buildNotDragableUl */TreeNodeUtils$WonderEditor.buildNotDragableUl,
  /* _renderDragableText */_renderDragableText,
  /* _renderContent */_renderContent
];

var component = ReasonReact.reducerComponent("SceneTreeNode");

function reducer(isShowChildren, param, action) {
  var handleToggleShowTreeChildren = param[2];
  var dragWDB = param[1];
  var dragGameObject = param[0];
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
  } else {
    switch (action.tag | 0) {
      case 0 : 
          var targetUid = action[0];
          return (function (state) {
              return ReasonReactUtils$WonderEditor.sideEffects((function (param) {
                            return Curry._2(handleToggleShowTreeChildren, targetUid, !isShowChildren);
                          }));
            });
      case 1 : 
          var removedUid = action[1];
          var targetUid$1 = action[0];
          return (function (state) {
              return ReasonReactUtils$WonderEditor.updateWithSideEffects(buildDragEndState(state), (function (_state) {
                            return Curry._1(dragGameObject, /* tuple */[
                                        targetUid$1,
                                        removedUid
                                      ]);
                          }));
            });
      case 2 : 
          var wdbGameObjectUid = action[1];
          var targetUid$2 = action[0];
          return (function (state) {
              return ReasonReactUtils$WonderEditor.updateWithSideEffects(buildDragEndState(state), (function (_state) {
                            return Curry._1(dragWDB, /* tuple */[
                                        targetUid$2,
                                        wdbGameObjectUid
                                      ]);
                          }));
            });
      
    }
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
                  param$1[2],
                  param$1[3]
                ]));
}

function make(id, name, isSelected, isActive, dragImg, widget, icon, onSelect, dragGameObject, dragWDB, isWidget, isShowChildren, isHasChildren, handleRelationError, handleToggleShowTreeChildren, isAssetWDBFile, treeChildren, _children) {
  var partial_arg = /* tuple */[
    dragGameObject,
    dragWDB,
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
                          handleRelationError,
                          isAssetWDBFile
                        ], treeChildren, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* style */{ }];
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
  make ,
  
}
/* component Not a pure module */
