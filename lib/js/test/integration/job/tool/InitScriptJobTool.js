'use strict';

var InitScriptAPIJob$WonderEditor = require("../../../../src/core/job/init/InitScriptAPIJob.js");
var RecordScriptAPIMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/api/script/RecordScriptAPIMainService.js");

function createScriptAPIJsObj(param) {
  return RecordScriptAPIMainService$Wonderjs.create(/* () */0);
}

function createRewritedScriptAPIJsObj(param) {
  return InitScriptAPIJob$WonderEditor._rewriteScriptAPIJsObj(RecordScriptAPIMainService$Wonderjs.create(/* () */0));
}

exports.createScriptAPIJsObj = createScriptAPIJsObj;
exports.createRewritedScriptAPIJsObj = createRewritedScriptAPIJsObj;
/* InitScriptAPIJob-WonderEditor Not a pure module */
