

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as IMGUITool$WonderEditor from "../../unit/tool/IMGUITool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as StringTool$WonderEditor from "../../unit/tool/StringTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as TestCoverageTool$WonderEditor from "../../tool/TestCoverageTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./tool/PrepareRenderViewJobTool.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../src/service/state/engine/DeviceManagerEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../src/service/state/engine/camera/BasicCameraViewEngineService.js";

describe("prepare render game view job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n             {\n               \"name\": \"init_imgui\"\n             }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"prepare_render_game_view\" }\n           ]\n         }\n       ]\n             ", "\n             [\n               { \"name\": \"init_imgui\" }\n             ]\n             ", "\n             [\n{\"name\": \"prepare_render_game_view\" }\n             ]\n             ", /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test imgui", (function () {
                describe("test imgui func", (function () {
                        return Wonder_jest.test("set empty func", (function (param) {
                                      PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var str = StringTool$WonderEditor.removeNewLinesAndSpaces(IMGUITool$WonderEditor.unsafeGetIMGUIFuncStr(engineState));
                                      var match = TestCoverageTool$WonderEditor.isTestCoverage(str);
                                      if (match) {
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](true), true);
                                      } else {
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUITool$WonderEditor.containMultiline(str, /* :: */[
                                                            StringTool$WonderEditor.removeNewLinesAndSpaces("\n                function (param, apiJsObj, engineState) {\n                  return engineState;\n                }\n      "),
                                                            /* [] */0
                                                          ])), true);
                                      }
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test current camera", (function () {
                describe("if scene has active camera", (function () {
                        return Wonder_jest.test("active it", (function (param) {
                                      PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$Wonderjs.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState))), PrepareRenderViewJobTool$WonderEditor.getSceneActivedBasicCameraView(engineState));
                                    }));
                      }));
                describe("else", (function () {
                        return Wonder_jest.test("unactive all cameras", (function (param) {
                                      PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                      StateEditorService$WonderEditor.setState(GameViewEditorService$WonderEditor.removeActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0)));
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState)), undefined);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test viewport", (function () {
                return Wonder_jest.test("test viewport data", (function (param) {
                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                              PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DeviceManagerEngineService$WonderEditor.getViewport(engineState)), /* tuple */[
                                          50,
                                          0,
                                          50,
                                          50
                                        ]);
                            }));
              }));
        describe("test scissor", (function () {
                Wonder_jest.test("enable scissor test", (function (param) {
                        PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                        StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                return DeviceManagerEngineService$WonderEditor.setScissorTest(false, param);
                              }));
                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                        var enable = gl.enable;
                        FakeGlToolEngine$WonderEditor.setScissorTest(3, gl);
                        StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(3, enable)));
                      }));
                return Wonder_jest.test("scissor viewport zone", (function (param) {
                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                              PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                              var scissor = gl.scissor;
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              return Sinon.toCalledWith(/* array */[
                                          50,
                                          0,
                                          50,
                                          50
                                        ], Wonder_jest.Expect[/* expect */0](scissor));
                            }));
              }));
        describe("shouldn't render grid plane", (function () {
                var _prepareState = function (param) {
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n            {\n                \"name\": \"prepare_render_game_view\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                  return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                };
                return Wonder_jest.test("test not draw", (function (param) {
                              _prepareState(/* () */0);
                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                              var drawElements = gl.drawElements;
                              FakeGlToolEngine$WonderEditor.setLines(2, gl);
                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              IMGUITool$WonderEditor.prepareImgui(/* () */0);
                              PrepareRenderViewJobTool$WonderEditor.setViewRect(undefined, undefined, /* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, drawElements))));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
