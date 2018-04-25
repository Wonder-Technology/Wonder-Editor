'use strict';

import * as Block                                 from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                 from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                 from "react";
import * as ReasonReact                           from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                         from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                      from "../../../../external/Css.js";
import * as DomHelper$WonderEditor                from "../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor                from "../../utils/DragUtils.js";
import * as ReactUtils$WonderEditor               from "../../../utils/ReactUtils.js";
import * as StateLogicService$WonderEditor        from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor       from "../../../../../service/state/editor/StateEditorService.js";
import * as CurrentTreeEditorService$WonderEditor from "../../../../../service/state/editor/CurrentTreeEditorService.js";

Css$WonderEditor.importCss("./css/treeNode.css");

function handleDragStart(uid, sign, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  DragUtils$WonderEditor.setDataTransferEffectIsMove($$event);
  DragUtils$WonderEditor.setdragedUid(uid, $$event);
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return CurrentTreeEditorService$WonderEditor.setCurrentTree(sign, param);
        }));
  return /* DragStart */4;
}

function handleDragEnter(sign, _) {
  var match = +(CurrentTreeEditorService$WonderEditor.getCurrenttree(StateEditorService$WonderEditor.getState(/* () */0)) === sign);
  if (match !== 0) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(sign, _) {
  var match = +(CurrentTreeEditorService$WonderEditor.getCurrenttree(StateEditorService$WonderEditor.getState(/* () */0)) === sign);
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, _, onDrop, $$event) {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTreeEditorService$WonderEditor.clearCurrentTree);
  return Curry._1(onDrop, /* tuple */[
              uid,
              DragUtils$WonderEditor.getdragedUid($$event)
            ]);
}

function handleDrageEnd(_, _$1) {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTreeEditorService$WonderEditor.clearCurrentTree);
  Log$WonderLog.print("end");
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

function reducer(action, state) {
  switch (action) {
    case 0 : 
        return /* NoUpdate */0;
    case 1 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "2px dashed blue", state[/* style */0])]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("border", "1px solid red", state[/* style */0])]]);
    case 3 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "1", state[/* style */0])]]);
    case 4 : 
        return /* Update */Block.__(0, [/* record */[/* style */ReactUtils$WonderEditor.addStyleProp("opacity", "0.2", state[/* style */0])]]);
    
  }
}

function render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, param) {
  var onDrop = eventHandleTuple[1];
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
                        return handleDragEnter(sign, param);
                      })),
                onDragLeave: Curry._1(reduce, (function (param) {
                        return handleDragLeave(sign, param);
                      })),
                onDragOver: handleDragOver,
                onDrop: (function (param) {
                    return handleDrop(uid, sign, onDrop, param);
                  })
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
                onDragEnd: Curry._1(reduce, (function (param) {
                        return handleDrageEnd(sign, param);
                      })),
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
