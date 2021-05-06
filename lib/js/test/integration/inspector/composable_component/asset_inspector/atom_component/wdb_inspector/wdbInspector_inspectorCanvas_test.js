'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../../../tool/WDBTool.js");
var AppStore$WonderEditor = require("../../../../../../../src/core/ui/store/AppStore.js");
var LoadTool$WonderEditor = require("../../../../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../../../src/core/utils/engine/MainUtils.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var CanvasTool$WonderEditor = require("../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ArrayService$WonderEditor = require("../../../../../../../src/service/atom/ArrayService.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var WDBInspector$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/wdb_inspector/ui/WDBInspector.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var WDBInspectorTool$WonderEditor = require("./tool/WDBInspectorTool.js");
var SettingToolEngine$WonderEditor = require("../../../../../../tool/engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var GeometryToolEngine$WonderEditor = require("../../../../../../tool/engine/GeometryToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../tool/InspectorCanvasTool.js");
var InspectorEngineTool$WonderEditor = require("../../../../../../tool/InspectorEngineTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var WDBNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var InspectorCanvasUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/utils/InspectorCanvasUtils.js");
var GeometryEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/GeometryEngineService.js");
var GameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetUploadTool.js");
var MeshRendererEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/MeshRendererEngineService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ImgContextImgCanvasEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js");
var TransformGameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js");
var ContainerGameObjectInspectorCanvasEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("wdb inspector: inspector canvas", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        var _didMount = function (currentNodeId, editorState) {
          return WDBInspector$WonderEditor.Method[/* didMount */0](currentNodeId, MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(currentNodeId, editorState), TestTool$WonderEditor.getDispatch(/* () */0));
        };
        var _getInspectorCameraArcballCameraControllerDistance = function (inspectorEngineState) {
          var __x = InspectorEngineTool$WonderEditor.unsafeGetSceneFirstCamera(inspectorEngineState);
          var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, inspectorEngineState);
          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(__x$1, inspectorEngineState);
        };
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDBWithArcballCameraController(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                WDBInspectorTool$WonderEditor.prepareInspectorEngineState(sandbox, undefined, /* () */0);
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test didMount", (function (param) {
                Wonder_jest.describe("restore arcball camer controllear", (function (param) {
                        beforeEach((function () {
                                InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                return /* () */0;
                              }));
                        Wonder_jest.testPromise("restore it's phi,theta", undefined, (function (param) {
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              _didMount(uploadedWDBNodeId, editorState);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getAngleData */2])), InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getDefaultAngleData */3](/* () */0)));
                                            }));
                              }));
                        return Wonder_jest.testPromise("update arcball camera controller", undefined, (function (param) {
                                      MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                       {\"name\": \"init_inspector_engine\" }\n                   ]\n                 }\n               ]\n                ", "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                       {\"name\": \"update_camera\" }\n                   ]\n                 }\n               ]\n                ", "\n                [\n                   {\"name\": \"init_inspector_engine\" }\n                ]\n                ", "\n                [\n                       {\"name\": \"update_camera\" }\n                ]\n                ", /* () */0), undefined, false, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetInspectorEngineState(MainUtils$WonderEditor._handleInspectorEngineState);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    _didMount(uploadedWDBNodeId, editorState);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getGameObjectTransformLocalPosition */4])), /* tuple */[
                                                                    0,
                                                                    0.12,
                                                                    1.64
                                                                  ]));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("clone wdb gameObject show in inspector-canvas", (function (param) {
                        Wonder_jest.testPromise("test clone wdb gameObject should add into container gameObject", undefined, (function (param) {
                                InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(inspectorEngineState, /* () */0);
                                              _didMount(uploadedWDBNodeId, editorState);
                                              var containerGameObjectFirstChild = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getWDBGameObject(/* tuple */[
                                                        editorState,
                                                        inspectorEngineState
                                                      ]));
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](containerGameObjectFirstChild), newGameObject));
                                            }));
                              }));
                        Wonder_jest.testPromise("test inspector canvas camera distance", undefined, (function (param) {
                                InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var oldCameraArcballControllerDistance = _getInspectorCameraArcballCameraControllerDistance(inspectorEngineState);
                                              _didMount(uploadedWDBNodeId, editorState);
                                              var inspectorEngineState$1 = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var __x = _getInspectorCameraArcballCameraControllerDistance(inspectorEngineState$1);
                                              var newCameraArcballControllerDistance = FloatService$WonderEditor.truncateFloatValue(__x, 1);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  oldCameraArcballControllerDistance,
                                                                  newCameraArcballControllerDistance
                                                                ]), /* tuple */[
                                                              InspectorCanvasUtils$WonderEditor.getCameraDefaultDistance(/* () */0),
                                                              1.6
                                                            ]));
                                            }));
                              }));
                        return Wonder_jest.describe("clone the wdb gameObject and all children", (function (param) {
                                      return Wonder_jest.describe("cloned gameObject data should equal to source one", (function (param) {
                                                    var _getSceneFirstCubeFirstChild = function (sceneWDBGameObject, engineState) {
                                                      var __x = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneWDBGameObject, engineState));
                                                      return ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(__x, engineState));
                                                    };
                                                    Wonder_jest.testPromise("test cloned-gameObject's all children length and name", undefined, (function (param) {
                                                            InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var sceneWDBGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                                          _didMount(uploadedWDBNodeId, editorState);
                                                                          var inspectorClonedGameObject = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getWDBGameObject(/* tuple */[
                                                                                    editorState,
                                                                                    inspectorEngineState
                                                                                  ]));
                                                                          var __x = _getSceneFirstCubeFirstChild(sceneWDBGameObject, engineState);
                                                                          var __x$1 = _getSceneFirstCubeFirstChild(inspectorClonedGameObject, inspectorEngineState);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneWDBGameObject, engineState).length,
                                                                                              GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, engineState)
                                                                                            ]), /* tuple */[
                                                                                          HierarchyGameObjectEngineService$WonderEditor.getChildren(inspectorClonedGameObject, inspectorEngineState).length,
                                                                                          GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x$1, inspectorEngineState)
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("test cloned-gameObject's transform", undefined, (function (param) {
                                                            InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var sceneWDBGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                                          _didMount(uploadedWDBNodeId, editorState);
                                                                          var inspectorClonedGameObject = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getWDBGameObject(/* tuple */[
                                                                                    editorState,
                                                                                    inspectorEngineState
                                                                                  ]));
                                                                          var sceneFirstCubeFirstChild = _getSceneFirstCubeFirstChild(sceneWDBGameObject, engineState);
                                                                          var inspectorClonedSceneFirstCubeFirstChild = _getSceneFirstCubeFirstChild(inspectorClonedGameObject, inspectorEngineState);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              TransformGameObjectEngineService$WonderEditor.getLocalPosition(sceneFirstCubeFirstChild, engineState),
                                                                                              TransformGameObjectEngineService$WonderEditor.getLocalScale(sceneFirstCubeFirstChild, engineState),
                                                                                              TransformGameObjectEngineService$WonderEditor.getLocalRotation(sceneFirstCubeFirstChild, engineState)
                                                                                            ]), /* tuple */[
                                                                                          TransformGameObjectEngineService$WonderEditor.getLocalPosition(inspectorClonedSceneFirstCubeFirstChild, inspectorEngineState),
                                                                                          TransformGameObjectEngineService$WonderEditor.getLocalScale(inspectorClonedSceneFirstCubeFirstChild, inspectorEngineState),
                                                                                          TransformGameObjectEngineService$WonderEditor.getLocalRotation(inspectorClonedSceneFirstCubeFirstChild, inspectorEngineState)
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("test cloned-gameObject's geometry if exist", undefined, (function (param) {
                                                            InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var sceneWDBGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                                          _didMount(uploadedWDBNodeId, editorState);
                                                                          var inspectorClonedGameObject = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getWDBGameObject(/* tuple */[
                                                                                    editorState,
                                                                                    inspectorEngineState
                                                                                  ]));
                                                                          var sceneFirstCube = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneWDBGameObject, engineState));
                                                                          var inspectorClonedSceneFirstCube = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(inspectorClonedGameObject, inspectorEngineState));
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(sceneFirstCube, engineState),
                                                                                              GeometryEngineService$WonderEditor.unsafeGetGeometryNormals(sceneFirstCube, engineState),
                                                                                              GeometryEngineService$WonderEditor.unsafeGetGeometryTexCoords(sceneFirstCube, engineState),
                                                                                              GeometryEngineService$WonderEditor.getGeometryIndices16(sceneFirstCube, engineState),
                                                                                              GeometryEngineService$WonderEditor.getGeometryIndices32(sceneFirstCube, engineState)
                                                                                            ]), /* tuple */[
                                                                                          GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(inspectorClonedSceneFirstCube, inspectorEngineState),
                                                                                          GeometryEngineService$WonderEditor.unsafeGetGeometryNormals(inspectorClonedSceneFirstCube, inspectorEngineState),
                                                                                          GeometryEngineService$WonderEditor.unsafeGetGeometryTexCoords(inspectorClonedSceneFirstCube, inspectorEngineState),
                                                                                          GeometryEngineService$WonderEditor.getGeometryIndices16(inspectorClonedSceneFirstCube, inspectorEngineState),
                                                                                          GeometryEngineService$WonderEditor.getGeometryIndices32(inspectorClonedSceneFirstCube, inspectorEngineState)
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.testPromise("test cloned-gameObject's meshRenderer if exist", undefined, (function (param) {
                                                                  InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var sceneWDBGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                                                _didMount(uploadedWDBNodeId, editorState);
                                                                                var inspectorClonedGameObject = OptionService$WonderEditor.unsafeGet(InspectorEngineTool$WonderEditor.getWDBGameObject(/* tuple */[
                                                                                          editorState,
                                                                                          inspectorEngineState
                                                                                        ]));
                                                                                var sceneFirstCube = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneWDBGameObject, engineState));
                                                                                var inspectorClonedSceneFirstCube = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(inspectorClonedGameObject, inspectorEngineState));
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(sceneFirstCube, engineState), engineState)), MeshRendererEngineService$WonderEditor.getDrawMode(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(inspectorClonedSceneFirstCube, inspectorEngineState), inspectorEngineState)));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("create wdb snapshot", (function (param) {
                              Wonder_jest.testPromise("clear img canvas", undefined, (function (param) {
                                      InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var imgContext = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
                                      var clearRect = imgContext.clearRect;
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var callCount = Sinon.getCallCount(clearRect);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    _didMount(uploadedWDBNodeId, editorState);
                                                    return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                    0,
                                                                    0,
                                                                    50,
                                                                    50
                                                                  ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callCount, clearRect))));
                                                  }));
                                    }));
                              Wonder_jest.describe("clip the inspector-canvas snapshot", (function (param) {
                                      return Wonder_jest.testPromise("img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area", undefined, (function (param) {
                                                    var match = InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, 371, 300, /* () */0);
                                                    var inspectorCanvasDom = match[1][0];
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var imgContext = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
                                                    var drawImage = imgContext.drawImage;
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  var callCount = Sinon.getCallCount(drawImage);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  _didMount(uploadedWDBNodeId, editorState);
                                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                                  inspectorCanvasDom,
                                                                                  85.5,
                                                                                  50,
                                                                                  200,
                                                                                  200,
                                                                                  0,
                                                                                  0,
                                                                                  50,
                                                                                  50
                                                                                ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callCount, drawImage))));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("store snapshot in basicSourceTextureImageDataMap", (function (param) {
                                      return Wonder_jest.testPromise("should store img canvas snapshot in basicSourceTextureImageDataMap's base64", undefined, (function (param) {
                                                    var match = InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                    var imgCanvasFakeBase64Str = match[0];
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  _didMount(uploadedWDBNodeId, editorState);
                                                                  var match = WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId, editorState));
                                                                  var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */2], editorState);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgCanvasFakeBase64Str));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("dispatch Project", undefined, (function (param) {
                                            InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                            var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          var callCount = Sinon.getCallCount(dispatchFuncStub);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          _didMount(uploadedWDBNodeId, editorState);
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */[[
                                                                            AppStore$WonderEditor.UpdateAction,
                                                                            /* Update */[/* array */[/* Project */4]]
                                                                          ]], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callCount, dispatchFuncStub))));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test willUnmount", (function (param) {
                      Wonder_jest.describe("dispose container->wdbGameObjects", (function (param) {
                              return Wonder_jest.testPromise("the container gameObject children array should be empty", undefined, (function (param) {
                                            InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                          _didMount(uploadedWDBNodeId, editorState);
                                                          WDBInspector$WonderEditor.Method[/* willUnmount */1](/* () */0);
                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState$1);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(containerGameObject, inspectorEngineState).length), 0));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("reallocate cpu memory", (function (param) {
                              return Wonder_jest.describe("reallocate geometry", (function (param) {
                                            return Wonder_jest.describe("if geometry buffer is used >= 50%, reallocate", (function (param) {
                                                          return Wonder_jest.testPromise("pack type array", undefined, (function (param) {
                                                                        TestTool$WonderEditor.ignoreError(sandbox);
                                                                        WDBInspectorTool$WonderEditor.prepareInspectorEngineState(sandbox, SettingToolEngine$WonderEditor.buildBufferConfigStr(80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                                                    var vertices = GeometryToolEngine$WonderEditor.getVertices(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](vertices.slice(72, 75)), new Float32Array(/* array */[
                                                                                                                        0,
                                                                                                                        0,
                                                                                                                        0
                                                                                                                      ])));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.testPromise("set inspector canvas camera arcball controller distance to default", undefined, (function (param) {
                                    InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                  MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                  _didMount(uploadedWDBNodeId, editorState);
                                                  WDBInspector$WonderEditor.Method[/* willUnmount */1](/* () */0);
                                                  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  StateEditorService$WonderEditor.getState(/* () */0);
                                                  var __x = _getInspectorCameraArcballCameraControllerDistance(inspectorEngineState);
                                                  var newCameraArcballControllerDistance = FloatService$WonderEditor.truncateFloatValue(__x, 1);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](newCameraArcballControllerDistance), InspectorCanvasUtils$WonderEditor.getCameraDefaultDistance(/* () */0)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
