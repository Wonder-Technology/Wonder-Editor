

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as OptionService$WonderEditor from "../../../../../../../../../service/primitive/OptionService.js";
import * as AssetNodeUtils$WonderEditor from "../../../../../bottom_components/composable_component/project/composable_component/asset/utils/AssetNodeUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../../../../bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as PrepareDefaultComponentUtils$WonderEditor from "../../../../../../../../utils/engine/PrepareDefaultComponentUtils.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _renameFolderNode(nodeId, name, param, folderNodeMap) {
  var __x = FolderNodeMapAssetEditorService$WonderEditor.renameFolderNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(nodeId, folderNodeMap));
  return /* tuple */[
          FolderNodeMapAssetEditorService$WonderEditor.setResult(nodeId, __x, param[0]),
          param[1]
        ];
}

function _renameTextureNode(nodeId, name, param, textureNodeMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, textureNodeMap);
  return /* tuple */[
          param[0],
          BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(name, match[/* textureComponent */0], param[1])
        ];
}

function _isNameEqualDefaultMaterialName(nodeId, name, materialNodeMap) {
  var match = MaterialNodeMapAssetEditorService$WonderEditor.getType(nodeId, materialNodeMap);
  var defaultName = match ? PrepareDefaultComponentUtils$WonderEditor.getDefaultLightMaterialName(/* () */0) : PrepareDefaultComponentUtils$WonderEditor.getDefaultBasicMaterialName(/* () */0);
  return name === defaultName;
}

function _renameMaterialNode(nodeId, name, param, materialNodeMap) {
  var engineState = param[1];
  var editorState = param[0];
  var match = _isNameEqualDefaultMaterialName(nodeId, name, materialNodeMap);
  if (match) {
    ConsoleUtils$WonderEditor.warn("material name:" + (String(name) + " shouldn\'t equal default material name"), editorState);
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    return /* tuple */[
            editorState,
            MaterialNodeMapAssetLogicService$WonderEditor.setMaterialBaseName(nodeId, name, materialNodeMap, engineState)
          ];
  }
}

function _renameWDBNode(nodeId, name, param, wdbNodeMap) {
  var __x = WDBNodeMapAssetEditorService$WonderEditor.renameWDBNodeResult(name, SparseMapService$WonderCommonlib.unsafeGet(nodeId, wdbNodeMap));
  return /* tuple */[
          WDBNodeMapAssetEditorService$WonderEditor.setResult(nodeId, __x, param[0]),
          param[1]
        ];
}

function handleSelfLogic(param, param$1, value) {
  var nodeType = param$1[1];
  var nodeId = param$1[0];
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var parentNodeId = OptionService$WonderEditor.unsafeGet(AssetNodeUtils$WonderEditor.getAssetNodeParentId(nodeType, nodeId, editorState));
  var match = AssetTreeUtils$WonderEditor.checkAssetNodeName(/* tuple */[
        nodeId,
        value
      ], parentNodeId, nodeType, /* tuple */[
        (function (param) {
            var editorState = param[0];
            ConsoleUtils$WonderEditor.warn("the asset can't has the same name !", editorState);
            Curry._1(dispatchFunc, [
                  AppStore$WonderEditor.UpdateAction,
                  /* Update */[/* array */[
                      /* Console */5,
                      /* BottomHeader */3,
                      /* Inspector */2
                    ]]
                ]);
            return /* tuple */[
                    editorState,
                    param[1]
                  ];
          }),
        (function (param) {
            var editorState = param[0];
            var stateTuple_001 = param[1];
            var stateTuple = /* tuple */[
              editorState,
              stateTuple_001
            ];
            var match = AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
                  (function (param) {
                      return _renameFolderNode(nodeId, value, stateTuple, param);
                    }),
                  (function (param) {
                      return _renameTextureNode(nodeId, value, stateTuple, param);
                    }),
                  (function (param) {
                      return _renameMaterialNode(nodeId, value, stateTuple, param);
                    }),
                  (function (param) {
                      return _renameWDBNode(nodeId, value, stateTuple, param);
                    })
                ], editorState);
            Curry._1(dispatchFunc, [
                  AppStore$WonderEditor.UpdateAction,
                  /* Update */[/* array */[/* Project */4]]
                ]);
            return /* tuple */[
                    match[0],
                    match[1]
                  ];
          })
      ], /* tuple */[
        editorState,
        engineState
      ]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateEngineService$WonderEditor.setState(match[1]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _renameFolderNode */_renameFolderNode,
  /* _renameTextureNode */_renameTextureNode,
  /* _isNameEqualDefaultMaterialName */_isNameEqualDefaultMaterialName,
  /* _renameMaterialNode */_renameMaterialNode,
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
