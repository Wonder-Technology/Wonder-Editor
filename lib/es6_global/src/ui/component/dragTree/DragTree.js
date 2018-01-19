'use strict';

import * as Block                   from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                   from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as ReasonReact             from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor        from "../../../external/Css.js";
import * as DomHelper$WonderEditor  from "../../../external/DomHelper.js";
import * as DragUtils$WonderEditor  from "./utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../utils/reactUtils.js";

import '../../../../../../src/ui/component/dragTree/css/dragTree.css';

function handleDragEnter() {
  return /* DragEnter */0;
}

function handleDragLeave($$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  return /* DragLeave */1;
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, onDropFinish, $$event) {
  return Curry._1(onDropFinish, /* tuple */[
              uid,
              DragUtils$WonderEditor.getdragedUid($$event)
            ]);
}

var component = ReasonReact.reducerComponent("DragTree");

function reducer(action, state) {
  if (action !== 0) {
    return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "#c0c0c0", state[/* style */0])]]);
  } else {
    return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("backgroundColor", "rgba(1,1,1,0.7)", state[/* style */0])]]);
  }
}

function render(treeArrayData, rootUid, onDropFinish, param) {
  var reduce = param[/* reduce */3];
  return React.createElement("article", {
              className: "wonder-drag-tree"
            }, treeArrayData, React.createElement("div", {
                  className: "wonder-disable-drag",
                  style: param[/* state */4][/* style */0],
                  onDragEnter: Curry._1(reduce, handleDragEnter),
                  onDragLeave: Curry._1(reduce, handleDragLeave),
                  onDragOver: handleDragOver,
                  onDrop: (function (param) {
                      return handleDrop(rootUid, onDropFinish, param);
                    })
                }));
}

function make(treeArrayData, rootUid, onDropFinish, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(treeArrayData, rootUid, onDropFinish, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* style */{
                backgroundColor: "#c0c0c0"
              }];
    });
  newrecord[/* reducer */12] = reducer;
  return newrecord;
}

var Method = [
  handleDragOver,
  handleDrop
];

export {
  Method ,
  render ,
  make   ,
  
}
/*  Not a pure module */

