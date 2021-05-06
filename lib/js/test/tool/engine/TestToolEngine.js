'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var StateDataMain$Wonderjs = require("wonder.js/lib/js/src/service/state/main/data/StateDataMain.js");
var IsDebugMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/state/IsDebugMainService.js");
var FakeGlToolEngine$WonderEditor = require("./FakeGlToolEngine.js");
var SettingToolEngine$WonderEditor = require("./SettingToolEngine.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var GPUDetectToolEngine$WonderEditor = require("./GPUDetectToolEngine.js");
var NoWorkerJobHandleSystem$Wonderjs = require("wonder.js/lib/js/src/job/no_worker/NoWorkerJobHandleSystem.js");
var DirectorEngineService$WonderEditor = require("../../../src/service/state/engine/DirectorEngineService.js");
var NoWorkerJobToolEngine$WonderEditor = require("./NoWorkerJobToolEngine.js");
var RenderConfigToolEngine$WonderEditor = require("./RenderConfigToolEngine.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("./NoWorkerJobConfigToolEngine.js");
var SharedArrayBufferToolEngine$WonderEditor = require("./SharedArrayBufferToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

function getDefaultContext(param) {
  return "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
}

function initWithoutBuildFakeDom(sandbox, $staropt$star, $staropt$star$1, param) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  if ($staropt$star$1 === undefined) {
    SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  }
  Random.init(1);
  return SettingToolEngine$WonderEditor.createStateAndSetToStateData(isDebug, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function initWithJobConfigWithoutBuildFakeDom(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, engineState, param) {
  var noWorkerJobRecord = $staropt$star !== undefined ? $staropt$star : NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$1 !== undefined ? $staropt$star$1 : RenderConfigToolEngine$WonderEditor.buildRenderConfig(undefined, undefined, /* () */0);
  var isInitJob = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  SharedArrayBufferToolEngine$WonderEditor.setSharedArrayBufferToBeArrayBuffer();
  var state = NoWorkerJobConfigToolEngine$WonderEditor.create(noWorkerJobRecord, engineState);
  if (isInitJob) {
    return RenderConfigToolEngine$WonderEditor.create(renderConfigRecord, NoWorkerJobToolEngine$WonderEditor.init(/* tuple */[
                    NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                    NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                  ], state));
  } else {
    return RenderConfigToolEngine$WonderEditor.create(renderConfigRecord, state);
  }
}

function createAndSetEngineState(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var noWorkerJobRecord = $staropt$star !== undefined ? $staropt$star : NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0);
  var isBuildFakeDom = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isInitJob = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isDebug = $staropt$star$3 !== undefined ? $staropt$star$3 : "true";
  var canvasId = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  var context = $staropt$star$5 !== undefined ? $staropt$star$5 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$6 !== undefined ? $staropt$star$6 : "true";
  var buffer = $staropt$star$7 !== undefined ? $staropt$star$7 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  if (isBuildFakeDom) {
    SettingToolEngine$WonderEditor.buildFakeDomForNotPassCanvasId(sandbox);
  }
  StateEngineService$WonderEditor.setState(GPUDetectToolEngine$WonderEditor.setMaxTextureUnit(16, initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord, undefined, isInitJob, SettingToolEngine$WonderEditor.createStateAndSetToStateData(isDebug, Caml_option.some(canvasId), context, useHardwareInstance, buffer, undefined, /* () */0), /* () */0)));
  return /* () */0;
}

function createAndSetInspectorEngineState(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var noWorkerJobRecord = $staropt$star !== undefined ? $staropt$star : NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0);
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var isInitJob = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var context = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var isDebug = $staropt$star$4 !== undefined ? $staropt$star$4 : "true";
  var canvasId = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var useHardwareInstance = $staropt$star$6 !== undefined ? $staropt$star$6 : "true";
  StateInspectorEngineService$WonderEditor.setState(initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord, undefined, isInitJob, SettingToolEngine$WonderEditor.createStateAndSetToInspectorStateData(isDebug, Caml_option.some(canvasId), context, useHardwareInstance, buffer, undefined, /* () */0), /* () */0));
  return /* () */0;
}

function initEngineState(param) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

var setFakeGl = FakeGlToolEngine$WonderEditor.setFakeGl;

function openContractCheck(param) {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, true);
  return /* () */0;
}

function closeContractCheck(param) {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, false);
  return /* () */0;
}

exports.getDefaultContext = getDefaultContext;
exports.initWithoutBuildFakeDom = initWithoutBuildFakeDom;
exports.initWithJobConfigWithoutBuildFakeDom = initWithJobConfigWithoutBuildFakeDom;
exports.createAndSetEngineState = createAndSetEngineState;
exports.createAndSetInspectorEngineState = createAndSetInspectorEngineState;
exports.initEngineState = initEngineState;
exports.setFakeGl = setFakeGl;
exports.openContractCheck = openContractCheck;
exports.closeContractCheck = closeContractCheck;
/* StateDataMain-Wonderjs Not a pure module */
