

import * as Most from "most";
import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as FileBox$WonderEditor from "../../fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor from "../../../../../../../utils/ui/ReactUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../../composable_component/utils/AssetTreeUtils.js";
import * as DragEventUtils$WonderEditor from "../../../../../../../utils/event/DragEventUtils.js";
import * as ClickStreamUtils$WonderEditor from "../../../../../../../utils/event/ClickStreamUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";

var onClick = FileBox$WonderEditor.Method[/* onSelect */0];

var Method = /* module */[
  /* onDoubleClick */AssetTreeUtils$WonderEditor.onSelect,
  /* onClick */onClick
];

var component = ReasonReact.reducerComponent("FolderBox");

function reducer(onDrop, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0]))]]);
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
  var handleRelationError = param$1[1];
  var isWidge = param$1[0];
  var widge = param[4];
  var folderId = param[2];
  var dragImg = param[0];
  var id = "folder-" + String(folderId);
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
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragEnter(folderId, isWidge, handleRelationError, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragLeave(folderId, isWidge, handleRelationError, _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDragStart: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDragStart(folderId, widge, dragImg, _e));
                    }),
                  onDrop: (function (_e) {
                      return Curry._1(send, DragEventUtils$WonderEditor.handleDrop(folderId, isWidge, handleRelationError, _e));
                    })
                }), React.createElement("img", {
                  src: param[1]
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(param[3])));
}

function make(store, dispatchFunc, dragImg, imgSrc, folderId, fileType, name, isSelected, widge, debounceTime, onDrop, isWidge, handleRelationError, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              var clickStream = Most.fromEvent("mousedown", document.getElementById("folder-" + String(folderId)), true);
              Most.forEach((function () {
                      return AssetTreeUtils$WonderEditor.onSelect(dispatchFunc, fileType, folderId);
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
                          imgSrc,
                          folderId,
                          name,
                          widge
                        ], /* tuple */[
                          isWidge,
                          handleRelationError
                        ], self);
            }),
          /* initialState */(function () {
              if (isSelected) {
                return /* record */[/* style */{
                          background: "red"
                        }];
              } else {
                return /* record */[/* style */{
                          border: "1px solid red"
                        }];
              }
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
