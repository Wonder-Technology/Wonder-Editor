'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FakeGlToolEngine$WonderEditor = require("./engine/FakeGlToolEngine.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("./MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("./engine/NoWorkerJobConfigToolEngine.js");

function _prepareForTestRefreshEngineState(sandbox) {
  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n            {\n                \"name\": \"clear_buffer\"\n            }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
  MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
  var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, /* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return clear;
}

function testRefreshEngineState(sandbox, execFunc) {
  var clear = _prepareForTestRefreshEngineState(sandbox);
  Curry._1(execFunc, /* () */0);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](clear));
}

function testRefreshEngineStatePromise(sandbox, execFunc) {
  var clear = _prepareForTestRefreshEngineState(sandbox);
  return Curry._1(execFunc, /* () */0).then((function (param) {
                return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](clear)));
              }));
}

exports._prepareForTestRefreshEngineState = _prepareForTestRefreshEngineState;
exports.testRefreshEngineState = testRefreshEngineState;
exports.testRefreshEngineStatePromise = testRefreshEngineStatePromise;
/* Sinon Not a pure module */
