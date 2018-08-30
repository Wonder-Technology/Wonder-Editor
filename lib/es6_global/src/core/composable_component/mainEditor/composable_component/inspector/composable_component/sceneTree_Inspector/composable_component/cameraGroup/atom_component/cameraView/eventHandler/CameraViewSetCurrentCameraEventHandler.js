

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as DirectorEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/DirectorEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/BasicCameraViewEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _unbindEventIfHasComponentAndInRunMode(runEngineState) {
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(runEngineState);
  if (match !== undefined) {
    var match$1 = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
    if (match$1) {
      return ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponent(BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, runEngineState), runEngineState);
    } else {
      return runEngineState;
    }
  } else {
    return runEngineState;
  }
}

function _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView, runEngineState) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
  if (match) {
    return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponent(BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(targetBasicCameraView, runEngineState), runEngineState);
  } else {
    return runEngineState;
  }
}

function handleSelfLogic(param, _, targetBasicCameraView) {
  StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(targetBasicCameraView, _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView, _unbindEventIfHasComponentAndInRunMode(StateLogicService$WonderEditor.getRunEngineState(/* () */0))))));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */1]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _unbindEventIfHasComponentAndInRunMode */_unbindEventIfHasComponentAndInRunMode,
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
