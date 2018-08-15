

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _isRemoveAssetTreeNode(currentNodeId, currentNodeParentId) {
  return AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
}

function handleSelfLogic(param, _, _$1) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var match = AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(editorState);
          var currentNodeId = match[/* currentNodeId */0];
          var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNode(currentNodeId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
          var newAssetTreeRoot = match$1[0];
          var editorState$1 = AssetUtils$WonderEditor.deepRemoveTreeNode(match$1[1]);
          var currentNodeParentId = AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1);
          var match$2 = AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
          if (match$2) {
            return AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(editorState$1)));
          } else {
            return AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, editorState$1));
          }
        }));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Asset */2,
            /* Inspector */1
          ]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _isRemoveAssetTreeNode */_isRemoveAssetTreeNode,
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
