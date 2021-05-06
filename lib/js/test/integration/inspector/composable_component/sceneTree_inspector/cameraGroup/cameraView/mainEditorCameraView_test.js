'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorCameraViewTool$WonderEditor = require("./tool/MainEditorCameraViewTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("MainEditor CameraView", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode to be camera", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                              var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                              MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, newGameObject, /* () */0);
                              return MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, newGameObject, /* () */0);
                            }));
                      return Wonder_jest.describe("test set current camera", (function (param) {
                                    Wonder_jest.describe("test snapshot", (function (param) {
                                            Wonder_jest.test("test if camera is currentCamera, the cameraView checkBox defaultChecked should == true and disabled should == true ", (function (param) {
                                                    MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                  }));
                                            Wonder_jest.test("test if camera isn't currentCamera, the cameraView checkBox defaultChecked should == false and disabled should == false ", (function (param) {
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                  }));
                                            return Wonder_jest.test("test set unactive camera to be currentCamera, the currentCamera->cameraView checkBox defaultChecked should == true and disabled should == true", (function (param) {
                                                          MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), Caml_option.some(MainEditorCameraViewTool$WonderEditor.buildEvent(true)), undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test logic", (function (param) {
                                                  return Wonder_jest.test("test set unactive camera to be currentCamera, the unactive one should be marked active", (function (param) {
                                                                MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), Caml_option.some(MainEditorCameraViewTool$WonderEditor.buildEvent(true)), undefined, undefined, /* () */0);
                                                                var firstCamera = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0)))), GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(firstCamera, engineState));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
