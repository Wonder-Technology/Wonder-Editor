

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
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

function _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc) {
  var _argumentArrayForRun = diffArgumentArrForRun.reduce((function (arr, param) {
          return param[/* arguments */0].reduce((function (arr, component) {
                        return ArrayService$WonderEditor.push(component, arr);
                      }), arr);
        }), /* array */[]);
  var _argumentArrayForEdit = diffArgumentArrForRun.reduce((function (arr, param) {
          var diffValue = DiffComponentService$WonderEditor.getEditEngineComponent(param[/* type_ */1], SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
          return param[/* arguments */0].reduce((function (arr, component) {
                        return ArrayService$WonderEditor.push(component + diffValue | 0, arr);
                      }), arr);
        }), /* array */[]);
  return /* tuple */[
          _argumentArrayForEdit.reduce((function (handleFunc, component) {
                  return Curry._1(handleFunc, component);
                }), handleFunc),
          _argumentArrayForRun.reduce((function (handleFunc, component) {
                  return Curry._1(handleFunc, component);
                }), handleFunc)
        ];
}

function getAndSetEngineStateWithDiff(diffArgumentArrForRun, handleFunc) {
  var match = _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);
  setRunEngineState(Curry._1(match[1], StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))));
  return setEditEngineState(Curry._1(match[0], StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0))));
}

function handleFuncWithDiff(diffArgumentArrForRun, handleFunc, param) {
  var match = _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);
  return /* tuple */[
          Curry._1(match[0], param[0]),
          Curry._1(match[1], param[1])
        ];
}

function getAndRefreshEngineStateWithDiff(diffArgumentArrForRun, handleFunc) {
  var match = _getWithDiffHandleFunc(diffArgumentArrForRun, handleFunc);
  setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(match[1], StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)))));
  return setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(match[0], StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0)))));
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
  _getWithDiffHandleFunc ,
  getAndSetEngineStateWithDiff ,
  handleFuncWithDiff ,
  getAndRefreshEngineStateWithDiff ,
  getEditorState ,
  getAndSetEditorState ,
  getStateToGetData ,
  
}
/* ArrayService-WonderEditor Not a pure module */
