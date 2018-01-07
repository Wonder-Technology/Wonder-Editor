'use strict';

import * as Block                   from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                   from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as Js_boolean              from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact             from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor        from "../../../../../../../../external/Css.js";
import * as DomHelper$WonderEditor  from "../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor  from "../utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../ui/component/utils/reactUtils.js";

Css$WonderEditor.importCss("./css/treeNode.css");

function handleClick(onSelect, uid, _) {
  return Curry._1(onSelect, uid);
}

function handleDragStart(uid, $$event) {
  $$event.stopPropagation();
  $$event.dataTransfer.effectAllowed = "move";
  $$event.dataTransfer.setData("dragedId", uid);
  return /* DragStart */2;
}

function handleDragEnter() {
  return /* DragEnter */0;
}

function handleDragLeave() {
  return /* DragLeave */1;
}

function handleDragOver($$event) {
  return $$event.preventDefault();
}

function handleDrop(uid, onDropFinish, $$event) {
  return Curry._2(onDropFinish, uid, DragUtils$WonderEditor.getDragedId($$event));
}

var Method = /* module */[
  /* handleClick */handleClick,
  /* handleDragStart */handleDragStart,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDrop */handleDrop
];

var component = ReasonReact.reducerComponent("TreeNode");

function make(uid, name, onSelect, onDropFinish, treeChildren, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var reduce = param[/* reduce */3];
      return React.createElement("ul", {
                  className: "wonder-tree-node",
                  draggable: Js_boolean.to_js_boolean(/* true */1),
                  onDragStart: Curry._1(reduce, (function (param) {
                          return handleDragStart(uid, param);
                        }))
                }, React.createElement("li", {
                      style: param[/* state */4][/* currentStyle */0],
                      onClick: (function () {
                          return Curry._1(onSelect, uid);
                        }),
                      onDragEnter: Curry._1(reduce, handleDragEnter),
                      onDragLeave: Curry._1(reduce, handleDragLeave),
                      onDragOver: Curry._1(reduce, handleDragOver),
                      onDrop: (function (param) {
                          return handleDrop(uid, onDropFinish, param);
                        })
                    }, DomHelper$WonderEditor.textEl(name)), treeChildren ? treeChildren[0] : null);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* currentStyle */{
                opacity: "1"
              }];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action) {
        case 0 : 
            return /* Update */Block.__(0, [/* record */[/* currentStyle */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* currentStyle */0])]]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[/* currentStyle */ReactUtils$WonderEditor.addStyleProp("border", "0", state[/* currentStyle */0])]]);
        case 2 : 
            return /* Update */Block.__(0, [/* record */[/* currentStyle */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* currentStyle */0])]]);
        
      }
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  make      ,
  
}
/*  Not a pure module */
