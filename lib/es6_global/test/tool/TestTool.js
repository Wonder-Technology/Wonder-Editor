

import * as AppStore$WonderEditor from "../../src/core/ui/store/AppStore.js";
import * as Reductive$WonderEditor from "../../src/core/redux/Reductive.js";
import * as IndexStore$WonderEditor from "../../src/core/redux/store/IndexStore.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as SceneGraphUtils$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as SparseMapService$WonderEditor from "../../src/service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/GameObjectEngineService.js";

function getDispatch(param) {
  var partial_arg = Reductive$WonderEditor.Store[/* dispatch */4];
  return (function (param) {
      return partial_arg(IndexStore$WonderEditor.store, param);
    });
}

function buildEmptyAppState(param) {
  return AppStore$WonderEditor.state;
}

function _buildSceneTreeAppState(sceneGraphData) {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* isDidMounted */AppStore$WonderEditor.state[/* isDidMounted */1],
          /* mapState */AppStore$WonderEditor.state[/* mapState */2],
          /* sceneTreeState : record */[/* sceneGraphData */sceneGraphData],
          /* updateState */AppStore$WonderEditor.state[/* updateState */4],
          /* inspectorState */AppStore$WonderEditor.state[/* inspectorState */5],
          /* showComponentState */AppStore$WonderEditor.state[/* showComponentState */6]
        ];
}

function _buildSceneTreeAppStateWithInspectorState(sceneGraphData) {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* isDidMounted */AppStore$WonderEditor.state[/* isDidMounted */1],
          /* mapState */AppStore$WonderEditor.state[/* mapState */2],
          /* sceneTreeState : record */[/* sceneGraphData */sceneGraphData],
          /* updateState */AppStore$WonderEditor.state[/* updateState */4],
          /* inspectorState : record */[/* showComponentMap */SparseMapService$WonderEditor.immutableSet(/* Transform */0, false, AppStore$WonderEditor.state[/* inspectorState */5][/* showComponentMap */0])],
          /* showComponentState */AppStore$WonderEditor.state[/* showComponentState */6]
        ];
}

function buildAppStateSceneGraphFromEngine(param) {
  return StateLogicService$WonderEditor.getStateToGetData((function (stateTuple) {
                return _buildSceneTreeAppState(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(stateTuple));
              }));
}

function buildAppStateSceneGraphAndInspectorState(param) {
  return StateLogicService$WonderEditor.getStateToGetData((function (stateTuple) {
                return _buildSceneTreeAppStateWithInspectorState(SceneGraphUtils$WonderEditor.getSceneGraphDataFromEngine(stateTuple));
              }));
}

function initScene(param) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineStateScene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
  StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName("scene", engineStateScene, engineState));
  return /* () */0;
}

function _buildFakeConsole (){
  window.console.profile = (_) => {};
  window.console.profileEnd = () => {};
  };

function initEditorAndEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, $staropt$star, $staropt$star$1, param) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : true;
  var isInitJob = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, noWorkerJobRecord, buffer, isBuildFakeDom, isInitJob, /* () */0);
  initScene(/* () */0);
  return _buildFakeConsole();
}

function initEditorAndEngineStateAndInitScene(sandbox, buffer, param) {
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, undefined, buffer, undefined, undefined, /* () */0);
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

export {
  getDispatch ,
  buildEmptyAppState ,
  _buildSceneTreeAppState ,
  _buildSceneTreeAppStateWithInspectorState ,
  buildAppStateSceneGraphFromEngine ,
  buildAppStateSceneGraphAndInspectorState ,
  initScene ,
  _buildFakeConsole ,
  initEditorAndEngineStateAndInitSceneWithJob ,
  initEditorAndEngineStateAndInitScene ,
  openContractCheck ,
  closeContractCheck ,
  
}
/* AppStore-WonderEditor Not a pure module */
