'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var ConsoleTool$WonderEditor = require("../../../../unit/tool/external/ConsoleTool.js");
var InspectorTool$WonderEditor = require("../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GLSLToolEngine$WonderEditor = require("../../../../tool/engine/GLSLToolEngine.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var GeometryToolEngine$WonderEditor = require("../../../../tool/engine/GeometryToolEngine.js");
var LightEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightEngineService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../tool/engine/LightMaterialToolEngine.js");
var InspectorRenderGroupUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var InspectorRemoveComponentUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRemoveComponentUtils.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("./tool/MainEditorInspectorAddComponentTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("./tool/MainEditorInspectorRemoveComponentTool.js");

Wonder_jest.describe("AddableComponent remove component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test remove directionLight gameObject component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                return Wonder_jest.describe("test remove light component", (function (param) {
                              Wonder_jest.describe("test snapshot", (function (param) {
                                      return Wonder_jest.test("test remove light component, should remove from inspector", (function (param) {
                                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                    }));
                              Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not remove light component, current gameObject should has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                                      return Wonder_jest.test("test click remove light component, current gameObject shouldn't has it", (function (param) {
                                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                        }))), false);
                                                  }));
                                    }));
                              return Wonder_jest.describe("should re-init all light material components", (function (param) {
                                            return Wonder_jest.describe("test remove direction light component", (function (param) {
                                                          return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should - 1", (function (param) {
                                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                        var glShaderSource = gl.shaderSource;
                                                                        MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test remove box gameObject component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                Wonder_jest.describe("test remove geometry component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test remove geometry component, should remove from inspector", (function (param) {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not remove geometry component, current gameObject should has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                                      return Wonder_jest.describe("test click remove geometry component", (function (param) {
                                                    Wonder_jest.test("current gameObject shouldn't has it", (function (param) {
                                                            MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                            var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                                                }))), false);
                                                          }));
                                                    return Wonder_jest.describe("if remove geometry from all its gameObjects", (function (param) {
                                                                  return Wonder_jest.test("geometry component shouldn't be disposed", (function (param) {
                                                                                var geometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                                                var secondCube = StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getSecondCube);
                                                                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(secondCube);
                                                                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                      return GeometryToolEngine$WonderEditor.isGeometryDisposed(geometry, param);
                                                                                                    }))), false);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test remove renderGroup component", (function (param) {
                              Wonder_jest.describe("test snapshot", (function (param) {
                                      return Wonder_jest.test("test remove renderGroup component, should remove from inspector", (function (param) {
                                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test logic", (function (param) {
                                            Wonder_jest.test("test if not remove renderGroup component, current gameObject should has it", (function (param) {
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                            return Wonder_jest.describe("test click remove renderGroup component", (function (param) {
                                                          Wonder_jest.test("current gameObject shouldn't has it", (function (param) {
                                                                  MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                                  var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                        return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                                      }))), false);
                                                                }));
                                                          return Wonder_jest.test("should remove material instead of dispose it", (function (param) {
                                                                        var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        var oldLightMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                                        MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                                        var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        LightMaterialToolEngine$WonderEditor.isAlive(oldLightMaterial, engineState$1),
                                                                                        GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(currentGameObject, engineState$1)
                                                                                      ]), /* tuple */[
                                                                                    true,
                                                                                    false
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test remove camera gameObject component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                Wonder_jest.describe("test remove flyCamera component", (function (param) {
                        beforeEach((function () {
                                return MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test remove flyCamera component, should remove from inspector", (function (param) {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not remove flyCamera component, current gameObject should has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                                      return Wonder_jest.test("test click remove flyCamera component, current gameObject shouldn't has it", (function (param) {
                                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(partial_arg, param);
                                                                        }))), false);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test remove arcballCamera component", (function (param) {
                              beforeEach((function () {
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.describe("test snapshot", (function (param) {
                                      return Wonder_jest.test("test remove arcballCamera component, should remove from inspector", (function (param) {
                                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test logic", (function (param) {
                                            Wonder_jest.test("test if not remove arcballCamera component, current gameObject should has it", (function (param) {
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                            return Wonder_jest.test("test click remove arcballCamera component, current gameObject shouldn't has it", (function (param) {
                                                          MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                          var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                              }))), false);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test remove script component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                              }));
                        return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test snapshot", (function (param) {
                              Wonder_jest.test("test remove script component, should remove from inspector", (function (param) {
                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeScriptComponent(undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                              return Wonder_jest.describe("test logic", (function (param) {
                                            Wonder_jest.test("test if not remove script component, current gameObject should has it", (function (param) {
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                            return Wonder_jest.test("test click remove script component, current gameObject shouldn't has it", (function (param) {
                                                          MainEditorInspectorRemoveComponentTool$WonderEditor.removeScriptComponent(undefined, undefined, undefined, /* () */0);
                                                          var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                                              }))), false);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("deal with specific case", (function (param) {
                      beforeEach((function () {
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                            }));
                      return Wonder_jest.describe("test InspectorRemoveComponentUtils removeComponentByType function", (function (param) {
                                    return Wonder_jest.test("remove unRemovable component should throw error", (function (param) {
                                                  ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                  var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                                  InspectorRemoveComponentUtils$WonderEditor.removeComponentByType(/* SourceInstance */7, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* tuple */[
                                                        StateEditorService$WonderEditor.getState(/* () */0),
                                                        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                      ]);
                                                  return ConsoleTool$WonderEditor.judgeError("can't remove", errorStub);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
