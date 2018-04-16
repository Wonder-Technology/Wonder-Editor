'use strict';

import * as Curry                                      from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                              from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                      from "../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor                  from "../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor                from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as GameObjectUtils$WonderEditor               from "../../../utils/GameObjectUtils.js";
import * as EmptyEventHandler$WonderEditor             from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor             from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor            from "../../../../service/state/editor/SceneEditorService.js";
import * as CameraEngineService$WonderEditor           from "../../../../service/state/engine/CameraEngineService.js";
import * as CurrentGameObjectLogicService$WonderEditor from "../../../../service/stateTuple/logic/CurrentGameObjectLogicService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByFirstStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByLastStack = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onClick(param, _, _$1) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentGameObject);
  if (match) {
    var gameObject = match[0];
    var match$1 = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return CameraEngineService$WonderEditor.isCamera(gameObject, param);
          }));
    if (match$1 !== 0) {
      var match$2 = StateLogicService$WonderEditor.getEngineStateToGetData((function (engineState) {
              return GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetScene), engineState).filter((function (gameObject) {
                            return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                          return CameraEngineService$WonderEditor.isCamera(gameObject, param);
                                        }));
                          })).length;
            }));
      if (match$2 !== 1) {
        CurrentGameObjectLogicService$WonderEditor.disposeCurrentGameObject(gameObject);
      }
      
    } else {
      CurrentGameObjectLogicService$WonderEditor.disposeCurrentGameObject(gameObject);
    }
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
  /* onMarkRedoUndoByFirstStack */onMarkRedoUndoByFirstStack,
  /* onMarkRedoUndoByLastStack */onMarkRedoUndoByLastStack,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByFirstStack,
      onMarkRedoUndoByLastStack
    ]);

export {
  DisposeGameObjectEventHandler ,
  MakeEventHandler              ,
  
}
/* MakeEventHandler Not a pure module */
