

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState);
  if (match !== undefined) {
    var match$1 = StateEditorService$WonderEditor.getIsRun(/* () */0);
    if (match$1) {
      return ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState), engineState);
    } else {
      return engineState;
    }
  } else {
    return engineState;
  }
}

function _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView, engineState) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponentForGameView(BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(targetBasicCameraView, engineState), engineState);
  } else {
    return engineState;
  }
}

function handleSelfLogic(param, _, targetBasicCameraView) {
  StateEditorService$WonderEditor.setState(GameViewEditorService$WonderEditor.setActivedBasicCameraView(targetBasicCameraView, StateEditorService$WonderEditor.getState(/* () */0)));
  StateEngineService$WonderEditor.setState(_bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView, _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode */_unbindCurrentActiveCameraEventIfHasComponentAndInRunMode,
  /* _bindTargetEventIfHasComponentAndInRunMode */_bindTargetEventIfHasComponentAndInRunMode,
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
