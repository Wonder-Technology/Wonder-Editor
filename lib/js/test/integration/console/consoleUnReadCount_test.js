'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var ConsoleUtils$WonderEditor = require("../../../src/core/utils/ui/ConsoleUtils.js");
var ReactTestTool$WonderEditor = require("../../tool/ReactTestTool.js");
var ConsoleStoreTool$WonderEditor = require("./tool/ConsoleStoreTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("test console unread count", (function (param) {
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
        return Wonder_jest.describe("should show unread count in bottom header", (function (param) {
                      beforeEach((function () {
                              BuildComponentTool$WonderEditor.buildBottom(undefined, undefined, /* () */0);
                              return /* () */0;
                            }));
                      Wonder_jest.test("if console one message, unread count should + 1", (function (param) {
                              ConsoleStoreTool$WonderEditor.buildStore(/* Project */0, /* () */0);
                              var partial_arg = "warn message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildBottomHeader(TestTool$WonderEditor.buildEmptyAppState(/* () */0), undefined, /* () */0));
                            }));
                      return Wonder_jest.test("\n        1.warn\n        2.show Console ui\n\n        unread count should be clear to 0\n        ", (function (param) {
                                    var uiState = ConsoleStoreTool$WonderEditor.buildStore(/* Console */1, /* () */0);
                                    var partial_arg = "warn message";
                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                            return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                                          }));
                                    BuildComponentTool$WonderEditor.buildConsole(uiState, undefined, /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildBottomHeader(uiState, undefined, /* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
