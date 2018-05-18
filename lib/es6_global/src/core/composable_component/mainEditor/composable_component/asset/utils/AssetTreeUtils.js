'use strict';

import * as Curry                                   from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                   from "../../../../../ui/store/AppStore.js";
import * as StateLogicService$WonderEditor          from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor         from "../../../../../../service/state/editor/AssetEditorService.js";
import * as CurrentSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSourceEditorService.js";

function getSign() {
  return "assetTree";
}

function onSelect(dispatch, id) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return AssetEditorService$WonderEditor.clearCurrentFile(CurrentSourceEditorService$WonderEditor.setCurrentSource(/* AssetTree */1, AssetEditorService$WonderEditor.setCurrentTreeNode(id, editorState)));
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

export {
  getSign  ,
  onSelect ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
