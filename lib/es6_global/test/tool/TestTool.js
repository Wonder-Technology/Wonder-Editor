

import * as AppStore$WonderEditor from "../../src/core/ui/store/AppStore.js";
import * as Reductive$WonderEditor from "../../src/core/redux/Reductive.js";
import * as IndexStore$WonderEditor from "../../src/core/redux/store/IndexStore.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as SparseMapService$WonderEditor from "../../src/service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/GameObjectEngineService.js";

function getDispatch() {
  var partial_arg = Reductive$WonderEditor.Store[/* dispatch */4];
  return (function (param) {
      return partial_arg(IndexStore$WonderEditor.store, param);
    });
}

function buildEmptyAppState() {
  return AppStore$WonderEditor.state;
}

function _buildInspectorAppState() {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* isDidMounted */AppStore$WonderEditor.state[/* isDidMounted */1],
          /* mapState */AppStore$WonderEditor.state[/* mapState */2],
          /* updateState */AppStore$WonderEditor.state[/* updateState */3],
          /* inspectorState : record */[/* showComponentMap */SparseMapService$WonderEditor.immutableSet(/* Transform */0, false, AppStore$WonderEditor.state[/* inspectorState */4][/* showComponentMap */0])],
          /* showComponentState */AppStore$WonderEditor.state[/* showComponentState */5]
        ];
}

function buildAppStateInspectorState() {
  return StateLogicService$WonderEditor.getStateToGetData((function () {
                return _buildInspectorAppState(/* () */0);
              }));
}

function initScene() {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineStateScene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
  StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName("scene", engineStateScene, engineState));
  return /* () */0;
}

var _buildFakeConsole = function (){
  window.console.profile = (_) => {};
  window.console.profileEnd = () => {};
  };

function initEditorAndEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, $staropt$star, $staropt$star$1, _) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : true;
  var isInitJob = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, noWorkerJobRecord, buffer, isBuildFakeDom, isInitJob, /* () */0);
  initScene(/* () */0);
  return _buildFakeConsole();
}

function initEditorAndEngineStateAndInitScene(sandbox, buffer, _) {
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, undefined, buffer, undefined, undefined, /* () */0);
  return initScene(/* () */0);
}

function openContractCheck() {
  StateEditorService$WonderEditor.setStateIsDebug(true);
  StateEngineService$WonderEditor.setIsDebug(true);
  return /* () */0;
}

function closeContractCheck() {
  StateEditorService$WonderEditor.setStateIsDebug(false);
  StateEngineService$WonderEditor.setIsDebug(false);
  return /* () */0;
}

export {
  getDispatch ,
  buildEmptyAppState ,
  _buildInspectorAppState ,
  buildAppStateInspectorState ,
  initScene ,
  _buildFakeConsole ,
  initEditorAndEngineStateAndInitSceneWithJob ,
  initEditorAndEngineStateAndInitScene ,
  openContractCheck ,
  closeContractCheck ,
  
}
/* AppStore-WonderEditor Not a pure module */
