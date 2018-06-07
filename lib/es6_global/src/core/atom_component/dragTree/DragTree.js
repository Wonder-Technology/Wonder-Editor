

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

function _isIdNotEqual(startId, targetId) {
  if (startId) {
    return startId[0] !== targetId;
  } else {
    return false;
  }
}

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
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragLeave(id, handleFlag, handleRelationError, $$event);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

function handleDrop(uid, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleRelationError);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* DragDrop */[
            uid,
            startId
          ];
  }
}

var Method = /* module */[
  /* _isIdNotEqual */_isIdNotEqual,
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

function render(treeArrayData, rootUid, handleFlag, handleRelationError, param) {
  var send = param[/* send */3];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArrayData, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param[/* state */1][/* style */0],
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(rootUid, handleFlag, handleRelationError, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(rootUid, handleFlag, handleRelationError, _e));
                    }),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDrop(rootUid, handleRelationError, _e));
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
              return render(treeArrayData, rootUid, handleFlag, handleRelationError, self);
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
