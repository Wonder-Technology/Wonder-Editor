'use strict';

import * as Most                                        from "most";
import * as Block                                       from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                       from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                       from "react";
import * as Pervasives                                  from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ReasonReact                                 from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                               from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FileBox$WonderEditor                        from "../../fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor                      from "../../../../../../../external/DomHelper.js";
import * as ReactUtils$WonderEditor                     from "../../../../../../../atom_component/utils/ReactUtils.js";
import * as AssetTreeUtils$WonderEditor                 from "../../../composable_component/utils/AssetTreeUtils.js";
import * as DragEventUtils$WonderEditor                 from "../../../../../../../utils/DragEventUtils.js";
import * as ClickStreamUtils$WonderEditor               from "../../../../../../../utils/ClickStreamUtils.js";
import * as StateEditorService$WonderEditor             from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";

var onClick = FileBox$WonderEditor.Method[/* onSelect */0];

var Method = /* module */[
  /* onDoubleClick */AssetTreeUtils$WonderEditor.onSelect,
  /* onClick */onClick
];

var component = ReasonReact.reducerComponent("FolderBox");

function reducer(onDrop, action, state) {
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

function render(_, _$1, imgSrc, folderId, name, sign, handleSign, handleRelationError, _$2, param) {
  var reduce = param[/* reduce */3];
  var id = "folder-" + Pervasives.string_of_int(folderId);
  return React.createElement("article", {
              className: "file-item",
              id: id,
              style: param[/* state */4][/* style */0]
            }, React.createElement("div", {
                  className: "item-ground",
                  draggable: true,
                  onDragEnd: Curry._1(reduce, DragEventUtils$WonderEditor.handleDrageEnd),
                  onDragEnter: Curry._1(reduce, (function (param) {
                          return DragEventUtils$WonderEditor.handleDragEnter(folderId, handleSign, handleRelationError, param);
                        })),
                  onDragLeave: Curry._1(reduce, (function (param) {
                          return DragEventUtils$WonderEditor.handleDragLeave(folderId, handleSign, handleRelationError, param);
                        })),
                  onDragOver: DragEventUtils$WonderEditor.handleDragOver,
                  onDragStart: Curry._1(reduce, (function (param) {
                          return DragEventUtils$WonderEditor.handleDragStart(folderId, sign, param);
                        })),
                  onDrop: Curry._1(reduce, (function (param) {
                          return DragEventUtils$WonderEditor.handleDrop(folderId, handleRelationError, param);
                        }))
                }), React.createElement("img", {
                  src: imgSrc
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(name)));
}

function make(store, dispatch, imgSrc, folderId, name, sign, onDrop, handleSign, handleRelationError, isSelected, setNodeParentId, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      var clickStream = Most.fromEvent("mousedown", document.getElementById("folder-" + Pervasives.string_of_int(folderId)), true);
      Most.forEach((function () {
              Log$WonderLog.print("double click11");
              return AssetTreeUtils$WonderEditor.onSelect(dispatch, setNodeParentId, folderId);
            }), ClickStreamUtils$WonderEditor.bindClickStream(/* false */0, clickStream));
      Most.forEach((function ($$event) {
              Log$WonderLog.print("sing click");
              return Curry._3(onClick, dispatch, folderId, $$event);
            }), ClickStreamUtils$WonderEditor.bindClickStream(/* true */1, clickStream));
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, imgSrc, folderId, name, sign, handleSign, handleRelationError, isSelected, self);
    });
  newrecord[/* initialState */10] = (function () {
      if (isSelected !== 0) {
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
/* component Not a pure module */
