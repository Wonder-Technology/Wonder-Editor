'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var AppStore$WonderEditor = require("../../src/core/ui/store/AppStore.js");
var TestToolEngine$WonderEditor = require("./engine/TestToolEngine.js");
var UIStateService$WonderEditor = require("../../src/service/state/ui/global/UIStateService.js");
var StateLogicService$WonderEditor = require("../../src/service/stateTuple/logic/StateLogicService.js");
var SceneEngineService$WonderEditor = require("../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var LanguageEditorService$WonderEditor = require("../../src/service/state/editor/LanguageEditorService.js");
var GameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var StateInspectorEngineService$WonderEditor = require("../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");

function buildEmptyAppState(param) {
  return AppStore$WonderEditor.state;
}

function _buildInspectorAppState(param) {
  return /* record */[
          /* isInitEngine */AppStore$WonderEditor.state[/* isInitEngine */0],
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
  TestToolEngine$WonderEditor.createAndSetEngineState(sandbox, noWorkerJobRecord, isBuildFakeDom, isInitJob, undefined, undefined, context, undefined, buffer, /* () */0);
  initScene(/* () */0);
  return _buildFakeConsole();
}

function openContractCheck(param) {
  StateEditorService$WonderEditor.setStateIsDebug(true);
  StateEngineService$WonderEditor.setIsDebug(true);
  StateInspectorEngineService$WonderEditor.setIsDebug(true);
  return /* () */0;
}

function closeContractCheck(param) {
  StateEditorService$WonderEditor.setStateIsDebug(false);
  StateEngineService$WonderEditor.setIsDebug(false);
  StateInspectorEngineService$WonderEditor.setIsDebug(false);
  return /* () */0;
}

function setLanguageTypeToEn(param) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return LanguageEditorService$WonderEditor.setType(/* EN */1, param);
              }));
}

function ignoreError(sandbox) {
  closeContractCheck(/* () */0);
  Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
  return Curry._3(Sinon.createMethodStub, sandbox[0], console, "log");
}

var getDispatch = UIStateService$WonderEditor.getDispatch;

exports.getDispatch = getDispatch;
exports.buildEmptyAppState = buildEmptyAppState;
exports._buildInspectorAppState = _buildInspectorAppState;
exports.buildAppStateInspectorState = buildAppStateInspectorState;
exports.initScene = initScene;
exports._buildFakeConsole = _buildFakeConsole;
exports.initEngineStateAndInitSceneWithJob = initEngineStateAndInitSceneWithJob;
exports.openContractCheck = openContractCheck;
exports.closeContractCheck = closeContractCheck;
exports.setLanguageTypeToEn = setLanguageTypeToEn;
exports.ignoreError = ignoreError;
/* Sinon Not a pure module */
