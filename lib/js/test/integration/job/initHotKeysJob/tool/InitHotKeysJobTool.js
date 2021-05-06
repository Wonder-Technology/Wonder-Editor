'use strict';

var EventTool$WonderEditor = require("../../tool/EventTool.js");
var KeyboardEventTool$WonderEditor = require("../../tool/KeyboardEventTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");

function prepareKeyboardEvent(sandbox, param) {
  return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                  {\n                    \"name\": \"default\",\n                    \"jobs\": [\n                      {\n                        \"name\": \"init_hotkeys\"\n                      },\n                      {\n                         \"name\": \"init_transform_gizmos\"\n                      }\n                    ]\n                  }\n                ]\n            ", "\n                     [\n                         {\n                             \"name\": \"default\",\n                             \"jobs\": [\n                                 {\n                                     \"name\": \"dispose\"\n                                 }\n                             ]\n                         }\n                     ]\n                 ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
}

function execKeyboardEvent(keyboardDomEventName, keyCode, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  return EventTool$WonderEditor.triggerDomEvent(keyboardDomEventName, EventTool$WonderEditor.getDocument(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(ctrlKey, altKey, shiftKey, undefined, keyCode, undefined, /* () */0));
}

exports.prepareKeyboardEvent = prepareKeyboardEvent;
exports.execKeyboardEvent = execKeyboardEvent;
/* EventTool-WonderEditor Not a pure module */
