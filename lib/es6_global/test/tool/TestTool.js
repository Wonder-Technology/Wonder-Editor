

import * as AppStore$WonderEditor from "../../src/core/ui/store/AppStore.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as UIStateService$WonderEditor from "../../src/service/state/ui/UIStateService.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../src/service/state/editor/LanguageEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function buildEmptyAppState(param) {
  return AppStore$WonderEditor.state;
}

function _buildInspectorAppState(param) {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* mapState */AppStore$WonderEditor.state[/* mapState */1],
          /* updateState */AppStore$WonderEditor.state[/* updateState */2],
          /* inspectorState : record */[/* showComponentMap */ImmutableSparseMapService$WonderCommonlib.set(/* Transform */0, false, AppStore$WonderEditor.state[/* inspectorState */3][/* showComponentMap */0])],
          /* showComponentState */AppStore$WonderEditor.state[/* showComponentState */4]
        ];
}

function buildAppStateInspectorState(param) {
  return StateLogicService$WonderEditor.getStateToGetData((function (stateTuple) {
                return _buildInspectorAppState(/* () */0);
              }));
}

function initScene(param) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineStateScene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
  StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName("scene", engineStateScene, engineState));
  return /* () */0;
}

function _buildFakeConsole (param){
  window.console.profile = (_) => {};
  window.console.profileEnd = () => {};
  };

function initEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : true;
  var isInitJob = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var context = $staropt$star$2 !== undefined ? $staropt$star$2 : TestToolEngine$WonderEditor.getDefaultContext(/* () */0);
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, noWorkerJobRecord, buffer, isBuildFakeDom, isInitJob, context, /* () */0);
  initScene(/* () */0);
  return _buildFakeConsole();
}

function initEditorAndEngineStateAndInitScene(sandbox, buffer, param) {
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, undefined, buffer, undefined, undefined, undefined, /* () */0);
  return initScene(/* () */0);
}

function openContractCheck(param) {
  StateEditorService$WonderEditor.setStateIsDebug(true);
  StateEngineService$WonderEditor.setIsDebug(true);
  return /* () */0;
}

function closeContractCheck(param) {
  StateEditorService$WonderEditor.setStateIsDebug(false);
  StateEngineService$WonderEditor.setIsDebug(false);
  return /* () */0;
}

function setLanguageTypeToEn(param) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return LanguageEditorService$WonderEditor.setType(/* EN */1, param);
              }));
}

var getDispatch = UIStateService$WonderEditor.getDispatch;

export {
  getDispatch ,
  buildEmptyAppState ,
  _buildInspectorAppState ,
  buildAppStateInspectorState ,
  initScene ,
  _buildFakeConsole ,
  initEngineStateAndInitSceneWithJob ,
  initEditorAndEngineStateAndInitScene ,
  openContractCheck ,
  closeContractCheck ,
  setLanguageTypeToEn ,
  
}
/* AppStore-WonderEditor Not a pure module */
