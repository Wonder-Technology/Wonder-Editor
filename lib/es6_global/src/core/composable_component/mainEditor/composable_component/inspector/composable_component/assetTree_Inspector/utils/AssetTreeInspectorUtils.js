

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetNodeUtils$WonderEditor from "../../../../asset/utils/AssetNodeUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../../../service/state/asset/StateAssetService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetNodeAssetService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

function _renameFolderNode(folderId, name, assetState, folderNodeMap) {
  var __x = AssetNodeAssetService$WonderEditor.renameFolderNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(folderId, folderNodeMap));
  StateAssetService$WonderEditor.setState(FolderNodeMapAssetService$WonderEditor.setResult(folderId, __x, assetState));
  return /* () */0;
}

function _renameJsonNode(jsonId, name, assetState, jsonNodeMap) {
  var __x = AssetNodeAssetService$WonderEditor.renameJsonNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(jsonId, jsonNodeMap));
  StateAssetService$WonderEditor.setState(JsonNodeMapAssetService$WonderEditor.setResult(jsonId, __x, assetState));
  return /* () */0;
}

function _renameTextureNode(textureIndex, name, _) {
  return OperateTextureLogicService$WonderEditor.renameTextureToEngine(textureIndex, name);
}

function renameAssetTreeNode(dispatchFunc, nodeId, nodeType, value) {
  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
  AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
        (function (param) {
            return _renameFolderNode(nodeId, value, assetState, param);
          }),
        (function (param) {
            return _renameJsonNode(nodeId, value, assetState, param);
          }),
        (function () {
            return OperateTextureLogicService$WonderEditor.renameTextureToEngine(nodeId, value);
          })
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Asset */3]]
      ]);
  return /* () */0;
}

export {
  _renameFolderNode ,
  _renameJsonNode ,
  _renameTextureNode ,
  renameAssetTreeNode ,
  
}
/* AssetNodeUtils-WonderEditor Not a pure module */
