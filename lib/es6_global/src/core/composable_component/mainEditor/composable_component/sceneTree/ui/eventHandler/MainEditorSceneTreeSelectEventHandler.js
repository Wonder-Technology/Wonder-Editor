

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../../../../../../../service/stateTuple/data/AllStateData.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateAssetService$WonderEditor from "../../../../../../../service/state/asset/StateAssetService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../../../../../service/stateTuple/history/StateHistoryService.js";
import * as CurrentNodeIdAssetService$WonderEditor from "../../../../../../../service/state/asset/CurrentNodeIdAssetService.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "../../../../../../ui/eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByStackLastReturnStore = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onSelect(param, _, uid) {
  StateAssetService$WonderEditor.setState(CurrentNodeIdAssetService$WonderEditor.clearCurrentNodeId(StateAssetService$WonderEditor.getState(/* () */0)));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, SceneEditorService$WonderEditor.setCurrentSceneTreeNode(uid, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0)))));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0], StateHistoryService$WonderEditor.getStateForHistory(/* () */0));
}

var SelectEventHandler = /* module */[
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* onMarkRedoUndoByStackLastReturnStore */onMarkRedoUndoByStackLastReturnStore,
  /* onSelect */onSelect
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLastReturnStore
    ]);

export {
  SelectEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
