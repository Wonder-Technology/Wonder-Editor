'use strict';

import * as Block                   from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                   from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as ReasonReact             from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor        from "../../../../external/Css.js";
import * as DomHelper$WonderEditor  from "../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor  from "../../utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../../utils/ReactUtils.js";

Css$WonderEditor.importCss("./css/treeNode.css");

function handleDragStart(uid, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  DragUtils$WonderEditor.setDataTransferEffectIsMove($$event);
  DragUtils$WonderEditor.setdragedUid(uid, $$event);
  return /* DragStart */3;
}

function handleDragEnter() {
  return /* DragEnter */0;
}

function handleDragLeave() {
  return /* DragLeave */1;
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, onDrop, $$event) {
  return Curry._1(onDrop, /* tuple */[
              uid,
              DragUtils$WonderEditor.getdragedUid($$event)
            ]);
}

function handleDrageEnd() {
  return /* DragEnd */2;
}

var Method = /* module */[
  /* handleDragStart */handleDragStart,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop,
  /* handleDrageEnd */handleDrageEnd
];

var component = ReasonReact.reducerComponent("TreeNode");

function reducer(action, state) {
  switch (action) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0])]]);
    case 3 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
    
  }
}

function render(attributeTuple, eventHandleTuple, treeChildren, param) {
  var onDrop = eventHandleTuple[1];
  var onSelect = eventHandleTuple[0];
  var uid = attributeTuple[0];
  var reduce = param[/* reduce */3];
  return React.createElement("ul", {
              className: "wonder-tree-node",
              draggable: true,
              onDragEnd: Curry._1(reduce, handleDrageEnd),
              onDragStart: Curry._1(reduce, (function (param) {
                      return handleDragStart(uid, param);
                    }))
            }, React.createElement("li", {
                  style: param[/* state */4][/* style */0],
                  onClick: (function () {
                      return Curry._1(onSelect, uid);
                    }),
                  onDragEnter: Curry._1(reduce, handleDragEnter),
                  onDragLeave: Curry._1(reduce, handleDragLeave),
                  onDragOver: handleDragOver,
                  onDrop: (function (param) {
                      return handleDrop(uid, onDrop, param);
                    })
                }, DomHelper$WonderEditor.textEl(attributeTuple[1])), treeChildren ? treeChildren[0] : null);
}

function make(attributeTuple, eventHandleTuple, treeChildren, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(attributeTuple, eventHandleTuple, treeChildren, self);
    });
  newrecord[/* initialState */10] = (function () {
      if (attributeTuple[2] !== 0) {
        return /* record */[/* style */{
                  background: "red"
                }];
      } else {
        return /* record */[/* style */{
                  opacity: "1"
                }];
      }
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
