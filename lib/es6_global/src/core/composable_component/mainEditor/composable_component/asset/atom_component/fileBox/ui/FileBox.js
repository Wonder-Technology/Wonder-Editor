'use strict';

import * as Curry                                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                         from "react";
import * as ReasonReact                                   from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor                         from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor                        from "../../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor                       from "../../../../../../../utils/EventUtils.js";
import * as StateLogicService$WonderEditor                from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor               from "../../../../../../../../service/state/editor/SceneEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor  from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function onSelect(dispatch, fileId, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, AssetCurrentNodeIdEditorService$WonderEditor.setCurrentNodeId(fileId, editorState)));
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var Method = /* module */[/* onSelect */onSelect];

var component = ReasonReact.statelessComponent("FileBox");

function render(_, dispatch, attributeTuple, _$1) {
  var sign = attributeTuple[4];
  var fileId = attributeTuple[2];
  var dragImg = attributeTuple[0];
  var className = "file-item " + (
    attributeTuple[5] !== 0 ? "item-active" : ""
  );
  return React.createElement("article", {
              className: className,
              onClick: (function (_event) {
                  return onSelect(dispatch, fileId, _event);
                })
            }, React.createElement("img", {
                  src: attributeTuple[1],
                  onDragStart: (function (param) {
                      return EventUtils$WonderEditor.dragStart(fileId, sign, dragImg, param);
                    })
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(attributeTuple[3])));
}

function make(store, dispatch, attributeTuple, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, attributeTuple, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
