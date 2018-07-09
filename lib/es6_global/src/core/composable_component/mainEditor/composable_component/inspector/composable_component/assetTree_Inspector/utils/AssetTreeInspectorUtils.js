

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetNodeUtils$WonderEditor from "../../../../asset/utils/AssetNodeUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../service/state/asset/StateAssetService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetNodeAssetService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

function _handleFolderNode(folderId, name, assetState, folderNodeMap) {
  var __x = AssetNodeAssetService$WonderEditor.renameFolderNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(folderId, folderNodeMap));
  StateAssetService$WonderEditor.setState(FolderNodeMapAssetService$WonderEditor.setResult(folderId, __x, assetState));
  return /* () */0;
}

function _handleJsonNode(jsonId, name, assetState, jsonNodeMap) {
  var __x = AssetNodeAssetService$WonderEditor.renameJsonNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(jsonId, jsonNodeMap));
  StateAssetService$WonderEditor.setState(JsonNodeMapAssetService$WonderEditor.setResult(jsonId, __x, assetState));
  return /* () */0;
}

var _handleTextureNode = OperateTextureLogicService$WonderEditor.renameTextureToEngine;

function renameAssetTreeNode(dispatchFunc, nodeId, nodeType, value) {
  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
  AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
        (function (folderNodeMap) {
            return _handleFolderNode(nodeId, value, assetState, folderNodeMap);
          }),
        (function (jsonNodeMap) {
            return _handleJsonNode(nodeId, value, assetState, jsonNodeMap);
          }),
        (function () {
            return OperateTextureLogicService$WonderEditor.renameTextureToEngine(nodeId, value);
          })
      ]);
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

export {
  _handleFolderNode ,
  _handleJsonNode ,
  _handleTextureNode ,
  renameAssetTreeNode ,
  
}
/* AssetNodeUtils-WonderEditor Not a pure module */
