

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../../utils/engine/GameObjectUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/GameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, param$1) {
  var draggedUid = param$1[1];
  var targetUid = param$1[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1;
  switch (param$1[2]) {
    case 0 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "SceneTreeDragGameObjectEventHandler.re",
                21,
                6
              ]
            ];
    case 1 : 
        engineState$1 = GameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedUid, targetUid, /* Before */0, engineState);
        break;
    case 2 : 
        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return SceneTreeEditorService$WonderEditor.setIsShowChildren(targetUid, true, param);
              }));
        engineState$1 = GameObjectUtils$WonderEditor.setParentKeepOrder(targetUid, draggedUid, engineState);
        break;
    case 3 : 
        engineState$1 = GameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedUid, targetUid, /* After */1, engineState);
        break;
    
  }
  StateEngineService$WonderEditor.setState(engineState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
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
