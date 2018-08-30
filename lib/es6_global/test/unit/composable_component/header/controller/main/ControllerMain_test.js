

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../../../../src/core/utils/engine/MainUtils.js";
import * as ControllerTool$WonderEditor from "../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as TestToolEngine$WonderEditor from "../../../../../tool/engine/TestToolEngine.js";
import * as StateToolEngine$WonderEditor from "../../../../../tool/engine/StateToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("controller main", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("set unsafeGetStateFunc and setStateFunc for event", (function () {
                var _initWithJobConfigWithoutBuildFakeDom = function () {
                  return TestToolEngine$WonderEditor.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                            {\n                                \"name\": \"clear_color\"\n                            }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, /* () */0);
                };
                var _initWithJobConfigWithoutBuildFakeDomAndSetEngineState = function () {
                  StateLogicService$WonderEditor.setEditEngineState(_initWithJobConfigWithoutBuildFakeDom(/* () */0));
                  return StateLogicService$WonderEditor.setRunEngineState(_initWithJobConfigWithoutBuildFakeDom(/* () */0));
                };
                var _prepare = function () {
                  _initWithJobConfigWithoutBuildFakeDomAndSetEngineState(/* () */0);
                  StateLogicService$WonderEditor.setEditEngineState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
                  StateLogicService$WonderEditor.setRunEngineState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
                  var eeGl = FakeGlToolEngine$WonderEditor.getGl(StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                  var reGl = FakeGlToolEngine$WonderEditor.getGl(StateLogicService$WonderEditor.getRunEngineState(/* () */0));
                  return /* tuple */[
                          eeGl,
                          reGl
                        ];
                };
                var _exec = function () {
                  var editEngineState = MainUtils$WonderEditor._setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                  StateToolEngine$WonderEditor.setStateByFunc(editEngineState);
                  var runEngineState = MainUtils$WonderEditor._setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(StateLogicService$WonderEditor.getRunEngineState(/* () */0));
                  StateToolEngine$WonderEditor.setStateByFunc(runEngineState);
                  return /* () */0;
                };
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                      }));
                Wonder_jest.test("if is run, not loopBody", (function () {
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        _prepare(/* () */0);
                        ControllerTool$WonderEditor.run(/* () */0);
                        var match = _prepare(/* () */0);
                        _exec(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        Sinon.getCallCount(match[0].clearColor),
                                        Sinon.getCallCount(match[1].clearColor)
                                      ]), /* tuple */[
                                    0,
                                    0
                                  ]);
                      }));
                return Wonder_jest.test("else, ee should loopBody but re not", (function () {
                              Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                              Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                              _prepare(/* () */0);
                              ControllerTool$WonderEditor.run(/* () */0);
                              ControllerTool$WonderEditor.stop(/* () */0);
                              var match = _prepare(/* () */0);
                              _exec(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(match[0].clearColor),
                                              Sinon.getCallCount(match[1].clearColor)
                                            ]), /* tuple */[
                                          1,
                                          0
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
