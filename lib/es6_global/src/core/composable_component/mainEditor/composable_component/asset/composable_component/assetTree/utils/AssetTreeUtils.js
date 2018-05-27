'use strict';

import * as Curry                                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                         from "../../../../../../../ui/store/AppStore.js";
import * as StateLogicService$WonderEditor                from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor               from "../../../../../../../../service/state/editor/SceneEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor  from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function getSign() {
  return "assetTreeRoot";
}

function onSelect(dispatch, setNodeParentId, folderId) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* AssetTree */1, AssetCurrentNodeIdEditorService$WonderEditor.setCurrentNodeId(folderId, editorState)));
        }));
  Curry._1(setNodeParentId, folderId);
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

export {
  getSign  ,
  onSelect ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
