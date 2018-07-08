

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByStackLastReturnStore = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onClick(param, _, materialComponent) {
  OperateTextureLogicService$WonderEditor.rebuildMaterialAndRefreshEngineState(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), materialComponent, /* None */0);
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* onMarkRedoUndoByStackLastReturnStore */onMarkRedoUndoByStackLastReturnStore,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLastReturnStore
    ]);

export {
  DragEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
