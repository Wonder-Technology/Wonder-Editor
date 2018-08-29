

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as AssetNodeUtils$WonderEditor from "../../../../../bottom_components/asset/utils/AssetNodeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as AssetWdbNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetWdbNodeMapEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as AssetMaterialNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetMaterialNodeMapEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _renameFolderNode(folderId, name, editorState, folderNodeMap) {
  var __x = AssetNodeEditorService$WonderEditor.renameFolderNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(folderId, folderNodeMap));
  StateEditorService$WonderEditor.setState(AssetFolderNodeMapEditorService$WonderEditor.setResult(folderId, __x, editorState));
  return /* () */0;
}

function _renameJsonNode(jsonId, name, editorState, jsonNodeMap) {
  var __x = AssetNodeEditorService$WonderEditor.renameJsonNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(jsonId, jsonNodeMap));
  StateEditorService$WonderEditor.setState(AssetJsonNodeMapEditorService$WonderEditor.setResult(jsonId, __x, editorState));
  return /* () */0;
}

function _renameTextureNode(textureIndex, name, _) {
  return OperateTextureLogicService$WonderEditor.renameTextureToEngine(textureIndex, name);
}

function _renameMaterialNode(nodeId, name, editorState, materialNodeMap) {
  var __x = AssetNodeEditorService$WonderEditor.renameMaterialNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(nodeId, materialNodeMap));
  StateEditorService$WonderEditor.setState(AssetMaterialNodeMapEditorService$WonderEditor.setResult(nodeId, __x, editorState));
  return /* () */0;
}

function _renameWdbNode(nodeId, name, editorState, wdbNodeMap) {
  var __x = AssetNodeEditorService$WonderEditor.renameWdbNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap));
  StateEditorService$WonderEditor.setState(AssetWdbNodeMapEditorService$WonderEditor.setResult(nodeId, __x, editorState));
  return /* () */0;
}

function handleSelfLogic(param, param$1, value) {
  var nodeId = param$1[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(param$1[1], /* tuple */[
        (function (param) {
            return _renameFolderNode(nodeId, value, editorState, param);
          }),
        (function (param) {
            return _renameJsonNode(nodeId, value, editorState, param);
          }),
        (function () {
            return OperateTextureLogicService$WonderEditor.renameTextureToEngine(nodeId, value);
          }),
        (function (param) {
            return _renameMaterialNode(nodeId, value, editorState, param);
          }),
        (function (param) {
            return _renameWdbNode(nodeId, value, editorState, param);
          })
      ]);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* BottomComponent */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _renameFolderNode */_renameFolderNode,
  /* _renameJsonNode */_renameJsonNode,
  /* _renameTextureNode */_renameTextureNode,
  /* _renameMaterialNode */_renameMaterialNode,
  /* _renameWdbNode */_renameWdbNode,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
