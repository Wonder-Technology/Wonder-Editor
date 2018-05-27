'use strict';

import * as Curry                                         from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                         from "../../../../../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor                     from "../../../../../../../service/stateTuple/data/AllStateData.js";
import * as EventHandler$WonderEditor                     from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor                from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor                from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor               from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as StateHistoryService$WonderEditor              from "../../../../../../../service/stateTuple/history/StateHistoryService.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor    from "../../../../../../ui/eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor  from "../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByFirstStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByLastStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onSelect(param, _, uid) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return AssetCurrentNodeIdEditorService$WonderEditor.clearCurrentNodeId(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, SceneEditorService$WonderEditor.setCurrentSceneTreeNode(uid, editorState)));
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0], StateHistoryService$WonderEditor.getStateForHistory(/* () */0));
}

var SelectEventHandler = /* module */[
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByFirstStack */onMarkRedoUndoByFirstStack,
  /* onMarkRedoUndoByLastStack */onMarkRedoUndoByLastStack,
  /* onSelect */onSelect
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByFirstStack,
      onMarkRedoUndoByLastStack
    ]);

export {
  SelectEventHandler ,
  MakeEventHandler   ,
  
}
/* MakeEventHandler Not a pure module */
