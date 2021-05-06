'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var TypeArrayTool$WonderEditor = require("../../../../../redo_undo/tool/TypeArrayTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var TransformUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js");
var Vector3Service$WonderEditor = require("../../../../../../../src/service/primitive/Vector3Service.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var TransformEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/TransformEngineService.js");
var MainEditorTransformTool$WonderEditor = require("../tool/MainEditorTransformTool.js");

Wonder_jest.describe("MainEditorTransform rotation", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test change rotation value", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      Wonder_jest.describe("test change localEulerAngle x", (function (param) {
                              Wonder_jest.test("test snapshot", (function (param) {
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -10.1213);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                    }));
                              return Wonder_jest.test("set to engine state", (function (param) {
                                            var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                            MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -10.1213);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var match = TransformEngineService$WonderEditor.getLocalEulerAngles(currentGameObjectTransform, engineState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            TypeArrayTool$WonderEditor.truncateFloatValue(5, match[0]),
                                                            match[1],
                                                            match[2]
                                                          ]), /* tuple */[
                                                        -10.1213,
                                                        0,
                                                        0
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("deal with the specific case", (function (param) {
                                    beforeEach((function () {
                                            GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                            return /* () */0;
                                          }));
                                    Wonder_jest.test("\n      1.getTransformRotationData;\n      2.set rotation to (x:-45.0, y:180.0, z:0.0);\n\n      inspector->transform->rotation should show (-45.0, 180.0, 0.0)\n      ", (function (param) {
                                            var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                            MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -45);
                                            MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 180);
                                            MainEditorTransformTool$WonderEditor.changeRotationZ(currentGameObjectTransform, -0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                          }));
                                    Wonder_jest.test("\n      1.getTransformRotationData;\n      2.set rotation to (x:-45.0, y:180.0);\n\n      inspector->transform->rotation should show (-45.0, 180.0, 0.0)\n      ", (function (param) {
                                            var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                            MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -45);
                                            MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 180);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                          }));
                                    return Wonder_jest.describe("\n        set rotation to (x:0.0, y:91.0, z:0.0);\n        set rotation to (x:0.0, y:96.0, z:0.0);\n          ", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                    MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, 0);
                                                    MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 91);
                                                    MainEditorTransformTool$WonderEditor.changeRotationZ(currentGameObjectTransform, 0);
                                                    MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 96);
                                                    return currentGameObjectTransform;
                                                  };
                                                  Wonder_jest.test("inspector->transform->rotation should show (0.0, 96.0, 0.0);", (function (param) {
                                                          var currentGameObjectTransform = _prepareAndExec(/* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                                        }));
                                                  return Wonder_jest.test("engineState->transform->rotation should be (180.0, 84.0, 180.0);", (function (param) {
                                                                var currentGameObjectTransform = _prepareAndExec(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return TransformEngineService$WonderEditor.getLocalEulerAngles(currentGameObjectTransform, param);
                                                                                        })))), /* tuple */[
                                                                            180,
                                                                            84,
                                                                            180
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
