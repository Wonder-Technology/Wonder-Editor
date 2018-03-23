'use strict';

import * as Curry                               from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                       from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor               from "../../../store/AppStore.js";
import * as SceneUtils$WonderEditor             from "../../../../utils/SceneUtils.js";
import * as EventHandler$WonderEditor           from "../../../eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor         from "../../../../component/mainEditor/component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor      from "../../../eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor      from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor     from "../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeStoreUtils$WonderEditor    from "../../../../component/mainEditor/component/sceneTree/utils/SceneTreeStoreUtils.js";
import * as PrimitiveEngineService$WonderEditor from "../../../../../service/state/engine/PrimitiveEngineService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, type_, _) {
  var newGameObject = type_ === "box" ? SceneUtils$WonderEditor.addGameObject(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetScene), PrimitiveEngineService$WonderEditor.createBox) : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addGameObject", "specific type:" + (String(type_) + " should exist"), "", "", "type:" + (String(type_) + "")));
  var partial_arg = SceneTreeStoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return SceneTreeUtils$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, partial_arg, param);
                  }))]]
      ]);
  return /* () */0;
}

var AddGameObjectEventHandler = /* module */[
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
  AddGameObjectEventHandler ,
  MakeEventHandler          ,
  
}
/* MakeEventHandler Not a pure module */
