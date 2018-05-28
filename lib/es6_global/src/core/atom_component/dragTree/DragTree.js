'use strict';

import * as Block                                       from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                       from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                       from "react";
import * as ReasonReact                                 from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                            from "../../external/Css.js";
import * as DomHelper$WonderEditor                      from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor                      from "./utils/DragUtils.js";
import * as EventUtils$WonderEditor                     from "../../utils/EventUtils.js";
import * as ReactUtils$WonderEditor                     from "../utils/ReactUtils.js";
import * as DragEventUtils$WonderEditor                 from "../../utils/DragEventUtils.js";
import * as StateEditorService$WonderEditor             from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

Css$WonderEditor.importCss("./css/dragTree.css");

function _isIdNotEqual(startId, targetId) {
  if (startId) {
    return +(startId[0] !== targetId);
  } else {
    return /* false */0;
  }
}

function handleDragEnter(id, handleSign, handleRelationError, _) {
  var match = EventUtils$WonderEditor.isTriggerDragEnter(id, handleSign, handleRelationError);
  if (match !== 0) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, handleSign, handleRelationError, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = EventUtils$WonderEditor.isTriggerDragLeave(id, handleSign, handleRelationError, $$event);
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

function handleDrop(uid, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = EventUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleRelationError);
  if (match !== 0) {
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
    var sign = match[0];
    return /* SideEffects */Block.__(2, [(function () {
                  return Curry._1(onDrop, /* tuple */[
                              targetId,
                              removedId,
                              sign
                            ]);
                })]);
  }
}

function render(treeArrayData, rootUid, handleSign, handleRelationError, param) {
  var reduce = param[/* reduce */3];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArrayData, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param[/* state */4][/* style */0],
                  onDragEnter: Curry._1(reduce, (function (param) {
                          return handleDragEnter(rootUid, handleSign, handleRelationError, param);
                        })),
                  onDragLeave: Curry._1(reduce, (function (param) {
                          return handleDragLeave(rootUid, handleSign, handleRelationError, param);
                        })),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDrop: Curry._1(reduce, (function (param) {
                          return handleDrop(rootUid, handleRelationError, param);
                        }))
                }));
}

function make(treeArrayData, rootUid, onDrop, handleSign, handleRelationError, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(treeArrayData, rootUid, handleSign, handleRelationError, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* style */{
                backgroundColor: "#c0c0c0"
              }];
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(onDrop, param, param$1);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/*  Not a pure module */
