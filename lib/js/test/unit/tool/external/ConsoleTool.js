'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$WonderEditor = require("../SettingTool.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var DebugSettingEditorService$WonderEditor = require("../../../../src/service/state/editor/setting/DebugSettingEditorService.js");

function getMessage(output) {
  return List.hd(Sinon.getArgs(Sinon.getCall(0, output)));
}

function notShowMessage(param) {
  StateEditorService$WonderEditor.setState(DebugSettingEditorService$WonderEditor.setIsShowMessage(false, StateLogicService$WonderEditor.getEditorState(SettingTool$WonderEditor.initSetting)));
  return /* () */0;
}

function showMessage(param) {
  StateEditorService$WonderEditor.setState(DebugSettingEditorService$WonderEditor.setIsShowMessage(true, StateLogicService$WonderEditor.getEditorState(SettingTool$WonderEditor.initSetting)));
  return /* () */0;
}

function buildFakeError (sandbox){
    sandbox.spy(Error, "captureStackTrace");

    return Error;
  };

function judgeError(message, errorStub) {
  return Wonder_jest.Expect[/* toContainString */11](message, Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(JSON.stringify(Sinon.getArgs(errorStub))))));
}

function judgeNotError(errorStub) {
  return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](errorStub)));
}

function stubError(sandbox, $staropt$star, param) {
  var stubLog = $staropt$star !== undefined ? $staropt$star : true;
  if (stubLog) {
    Curry._3(Sinon.createMethodStub, sandbox[0], console, "log");
  }
  return Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
}

exports.getMessage = getMessage;
exports.notShowMessage = notShowMessage;
exports.showMessage = showMessage;
exports.buildFakeError = buildFakeError;
exports.judgeError = judgeError;
exports.judgeNotError = judgeNotError;
exports.stubError = stubError;
/* Sinon Not a pure module */
