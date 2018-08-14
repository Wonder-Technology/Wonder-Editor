

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as LoopEditorService$WonderEditor from "../../../service/state/editor/LoopEditorService.js";
import * as LoopEngineService$WonderEditor from "../../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as ControllerHistoryUtils$WonderEditor from "./ControllerHistoryUtils.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function _bindRunEngineStateCurrentCamemraArcballEvent(runEngineState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all arcballCameraController is unbind event", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](GameObjectComponentEngineService$WonderEditor.getAllArcballCameraControllerComponents(runEngineState).filter((function (component) {
                                          return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(component, runEngineState);
                                        })).length, 0);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(runEngineState);
  if (match !== undefined) {
    var currentCameraGameObject = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, runEngineState);
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(currentCameraGameObject, runEngineState);
    if (match$1) {
      return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentCameraGameObject, runEngineState), runEngineState);
    } else {
      return runEngineState;
    }
  } else {
    return runEngineState;
  }
}

function _unbindRunEngineStateAllArcballCameraControllerEvent(runEngineState) {
  return Contract$WonderLog.ensureCheck((function (state) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all arcballCameraController component shouldn\'t bind event", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](GameObjectComponentEngineService$WonderEditor.getAllArcballCameraControllerComponents(state).filter((function (component) {
                                                return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(component, state);
                                              })).length, 0);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), ArrayService$WonderCommonlib.reduceOneParam((function (state, component) {
                    return ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEvent(component, state);
                  }), runEngineState, GameObjectComponentEngineService$WonderEditor.getAllArcballCameraControllerComponents(runEngineState)));
}

function run(store, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(true, param);
        }));
  ControllerHistoryUtils$WonderEditor.copyHistoryStack(store, StateHistoryService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  StateLogicService$WonderEditor.setRunEngineState(_bindRunEngineStateCurrentCamemraArcballEvent(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* () */0;
}

function stop(dispatchFunc, _) {
  LoopEngineService$WonderEditor.stopLoop(LoopEditorService$WonderEditor.getLoopId(StateEditorService$WonderEditor.getState(/* () */0)));
  ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatchFunc, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  StateLogicService$WonderEditor.setRunEngineState(_unbindRunEngineStateAllArcballCameraControllerEvent(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(false, param);
        }));
  return /* () */0;
}

export {
  _bindRunEngineStateCurrentCamemraArcballEvent ,
  _unbindRunEngineStateAllArcballCameraControllerEvent ,
  run ,
  stop ,
  
}
/* Log-WonderLog Not a pure module */
