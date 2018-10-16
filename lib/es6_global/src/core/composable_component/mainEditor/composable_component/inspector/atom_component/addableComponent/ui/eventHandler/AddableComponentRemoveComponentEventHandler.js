

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../service/state/engine/StateEngineService.js";
import * as InspectorRemoveComponentUtils$WonderEditor from "../../../../utils/InspectorRemoveComponentUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _isRemoveLight(type_) {
  return type_ === /* Light */5;
}

function handleSelfLogic(param, currentSceneTreeNode, type_) {
  var match = InspectorRemoveComponentUtils$WonderEditor.removeComponentByType(type_, currentSceneTreeNode, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
      ]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateEngineService$WonderEditor.setState(match[1]);
  var match$1 = type_ === /* Light */5;
  if (match$1) {
    StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
    StateLogicService$WonderEditor.getAndSetEngineState(SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials);
  }
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _isRemoveLight */_isRemoveLight,
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
