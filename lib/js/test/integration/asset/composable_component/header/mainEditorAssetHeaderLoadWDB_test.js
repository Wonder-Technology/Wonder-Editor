'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../../../unit/tool/external/ConsoleTool.js");
var LoadWDBTool$WonderEditor = require("../../../tool/LoadWDBTool.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var ExportSceneTool$WonderEditor = require("../../../header/tool/ExportSceneTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../tool/engine/FakeGlToolEngine.js");
var ScriptToolEngine$WonderEditor = require("../../../../tool/engine/ScriptToolEngine.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var SettingToolEngine$WonderEditor = require("../../../../tool/engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var WDBNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var MainEditorCameraTool$WonderEditor = require("../../../../tool/MainEditorCameraTool.js");
var GameViewEditorService$WonderEditor = require("../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var GeometryEngineService$WonderEditor = require("../../../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var GameObjectLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/GameObjectLogicService.js");
var GameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var ScriptEventFunctionTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/script/tool/ScriptEventFunctionTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../../tool/engine/CubemapTextureToolEngine.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var MeshRendererEngineService$WonderEditor = require("../../../../../src/service/state/engine/MeshRendererEngineService.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var GameObjectMeshRendererTool$WonderEditor = require("../../../../tool/GameObjectMeshRendererTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var CubemapNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CubemapNodeAssetEditorService.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../../tool/MainEditorAssetFolderNodeTool.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../tool/MainEditorAssetTextureNodeTool.js");
var MaterialNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/MaterialNodeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var BasicSourceTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/textureNode/BasicSourceTypeTextureNodeAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->load wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var truckWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDBWithArcballCameraController(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load wdb", (function (param) {
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      Wonder_jest.testPromise("should not active wdb->camera", undefined, (function (param) {
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              var currentCameraGameObject = MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState);
                              StateLogicService$WonderEditor.getAndSetEditorState(GameViewEditorService$WonderEditor.removeActivedBasicCameraView);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, "Scene", /* () */0).then((function (uploadedWDBNodeId) {
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState),
                                                                MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState)
                                                              ]), /* tuple */[
                                                            undefined,
                                                            currentCameraGameObject
                                                          ]));
                                          }));
                            }));
                      Wonder_jest.testPromise("test the wdb gameObject and it's children isRender should be false", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, "BoxTextured", /* () */0).then((function (uploadedWDBNodeId) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var wdbGameObject = MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return GameObjectMeshRendererTool$WonderEditor.getAllGameObjectMeshRendererComponent(wdbGameObject, param);
                                                                        })).map((function (meshRender) {
                                                                        return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                      return MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(meshRender, param);
                                                                                    }));
                                                                      })).filter((function (isRender) {
                                                                      return isRender;
                                                                    })).length), 0));
                                          }));
                            }));
                      Wonder_jest.describe("draw wdb snapshot", (function (param) {
                              Wonder_jest.describe("restore arcball camer controllear ", (function (param) {
                                      return Wonder_jest.testPromise("restore it's phi,theta", undefined, (function (param) {
                                                    Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                    MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                    StateLogicService$WonderEditor.getAndSetInspectorEngineState(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* setAngleData */1]);
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getInspectorEngineStateToGetData(InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getAngleData */2])), InspectorCanvasTool$WonderEditor.ArcballCameraController[/* getDefaultAngleData */3](/* () */0)));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("test draw wdb snapshot store in basicSourceTextureImageDataMap", undefined, (function (param) {
                                            Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                            var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                            var imgCanvasFakeBase64Str = match[2];
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var match = WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId, editorState));
                                                          var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */2], editorState);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgCanvasFakeBase64Str));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("extract assets from loaded wdb asset", (function (param) {
                              beforeEach((function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      return /* () */0;
                                    }));
                              Wonder_jest.describe("if wdb has no material", (function (param) {
                                      var wdbArrayBuffer = /* record */[/* contents */1];
                                      var _generateWDB = function (param) {
                                        return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                      var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
                                                            editorState,
                                                            engineState
                                                          ]);
                                                      var match$1 = match[1];
                                                      var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
                                                      var rootGameObject = match$2[1];
                                                      var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$1[1], match$2[0]);
                                                      return /* tuple */[
                                                              rootGameObject,
                                                              /* tuple */[
                                                                match[0],
                                                                engineState$1
                                                              ]
                                                            ];
                                                    }));
                                      };
                                      beforeAll((function () {
                                              wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                              return /* () */0;
                                            }));
                                      return Wonder_jest.testPromise("should has no extracted material assets and texture assets", undefined, (function (param) {
                                                    Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  StateEditorService$WonderEditor.getState(/* () */0);
                                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("extract material assets", (function (param) {
                                      Wonder_jest.describe("if wdb->material not exist in assets, extract them and add to assets", (function (param) {
                                              Wonder_jest.describe("should add \"Materials\" folder node and add material node into it", (function (param) {
                                                      Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                                          editorState,
                                                                                          engineState
                                                                                        ])), undefined, /* () */0);
                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                          }));
                                                            }));
                                                      return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                                                              editorState,
                                                                                                              engineState
                                                                                                            ])), undefined, /* () */0);
                                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                              }));
                                                                                }));
                                                                  }));
                                                    }));
                                              Wonder_jest.testPromise("material asset should has unique name", undefined, (function (param) {
                                                      Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                      var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                              return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(addedFolderNodeId, "Materials", param);
                                                            }));
                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                      var addedMaterialNodeId = addedFolderNodeId + 1 | 0;
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                      AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialName(/* () */0), /* () */0);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                    StateEditorService$WonderEditor.getState(/* () */0);
                                                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                  }));
                                                    }));
                                              return Wonder_jest.testPromise("should draw all materials->snapshot", undefined, (function (param) {
                                                            Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                            var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                            var imgCanvasFakeBase64Str = match[2];
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var boxTexturedMeshGameObject = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                                editorState,
                                                                                engineState
                                                                              ]);
                                                                          var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject, engineState);
                                                                          var match = MaterialNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(OperateTreeAssetEditorService$WonderEditor.findMaterialNode(material, /* LightMaterial */1, editorState)));
                                                                          var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* snapshotImageDataIndex */2], editorState);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* base64 */0])), imgCanvasFakeBase64Str));
                                                                        }));
                                                          }));
                                            }));
                                      Wonder_jest.describe("else, relate them", (function (param) {
                                              return Wonder_jest.describe("wdb gameObject should use extraced material asset->materialComponent", (function (param) {
                                                            Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var boxTexturedMeshGameObject = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                                        editorState,
                                                                                        engineState
                                                                                      ]);
                                                                                  var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject, engineState);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState)), true));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                      var boxTexturedMeshGameObject1 = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId1, /* tuple */[
                                                                                                            editorState,
                                                                                                            engineState
                                                                                                          ]);
                                                                                                      var material1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject1, engineState);
                                                                                                      var boxTexturedMeshGameObject2 = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId2, /* tuple */[
                                                                                                            editorState,
                                                                                                            engineState
                                                                                                          ]);
                                                                                                      var material2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject2, engineState);
                                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                          MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material1, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                                                          MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material2, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                                                          MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes(editorState).length
                                                                                                                        ]), /* tuple */[
                                                                                                                      true,
                                                                                                                      true,
                                                                                                                      1
                                                                                                                    ]));
                                                                                                    }));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("fix bug", (function (param) {
                                                    var wdbArrayBuffer = /* record */[/* contents */1];
                                                    var _generateShareMaterialWDB = function (param) {
                                                      return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                                    var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                                                                    var geometry = match[1];
                                                                    var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                                                    var lightMaterial = match$1[1];
                                                                    var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                                          geometry,
                                                                          lightMaterial
                                                                        ], editorState, match$1[0]);
                                                                    var match$3 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                                          geometry,
                                                                          lightMaterial
                                                                        ], match$2[0], match$2[1]);
                                                                    var match$4 = GameObjectEngineService$WonderEditor.create(match$3[1]);
                                                                    var rootGameObject = match$4[1];
                                                                    var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$3[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[2], match$4[0]));
                                                                    return /* tuple */[
                                                                            rootGameObject,
                                                                            /* tuple */[
                                                                              match$3[0],
                                                                              engineState$1
                                                                            ]
                                                                          ];
                                                                  }));
                                                    };
                                                    beforeAll((function () {
                                                            wdbArrayBuffer[0] = _generateShareMaterialWDB(/* () */0);
                                                            return /* () */0;
                                                          }));
                                                    return Wonder_jest.testPromise("if wdb gameObjects share the same material, should only extrace the shared material once", undefined, (function (param) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                                              editorState,
                                                                                              engineState
                                                                                            ])), undefined, /* () */0);
                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("extract texture assets", (function (param) {
                                      Wonder_jest.describe("if wdb->texture not exist in assets, extract them and add to assets", (function (param) {
                                              Wonder_jest.describe("should add \"Textures\" folder node and add texture node into it", (function (param) {
                                                      Wonder_jest.testPromise("test load the same wdb once", undefined, (function (param) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Textures", /* tuple */[
                                                                                          editorState,
                                                                                          engineState
                                                                                        ])), undefined, /* () */0);
                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                          }));
                                                            }));
                                                      return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Textures", /* tuple */[
                                                                                                              editorState,
                                                                                                              engineState
                                                                                                            ])), undefined, /* () */0);
                                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                              }));
                                                                                }));
                                                                  }));
                                                    }));
                                              return Wonder_jest.testPromise("texture asset should has unique name", undefined, (function (param) {
                                                            Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                            var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                            StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                    return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(addedFolderNodeId, "Textures", param);
                                                                  }));
                                                            var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, textureNodeId, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectTextureName(/* () */0), /* () */0);
                                                            MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](textureNodeId, addedFolderNodeId, undefined, undefined, /* () */0);
                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                          StateEditorService$WonderEditor.getState(/* () */0);
                                                                          MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("else, relate them", (function (param) {
                                                    return Wonder_jest.describe("wdb gameObject should use extraced texture asset->textureComponent", (function (param) {
                                                                  Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                        var boxTexturedMeshGameObject = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                                              editorState,
                                                                                              engineState
                                                                                            ]);
                                                                                        var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject, engineState);
                                                                                        var diffuseMap = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(__x, engineState);
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetTextureNodeTool$WonderEditor.hasTextureComponentOfBasicSourceTypeNode(diffuseMap, editorState)), true));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                              var boxTexturedMeshGameObject1 = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId1, /* tuple */[
                                                                                                    editorState,
                                                                                                    engineState
                                                                                                  ]);
                                                                                              var material1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject1, engineState);
                                                                                              StateEditorService$WonderEditor.setState(editorState);
                                                                                              StateEngineService$WonderEditor.setState(engineState);
                                                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, OptionService$WonderEditor.unsafeGet(MainEditorAssetMaterialNodeTool$WonderEditor.findNodeIdByMaterialComponentAndType(material1, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState)), /* () */0);
                                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                            var boxTexturedMeshGameObject2 = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId2, /* tuple */[
                                                                                                                  editorState,
                                                                                                                  engineState
                                                                                                                ]);
                                                                                                            var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(boxTexturedMeshGameObject2, engineState);
                                                                                                            var diffuseMap2 = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(__x, engineState);
                                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                                MainEditorAssetTextureNodeTool$WonderEditor.hasTextureComponentOfBasicSourceTypeNode(diffuseMap2, editorState),
                                                                                                                                BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes(editorState).length,
                                                                                                                                ImmutableSparseMapService$WonderCommonlib.length(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getValidValues(editorState))
                                                                                                                              ]), /* tuple */[
                                                                                                                            true,
                                                                                                                            1,
                                                                                                                            4
                                                                                                                          ]));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("extract cubemap assets", (function (param) {
                                      var sceneWDBArrayBuffer = /* record */[/* contents */1];
                                      beforeAll((function () {
                                              sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.Cubemap[/* generateWDBWithBasicSourceTextureAndSkyboxCubemap */1](/* () */0);
                                              return /* () */0;
                                            }));
                                      Wonder_jest.describe("if wdb->cubemap not exist in assets, extract them and add to assets", (function (param) {
                                              return Wonder_jest.describe("should add \"Cubemaps\" folder node and add cubemap node into it", (function (param) {
                                                            Wonder_jest.testPromise("test load the same wdb once", undefined, (function (param) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Cubemaps", /* tuple */[
                                                                                                editorState,
                                                                                                engineState
                                                                                              ])), undefined, /* () */0);
                                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                }));
                                                                  }));
                                                            Wonder_jest.testPromise("init extracted skybox->cubemap", undefined, (function (param) {
                                                                    var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                    Sinon.returns(1, createTexture);
                                                                    var partial_arg = FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                    StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                            return FakeGlToolEngine$WonderEditor.setFakeGl(partial_arg, param);
                                                                          }));
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureToolEngine$WonderEditor.unsafeGetGlTexture(ArrayService$WonderEditor.unsafeGetFirst(CubemapNodeAssetEditorService$WonderEditor.findTextureComponentsOfBasicSourceTypeTextureNode(editorState)), engineState)), 1));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("shouldn't set extracted cubemap to scene->skybox", undefined, (function (param) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getCubemapTexture)), undefined));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("else", (function (param) {
                                                    Wonder_jest.testPromise("not extracted new one", undefined, (function (param) {
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Cubemaps", /* tuple */[
                                                                                                      editorState,
                                                                                                      engineState
                                                                                                    ])), undefined, /* () */0);
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapNodeAssetEditorService$WonderEditor.findAllCubemapNodes(editorState).length), 1));
                                                                                      }));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.testPromise("not set to scene skybox", undefined, (function (param) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getCubemapTexture)), undefined));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("extract script event function assets", (function (param) {
                                      var wdbArrayBuffer = /* record */[/* contents */1];
                                      var scriptEventFunctionDataNameRef = /* record */[/* contents */""];
                                      var scriptEventFunctionDataRef = /* record */[/* contents */1];
                                      beforeAll((function () {
                                              scriptEventFunctionDataNameRef[0] = "aaa";
                                              scriptEventFunctionDataRef[0] = ScriptToolEngine$WonderEditor.buildScriptEventFunctionData(undefined, Caml_option.some(ScriptToolEngine$WonderEditor.buildSetLocalPositionEventFunc(/* () */0)), undefined);
                                              wdbArrayBuffer[0] = WDBTool$WonderEditor.ScriptEventFunction[/* generateScriptEventFunctionWDB */1](scriptEventFunctionDataNameRef[0], scriptEventFunctionDataRef[0]);
                                              return /* () */0;
                                            }));
                                      Wonder_jest.describe("if wdb->script event function data not exist in assets, extract them and add to assets", (function (param) {
                                              return Wonder_jest.describe("should add \"ScriptEventFunctions\" folder node and add scriptEventFunction node into it", (function (param) {
                                                            Wonder_jest.testPromise("test load the same wdb once", undefined, (function (param) {
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("ScriptEventFunctions", /* tuple */[
                                                                                                editorState,
                                                                                                engineState
                                                                                              ])), undefined, /* () */0);
                                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("ScriptEventFunctions", /* tuple */[
                                                                                                                    editorState,
                                                                                                                    engineState
                                                                                                                  ])), undefined, /* () */0);
                                                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                                    }));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("else, relate them", (function (param) {
                                                    return Wonder_jest.describe("wdb gameObject should use existed scriptEventFunction asset->event function data", (function (param) {
                                                                  return Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                                var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                                AssetInspectorTool$WonderEditor.Rename[/* renameAssetScriptEventFunctionNode */3](undefined, undefined, addedNodeId, scriptEventFunctionDataNameRef[0], /* () */0);
                                                                                var jsObjStr = ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(Caml_option.some(Caml_option.some((function (script, api, state) {
                                                                                                return state;
                                                                                              }))), undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                                                                                                return state;
                                                                                              }))), /* () */0);
                                                                                ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, scriptEventFunctionDataNameRef[0], jsObjStr);
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var scriptGameObject = WDBTool$WonderEditor.ScriptEventFunction[/* getScriptGameObjectByWDBGameObject */3](MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState), engineState);
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptEventFunctionTool$WonderEditor.getEventFunctionDataJsObjStr(ScriptToolEngine$WonderEditor.unsafeGetScriptEventFunctionData(GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(scriptGameObject, engineState), scriptEventFunctionDataNameRef[0], engineState))), jsObjStr));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("extract script attribute assets", (function (param) {
                                      var wdbArrayBuffer = /* record */[/* contents */1];
                                      var scriptAttributeNameRef = /* record */[/* contents */""];
                                      var scriptAttributeRef = /* record */[/* contents */1];
                                      beforeAll((function () {
                                              scriptAttributeNameRef[0] = "aaa";
                                              scriptAttributeRef[0] = ScriptToolEngine$WonderEditor.buildScriptAttribute(scriptAttributeNameRef[0]);
                                              wdbArrayBuffer[0] = WDBTool$WonderEditor.ScriptAttribute[/* generateScriptAttributeWDB */3](scriptAttributeNameRef[0], scriptAttributeRef[0]);
                                              return /* () */0;
                                            }));
                                      return Wonder_jest.describe("if wdb->script attribute not exist in assets, extract them and add to assets", (function (param) {
                                                    return Wonder_jest.describe("should add \"ScriptAttributes\" folder node and add scriptAttribute node into it", (function (param) {
                                                                  Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("ScriptAttributes", /* tuple */[
                                                                                                      editorState,
                                                                                                      engineState
                                                                                                    ])), undefined, /* () */0);
                                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.testPromise("test load the same wdb twice", undefined, (function (param) {
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("ScriptAttributes", /* tuple */[
                                                                                                                          editorState,
                                                                                                                          engineState
                                                                                                                        ])), undefined, /* () */0);
                                                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test wdb is exported scene wdb", (function (param) {
                                      return Wonder_jest.describe("test extract script attribute assets", (function (param) {
                                                    return Wonder_jest.describe("if wdb->script attribute not exist in assets, extract them and add to assets", (function (param) {
                                                                  return Wonder_jest.describe("should add \"ScriptAttributes\" folder node and add scriptAttribute node into it", (function (param) {
                                                                                return Wonder_jest.testPromise("test load wdb once", undefined, (function (param) {
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var scriptAttributeName = "aaa";
                                                                                              var scriptAttribute = ScriptToolEngine$WonderEditor.buildScriptAttribute(scriptAttributeName);
                                                                                              var match = WDBTool$WonderEditor.ScriptAttribute[/* createRootGameObjectForGenerateScriptAttributeWDB2 */2](scriptAttributeName, scriptAttribute, engineState);
                                                                                              var engineState$1 = SceneEngineService$WonderEditor.addSceneChild(match[0], match[1]);
                                                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                              var match$1 = ExportSceneTool$WonderEditor.exportScene(editorState, engineState$1);
                                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(match$1[1], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("ScriptAttributes", /* tuple */[
                                                                                                                          editorState,
                                                                                                                          engineState
                                                                                                                        ])), undefined, /* () */0);
                                                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("fix bug", (function (param) {
                                            var wdbArrayBuffer = /* record */[/* contents */1];
                                            var _generateWDB = function (param) {
                                              return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                            var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                                                            var geometry = match[1];
                                                            var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                                            var lightMaterial1 = match$1[1];
                                                            var match$2 = LightMaterialEngineService$WonderEditor.create(match$1[0]);
                                                            var lightMaterial2 = match$2[1];
                                                            var match$3 = BasicSourceTextureEngineService$WonderEditor.create(match$2[0]);
                                                            var map1 = match$3[1];
                                                            var match$4 = BasicSourceTextureEngineService$WonderEditor.create(match$3[0]);
                                                            var map2 = match$4[1];
                                                            var source = WDBTool$WonderEditor.buildSource(undefined, undefined, "image.png", /* () */0);
                                                            var engineState$1 = BasicSourceTextureEngineService$WonderEditor.setSource(source, map2, BasicSourceTextureEngineService$WonderEditor.setSource(source, map1, match$4[0]));
                                                            var engineState$2 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(map1, lightMaterial1, engineState$1);
                                                            var engineState$3 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(map2, lightMaterial2, engineState$2);
                                                            var match$5 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                                  geometry,
                                                                  lightMaterial1
                                                                ], editorState, engineState$3);
                                                            var match$6 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                                  geometry,
                                                                  lightMaterial1
                                                                ], match$5[0], match$5[1]);
                                                            var match$7 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                                  geometry,
                                                                  lightMaterial2
                                                                ], match$6[0], match$6[1]);
                                                            var match$8 = GameObjectEngineService$WonderEditor.create(match$7[1]);
                                                            var rootGameObject = match$8[1];
                                                            var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$7[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$6[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$5[2], match$8[0])));
                                                            return /* tuple */[
                                                                    rootGameObject,
                                                                    /* tuple */[
                                                                      match$7[0],
                                                                      engineState$4
                                                                    ]
                                                                  ];
                                                          }));
                                            };
                                            beforeAll((function () {
                                                    wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                                    return /* () */0;
                                                  }));
                                            return Wonder_jest.testPromise("\n          1.load wdb asset a1(\n          has three children: c1, c2, c3;\n          c1,c2 share one material m1;\n          c3 use material m2;\n          m1 use texture t1;\n          m2 use texture t2;\n          t1,t2 use the same image i1;\n          )\n\n          should extract 2 texture assets;\n          should only has one image node;\n          ", undefined, (function (param) {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes(editorState).length,
                                                                                            ImmutableSparseMapService$WonderCommonlib.length(MainEditorAssetWDBNodeTool$WonderEditor.getValidTextureArray(editorState))
                                                                                          ]), /* tuple */[
                                                                                        2,
                                                                                        1
                                                                                      ]));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("relate wdb asset gameObjects with default geometrys", (function (param) {
                              var wdbArrayBuffer = /* record */[/* contents */1];
                              var _generateWDB = function (param) {
                                return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                              var match = GameObjectEngineService$WonderEditor.create(engineState);
                                              var rootGameObject = match[1];
                                              var geometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
                                              var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                              var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                    geometry,
                                                    match$1[1]
                                                  ], editorState, match$1[0]);
                                              var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[2], match$2[1]);
                                              return /* tuple */[
                                                      rootGameObject,
                                                      /* tuple */[
                                                        match$2[0],
                                                        engineState$1
                                                      ]
                                                    ];
                                            }));
                              };
                              beforeAll((function () {
                                      wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                      return /* () */0;
                                    }));
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                      return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                    }));
                              return Wonder_jest.testPromise("\n        1.create gameObject g1 with default cube geometry in scene;\n        2.load wdb asset w1(has one cube gameObject with default cube geometry);\n\n        g1->geometry->select geometry group widget should only have not-duplicate-default-geometrys and be using default cube geometry\n        ", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    Wonder_jest.testPromise("the wdb->name in the same path should be unique", undefined, (function (param) {
                                            var fileName = "BoxTextured";
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId1) {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            NodeNameAssetLogicService$WonderEditor.getWDBNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId1, editorState)),
                                                                                            NodeNameAssetLogicService$WonderEditor.getWDBNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId2, editorState))
                                                                                          ]), /* tuple */[
                                                                                        fileName,
                                                                                        "BoxTextured 1"
                                                                                      ]));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("load wdb contain light shouldn't warn exceed max count even though the total light count is exceed(because wdb light is not render)", (function (param) {
                                            var wdbArrayBuffer = /* record */[/* contents */1];
                                            var _generateWDB = function (param) {
                                              return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                            var match = GameObjectEngineService$WonderEditor.create(engineState);
                                                            var rootGameObject = match[1];
                                                            var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, match[0]);
                                                            var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$1[2], match$1[1]);
                                                            return /* tuple */[
                                                                    rootGameObject,
                                                                    /* tuple */[
                                                                      match$1[0],
                                                                      engineState$1
                                                                    ]
                                                                  ];
                                                          }));
                                            };
                                            beforeAll((function () {
                                                    wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                                    return /* () */0;
                                                  }));
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          MainEditorSceneTool$WonderEditor.initState(sandbox, false, undefined, /* () */0);
                                                          MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                                          ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                                          var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                                          var match$2 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                                          var match$3 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$2[0], match$2[1]);
                                                          StateEditorService$WonderEditor.setState(match$3[0]);
                                                          StateEngineService$WonderEditor.setState(match$3[1]);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                        return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn))));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("fix geometry bug", (function (param) {
                                            return Wonder_jest.testPromise("\n        1.create gameObject g1 in scene;\n        2.load truck wdb asset w1;\n\n        g1->geometry->select geometry group widget shouldn't has \"NoName Geometry\"\n        ", undefined, (function (param) {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                        MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("fix load wdb after load wdb error", (function (param) {
                                                  var stoveWDBArrayBuffer = /* record */[/* contents */1];
                                                  beforeAll((function () {
                                                          stoveWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("SuperLowPolyStove");
                                                          return /* () */0;
                                                        }));
                                                  return Wonder_jest.testPromise("\n            1.load wdb w1(error);\n            2.load wdb w2;\n\n            should load w2 success\n            ", undefined, (function (param) {
                                                                MainEditorSceneTool$WonderEditor.initState(sandbox, false, SettingToolEngine$WonderEditor.buildBufferConfigStr(10000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                                                                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                                                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                                                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                                                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(stoveWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                              var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                            return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](error))));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
