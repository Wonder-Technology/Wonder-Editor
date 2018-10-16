

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as OptionService$WonderEditor from "../../../../../../../../../service/primitive/OptionService.js";
import * as AssetNodeUtils$WonderEditor from "../../../../../bottom_components/asset/utils/AssetNodeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTreeEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetTreeEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/OperateMaterialLogicService.js";
import * as AssetWDBNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetWDBNodeMapEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _renameFolderNode(folderId, name, editorState, folderNodeMap) {
  var __x = AssetFolderNodeMapEditorService$WonderEditor.renameFolderNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(folderId, folderNodeMap));
  StateEditorService$WonderEditor.setState(AssetFolderNodeMapEditorService$WonderEditor.setResult(folderId, __x, editorState));
  return /* () */0;
}

function _renameJsonNode(jsonId, name, editorState, jsonNodeMap) {
  var __x = AssetJsonNodeMapEditorService$WonderEditor.renameJsonNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(jsonId, jsonNodeMap));
  StateEditorService$WonderEditor.setState(AssetJsonNodeMapEditorService$WonderEditor.setResult(jsonId, __x, editorState));
  return /* () */0;
}

function _renameTextureNode(nodeId, name, textureNodeMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, textureNodeMap);
  return OperateTextureLogicService$WonderEditor.renameTextureToEngine(match[/* textureIndex */0], name);
}

function _renameWDBNode(nodeId, name, editorState, wdbNodeMap) {
  var __x = AssetWDBNodeMapEditorService$WonderEditor.renameWDBNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap));
  StateEditorService$WonderEditor.setState(AssetWDBNodeMapEditorService$WonderEditor.setResult(nodeId, __x, editorState));
  return /* () */0;
}

function handleSelfLogic(param, param$1, value) {
  var nodeType = param$1[1];
  var nodeId = param$1[0];
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetTreeEditorService$WonderEditor.getChildrenNameAndIdArr(OptionService$WonderEditor.unsafeGet(AssetNodeUtils$WonderEditor.getAssetNodeParentId(nodeType, nodeId, editorState)), nodeType, editorState).map((function (param) {
            return param[0];
          })).includes(value);
  if (match) {
    ConsoleUtils$WonderEditor.warn("the folder is can't has same name !");
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Inspector */2]]
        ]);
    return /* () */0;
  } else {
    AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
          (function (param) {
              return _renameFolderNode(nodeId, value, editorState, param);
            }),
          (function (param) {
              return _renameJsonNode(nodeId, value, editorState, param);
            }),
          (function (param) {
              return _renameTextureNode(nodeId, value, param);
            }),
          (function (param) {
              return OperateMaterialLogicService$WonderEditor.renameMaterialToEngine(nodeId, value, param);
            }),
          (function (param) {
              return _renameWDBNode(nodeId, value, editorState, param);
            })
        ], editorState);
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* BottomComponent */3]]
        ]);
    return /* () */0;
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _renameFolderNode */_renameFolderNode,
  /* _renameJsonNode */_renameJsonNode,
  /* _renameTextureNode */_renameTextureNode,
  /* _renameWDBNode */_renameWDBNode,
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
