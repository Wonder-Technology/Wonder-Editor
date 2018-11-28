

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as AssetIdUtils$WonderEditor from "../../../utils/AssetIdUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as FolderNodeUtils$WonderEditor from "../../../utils/FolderNodeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AddFolderNodeUtils$WonderEditor from "../../utils/AddFolderNodeUtils.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/StateEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, _$1) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var match = AssetIdUtils$WonderEditor.generateAssetId(editorState);
          var editorState$1 = match[0];
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var targetTreeNodeId = AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState$1);
          return AddFolderNodeUtils$WonderEditor.addFolderNodeToAssetTree(FolderNodeUtils$WonderEditor.getNewFolderName(/* () */0), /* tuple */[
                      targetTreeNodeId,
                      match[1]
                    ], /* tuple */[
                      editorState$1,
                      engineState
                    ]);
        }));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
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
