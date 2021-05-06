'use strict';

var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");

function initStateWithDisposeJob(sandbox, $staropt$star, param) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : false;
  return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, isBuildFakeDom, undefined, undefined, /* () */0);
}

exports.initStateWithDisposeJob = initStateWithDisposeJob;
/* MainEditorSceneTool-WonderEditor Not a pure module */
