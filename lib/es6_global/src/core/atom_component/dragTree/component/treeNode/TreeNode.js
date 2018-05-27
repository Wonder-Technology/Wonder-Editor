'use strict';

import * as Block                                       from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                       from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                       from "react";
import * as ReasonReact                                 from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                            from "../../../../external/Css.js";
import * as DomHelper$WonderEditor                      from "../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor                     from "../../../utils/ReactUtils.js";
import * as DragEventUtils$WonderEditor                 from "../../../../utils/DragEventUtils.js";
import * as StateEditorService$WonderEditor             from "../../../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../service/state/editor/CurrentDragSourceEditorService.js";

import '../../../../../../../../src/core/atom_component/dragTree/component/treeNode/css/treeNode.css';

var component = ReasonReact.reducerComponent("TreeNode");

function reducer(eventHandleTuple, action, state) {
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
    var onDrop = eventHandleTuple[1];
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

function render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, param) {
  var handleRelationError = eventHandleTuple[3];
  var handleSign = eventHandleTuple[2];
  var onSelect = eventHandleTuple[0];
  var name = attributeTuple[1];
  var uid = attributeTuple[0];
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  var _getContent = function () {
    return React.createElement("li", {
                style: state[/* style */0],
                onClick: (function () {
                    return Curry._1(onSelect, uid);
                  })
              }, React.createElement("div", {
                    className: "item-ground",
                    draggable: true,
                    onDragEnter: Curry._1(reduce, (function (param) {
                            return DragEventUtils$WonderEditor.handleDragEnter(uid, handleSign, handleRelationError, param);
                          })),
                    onDragLeave: Curry._1(reduce, (function (param) {
                            return DragEventUtils$WonderEditor.handleDragLeave(uid, handleSign, handleRelationError, param);
                          })),
                    onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                    onDrop: Curry._1(reduce, (function (param) {
                            return DragEventUtils$WonderEditor.handleDrop(uid, handleRelationError, param);
                          }))
                  }), icon ? React.createElement("img", {
                      src: icon[0]
                    }) : null, DomHelper$WonderEditor.textEl(name));
  };
  if (dragable && dragable[0] === 0) {
    var content = _getContent(/* () */0);
    return React.createElement("ul", {
                className: "wonder-tree-node"
              }, content, treeChildren ? treeChildren[0] : null);
  } else {
    var content$1 = _getContent(/* () */0);
    return React.createElement("ul", {
                className: "wonder-tree-node",
                draggable: true,
                onDragEnd: Curry._1(reduce, DragEventUtils$WonderEditor.handleDrageEnd),
                onDragStart: Curry._1(reduce, (function (param) {
                        return DragEventUtils$WonderEditor.handleDragStart(uid, sign, param);
                      }))
              }, content$1, treeChildren ? treeChildren[0] : null);
  }
}

function make(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, self);
    });
  newrecord[/* initialState */10] = (function () {
      if (attributeTuple[2] !== 0) {
        if (attributeTuple[3] !== 0) {
          return /* record */[/* style */{
                    background: "red"
                  }];
        } else {
          return /* record */[/* style */{
                    background: "#c0c0c0"
                  }];
        }
      } else {
        return /* record */[/* style */{
                  border: "1px solid red"
                }];
      }
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(eventHandleTuple, param, param$1);
    });
  return newrecord;
}

export {
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/*  Not a pure module */

