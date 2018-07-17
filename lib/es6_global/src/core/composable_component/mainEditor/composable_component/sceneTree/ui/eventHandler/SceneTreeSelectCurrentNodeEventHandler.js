

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateAssetService$WonderEditor from "../../../../../../../service/state/asset/StateAssetService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

var execFuncAndGetEngineStateTuple = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function execPrepareUndoFunc(param, _, uid) {
  StateAssetService$WonderEditor.setState(CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(StateAssetService$WonderEditor.getState(/* () */0)));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, SceneEditorService$WonderEditor.setCurrentSceneTreeNode(uid, StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* execFuncAndGetEngineStateTuple */execFuncAndGetEngineStateTuple,
  /* execPrepareUndoFunc */execPrepareUndoFunc
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      execPrepareUndoFunc,
      execFuncAndGetEngineStateTuple
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
