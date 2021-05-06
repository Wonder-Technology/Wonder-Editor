'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../../../../../src/core/ui/store/AppStore.js");
var LoadTool$WonderEditor = require("../../../../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../../../src/core/utils/engine/MainUtils.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var CanvasTool$WonderEditor = require("../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var MainEditorTool$WonderEditor = require("../../../../../../unit/tool/MainEditorTool.js");
var OldNewSelfTool$WonderEditor = require("../../../../../../unit/tool/OldNewSelfTool.js");
var NoWorkerJobTool$WonderEditor = require("../../../../../tool/NoWorkerJobTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../../../tool/engine/FakeGlToolEngine.js");
var MaterialInspector$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/ui/MaterialInspector.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var GeometryToolEngine$WonderEditor = require("../../../../../../tool/engine/GeometryToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var InspectorCanvasTool$WonderEditor = require("../../tool/InspectorCanvasTool.js");
var InspectorEngineTool$WonderEditor = require("../../../../../../tool/InspectorEngineTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MaterialInspectorTool$WonderEditor = require("./tool/MaterialInspectorTool.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../../../tool/engine/LightMaterialToolEngine.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var BasicMaterialEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/BasicMaterialEngineService.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/LightMaterialEngineService.js");
var MaterialInspectorCanvasTool$WonderEditor = require("./tool/MaterialInspectorCanvasTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ImgContextImgCanvasEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var ContainerGameObjectInspectorCanvasEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("materialInspector: inspector canvas", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _willUnmount = function (currentNodeId) {
          return MaterialInspector$WonderEditor.Method[/* willUnmount */3](currentNodeId, TestTool$WonderEditor.getDispatch(/* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("operate inspector engine state", (function (param) {
                      Wonder_jest.describe("test inspector canvas visibility", (function (param) {
                              afterEach((function () {
                                      return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                                    }));
                              return Wonder_jest.describe("didUpdate MainEditor", (function (param) {
                                            Wonder_jest.test("should hide the inspector canvas", (function (param) {
                                                    var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    MainEditorTool$WonderEditor.mainEditorDidUpdate(OldNewSelfTool$WonderEditor.buildOldAndNewSelf(/* record */[/* isInitEngine */false], /* record */[/* isInitEngine */true]));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[2].style.display), "none");
                                                  }));
                                            return Wonder_jest.describe("mount the MaterialInspector", (function (param) {
                                                          Wonder_jest.test("should show inspector canvas", (function (param) {
                                                                  var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                  var match$1 = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                                  MainEditorTool$WonderEditor.mainEditorDidUpdate(OldNewSelfTool$WonderEditor.buildOldAndNewSelf(/* record */[/* isInitEngine */false], /* record */[/* isInitEngine */true]));
                                                                  MaterialInspectorTool$WonderEditor.didMount(/* LightMaterial */1, match$1[1]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[2].style.display), "block");
                                                                }));
                                                          return Wonder_jest.test("unMount the MaterialInspector, should hide inspector canvas", (function (param) {
                                                                        var match = InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvasAndReturnAllData(sandbox, undefined, undefined, /* () */0);
                                                                        var match$1 = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                                        MainEditorTool$WonderEditor.mainEditorDidUpdate(OldNewSelfTool$WonderEditor.buildOldAndNewSelf(/* record */[/* isInitEngine */false], /* record */[/* isInitEngine */true]));
                                                                        MaterialInspectorTool$WonderEditor.didMount(/* LightMaterial */1, match$1[1]);
                                                                        _willUnmount(match$1[0]);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1][2].style.display), "none");
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test create material sphere gameObject in didMount", (function (param) {
                              return Wonder_jest.describe("test create", (function (param) {
                                            beforeEach((function () {
                                                    CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return /* () */0;
                                                  }));
                                            afterEach((function () {
                                                    return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                                                  }));
                                            Wonder_jest.test("create material sphere gameObject into container gameObject", (function (param) {
                                                    var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                    var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(inspectorEngineState, /* () */0);
                                                    MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match[1]);
                                                    var containerGameObjectFirstChild = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getMaterialSphere(/* tuple */[
                                                              editorState,
                                                              inspectorEngineState
                                                            ]));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](containerGameObjectFirstChild), newGameObject);
                                                  }));
                                            return Wonder_jest.describe("\n              clone the selected material asset to be material component m2(from engine state to inspector engine state);\n              add m2 to material sphere gameObject;\n          ", (function (param) {
                                                          Wonder_jest.describe("test the selected material asset is light material", (function (param) {
                                                                  return Wonder_jest.describe("cloned material's data should equal to source one", (function (param) {
                                                                                Wonder_jest.test("test cloned-material's color", (function (param) {
                                                                                        return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceLightMaterialAttributeIsEqual(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor);
                                                                                      }));
                                                                                Wonder_jest.test("test cloned-material's name", (function (param) {
                                                                                        return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceLightMaterialAttributeIsEqual(LightMaterialEngineService$WonderEditor.getLightMaterialName);
                                                                                      }));
                                                                                Wonder_jest.test("test cloned-material's shininess", (function (param) {
                                                                                        return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceLightMaterialAttributeIsEqual(LightMaterialEngineService$WonderEditor.getLightMaterialShininess);
                                                                                      }));
                                                                                return Wonder_jest.describe("if the light material has texture", (function (param) {
                                                                                              beforeEach((function () {
                                                                                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                                                                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                                                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                                                                      LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                                                                                      LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                                                                                      return LoadTool$WonderEditor.buildFakeLoadImage();
                                                                                                    }));
                                                                                              return Wonder_jest.describe("clone the material texture", (function (param) {
                                                                                                            return Wonder_jest.describe("cloned texture's data should equal to source texture", (function (param) {
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's name", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's source", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's wrapS", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getWrapS);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's wrapT", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getWrapT);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's magFilter", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getMagFilter);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's minFilter", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getMinFilter);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's format", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getFormat);
                                                                                                                                }));
                                                                                                                          Wonder_jest.testPromise("test cloned-texture's type", undefined, (function (param) {
                                                                                                                                  return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getType);
                                                                                                                                }));
                                                                                                                          return Wonder_jest.testPromise("test cloned-texture's flipY", undefined, (function (param) {
                                                                                                                                        return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceTextureAttributeIsEqual(BasicSourceTextureEngineService$WonderEditor.getFlipY);
                                                                                                                                      }));
                                                                                                                        }));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("test the selected material asset is basic material", (function (param) {
                                                                        return Wonder_jest.describe("cloned material's data should equal to source one", (function (param) {
                                                                                      Wonder_jest.test("test cloned-material's color", (function (param) {
                                                                                              return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceBasicMaterialAttributeIsEqual(BasicMaterialEngineService$WonderEditor.getColor);
                                                                                            }));
                                                                                      return Wonder_jest.test("test cloned-material's name", (function (param) {
                                                                                                    return MaterialInspectorCanvasTool$WonderEditor.judgeClonedAndSourceBasicMaterialAttributeIsEqual(BasicMaterialEngineService$WonderEditor.getBasicMaterialName);
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test render material sphere gameObject", (function (param) {
                              beforeEach((function () {
                                      CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      return /* () */0;
                                    }));
                              afterEach((function () {
                                      return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                                    }));
                              return Wonder_jest.test("test draw once", (function (param) {
                                            var gl = FakeGlToolEngine$WonderEditor.getInspectorEngineStateGl(/* () */0);
                                            var drawElements = gl.drawElements;
                                            var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                            MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match[1]);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](drawElements));
                                          }));
                            }));
                      return Wonder_jest.describe("test willUnmount", (function (param) {
                                    Wonder_jest.describe("restore arcball camer controllear", (function (param) {
                                            beforeEach((function () {
                                                    InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                    return /* () */0;
                                                  }));
                                            Wonder_jest.test("restore it's phi,theta", (function (param) {
                                                    var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                    _willUnmount(match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getAngleData */2])), InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getDefaultAngleData */3](/* () */0));
                                                  }));
                                            return Wonder_jest.test("update arcball camera controller", (function (param) {
                                                          MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                       {\"name\": \"init_inspector_engine\" }\n                   ]\n                 }\n               ]\n                ", "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                       {\"name\": \"update_camera\" }\n                   ]\n                 }\n               ]\n                ", "\n                [\n                   {\"name\": \"init_inspector_engine\" }\n                ]\n                ", "\n                [\n                       {\"name\": \"update_camera\" }\n                ]\n                ", /* () */0), undefined, false, /* () */0);
                                                          StateLogicService$WonderEditor.getAndSetInspectorEngineState(MainUtils$WonderEditor._handleInspectorEngineState);
                                                          var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                          _willUnmount(match[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getGameObjectTransformLocalPosition */4])), /* tuple */[
                                                                      0,
                                                                      0.08,
                                                                      1.1
                                                                    ]);
                                                        }));
                                          }));
                                    Wonder_jest.test("if material is removed, not create material sphere's snapshot", (function (param) {
                                            NoWorkerJobTool$WonderEditor.initStateWithDisposeJob(sandbox, undefined, /* () */0);
                                            MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                            var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                            var addedMaterialNodeId = match[0];
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                            _willUnmount(addedMaterialNodeId);
                                            return InspectorCanvasTool$WonderEditor.Material[/* judgeNotCreateMaterialSphere */0](/* () */0);
                                          }));
                                    Wonder_jest.test("if material sphere not in container, not create material sphere's snapshot", (function (param) {
                                            var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                            MaterialInspectorTool$WonderEditor.didMount(/* LightMaterial */1, match[1]);
                                            InspectorCanvasTool$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* () */0);
                                            _willUnmount(match[0]);
                                            return InspectorCanvasTool$WonderEditor.Material[/* judgeNotCreateMaterialSphere */0](/* () */0);
                                          }));
                                    Wonder_jest.describe("else, create material sphere's snapshot", (function (param) {
                                            var _prepareAndExec = function (sandbox, $staropt$star, $staropt$star$1, param) {
                                              var inspectorCanvasWidth = $staropt$star !== undefined ? $staropt$star : 371;
                                              var inspectorCanvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 300;
                                              var match = InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, inspectorCanvasWidth, inspectorCanvasHeight, /* () */0);
                                              var match$1 = match[1];
                                              var match$2 = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                              var addedMaterialNodeId = match$2[0];
                                              MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match$2[1]);
                                              _willUnmount(addedMaterialNodeId);
                                              return /* tuple */[
                                                      addedMaterialNodeId,
                                                      match[0],
                                                      /* tuple */[
                                                        match$1[0],
                                                        match$1[1]
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.test("clear img canvas", (function (param) {
                                                    _prepareAndExec(sandbox, undefined, undefined, /* () */0);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var imgContext = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
                                                    return Sinon.toCalledWith(/* array */[
                                                                0,
                                                                0,
                                                                50,
                                                                50
                                                              ], Wonder_jest.Expect[/* expect */0](imgContext.clearRect));
                                                  }));
                                            Wonder_jest.describe("clip the inspector-canvas snapshot", (function (param) {
                                                    return Wonder_jest.test("img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area", (function (param) {
                                                                  var match = _prepareAndExec(sandbox, 371, 300, /* () */0);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  var imgContext = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
                                                                  return Sinon.toCalledWith(/* array */[
                                                                              match[2][0],
                                                                              85.5,
                                                                              50,
                                                                              200,
                                                                              200,
                                                                              0,
                                                                              0,
                                                                              50,
                                                                              50
                                                                            ], Wonder_jest.Expect[/* expect */0](imgContext.drawImage));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("store snapshot in basicSourceTextureImageDataMap", (function (param) {
                                                    return Wonder_jest.test("should store img canvas snapshot in basicSourceTextureImageDataMap's base64", (function (param) {
                                                                  var match = _prepareAndExec(sandbox, undefined, undefined, /* () */0);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  var match$1 = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(match[0], editorState));
                                                                  var param$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match$1[/* snapshotImageDataIndex */2], editorState);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* base64 */0])), match[1]);
                                                                }));
                                                  }));
                                            return Wonder_jest.test("dispatch Project", (function (param) {
                                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                          _prepareAndExec(sandbox, undefined, undefined, /* () */0);
                                                          return Sinon.toCalledWith(/* array */[[
                                                                        AppStore$WonderEditor.UpdateAction,
                                                                        /* Update */[/* array */[/* Project */4]]
                                                                      ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("dispose container->material sphere gameObject", (function (param) {
                                                  beforeEach((function () {
                                                          InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                          return /* () */0;
                                                        }));
                                                  afterEach((function () {
                                                          return CanvasTool$WonderEditor.restoreMainCanvasAndInspectorCanvasDom(/* () */0);
                                                        }));
                                                  Wonder_jest.test("the container gameObject children array should be empty", (function (param) {
                                                          var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                          MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match[1]);
                                                          _willUnmount(match[0]);
                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(containerGameObject, inspectorEngineState).length), 0);
                                                        }));
                                                  Wonder_jest.test("the materialSphere->material component should be disposed", (function (param) {
                                                          var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                          MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match[1]);
                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var materialSphereLightMaterial = InspectorEngineTool$WonderEditor.getMaterialSphereLightMaterial(editorState, inspectorEngineState);
                                                          _willUnmount(match[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialToolEngine$WonderEditor.isAlive(materialSphereLightMaterial, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0))), false);
                                                        }));
                                                  return Wonder_jest.test("the materialSphere->geometry component should be disposed", (function (param) {
                                                                var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                                MaterialInspector$WonderEditor.Method[/* didMount */1](/* LightMaterial */1, match[1]);
                                                                var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                var __x = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getMaterialSphere(/* tuple */[
                                                                          editorState,
                                                                          inspectorEngineState
                                                                        ]));
                                                                var materialSphereGeometryComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(__x, inspectorEngineState);
                                                                _willUnmount(match[0]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryToolEngine$WonderEditor.isGeometryDisposed(materialSphereGeometryComponent, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
