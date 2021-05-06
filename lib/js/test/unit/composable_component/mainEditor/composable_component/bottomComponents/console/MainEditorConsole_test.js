'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LogUtils$WonderEditor = require("../../../../../../../src/core/utils/console/LogUtils.js");
var ConsoleTool$WonderEditor = require("../../../../../tool/external/ConsoleTool.js");
var ConsoleUtils$WonderEditor = require("../../../../../../../src/core/utils/ui/ConsoleUtils.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("MainEditorConsole", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test stub console", (function (param) {
                      beforeEach((function () {
                              BuildComponentTool$WonderEditor.buildBottom(undefined, undefined, /* () */0);
                              return /* () */0;
                            }));
                      Wonder_jest.test("console.log should add the message into content", (function (param) {
                              var partial_arg = "message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.log(partial_arg, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("console.info should add the message into content", (function (param) {
                              var partial_arg = "message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.info(partial_arg, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("console.warn should add the message into content", (function (param) {
                              var partial_arg = "message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("console.debug should add the message into content", (function (param) {
                              var partial_arg = "";
                              var partial_arg$1 = "debug";
                              var partial_arg$2 = function (param) {
                                return LogUtils$WonderEditor.buildDebugMessage(partial_arg$1, partial_arg, param);
                              };
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.debug(partial_arg$2, true, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("console.error should add the message into content", (function (param) {
                              var partial_arg = "message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.error(partial_arg, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("console.trace should invoke Error.captureStackTrace", (function (param) {
                              var errorObj = ConsoleTool$WonderEditor.buildFakeError(sandbox[0]);
                              var partial_arg = "message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.error(partial_arg, param);
                                    }));
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](errorObj.captureStackTrace));
                            }));
                      return Wonder_jest.describe("limit showed messages' count", (function (param) {
                                    return Wonder_jest.test("limit max 99", (function (param) {
                                                  ArrayService$WonderCommonlib.range(0, 100).forEach((function (param) {
                                                          var partial_arg = "message";
                                                          return StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return ConsoleUtils$WonderEditor.log(partial_arg, param);
                                                                      }));
                                                        }));
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildConsole(undefined, undefined, /* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
