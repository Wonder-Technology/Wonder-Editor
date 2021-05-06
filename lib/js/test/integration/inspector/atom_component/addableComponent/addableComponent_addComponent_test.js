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
var LightEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightEngineService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var CameraEngineService$WonderEditor = require("../../../../../src/service/state/engine/camera/CameraEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var InspectorRenderGroupUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js");
var InspectorAddComponentUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorAddComponentUtils.js");
var InspectorHasComponentUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorHasComponentUtils.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("./tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("AddableComponent add component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test gameObject add component workflow", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                Wonder_jest.describe("test add light component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test click add light component, should add into inspector", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        Wonder_jest.describe("test logic", (function (param) {
                                Wonder_jest.test("test if not add light component, current gameObject shouldn't has it", (function (param) {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add light component, should add into engine", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return Wonder_jest.describe("should re-init all light material components", (function (param) {
                                      return Wonder_jest.describe("test add direction light component", (function (param) {
                                                    return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should + 1", (function (param) {
                                                                  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                  var glShaderSource = gl.shaderSource;
                                                                  MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 2")), true);
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test add script component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test click add script component, should add into inspector", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        Wonder_jest.describe("test logic", (function (param) {
                                Wonder_jest.test("test if not add script component, current gameObject shouldn't has it", (function (param) {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add script component, should add into engine", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return Wonder_jest.describe("should re-init all script material components", (function (param) {
                                      return Wonder_jest.describe("test add direction script component", (function (param) {
                                                    return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should + 1", (function (param) {
                                                                  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                  var glShaderSource = gl.shaderSource;
                                                                  MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 2")), true);
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test add cameraGroup component", (function (param) {
                              Wonder_jest.describe("test snapshot", (function (param) {
                                      return Wonder_jest.test("test click add cameraGroup, should add into inspector", (function (param) {
                                                    MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test logic", (function (param) {
                                            Wonder_jest.test("test if not add cameraGroup component, current gameObject shouldn't has it", (function (param) {
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                        }))), false);
                                                  }));
                                            return Wonder_jest.test("test click add cameraGroup component, should add into engine", (function (param) {
                                                          MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                                          var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                              }))), true);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test camera add component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                Wonder_jest.describe("test add geometry component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test click add geometry, should add into inspector", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addGeometryComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not add geometry component, current gameObject shouldn't has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                                      return Wonder_jest.test("test click add geometry component, should add into engine", (function (param) {
                                                    MainEditorInspectorAddComponentTool$WonderEditor.addGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test add renderGroup component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test click add renderGroup, should add into inspector", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not add renderGroup component, current gameObject shouldn't has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                  }))), false);
                                            }));
                                      return Wonder_jest.test("test click add renderGroup component, should add into engine", (function (param) {
                                                    MainEditorInspectorAddComponentTool$WonderEditor.addRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test add flyCamera component", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test click add flyCamera, should add into inspector", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test if not add flyCamera component, current gameObject shouldn't has it", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                                      return Wonder_jest.test("test click add flyCamera component, should add into engine", (function (param) {
                                                    MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(partial_arg, param);
                                                                        }))), true);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test add arcballCamera component", (function (param) {
                              Wonder_jest.describe("test snapshot", (function (param) {
                                      return Wonder_jest.test("test click add arcballCamera, should add into inspector", (function (param) {
                                                    MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test logic", (function (param) {
                                            Wonder_jest.test("test if not add arcballCamera component, current gameObject shouldn't has it", (function (param) {
                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                        }))), false);
                                                  }));
                                            return Wonder_jest.test("test click add arcballCamera component, should add into engine", (function (param) {
                                                          MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                          var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                              }))), true);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("deal with specific case", (function (param) {
                      beforeEach((function () {
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                            }));
                      Wonder_jest.describe("test InspectorAddComponentUtils addComponentByType function", (function (param) {
                              return Wonder_jest.test("test add unaddable component should throw error", (function (param) {
                                            ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                            var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                            InspectorAddComponentUtils$WonderEditor.addComponentByType(/* SourceInstance */7, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* tuple */[
                                                  StateEditorService$WonderEditor.getState(/* () */0),
                                                  StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                ]);
                                            return ConsoleTool$WonderEditor.judgeError("inspectorComponentType", errorStub);
                                          }));
                            }));
                      return Wonder_jest.describe("test InspectorHasComponentUtils isHasSpecificComponentByType", (function (param) {
                                    return Wonder_jest.test("test has sourceInstance component, should throw error", (function (param) {
                                                  ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                  var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                                  var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                  StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                          return InspectorHasComponentUtils$WonderEditor.isHasSpecificComponentByType(/* SourceInstance */7, partial_arg, param);
                                                        }));
                                                  return ConsoleTool$WonderEditor.judgeError("inspectorComponentType", errorStub);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
