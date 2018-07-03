

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../service/state/editor/SceneEditorService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByStackLast = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onClick(param, _, materialComponent) {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return BasicMaterialEngineService$WonderEditor.getMap(materialComponent, param);
        }));
  if (match) {
    Log$WonderLog.print("set map is null");
    OperateTextureLogicService$WonderEditor.rebuildMaterialAndRefreshEngineState(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), materialComponent, /* None */0);
  }
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* onMarkRedoUndoByStackLast */onMarkRedoUndoByStackLast,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLast
    ]);

export {
  DragEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
