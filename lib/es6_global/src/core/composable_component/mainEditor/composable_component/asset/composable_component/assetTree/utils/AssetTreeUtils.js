'use strict';

import * as Curry                                                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                                         from "../../../../../../../ui/store/AppStore.js";
import * as StateLogicService$WonderEditor                                from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as CurrentSourceEditorService$WonderEditor                       from "../../../../../../../../service/state/editor/CurrentSourceEditorService.js";
import * as AssetCurrentAssetTreeNodeEditorService$WonderEditor           from "../../../../../../../../service/state/editor/asset/AssetCurrentAssetTreeNodeEditorService.js";
import * as AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentAssetChildrenNodeParentEditorService.js";

function getSign() {
  return "assetTreeRoot";
}

function onSelect(dispatch, folderId) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return CurrentSourceEditorService$WonderEditor.setCurrentSource(/* AssetTree */1, AssetCurrentAssetTreeNodeEditorService$WonderEditor.setCurrentAssetTreeNode(folderId, AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor.setCurrentAssetChildrenNodeParent(folderId, editorState)));
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

export {
  getSign  ,
  onSelect ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
