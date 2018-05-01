'use strict';

import * as Block                                 from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                 from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                      from "../../external/Css.js";
import * as DomHelper$WonderEditor                from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor                from "./utils/DragUtils.js";
import * as ReactUtils$WonderEditor               from "../utils/ReactUtils.js";
import * as StateEditorService$WonderEditor       from "../../../service/state/editor/StateEditorService.js";
import * as CurrentTreeEditorService$WonderEditor from "../../../service/state/editor/CurrentTreeEditorService.js";

import '../../../../../../src/core/atom_component/dragTree/css/dragTree.css';

function handleDragEnter(sign, _) {
  var match = +(CurrentTreeEditorService$WonderEditor.getCurrenttree(StateEditorService$WonderEditor.getState(/* () */0)) === sign);
  if (match !== 0) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(sign, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = +(CurrentTreeEditorService$WonderEditor.getCurrenttree(StateEditorService$WonderEditor.getState(/* () */0)) === sign);
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, onDrop, sign, $$event) {
  var match = +(CurrentTreeEditorService$WonderEditor.getCurrenttree(StateEditorService$WonderEditor.getState(/* () */0)) === sign);
  if (match !== 0) {
    return Curry._1(onDrop, /* tuple */[
                uid,
                DragUtils$WonderEditor.getdragedUid($$event)
              ]);
  } else {
    Log$WonderLog.print("can't drop");
    return /* () */0;
  }
}

var Method = /* module */[
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop
];

var component = ReasonReact.reducerComponent("DragTree");

function reducer(action, state) {
  switch (action) {
    case 0 : 
        return /* NoUpdate */0;
    case 1 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "rgba(0,0,1,1.0)", state[/* style */0])]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#c0c0c0", state[/* style */0])]]);
    
  }
}

function render(treeArrayData, rootUid, onDrop, sign, param) {
  var reduce = param[/* reduce */3];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArrayData, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param[/* state */4][/* style */0],
                  onDragEnter: Curry._1(reduce, (function (param) {
                          return handleDragEnter(sign, param);
                        })),
                  onDragLeave: Curry._1(reduce, (function (param) {
                          return handleDragLeave(sign, param);
                        })),
                  onDragOver: handleDragOver,
                  onDrop: (function (param) {
                      return handleDrop(rootUid, onDrop, sign, param);
                    })
                }));
}

function make(treeArrayData, rootUid, onDrop, sign, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(treeArrayData, rootUid, onDrop, sign, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* style */{
                backgroundColor: "#c0c0c0"
              }];
    });
  newrecord[/* reducer */12] = reducer;
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

