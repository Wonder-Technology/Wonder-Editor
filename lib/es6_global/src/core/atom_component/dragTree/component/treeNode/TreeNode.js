'use strict';

import * as Block                                 from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                 from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                      from "../../../../external/Css.js";
import * as DomHelper$WonderEditor                from "../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor                from "../../utils/DragUtils.js";
import * as EventUtils$WonderEditor               from "../../../../utils/EventUtils.js";
import * as ReactUtils$WonderEditor               from "../../../utils/ReactUtils.js";
import * as StateLogicService$WonderEditor        from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor       from "../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSignEditorService$WonderEditor from "../../../../../service/state/editor/CurrentSignEditorService.js";

import '../../../../../../../../src/core/atom_component/dragTree/component/treeNode/css/treeNode.css';

function handleDragStart(uid, sign, $$event) {
  EventUtils$WonderEditor.dragStart(uid, sign, $$event);
  return /* DragStart */4;
}

function handleDragEnter(handleSign, _) {
  var match = Curry._1(handleSign, CurrentSignEditorService$WonderEditor.getCurrentSign(StateEditorService$WonderEditor.getState(/* () */0)));
  if (match !== 0) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(handleSign, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = Curry._1(handleSign, CurrentSignEditorService$WonderEditor.getCurrentSign(StateEditorService$WonderEditor.getState(/* () */0)));
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, handleRelation, $$event) {
  var match = +(CurrentSignEditorService$WonderEditor.getCurrentSign(StateEditorService$WonderEditor.getState(/* () */0)) === "fileContent");
  if (match !== 0) {
    return /* DragDrop */[
            uid,
            DragUtils$WonderEditor.getdragedUid($$event)
          ];
  } else {
    var match$1 = StateLogicService$WonderEditor.getStateToGetData(Curry._2(handleRelation, uid, DragUtils$WonderEditor.getdragedUid($$event)));
    if (match$1 !== 0) {
      return /* DragLeave */2;
    } else {
      return /* DragDrop */[
              uid,
              DragUtils$WonderEditor.getdragedUid($$event)
            ];
    }
  }
}

function handleDrageEnd() {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentSignEditorService$WonderEditor.clearCurrentSign);
  return /* DragEnd */3;
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
    return /* SideEffects */Block.__(2, [(function () {
                  return Curry._1(onDrop, /* tuple */[
                              targetId,
                              removedId,
                              CurrentSignEditorService$WonderEditor.getCurrentSign(StateEditorService$WonderEditor.getState(/* () */0))
                            ]);
                })]);
  }
}

function render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, param) {
  var handleRelation = eventHandleTuple[3];
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
                  }),
                onDragEnter: Curry._1(reduce, (function (param) {
                        return handleDragEnter(handleSign, param);
                      })),
                onDragLeave: Curry._1(reduce, (function (param) {
                        return handleDragLeave(handleSign, param);
                      })),
                onDragOver: handleDragOver,
                onDrop: Curry._1(reduce, (function (param) {
                        return handleDrop(uid, handleRelation, param);
                      }))
              }, icon ? React.createElement("img", {
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
                onDragEnd: Curry._1(reduce, handleDrageEnd),
                onDragStart: Curry._1(reduce, (function (param) {
                        return handleDragStart(uid, sign, param);
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
        return /* record */[/* style */{
                  background: "red"
                }];
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
  Method    ,
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/*  Not a pure module */

