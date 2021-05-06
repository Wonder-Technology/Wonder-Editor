'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var IMGUITool$WonderEditor = require("../../unit/tool/IMGUITool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var OptionService$Wonderjs = require("wonder.js/lib/js/src/service/atom/OptionService.js");
var SinonTool$WonderEditor = require("../../tool/SinonTool.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorCameraTool$WonderEditor = require("../../tool/MainEditorCameraTool.js");
var PrepareRenderViewJobTool$WonderEditor = require("./tool/PrepareRenderViewJobTool.js");
var DeviceManagerEngineService$WonderEditor = require("../../../src/service/state/engine/DeviceManagerEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");

Wonder_jest.describe("prepare render scene view job", (function (param) {
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
        Wonder_jest.describe("test imgui", (function (param) {
                return Wonder_jest.describe("send imgui->uniform projection mat data", (function (param) {
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
              }));
        Wonder_jest.describe("test viewport", (function (param) {
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
        Wonder_jest.describe("test scissor", (function (param) {
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
        Wonder_jest.describe("test current camera", (function (param) {
                Wonder_jest.test("active edit camera", (function (param) {
                        PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                        StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$Wonderjs.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState))), MainEditorCameraTool$WonderEditor.getEditCameraBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0), engineState));
                      }));
                Wonder_jest.describe("test aspect", (function (param) {
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
                return Wonder_jest.describe("test send pMatrix", (function (param) {
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
              }));
        return Wonder_jest.describe("should render grid plane", (function (param) {
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
      }));

/*  Not a pure module */
