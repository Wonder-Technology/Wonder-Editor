'use strict';

var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var ControllerUtils$WonderEditor = require("../../../../../src/core/utils/controller/ControllerUtils.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");

function run(param) {
  return ControllerUtils$WonderEditor.run(TestTool$WonderEditor.buildEmptyAppState(/* () */0));
}

function stop(param) {
  return ControllerUtils$WonderEditor.stop(TestTool$WonderEditor.getDispatch(/* () */0));
}

var stubRequestAnimationFrame = (
    function(requestStub){
      window.requestAnimationFrame = requestStub;
    }
 );

var stubCancelAnimationFrame = (
    function(requestStub){
      window.cancelAnimationFrame = requestStub;
    }
 );

function getIsRun(param) {
  return StateEditorService$WonderEditor.getIsRun(/* () */0);
}

var setIsRun = StateEditorService$WonderEditor.setIsRun;

exports.run = run;
exports.stop = stop;
exports.stubRequestAnimationFrame = stubRequestAnimationFrame;
exports.stubCancelAnimationFrame = stubCancelAnimationFrame;
exports.getIsRun = getIsRun;
exports.setIsRun = setIsRun;
/* stubRequestAnimationFrame Not a pure module */
