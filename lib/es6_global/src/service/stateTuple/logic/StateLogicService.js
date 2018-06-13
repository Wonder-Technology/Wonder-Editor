

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as DiffComponentService$WonderEditor from "../../record/editor/scene/DiffComponentService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../state/editor/EngineStateDataEditorService.js";

function getEditEngineState() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0));
}

function setEditEngineState(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0), state);
  return /* () */0;
}

function getRunEngineState() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0));
}

function setRunEngineState(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0), state);
  return /* () */0;
}

function getEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)));
}

function getAndSetEditAndRunEngineState(handleFunc) {
  setEditEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0))));
  return setRunEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))));
}

function getAndSetEditEngineState(handleFunc) {
  return setEditEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0))));
}

function getAndSetRunEngineState(handleFunc) {
  return setRunEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))));
}

function _computeEditComponent(diff, componentForRun) {
  return componentForRun + diff | 0;
}

function getAndRefreshEngineStateWithDiff(componentArrayForRun, type_, handleFunc) {
  var diffValue = DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
  var componentArrayForEdit = ArrayService$WonderCommonlib.reduceOneParam((function (arr, component) {
          return ArrayService$WonderEditor.push(component + diffValue | 0, arr);
        }), /* array */[], componentArrayForRun);
  var handleFuncForRun = ArrayService$WonderCommonlib.reduceOneParam((function (handleFunc, component) {
          return Curry._1(handleFunc, component);
        }), handleFunc, componentArrayForRun);
  var handleFuncForEdit = ArrayService$WonderCommonlib.reduceOneParam((function (handleFunc, component) {
          return Curry._1(handleFunc, component);
        }), handleFunc, componentArrayForEdit);
  setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFuncForRun, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)))));
  return setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFuncForEdit, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0)))));
}

function getEditorState(handleFunc) {
  return Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0));
}

function getAndSetEditorState(handleFunc) {
  StateEditorService$WonderEditor.setState(Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function getStateToGetData(handleFunc) {
  return Curry._1(handleFunc, /* tuple */[
              StateEditorService$WonderEditor.getState(/* () */0),
              StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))
            ]);
}

export {
  getEditEngineState ,
  setEditEngineState ,
  getRunEngineState ,
  setRunEngineState ,
  getEngineStateToGetData ,
  getAndSetEditAndRunEngineState ,
  getAndSetEditEngineState ,
  getAndSetRunEngineState ,
  _computeEditComponent ,
  getAndRefreshEngineStateWithDiff ,
  getEditorState ,
  getAndSetEditorState ,
  getStateToGetData ,
  
}
/* ArrayService-WonderEditor Not a pure module */
