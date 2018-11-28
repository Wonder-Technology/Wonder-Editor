

import * as Most from "most";
import * as Block from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FileBox$WonderEditor from "../../fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../../external/DomHelper.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ReactUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../../composable_component/utils/AssetTreeUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../../../../../../../../utils/event/DragEventUtils.js";
import * as ClickStreamUtils$WonderEditor from "../../../../../../../../../../../utils/event/ClickStreamUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";

function onDoubleClick(dispatchFunc, nodeType, nodeId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = FolderNodeMapAssetEditorService$WonderEditor.getFolderParentId(nodeId, FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState));
  var editorState$1 = match !== undefined ? AssetTreeUtils$WonderEditor.setSpecificAssetTreeNodeIsShowChildrenFromEditorState(match, true, editorState) : editorState;
  StateEditorService$WonderEditor.setState(editorState$1);
  return AssetTreeUtils$WonderEditor.enterFolder(dispatchFunc, nodeType, nodeId);
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
  } else if (action.tag) {
    var removedId = action[1];
    var targetId = action[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._1(onDrop, /* tuple */[
                              targetId,
                              removedId
                            ]);
                }));
  } else {
    throw [
          Caml_builtin_exceptions.match_failure,
          /* tuple */[
            "FolderBox.re",
            36,
            2
          ]
        ];
  }
}

function render(_, param, param$1, param$2) {
  var send = param$2[/* send */3];
  var handleRelationError = param$1[1];
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
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrageEnd(_e));
                    }),
                  onDragEnter: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(folderId, isWidget, Curry._1(handleRelationError, false), _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(folderId, _e));
                    }),
                  onDragOver: (function (e) {
                      return DragEventUtils$WonderEditor.handleDragOver("move", e);
                    }),
                  onDragStart: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(folderId, widget, dragImg, effectAllowd, _e));
                    }),
                  onDrop: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(folderId, isWidget, Curry._1(handleRelationError, true), _e));
                    })
                }), React.createElement("div", {
                  className: "box-image"
                }, React.createElement("img", {
                      src: param[2]
                    })), React.createElement("div", {
                  className: className
                }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl(param[4]))));
}

function make(store, dispatchFunc, dragImg, effectAllowd, imgSrc, folderId, fileType, name, isSelected, widget, debounceTime, onDrop, isWidget, handleRelationError, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              var clickStream = Most.fromEvent("mousedown", document.getElementById("folder-" + String(folderId)), true);
              Most.forEach((function () {
                      return onDoubleClick(dispatchFunc, fileType, folderId);
                    }), ClickStreamUtils$WonderEditor.bindClickStream(false, debounceTime, clickStream));
              Most.forEach((function ($$event) {
                      return Curry._4(onClick, folderId, fileType, dispatchFunc, $$event);
                    }), ClickStreamUtils$WonderEditor.bindClickStream(true, debounceTime, clickStream));
              return /* () */0;
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
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
                          handleRelationError
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
