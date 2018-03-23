'use strict';

import * as Curry                                      from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                              from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                      from "../../../store/AppStore.js";
import * as EventHandler$WonderEditor                  from "../../../eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor                from "../../../../component/mainEditor/component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor             from "../../../eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor             from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor            from "../../../../../service/state/editor/SceneEditorService.js";
import * as CurrentGameObjectLogicService$WonderEditor from "../../../../../service/stateTuple/logic/CurrentGameObjectLogicService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, _, _$1) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentGameObject);
  if (match) {
    CurrentGameObjectLogicService$WonderEditor.disposeCurrentGameObject(match[0]);
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentGameObject", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine)]]
      ]);
  return /* () */0;
}

var DisposeGameObjectEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  DisposeGameObjectEventHandler ,
  MakeEventHandler              ,
  
}
/* MakeEventHandler Not a pure module */
