'use strict';

import * as Block                           from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                           from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                           from "react";
import * as ReasonReact                     from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor           from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor          from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor         from "../../../../asset/utils/AssetUtils.js";
import * as StateLogicService$WonderEditor  from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";

function setInputFolderdRef(value, param) {
  param[/* state */4][/* inputField */0][0] = value === null ? /* None */0 : [value];
  return /* () */0;
}

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

function blur() {
  return /* Blur */0;
}

function triggerBlur(dispatch, value, folderId) {
  var partial_arg = AssetUtils$WonderEditor.renameSpecificTreeNode(folderId, value, AssetEditorService$WonderEditor.unsafeGetAssetTree(StateEditorService$WonderEditor.getState(/* () */0)));
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
        }));
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

function showFolderInfo(param) {
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  var match = state[/* isAssetTreeRootNode */2];
  return React.createElement("div", {
              className: ""
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  ref: Curry._1(param[/* handle */0], setInputFolderdRef),
                  className: "input-component float-input",
                  disabled: match !== 0 ? true : false,
                  type: "text",
                  value: state[/* inputValue */1],
                  onBlur: Curry._1(reduce, blur),
                  onChange: Curry._1(reduce, change)
                }));
}

var Method = /* module */[
  /* change */change,
  /* blur */blur,
  /* triggerBlur */triggerBlur,
  /* showFolderInfo */showFolderInfo
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(dispatch, folderId, action, state) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[
                /* inputField */state[/* inputField */0],
                /* inputValue */action[0],
                /* isAssetTreeRootNode */state[/* isAssetTreeRootNode */2]
              ]]);
  } else {
    triggerBlur(dispatch, state[/* inputValue */1], folderId);
    return /* NoUpdate */0;
  }
}

function render(self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "inspector-component"
            }, showFolderInfo(self));
}

function make(_, dispatch, folderId, treeNode, _$1) {
  var newrecord = component.slice();
  newrecord[/* render */9] = render;
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* inputField */[/* None */0],
              /* inputValue */treeNode[/* name */1],
              /* isAssetTreeRootNode */AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getRootTreeNodeId), folderId)
            ];
    });
  newrecord[/* reducer */12] = (function (param, param$1) {
      return reducer(dispatch, folderId, param, param$1);
    });
  return newrecord;
}

export {
  setInputFolderdRef ,
  Method             ,
  component          ,
  reducer            ,
  render             ,
  make               ,
  
}
/* component Not a pure module */
