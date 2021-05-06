'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestRenderer = require("react-test-renderer");
var Progress$WonderEditor = require("../../../../src/core/atom_component/progress/Progress.js");
var ProgressTool$WonderEditor = require("../tool/ProgressTool.js");
var ProgressUtils$WonderEditor = require("../../../../src/core/atom_component/progress/utils/ProgressUtils.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("Progress component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildProgressComponent = function (param) {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Progress$WonderEditor.make(/* array */[])));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test progress component", (function (param) {
                      Wonder_jest.test("test snapshot", (function (param) {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildProgressComponent(/* () */0));
                            }));
                      Wonder_jest.describe("test didMount", (function (param) {
                              Wonder_jest.test("bind change percent event", (function (param) {
                                      var send = ProgressTool$WonderEditor.didMount(sandbox);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return ProgressUtils$WonderEditor.changePercent(10, param);
                                            }));
                                      return Sinon.toCalledWith(/* array */[/* ChangePercent */[10]], Wonder_jest.Expect[/* expect */0](send));
                                    }));
                              Wonder_jest.test("bind show event", (function (param) {
                                      var send = ProgressTool$WonderEditor.didMount(sandbox);
                                      StateLogicService$WonderEditor.getAndSetEngineState(ProgressUtils$WonderEditor.show);
                                      return Sinon.toCalledWith(/* array */[/* Show */0], Wonder_jest.Expect[/* expect */0](send));
                                    }));
                              return Wonder_jest.test("bind hide event", (function (param) {
                                            var send = ProgressTool$WonderEditor.didMount(sandbox);
                                            StateLogicService$WonderEditor.getAndSetEngineState(ProgressUtils$WonderEditor.show);
                                            return Sinon.toCalledWith(/* array */[/* Show */0], Wonder_jest.Expect[/* expect */0](send));
                                          }));
                            }));
                      return Wonder_jest.describe("test willUnmount", (function (param) {
                                    return Wonder_jest.describe("off custom global event", (function (param) {
                                                  return Wonder_jest.test("test off hide event", (function (param) {
                                                                var send = ProgressTool$WonderEditor.didMount(sandbox);
                                                                ProgressTool$WonderEditor.willUnmount(/* () */0);
                                                                StateLogicService$WonderEditor.getAndSetEngineState(ProgressUtils$WonderEditor.show);
                                                                return Sinon.toCalledWith(/* array */[/* Show */0], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](send)));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
