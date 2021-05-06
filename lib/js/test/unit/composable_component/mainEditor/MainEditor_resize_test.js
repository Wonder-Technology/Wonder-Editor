'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var DomHelper$WonderEditor = require("../../../../src/core/external/DomHelper.js");
var IMGUITool$WonderEditor = require("../../tool/IMGUITool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var CanvasTool$WonderEditor = require("../../atom_component/canvas/tool/CanvasTool.js");
var MainEditor$WonderEditor = require("../../../../src/core/composable_component/mainEditor/ui/MainEditor.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var SettingToolEngine$WonderEditor = require("../../../tool/engine/SettingToolEngine.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorResizeTool$WonderEditor = require("./tool/MainEditorResizeTool.js");
var GameViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var SceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var DeviceManagerEngineService$WonderEditor = require("../../../../src/service/state/engine/DeviceManagerEngineService.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("wonder.js/lib/js/src/api/camera/PerspectiveCameraProjectionAPI.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var PerspectiveCameraProjectionToolEngine$WonderEditor = require("../../../tool/engine/PerspectiveCameraProjectionToolEngine.js");

Wonder_jest.describe("test mainEditor->resize", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n             {\n               \"name\": \"init_imgui\"\n             }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n           ]\n         }\n       ]\n             ", "\n             [\n               { \"name\": \"init_imgui\" }\n             ]\n             ", "\n             []\n             ", /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
          StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        var _resizeMainCanvas = function (sandbox) {
          var dispatchFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
          MainEditorResizeTool$WonderEditor.resizeMainCanvasScreen(dispatchFunc);
          return dispatchFunc;
        };
        var _resizeInspectorCanvas = function (sandbox) {
          var dispatchFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
          MainEditorResizeTool$WonderEditor.resizeInspectorCanvasScreen(dispatchFunc);
          return dispatchFunc;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("resize main-canvas and viewPort", (function (param) {
                Wonder_jest.describe("set main-canvas size", (function (param) {
                        return Wonder_jest.test("main-canvas's width and height should == parent's width and height", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox);
                                      var mainCanvasDom = match[1];
                                      var mainParentDom = match[0];
                                      _resizeMainCanvas(sandbox);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      mainCanvasDom.width,
                                                      mainCanvasDom.height
                                                    ]), /* tuple */[
                                                  mainParentDom.offsetWidth,
                                                  mainParentDom.offsetHeight
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("set viewport", (function (param) {
                        return Wonder_jest.test("main-canvas's viewport should == canvas parent's width and height", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox);
                                      var mainCanvasparentDom = match[0];
                                      _resizeMainCanvas(sandbox);
                                      var match$1 = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[2],
                                                      match$1[3]
                                                    ]), /* tuple */[
                                                  mainCanvasparentDom.offsetWidth,
                                                  mainCanvasparentDom.offsetHeight
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("update view rect", (function (param) {
                        return Wonder_jest.test("update scene view and game view rect", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox);
                                      var mainCanvasparentDom = match[0];
                                      var width = mainCanvasparentDom.offsetWidth;
                                      var height = mainCanvasparentDom.offsetHeight;
                                      _resizeMainCanvas(sandbox);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState),
                                                      GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState)
                                                    ]), /* tuple */[
                                                  /* tuple */[
                                                    0,
                                                    0,
                                                    width / 2 | 0,
                                                    height
                                                  ],
                                                  /* tuple */[
                                                    width / 2 | 0,
                                                    0,
                                                    width / 2 | 0,
                                                    height
                                                  ]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("update all cameraProjections by new aspect", (function (param) {
                              var _setFakeCanvasd = function (width, height) {
                                return SettingToolEngine$WonderEditor.setFakeCanvasToEngineState(width, height, /* () */0);
                              };
                              var _getAllPMatrixs = function (engineState) {
                                return GameObjectComponentEngineService$WonderEditor.getAllPerspectiveCameraProjectionComponents(engineState).map((function (cameraProjection) {
                                              return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(cameraProjection, engineState);
                                            }));
                              };
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n            {\n              \"name\": \"default\",\n              \"jobs\": [\n                {\n                  \"name\": \"update_camera\"\n                }\n              ]\n            }\n          ]\n                ", undefined, "\n                [\n                {\n                  \"name\": \"update_camera\"\n                }\n                ]\n                ", /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return DirectorToolEngine$WonderEditor.prepareAllEnginState(/* () */0);
                                    }));
                              return Wonder_jest.test("test resize twice(the first resize is to mark all cameraProjections not dirty)", (function (param) {
                                            _setFakeCanvasd(200, 200);
                                            IMGUITool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox);
                                            _resizeMainCanvas(sandbox);
                                            _setFakeCanvasd(100, 200);
                                            _resizeMainCanvas(sandbox);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var pMatrix = PerspectiveCameraProjectionToolEngine$WonderEditor.buildPerspective(60, 100 / 200, 0.01, 50000);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPMatrixs(engineState)), /* array */[
                                                        pMatrix,
                                                        pMatrix
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("resize inspector-canvas and viewPort", (function (param) {
                      beforeEach((function () {
                              return _prepareState(/* () */0);
                            }));
                      afterEach((function () {
                              return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                            }));
                      Wonder_jest.describe("set inspector-canvas size", (function (param) {
                              return Wonder_jest.test("inspector-canvas's width and height should == parent's width and height", (function (param) {
                                            var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 200, 200, 100, 100, undefined, /* () */0);
                                            var inspectorCanvasDom = match[3];
                                            var inspectorParentDom = match[2];
                                            _resizeInspectorCanvas(sandbox);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            inspectorCanvasDom.width,
                                                            inspectorCanvasDom.height
                                                          ]), /* tuple */[
                                                        inspectorParentDom.offsetWidth,
                                                        inspectorParentDom.offsetHeight
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("set viewport", (function (param) {
                              return Wonder_jest.test("inspector-canvas's viewport should == canvas parent's width and height", (function (param) {
                                            var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 200, 200, undefined, undefined, undefined, /* () */0);
                                            var inspectorParentDom = match[2];
                                            _resizeInspectorCanvas(sandbox);
                                            var match$1 = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            match$1[2],
                                                            match$1[3]
                                                          ]), /* tuple */[
                                                        inspectorParentDom.offsetWidth,
                                                        inspectorParentDom.offsetHeight
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    Wonder_jest.describe("if not show inspector canvas", (function (param) {
                                            return Wonder_jest.test("trigger onResize function should not resize inspector canvas", (function (param) {
                                                          var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 0, 0, 100, 100, undefined, /* () */0);
                                                          var inspectorCanvasDom = match[3];
                                                          Curry._2(DomHelper$WonderEditor.setDomDisplay, document.getElementById("inspectorCanvasParent"), false);
                                                          MainEditor$WonderEditor.Method[/* onResize */7](document.getElementById("inspectorCanvasParent"));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          inspectorCanvasDom.width,
                                                                          inspectorCanvasDom.height
                                                                        ]), /* tuple */[
                                                                      100,
                                                                      100
                                                                    ]);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("else", (function (param) {
                                                  return Wonder_jest.test("trigger onResize function should resize inspector canvas", (function (param) {
                                                                var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 200, 200, 100, 100, undefined, /* () */0);
                                                                var inspectorCanvasDom = match[3];
                                                                Curry._2(DomHelper$WonderEditor.setDomDisplay, document.getElementById("inspectorCanvasParent"), true);
                                                                MainEditor$WonderEditor.Method[/* onResize */7](document.getElementById("inspectorCanvasParent"));
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                inspectorCanvasDom.width,
                                                                                inspectorCanvasDom.height
                                                                              ]), /* tuple */[
                                                                            200,
                                                                            200
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
