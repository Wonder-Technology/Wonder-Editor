

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../external/Css.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "./utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../utils/ReactUtils.js";
import * as DragEventUtils$WonderEditor from "../../utils/DragEventUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ReasonReactUtils.js";
import * as DragEventBaseUtils$WonderEditor from "../../utils/DragEventBaseUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

Css$WonderEditor.importCss("./css/dragTree.css");

function handleDragEnter(id, handleFlag, handleRelationError, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, handleFlag, handleRelationError);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, handleFlag, handleRelationError, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragLeave(id, handleFlag, handleRelationError);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

function handleDrop(uid, handleFlag, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleFlag, handleRelationError);
  if (match) {
    return /* DragDrop */[
            uid,
            startId
          ];
  } else {
    return /* DragLeave */2;
  }
}

var Method = /* module */[
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDrop */handleDrop
];

var component = ReasonReact.reducerComponent("DragTree");

function reducer(onDrop, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "rgba(0,0,1,1.0)", state[/* style */0])]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#c0c0c0", state[/* style */0])]]);
      
    }
  } else {
    var removedId = action[1];
    var targetId = action[0];
    var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
    var flag = match[0];
    return ReasonReactUtils$WonderEditor.sideEffects((function () {
                  return Curry._1(onDrop, /* tuple */[
                              targetId,
                              removedId,
                              flag
                            ]);
                }));
  }
}

function render(treeArrayData, rootUid, param, param$1) {
  var send = param$1[/* send */3];
  var handleRelationError = param[1];
  var handleFlag = param[0];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArrayData, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param$1[/* state */1][/* style */0],
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(rootUid, handleFlag, handleRelationError, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(rootUid, handleFlag, handleRelationError, _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDrop(rootUid, handleFlag, handleRelationError, _e));
                    })
                }));
}

function make(treeArrayData, rootUid, onDrop, handleFlag, handleRelationError, _) {
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
              return render(treeArrayData, rootUid, /* tuple */[
                          handleFlag,
                          handleRelationError
                        ], self);
            }),
          /* initialState */(function () {
              return /* record */[/* style */{
                        backgroundColor: "#c0c0c0"
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
/*  Not a pure module */
