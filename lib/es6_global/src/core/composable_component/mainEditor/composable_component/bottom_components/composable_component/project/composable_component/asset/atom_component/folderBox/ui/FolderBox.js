

import * as Most from "most";
import * as Block from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FileBox$WonderEditor from "../../fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ReactUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../../../../../../../../utils/event/DragEventUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../../composable_component/utils/FolderNodeUtils.js";
import * as ClickStreamUtils$WonderEditor from "../../../../../../../../../../../utils/event/ClickStreamUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";

function onDoubleClick(dispatchFunc, nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = OperateTreeAssetEditorService$WonderEditor.findNodeParentId(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, editorState), editorState);
  var editorState$1 = match !== undefined ? OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(match, true, editorState) : editorState;
  StateEditorService$WonderEditor.setState(editorState$1);
  return FolderNodeUtils$WonderEditor.enterFolder(dispatchFunc, nodeId);
}

var onClick = FileBox$WonderEditor.Method[/* onSelect */0];

var Method = /* module */[
  /* onDoubleClick */onDoubleClick,
  /* onClick */onClick
];

var component = ReasonReact.reducerComponent("FolderBox");

function reducer(onDrop, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px solid coral", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "0px", state[/* style */0])]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0])]]);
      case 4 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
      
    }
  } else {
    var removedId = action[1];
    var targetId = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._1(onDrop, /* tuple */[
                              targetId,
                              removedId
                            ]);
                }));
  }
}

function render(_, param, param$1, param$2) {
  var send = param$2[/* send */3];
  var checkNodeRelation = param$1[1];
  var isWidget = param$1[0];
  var widget = param[5];
  var folderId = param[3];
  var effectAllowd = param[1];
  var dragImg = param[0];
  var id = "folder-" + String(folderId);
  var className = "item-text " + (
    param[6] ? "item-active" : ""
  );
  return React.createElement("article", {
              className: "wonder-asset-folderBox",
              id: id,
              style: param$2[/* state */1][/* style */0]
            }, React.createElement("div", {
                  className: "item-ground",
                  draggable: true,
                  onDragEnd: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnd(/* DragEnd */3, _e));
                    }),
                  onDragEnter: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(folderId, /* tuple */[
                                      /* DragEnter */1,
                                      /* Nothing */0
                                    ], /* tuple */[
                                      isWidget,
                                      checkNodeRelation
                                    ], _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(folderId, /* DragLeave */2, _e));
                    }),
                  onDragOver: (function (e) {
                      return DragEventUtils$WonderEditor.handleDragOver("move", e);
                    }),
                  onDragStart: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(/* tuple */[
                                      folderId,
                                      /* DragStart */4,
                                      widget
                                    ], /* tuple */[
                                      dragImg,
                                      effectAllowd
                                    ], _e));
                    }),
                  onDrop: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(folderId, /* tuple */[
                                      (function (targetId, removedId) {
                                          return /* DragDrop */[
                                                  targetId,
                                                  removedId
                                                ];
                                        }),
                                      /* DragLeave */2
                                    ], /* tuple */[
                                      isWidget,
                                      checkNodeRelation
                                    ], _e));
                    })
                }), React.createElement("div", {
                  className: "box-image"
                }, React.createElement("img", {
                      src: param[2]
                    })), React.createElement("div", {
                  className: className
                }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl(param[4]))));
}

function make(uiState, dispatchFunc, dragImg, effectAllowd, imgSrc, folderId, name, isSelected, widget, debounceTime, onDrop, isWidget, checkNodeRelation, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              var clickStream = Most.fromEvent("mousedown", document.getElementById("folder-" + String(folderId)), true);
              Most.forEach((function () {
                      return onDoubleClick(dispatchFunc, folderId);
                    }), ClickStreamUtils$WonderEditor.bindClickStream(false, debounceTime, clickStream));
              Most.forEach((function ($$event) {
                      return Curry._3(onClick, folderId, dispatchFunc, $$event);
                    }), ClickStreamUtils$WonderEditor.bindClickStream(true, debounceTime, clickStream));
              return /* () */0;
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          dragImg,
                          effectAllowd,
                          imgSrc,
                          folderId,
                          name,
                          widget,
                          isSelected
                        ], /* tuple */[
                          isWidget,
                          checkNodeRelation
                        ], self);
            }),
          /* initialState */(function () {
              return /* record */[/* style */{
                        border: "0px"
                      }];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(onDrop, param, param$1);
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
