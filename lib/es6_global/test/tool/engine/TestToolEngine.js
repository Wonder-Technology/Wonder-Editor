

import * as Random from "../../../../../node_modules/bs-platform/lib/es6/random.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as StateDataMain$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/IsDebugMainService.js";
import * as FakeGlToolEngine$WonderEditor from "./FakeGlToolEngine.js";
import * as SettingToolEngine$WonderEditor from "./SettingToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as NoWorkerJobHandleSystem$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/job/no_worker/NoWorkerJobHandleSystem.js";
import * as DirectorEngineService$WonderEditor from "../../../src/service/state/engine/DirectorEngineService.js";
import * as NoWorkerJobToolEngine$WonderEditor from "./NoWorkerJobToolEngine.js";
import * as RenderConfigToolEngine$WonderEditor from "./RenderConfigToolEngine.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./NoWorkerJobConfigToolEngine.js";
import * as SharedArrayBufferToolEngine$WonderEditor from "./SharedArrayBufferToolEngine.js";

function initWithoutBuildFakeDom(_, $staropt$star, $staropt$star$1, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  if ($staropt$star$1 === undefined) {
    SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  }
  Random.init(1);
  return SettingToolEngine$WonderEditor.createStateAndSetToStateData(isDebug, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function initWithJobConfigWithoutBuildFakeDom(_, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var context = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$3 !== undefined ? $staropt$star$3 : "true";
  var buffer = $staropt$star$4 !== undefined ? $staropt$star$4 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var noWorkerJobRecord = $staropt$star$5 !== undefined ? $staropt$star$5 : NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$6 !== undefined ? $staropt$star$6 : RenderConfigToolEngine$WonderEditor.buildRenderConfig(undefined, undefined, /* () */0);
  var isInitJob = $staropt$star$7 !== undefined ? $staropt$star$7 : true;
  SharedArrayBufferToolEngine$WonderEditor.setSharedArrayBufferToBeArrayBuffer();
  var state = NoWorkerJobConfigToolEngine$WonderEditor.create(noWorkerJobRecord, SettingToolEngine$WonderEditor.createStateAndSetToStateData(isDebug, Js_primitive.some(canvasId), context, useHardwareInstance, buffer, undefined, /* () */0));
  if (isInitJob) {
    return RenderConfigToolEngine$WonderEditor.create(renderConfigRecord, NoWorkerJobToolEngine$WonderEditor.init(/* tuple */[
                    NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                    NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                  ], state));
  } else {
    return RenderConfigToolEngine$WonderEditor.create(renderConfigRecord, state);
  }
}

function createAndSetEngineState(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var noWorkerJobRecord = $staropt$star !== undefined ? $staropt$star : NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0);
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var isBuildFakeDom = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isInitJob = $staropt$star$3 !== undefined ? $staropt$star$3 : true;
  if (isBuildFakeDom) {
    SettingToolEngine$WonderEditor.buildFakeDomForNotPassCanvasId(sandbox);
  }
  StateEngineService$WonderEditor.setState(initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, buffer, noWorkerJobRecord, undefined, isInitJob, /* () */0));
  return /* () */0;
}

function initEngineState() {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.init(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

var setFakeGl = FakeGlToolEngine$WonderEditor.setFakeGl;

function openContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, true);
  return /* () */0;
}

function closeContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, false);
  return /* () */0;
}

export {
  initWithoutBuildFakeDom ,
  initWithJobConfigWithoutBuildFakeDom ,
  createAndSetEngineState ,
  initEngineState ,
  setFakeGl ,
  openContractCheck ,
  closeContractCheck ,
  
}
/* StateDataMain-Wonderjs Not a pure module */
