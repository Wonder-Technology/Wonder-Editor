

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../ui/store/AppStore.js";
import * as AssetUtils$WonderEditor from "../utils/AssetUtils.js";
import * as EventHandler$WonderEditor from "../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, param$1) {
  var removedId = param$1[1];
  var targetId = param$1[0];
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
  if (match) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Asset */2]]
        ]);
    return /* () */0;
  } else {
    var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNode(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
    StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetId, match$1[1], match$1[0]), editorState));
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Asset */2]]
        ]);
    return /* () */0;
  }
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
