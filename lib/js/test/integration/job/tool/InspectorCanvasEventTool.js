'use strict';

var DomTool$WonderEditor = require("../../../tool/ui/DomTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var MouseEventTool$WonderEditor = require("./MouseEventTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var BrowserDetectToolEngine$WonderEditor = require("../../../tool/engine/BrowserDetectToolEngine.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

function _prepareInspectorCanvasParent(sandbox, $staropt$star, $staropt$star$1, param) {
  var offsetWidth = $staropt$star !== undefined ? $staropt$star : 100;
  var offsetHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 50;
  return DomTool$WonderEditor.stubFakeDomForGetElementById(sandbox, "inspectorCanvasParent", {
              offsetWidth: offsetWidth,
              offsetHeight: offsetHeight
            });
}

function prepareMouseEvent(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var offsetWidth = $staropt$star !== undefined ? $staropt$star : 100;
  var offsetHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 50;
  var offsetLeft = $staropt$star$2 !== undefined ? $staropt$star$2 : 1;
  var offsetTop = $staropt$star$3 !== undefined ? $staropt$star$3 : 2;
  MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
  MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n            {\"name\": \"init_event_for_editor_inspector\"}\n                   ]\n                 }\n               ]\n                ", undefined, "\n                [\n            {\"name\": \"init_event_for_editor_inspector\"}\n                ]\n                ", undefined, /* () */0), undefined, false, /* () */0);
  _prepareInspectorCanvasParent(sandbox, offsetWidth, offsetHeight, /* () */0);
  MouseEventTool$WonderEditor.prepareWithState(sandbox, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, offsetLeft, offsetTop, undefined, (function (param) {
          return StateLogicService$WonderEditor.getAndSetInspectorEngineState(BrowserDetectToolEngine$WonderEditor.setChromeFromEngineState);
        }), StateInspectorEngineService$WonderEditor.setState, /* () */0);
  StateLogicService$WonderEditor.getAndSetInspectorEngineState(MainUtils$WonderEditor._handleInspectorEngineState);
  return MouseEventTool$WonderEditor.setPointerLocked();
}

exports._prepareInspectorCanvasParent = _prepareInspectorCanvasParent;
exports.prepareMouseEvent = prepareMouseEvent;
/* DomTool-WonderEditor Not a pure module */
