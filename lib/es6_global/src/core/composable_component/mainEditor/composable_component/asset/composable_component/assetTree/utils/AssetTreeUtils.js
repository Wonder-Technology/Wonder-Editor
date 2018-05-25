'use strict';

import * as Curry                                        from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                                from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                        from "../../../../../../../ui/store/AppStore.js";
import * as StateLogicService$WonderEditor               from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor              from "../../../../../../../../service/state/editor/SceneEditorService.js";
import * as CurrentSourceEditorService$WonderEditor      from "../../../../../../../../service/state/editor/CurrentSourceEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function getSign() {
  return "assetTreeRoot";
}

function onSelect(dispatch, setNodeParentId, folderId) {
  Log$WonderLog.print(/* tuple */[
        "select:",
        folderId
      ]);
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(CurrentSourceEditorService$WonderEditor.setCurrentSource(/* AssetTree */1, AssetCurrentNodeIdEditorService$WonderEditor.setCurrentNodeId(folderId, editorState)));
        }));
  Curry._1(setNodeParentId, folderId);
  return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
}

export {
  getSign  ,
  onSelect ,
  
}
/* Log-WonderLog Not a pure module */
