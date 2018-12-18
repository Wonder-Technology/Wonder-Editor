

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as IMGUITool$WonderEditor from "../../tool/IMGUITool.js";
import * as MainEditor$WonderEditor from "../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as SettingToolEngine$WonderEditor from "../../../tool/engine/SettingToolEngine.js";
import * as DirectorToolEngine$WonderEditor from "../../../tool/engine/DirectorToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../src/service/state/engine/DeviceManagerEngineService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionToolEngine$WonderEditor from "../../../tool/engine/PerspectiveCameraProjectionToolEngine.js";

describe("test mainEditor->resize", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n             {\n               \"name\": \"init_imgui\"\n             }\n           ]\n         }\n       ]\n             ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n           ]\n         }\n       ]\n             ", "\n             [\n               { \"name\": \"init_imgui\" }\n             ]\n             ", "\n             []\n             ", /* () */0), undefined, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
        };
        var _resize = function (sandbox) {
          var dispatchFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          MainEditor$WonderEditor.Method[/* resizeCanvasAndViewPort */3](dispatchFunc);
          return dispatchFunc;
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("resizeCanvasAndViewPort", (function (param) {
                describe("set canvas size", (function (param) {
                        return Wonder_jest.test("canvan's width and height should == parent's width and height", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubCanvasParentAndCanvas(sandbox);
                                      var canvasDom = match[1];
                                      var parentDom = match[0];
                                      _resize(sandbox);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      canvasDom.width,
                                                      canvasDom.height
                                                    ]), /* tuple */[
                                                  parentDom.offsetWidth,
                                                  parentDom.offsetHeight
                                                ]);
                                    }));
                      }));
                describe("set viewport", (function (param) {
                        return Wonder_jest.test("canvas's viewport should == canvas parent's width and height", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubCanvasParentAndCanvas(sandbox);
                                      var parentDom = match[0];
                                      _resize(sandbox);
                                      var match$1 = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[2],
                                                      match$1[3]
                                                    ]), /* tuple */[
                                                  parentDom.offsetWidth,
                                                  parentDom.offsetHeight
                                                ]);
                                    }));
                      }));
                describe("update view rect", (function (param) {
                        return Wonder_jest.test("update scene view and game view rect", (function (param) {
                                      _prepareState(/* () */0);
                                      var match = IMGUITool$WonderEditor.stubCanvasParentAndCanvas(sandbox);
                                      var parentDom = match[0];
                                      var width = parentDom.offsetWidth;
                                      var height = parentDom.offsetHeight;
                                      _resize(sandbox);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                describe("update all cameraProjections by new aspect", (function (param) {
                        var _setFakeCanvasd = function (width, height) {
                          return SettingToolEngine$WonderEditor.setFakeCanvasToEngineState(width, height, /* () */0);
                        };
                        var _getAllPMatrixs = function (engineState) {
                          return GameObjectComponentEngineService$WonderEditor.getAllPerspectiveCameraProjectionComponents(engineState).map((function (cameraProjection) {
                                        return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(cameraProjection, engineState);
                                      }));
                        };
                        beforeEach((function (param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n            {\n              \"name\": \"default\",\n              \"jobs\": [\n                {\n                  \"name\": \"update_camera\"\n                }\n              ]\n            }\n          ]\n                ", undefined, "\n                [\n                {\n                  \"name\": \"update_camera\"\n                }\n                ]\n                ", /* () */0), undefined, undefined, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                return DirectorToolEngine$WonderEditor.prepareAllEnginState(/* () */0);
                              }));
                        return Wonder_jest.test("test resize twice(the first resize is to mark all cameraProjections not dirty)", (function (param) {
                                      _setFakeCanvasd(200, 200);
                                      IMGUITool$WonderEditor.stubCanvasParentAndCanvas(sandbox);
                                      _resize(sandbox);
                                      _setFakeCanvasd(100, 200);
                                      _resize(sandbox);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var pMatrix = PerspectiveCameraProjectionToolEngine$WonderEditor.buildPerspective(60, 100 / 200, 0.01, 50000);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPMatrixs(engineState)), /* array */[
                                                  pMatrix,
                                                  pMatrix
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
