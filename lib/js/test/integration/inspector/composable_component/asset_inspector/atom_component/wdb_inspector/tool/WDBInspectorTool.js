'use strict';

var MainUtils$WonderEditor = require("../../../../../../../../src/core/utils/engine/MainUtils.js");
var SettingToolEngine$WonderEditor = require("../../../../../../../tool/engine/SettingToolEngine.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

function prepareInspectorEngineState(sandbox, $staropt$star, param) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", "\n             [\n                {\n                  \"name\": \"default\",\n                  \"jobs\": [\n                    {\n                        \"name\": \"dispose\"\n\n                    }\n                  ]\n                }\n              ]\n             ", "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), buffer, false, /* () */0);
  StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

exports.prepareInspectorEngineState = prepareInspectorEngineState;
/* MainUtils-WonderEditor Not a pure module */
