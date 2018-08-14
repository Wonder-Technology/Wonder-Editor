

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../utils/AssetTreeNodeUtils.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetIndexEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, _$1) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
          var nextIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
          return AssetTreeNodeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1), nextIndex, /* Folder */0, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, editorState$1));
        }));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Asset */2]]
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
