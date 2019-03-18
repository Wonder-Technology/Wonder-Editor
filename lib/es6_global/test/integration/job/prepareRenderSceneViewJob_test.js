

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as IMGUITool$WonderEditor from "../../unit/tool/IMGUITool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as SinonTool$WonderEditor from "../../tool/SinonTool.js";
import * as StringTool$WonderEditor from "../../unit/tool/StringTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as TestCoverageTool$WonderEditor from "../../tool/TestCoverageTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as IMGUIEditorService$WonderEditor from "../../../src/service/state/editor/imgui/IMGUIEditorService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../tool/MainEditorCameraTool.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./tool/PrepareRenderViewJobTool.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../src/service/state/engine/DeviceManagerEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

describe("prepare render scene view job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n             {\n               \"name\": \"init_imgui\"\n             }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"prepare_render_scene_view\" }\n           ]\n         }\n       ]\n             ", "\n             [\n               { \"name\": \"init_imgui\" }\n             ]\n             ", "\n             [\n{\"name\": \"prepare_render_scene_view\" }\n             ]\n             ", /* () */0), undefined, undefined, false, undefined, /* () */0);
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
                describe("send imgui->uniform projection mat data", (function () {
                        return Wonder_jest.test("test", (function (param) {
                                      PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                      PrepareRenderViewJobTool$WonderEditor.setViewRect(11, 20, /* () */0);
                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                      Sinon.returns(10, Sinon.withTwoArgs(Sinon$1.match.any, "u_projectionMat", gl.getUniformLocation));
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      var __x = gl.uniformMatrix4fv;
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$WonderEditor.calledWithArg3(__x, 10, Sinon$1.match.any, new Float32Array(/* array */[
                                                              0.4000000059604645,
                                                              0,
                                                              0,
                                                              0,
                                                              0,
                                                              -0.10000000149011612,
                                                              0,
                                                              0,
                                                              0,
                                                              0,
                                                              -1,
                                                              0,
                                                              -1,
                                                              1,
                                                              0,
                                                              1
                                                            ]))), true);
                                    }));
                      }));
                describe("test imgui func", (function () {
                        describe("if game view imgui exist", (function () {
                                return Wonder_jest.test("should set game view imgui + gizmo imgui", (function (param) {
                                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var gameViewIMGUIFunc = function (param, apiJsObj, engineState) {
                                                var label = apiJsObj.label;
                                                return label(/* tuple */[
                                                            100,
                                                            30,
                                                            300,
                                                            200
                                                          ], "imgui", 0, engineState);
                                              };
                                              StateEditorService$WonderEditor.setState(IMGUIEditorService$WonderEditor.setGameViewIMGUICustomData(10, IMGUIEditorService$WonderEditor.setGameViewIMGUIFunc(gameViewIMGUIFunc, editorState)));
                                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var str = StringTool$WonderEditor.removeNewLinesAndSpaces(IMGUITool$WonderEditor.unsafeGetIMGUIFuncStr(engineState));
                                              var match = TestCoverageTool$WonderEditor.isTestCoverage(str);
                                              if (match) {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](""), "");
                                              } else {
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](str), StringTool$WonderEditor.removeNewLinesAndSpaces("function (param, apiJsObj, engineState) {\n                var match = param[1];\n                var match$1 = param[0];\n                var engineState$1 = match$1[1](match$1[0], apiJsObj, engineState);\n                return match[0](match[1], apiJsObj, engineState$1);\n              }"));
                                              }
                                            }));
                              }));
                        describe("else", (function () {
                                return Wonder_jest.test("should set gizmo imgui", (function (param) {
                                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              StateEditorService$WonderEditor.setState(IMGUIEditorService$WonderEditor.removeGameViewIMGUICustomData(IMGUIEditorService$WonderEditor.removeGameViewIMGUIFunc(editorState)));
                                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUITool$WonderEditor.containMultiline(StringTool$WonderEditor.removeNewLinesAndSpaces(IMGUITool$WonderEditor.unsafeGetIMGUIFuncStr(engineState)), /* :: */[
                                                                  StringTool$WonderEditor.removeNewLinesAndSpaces("\n                  var imageFunc = apiJsObj.image;\n      "),
                                                                  /* [] */0
                                                                ])), true);
                                            }));
                              }));
                        return /* () */0;
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
                                          0,
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
                                          0,
                                          0,
                                          50,
                                          50
                                        ], Wonder_jest.Expect[/* expect */0](scissor));
                            }));
              }));
        describe("test current camera", (function () {
                Wonder_jest.test("active edit camera", (function (param) {
                        PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                        StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$Wonderjs.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState))), MainEditorCameraTool$WonderEditor.getEditCameraBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0), engineState));
                      }));
                describe("test aspect", (function () {
                        return Wonder_jest.test("has no aspect", (function (param) {
                                      PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x = OptionService$Wonderjs.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState));
                                      var __x$1 = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(__x, engineState);
                                      var __x$2 = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x$1, engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraAspect(__x$2, engineState)), undefined);
                                    }));
                      }));
                describe("test send pMatrix", (function () {
                        var _prepareState = function (param) {
                          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n            {\n                \"name\": \"update_camera\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_color\"\n            },\n            {\n                \"name\": \"clear_buffer\"\n            },\n            {\n                \"name\": \"prepare_render_scene_view\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"clear_color\",\n        \"flags\": [\n            \"#20B2AA\"\n        ]\n    },\n    {\n        \"name\": \"clear_buffer\",\n        \"flags\": [\n            \"COLOR_BUFFER\",\n            \"DEPTH_BUFFER\",\n            \"STENCIL_BUFFER\"\n        ]\n    },\n    {\n        \"name\": \"clear_last_send_component\"\n    },\n    {\n        \"name\": \"send_uniform_shader_data\"\n    },\n    {\n        \"name\": \"render_basic\"\n    },\n    {\n        \"name\": \"front_render_light\"\n    },\n    {\n        \"name\": \"prepare_render_scene_view\"\n    }\n]\n             ", /* () */0), undefined, undefined, false, undefined, /* () */0);
                          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                        };
                        return Wonder_jest.test("send pMatrix of the view aspect", (function (param) {
                                      _prepareState(/* () */0);
                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                      Sinon.returns(10, Sinon.withTwoArgs(Sinon$1.match.any, "u_pMatrix", gl.getUniformLocation));
                                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                      IMGUITool$WonderEditor.prepareImgui(/* () */0);
                                      PrepareRenderViewJobTool$WonderEditor.setViewRect(400, 150, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      return Sinon.toCalledWith(/* array */[
                                                  10,
                                                  Sinon$1.match.any,
                                                  new Float32Array(/* array */[
                                                        1.299038052558899,
                                                        0,
                                                        0,
                                                        0,
                                                        0,
                                                        1.7320507764816284,
                                                        0,
                                                        0,
                                                        0,
                                                        0,
                                                        -1.0000003576278687,
                                                        -1,
                                                        0,
                                                        0,
                                                        -0.020000003278255463,
                                                        0
                                                      ])
                                                ], Wonder_jest.Expect[/* expect */0](gl.uniformMatrix4fv));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("should render grid plane", (function () {
                var _prepareState = function (param) {
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n            {\n                \"name\": \"prepare_render_scene_view\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                  return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                };
                return Wonder_jest.test("test draw", (function (param) {
                              _prepareState(/* () */0);
                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                              var drawElements = gl.drawElements;
                              FakeGlToolEngine$WonderEditor.setLines(2, gl);
                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              IMGUITool$WonderEditor.prepareImgui(/* () */0);
                              PrepareRenderViewJobTool$WonderEditor.setViewRect(undefined, undefined, /* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, drawElements)));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
