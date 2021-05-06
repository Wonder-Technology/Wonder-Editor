'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var IMGUITool$WonderEditor = require("../../unit/tool/IMGUITool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var OptionService$Wonderjs = require("wonder.js/lib/js/src/service/atom/OptionService.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var PrepareRenderViewJobTool$WonderEditor = require("./tool/PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");

Wonder_jest.describe("test prepare render scene view job and game view job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n\n            {\n                \"name\": \"update_camera\"\n            },\n            {\n                \"name\": \"clear_color\"\n            },\n            {\n                \"name\": \"clear_buffer\"\n            },\n            {\n                \"name\": \"prepare_render_scene_view\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            },\n            {\n                \"name\": \"render_imgui\"\n            },\n            {\n                \"name\": \"prepare_render_game_view\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            },\n            {\n                \"name\": \"render_imgui\"\n            },\n            {\n                \"name\": \"restore\"\n            }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("fix bug", (function (param) {
                return Wonder_jest.test("test active scene camera after two loops", (function (param) {
                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$Wonderjs.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState))), PrepareRenderViewJobTool$WonderEditor.getSceneActivedBasicCameraView(engineState));
                            }));
              }));
        return Wonder_jest.describe("test render grid plane", (function (param) {
                      return Wonder_jest.test("should draw twice in two loop", (function (param) {
                                    _prepareState(/* () */0);
                                    var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                    var drawElements = gl.drawElements;
                                    FakeGlToolEngine$WonderEditor.setLines(2, gl);
                                    StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    IMGUITool$WonderEditor.prepareImgui(/* () */0);
                                    PrepareRenderViewJobTool$WonderEditor.setViewRect(undefined, undefined, /* () */0);
                                    StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                    StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                    return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, drawElements)));
                                  }));
                    }));
      }));

/*  Not a pure module */
