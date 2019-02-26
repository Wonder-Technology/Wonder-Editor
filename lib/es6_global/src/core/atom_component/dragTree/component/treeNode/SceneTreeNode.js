

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../utils/DragUtils.js";
import * as Caml_builtin_exceptions from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ReactUtils$WonderEditor from "../../../../utils/ui/ReactUtils.js";
import * as EventHelper$WonderEditor from "../../../../external/EventHelper.js";
import * as TreeNodeUtils$WonderEditor from "./utils/TreeNodeUtils.js";
import * as ClassNameService$WonderEditor from "../../../../../service/atom/ClassNameService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../utils/ui/ReasonReactUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "../../../../utils/event/DragEventBaseUtils.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as SceneTreeNodeScrollUtils$WonderEditor from "./utils/SceneTreeNodeScrollUtils.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../service/state/editor/CurrentDragSourceEditorService.js";

function buildDragEndState(state) {
  return /* record */[
          /* dragGapClass */"no-drag",
          /* style */ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */1]),
          /* dragPosition : NoDrag */0
        ];
}

function handleDragStart(gameObject, widget, param, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(gameObject, widget, /* tuple */[
        param[0],
        param[1]
      ], $$event);
  return /* DragStart */3;
}

function _calcDragPosition($$event, domElement) {
  var domClientRect = Curry._1(DomHelper$WonderEditor.getDomClientRect, domElement);
  var domTop = domClientRect.top;
  var domOffsetHeight = domClientRect.height;
  var gapHeight = TreeNodeUtils$WonderEditor.getGapHeight(/* () */0);
  var pageY = $$event.pageY;
  if (pageY > ((domOffsetHeight + domTop | 0) - gapHeight | 0)) {
    return /* DragAfterTarget */3;
  } else if (pageY < (domTop + gapHeight | 0)) {
    return /* DragBeforeTarget */1;
  } else {
    return /* DragIntoTarget */2;
  }
}

function handleDragLeave(_, _$1) {
  return /* DragLeave */1;
}

function handleDragEnd() {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource);
  return /* DragEnd */2;
}

function handleDragOver(gameObject, param, $$event) {
  EventHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.isValidForDragEnter(gameObject, param[0], param[1]);
  var match$1 = match[0] || Curry._1(param[2], /* () */0);
  if (match$1) {
    return /* DragOver */Block.__(1, [_calcDragPosition($$event, $$event.target)]);
  } else {
    return /* Nothing */0;
  }
}

function handleDrop(gameObject, param, dragPosition, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  EventHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.isValidForDragDrop(gameObject, startId, param[0], param[1]);
  if (match[0]) {
    return /* DragGameObject */Block.__(2, [
              gameObject,
              startId,
              dragPosition
            ]);
  } else {
    var match$1 = Curry._1(param[2], /* () */0);
    if (match$1) {
      var wdbGameObject = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(startId, StateEditorService$WonderEditor.getState(/* () */0)));
      return /* DragWDB */Block.__(3, [
                gameObject,
                wdbGameObject,
                dragPosition
              ]);
    } else {
      return /* DragLeave */1;
    }
  }
}

function _renderDragableText(param, param$1, param$2) {
  var isAssetWDBFileFunc = param$2[3];
  var checkNodeRelationFunc = param$2[2];
  var isWidgetFunc = param$2[1];
  var onSelectFunc = param$2[0];
  var dragImg = param$1[2];
  var widget = param$1[1];
  var gameObject = param$1[0];
  var send = param[1];
  var state = param[0];
  return React.createElement("div", {
              className: ClassNameService$WonderEditor.buildMultipleClassName(/* array */[
                    "draggable-container",
                    param$1[5] ? (
                        param$1[6] ? "select-active" : "select-not-active"
                      ) : "",
                    state[/* dragGapClass */0]
                  ]),
              draggable: !StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                      return SceneEngineService$WonderEditor.isSceneGameObject(gameObject, param);
                    })),
              id: "sceneTreeNode-" + (String(gameObject) + ""),
              style: state[/* style */1],
              onClick: (function () {
                  return Curry._1(onSelectFunc, gameObject);
                }),
              onDragEnd: (function () {
                  return Curry._1(send, (StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource), /* DragEnd */2));
                }),
              onDragLeave: (function () {
                  return Curry._1(send, /* DragLeave */1);
                }),
              onDragOver: (function (e) {
                  return Curry._1(send, handleDragOver(gameObject, /* tuple */[
                                  isWidgetFunc,
                                  checkNodeRelationFunc,
                                  isAssetWDBFileFunc
                                ], e));
                }),
              onDragStart: (function (e) {
                  return Curry._1(send, handleDragStart(gameObject, widget, /* tuple */[
                                  dragImg,
                                  "move"
                                ], e));
                }),
              onDrop: (function (_e) {
                  return Curry._1(send, handleDrop(gameObject, /* tuple */[
                                  isWidgetFunc,
                                  checkNodeRelationFunc,
                                  isAssetWDBFileFunc
                                ], state[/* dragPosition */2], _e));
                })
            }, DomHelper$WonderEditor.textEl(param$1[3]));
}

function _renderContent(param, param$1, param$2) {
  var isShowChildren = param$1[5];
  var icon = param$1[1];
  var gameObject = param$1[0];
  var send = param[1];
  return React.createElement("li", undefined, param$1[6] ? TreeNodeUtils$WonderEditor.renderChildren(gameObject, isShowChildren, send, /* TogggleChildren */Block.__(0, [gameObject])) : React.createElement("div", {
                    className: "item-triangle"
                  }), icon !== undefined ? React.createElement("img", {
                    className: "treeNode-icon",
                    src: icon
                  }) : null, _renderDragableText(/* tuple */[
                  param[0],
                  send
                ], /* tuple */[
                  gameObject,
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
  /* _calcDragPosition */_calcDragPosition,
  /* handleDragLeave */handleDragLeave,
  /* handleDragEnd */handleDragEnd,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* buildNotDragableUl */TreeNodeUtils$WonderEditor.buildNotDragableUl,
  /* _renderDragableText */_renderDragableText,
  /* _renderContent */_renderContent
];

var component = ReasonReact.reducerComponent("SceneTreeNode");

function reducer(isShowChildren, param, action, state) {
  var handleToggleShowTreeChildren = param[2];
  var dragWDB = param[1];
  var dragGameObject = param[0];
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* dragGapClass */"no-drag",
                      /* style */state[/* style */1],
                      /* dragPosition */state[/* dragPosition */2]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [buildDragEndState(state)]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[
                      /* dragGapClass */state[/* dragGapClass */0],
                      /* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */1]),
                      /* dragPosition */state[/* dragPosition */2]
                    ]]);
      
    }
  } else {
    switch (action.tag | 0) {
      case 0 : 
          var targetUid = action[0];
          return ReasonReactUtils$WonderEditor.sideEffects((function () {
                        return Curry._2(handleToggleShowTreeChildren, targetUid, !isShowChildren);
                      }));
      case 1 : 
          var dragPosition = action[0];
          switch (dragPosition) {
            case 0 : 
                throw [
                      Caml_builtin_exceptions.match_failure,
                      /* tuple */[
                        "SceneTreeNode.re",
                        269,
                        4
                      ]
                    ];
            case 1 : 
                return /* Update */Block.__(0, [/* record */[
                            /* dragGapClass */"drag-gap-top",
                            /* style */state[/* style */1],
                            /* dragPosition */dragPosition
                          ]]);
            case 2 : 
                return /* Update */Block.__(0, [/* record */[
                            /* dragGapClass */"drag-gap-center",
                            /* style */state[/* style */1],
                            /* dragPosition */dragPosition
                          ]]);
            case 3 : 
                return /* Update */Block.__(0, [/* record */[
                            /* dragGapClass */"drag-gap-bottom",
                            /* style */state[/* style */1],
                            /* dragPosition */dragPosition
                          ]]);
            
          }
      case 2 : 
          var dragPosition$1 = action[2];
          var draggedUid = action[1];
          var targetUid$1 = action[0];
          return ReasonReactUtils$WonderEditor.updateWithSideEffects(buildDragEndState(state), (function () {
                        return Curry._1(dragGameObject, /* tuple */[
                                    targetUid$1,
                                    draggedUid,
                                    dragPosition$1
                                  ]);
                      }));
      case 3 : 
          var dragPosition$2 = action[2];
          var wdbGameObject = action[1];
          var targetUid$2 = action[0];
          return ReasonReactUtils$WonderEditor.updateWithSideEffects(buildDragEndState(state), (function () {
                        return Curry._1(dragWDB, /* tuple */[
                                    targetUid$2,
                                    wdbGameObject,
                                    dragPosition$2
                                  ]);
                      }));
      
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

function make(gameObject, name, isSelected, isActive, dragImg, widget, icon, onSelect, dragGameObject, dragWDB, isWidget, isShowChildren, isHasChildren, checkNodeRelation, handleToggleShowTreeChildren, isAssetWDBFile, treeChildren, _) {
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
          /* didMount */(function () {
              return SceneTreeNodeScrollUtils$WonderEditor.handleSelectedSceneTreeNodeScroll(isSelected, gameObject);
            }),
          /* didUpdate */(function () {
              return SceneTreeNodeScrollUtils$WonderEditor.handleSelectedSceneTreeNodeScroll(isSelected, gameObject);
            }),
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          gameObject,
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
                          checkNodeRelation,
                          isAssetWDBFile
                        ], treeChildren, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* dragGapClass */"no-drag",
                      /* style */{ },
                      /* dragPosition : NoDrag */0
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(isShowChildren, partial_arg, param, param$1);
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
