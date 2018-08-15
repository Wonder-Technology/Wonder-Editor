

import * as AppStore$WonderEditor from "../../src/core/ui/store/AppStore.js";
import * as Reductive$WonderEditor from "../../src/core/redux/Reductive.js";
import * as IndexStore$WonderEditor from "../../src/core/redux/store/IndexStore.js";
import * as SceneTreeUtils$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as SparseMapService$WonderEditor from "../../src/service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/GameObjectEngineService.js";
import * as CreateEditorStateDataEditorService$WonderEditor from "../../src/service/state/data/CreateEditorStateDataEditorService.js";

function getDispatch() {
  var partial_arg = Reductive$WonderEditor.Store[/* dispatch */4];
  return (function (param) {
      return partial_arg(IndexStore$WonderEditor.store, param);
    });
}

function buildEmptyAppState() {
  return AppStore$WonderEditor.state;
}

function _buildSceneTreeAppState(sceneGraphData) {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* isDidMounted */AppStore$WonderEditor.state[/* isDidMounted */1],
          /* mapState */AppStore$WonderEditor.state[/* mapState */2],
          /* sceneTreeState : record */[/* sceneGraphData */sceneGraphData],
          /* updateState */AppStore$WonderEditor.state[/* updateState */4],
          /* inspectorState */AppStore$WonderEditor.state[/* inspectorState */5]
        ];
}

function _buildSceneTreeAppStateWithInspectorState(sceneGraphData) {
  return /* record */[
          /* isEditorAndEngineStart */AppStore$WonderEditor.state[/* isEditorAndEngineStart */0],
          /* isDidMounted */AppStore$WonderEditor.state[/* isDidMounted */1],
          /* mapState */AppStore$WonderEditor.state[/* mapState */2],
          /* sceneTreeState : record */[/* sceneGraphData */sceneGraphData],
          /* updateState */AppStore$WonderEditor.state[/* updateState */4],
          /* inspectorState : record */[/* showComponentMap */SparseMapService$WonderEditor.immutableSet(/* Transform */0, false, AppStore$WonderEditor.state[/* inspectorState */5][/* showComponentMap */0])]
        ];
}

function buildAppStateSceneGraphFromEngine() {
  return StateLogicService$WonderEditor.getStateToGetData((function (stateTuple) {
                return _buildSceneTreeAppState(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine(stateTuple));
              }));
}

function buildAppStateSceneGraphAndInspectorState() {
  return StateLogicService$WonderEditor.getStateToGetData((function (stateTuple) {
                return _buildSceneTreeAppStateWithInspectorState(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine(stateTuple));
              }));
}

function initScene() {
  var engineForEditState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  var editEngineStateScene = SceneEngineService$WonderEditor.getSceneGameObject(engineForEditState);
  StateLogicService$WonderEditor.setEditEngineState(GameObjectEngineService$WonderEditor.setGameObjectName("scene", editEngineStateScene, engineForEditState));
  var engineForRunState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var runEngineStateScene = SceneEngineService$WonderEditor.getSceneGameObject(engineForRunState);
  return StateLogicService$WonderEditor.setRunEngineState(GameObjectEngineService$WonderEditor.setGameObjectName("scene", runEngineStateScene, engineForRunState));
}

function initEditorAndEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, _) {
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, noWorkerJobRecord, buffer, /* () */0);
  return initScene(/* () */0);
}

function initEditorAndEngineStateAndInitScene(sandbox, buffer, _) {
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, undefined, buffer, /* () */0);
  return initScene(/* () */0);
}

function openContractCheck() {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isDebug */1] = true;
  return /* () */0;
}

function closeContractCheck() {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isDebug */1] = false;
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
  initEditorAndEngineStateAndInitSceneWithJob ,
  initEditorAndEngineStateAndInitScene ,
  openContractCheck ,
  closeContractCheck ,
  
}
/* AppStore-WonderEditor Not a pure module */
