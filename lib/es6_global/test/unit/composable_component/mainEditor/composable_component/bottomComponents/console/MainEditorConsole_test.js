

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LogUtils$WonderEditor from "../../../../../../../src/core/utils/console/LogUtils.js";
import * as ConsoleTool$WonderEditor from "../../../../../tool/external/ConsoleTool.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../src/core/utils/ui/ConsoleUtils.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";

describe("MainEditorConsole", (function () {
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
        describe("test stub console", (function () {
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
                describe("limit showed messages' count", (function () {
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
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
