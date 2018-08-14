

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../eventHandler/AssetDragNodeToFolderEventHandler.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

function onSelect(dispatchFunc, nodeType, nodeId) {
  StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.setCurrentNodeParentId(nodeId, AssetCurrentNodeDataEditorService$WonderEditor.setCurrentNodeData(/* record */[
                /* currentNodeId */nodeId,
                /* nodeType */nodeType
              ], StateEditorService$WonderEditor.getState(/* () */0))));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */0]]
      ]);
  return /* () */0;
}

var dragNodeToFolderFunc = AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

export {
  onSelect ,
  dragNodeToFolderFunc ,
  
}
/* AppStore-WonderEditor Not a pure module */
