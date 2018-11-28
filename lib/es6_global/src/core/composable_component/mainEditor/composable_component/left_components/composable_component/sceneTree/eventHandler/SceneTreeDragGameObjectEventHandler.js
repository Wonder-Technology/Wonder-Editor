

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../../utils/engine/GameObjectUtils.js";
import * as SceneGraphUtils$WonderEditor from "../utils/SceneGraphUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, param$1) {
  var dragedUid = param$1[1];
  var targetUid = param$1[0];
  var dispatchFunc = param[1];
  var isShowChildrenMap = SparseMapService$WonderCommonlib.set(targetUid, true, SceneGraphUtils$WonderEditor.buildIsShowChildrenMapFromStore(param[0]));
  StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
          return GameObjectUtils$WonderEditor.setParentKeepOrder(targetUid, dragedUid, param);
        }));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[SceneGraphUtils$WonderEditor.setIsShowChildrenByMap(isShowChildrenMap, SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(/* tuple */[
                    editorState,
                    engineState
                  ]))]
      ]);
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  Curry._1(dispatchFunc, [
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
