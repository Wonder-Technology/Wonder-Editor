

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../../../../../../inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as AssetHeaderRemoveNodeUtils$WonderEditor from "../utils/AssetHeaderRemoveNodeUtils.js";
import * as StateInspectorEngineService$WonderEditor from "../../../../../../../../../../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as DisposeTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/DisposeTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var _isRemoveAssetTreeNode = NodeAssetService$WonderEditor.isIdEqual;

function _removeNodeData(node, param) {
  var inspectorEngineStateOpt = param[2];
  var engineState = param[1];
  var nodeId = NodeAssetService$WonderEditor.getNodeId(node);
  var useTextureMaterialArray = AssetHeaderRemoveNodeUtils$WonderEditor.getUseTextureMaterialArray(node, engineState);
  var match = DisposeTreeAssetLogicService$WonderEditor.disposeNode(node, /* tuple */[
        param[0],
        engineState
      ]);
  var engineState$1 = match[1];
  var editorState = match[0];
  var selectedFolderNodeIdInAssetTree = TreeAssetEditorService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState);
  var match$1 = NodeAssetService$WonderEditor.isIdEqual(nodeId, selectedFolderNodeIdInAssetTree);
  var editorState$1 = match$1 ? SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(editorState) : editorState;
  var match$2;
  if (useTextureMaterialArray !== undefined && inspectorEngineStateOpt !== undefined) {
    var match$3 = AssetHeaderRemoveNodeUtils$WonderEditor.redrawAllMaterialSetToImageDataMap(useTextureMaterialArray, engineState$1, /* tuple */[
          editorState$1,
          inspectorEngineStateOpt
        ]);
    match$2 = /* tuple */[
      match$3[0],
      match$3[1]
    ];
  } else {
    match$2 = /* tuple */[
      editorState$1,
      inspectorEngineStateOpt
    ];
  }
  return /* tuple */[
          match$2[0],
          engineState$1,
          match$2[1]
        ];
}

function _removeNode(node, param) {
  var inspectorEngineStateOpt = param[2];
  var engineState = param[1];
  var editorState = param[0];
  var match = FolderNodeAssetService$WonderEditor.isFolderNode(node);
  if (match) {
    return _removeNodeData(node, ArrayService$WonderCommonlib.reduceOneParam((function (param, childNode) {
                      return _removeNode(childNode, /* tuple */[
                                  param[0],
                                  param[1],
                                  param[2]
                                ]);
                    }), /* tuple */[
                    editorState,
                    engineState,
                    inspectorEngineStateOpt
                  ], FolderNodeAssetService$WonderEditor.getChildrenNodes(node)));
  } else {
    return _removeNodeData(node, /* tuple */[
                editorState,
                engineState,
                inspectorEngineStateOpt
              ]);
  }
}

function handleSelfLogic(param, param$1, param$2) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var inspectorEngineStateOpt = StateInspectorEngineService$WonderEditor.getState(/* () */0);
  var match = _removeNode(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(CurrentNodeIdAssetEditorService$WonderEditor.unsafeGetCurrentNodeId(editorState), editorState), /* tuple */[
        editorState,
        engineState,
        inspectorEngineStateOpt
      ]);
  var editorState$1 = match[0];
  Js_option.andThen((function (inspectorEngineState) {
          return StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
                          editorState$1,
                          inspectorEngineState
                        ]));
        }), match[2]);
  var editorState$2 = CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(editorState$1);
  StateLogicService$WonderEditor.refreshEngineState(match[1]);
  StateEditorService$WonderEditor.setState(editorState$2);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _isRemoveAssetTreeNode */_isRemoveAssetTreeNode,
  /* _removeNodeData */_removeNodeData,
  /* _removeNode */_removeNode,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
