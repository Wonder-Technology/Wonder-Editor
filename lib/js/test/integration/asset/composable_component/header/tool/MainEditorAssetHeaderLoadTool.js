'use strict';

var MainUtils$WonderEditor = require("../../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

function prepareInspectorCanvas(sandbox) {
  MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
  StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
  CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
  return /* () */0;
}

exports.prepareInspectorCanvas = prepareInspectorCanvas;
/* MainUtils-WonderEditor Not a pure module */
