'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var AssetIMGUITool$WonderEditor = require("../../../tool/AssetIMGUITool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var FileNameService$WonderEditor = require("../../../../../src/service/atom/FileNameService.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var IMGUISkinInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/imguiSkin_inspector/tool/IMGUISkinInspectorTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightMaterialEngineService.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var BasicSourceTextureToolEngine$WonderEditor = require("../../../../tool/engine/BasicSourceTextureToolEngine.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var TextureNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/textureNode/TextureNodeAssetEditorService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../tool/MainEditorAssetTextureNodeTool.js");
var IMGUISkinNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/IMGUISkinNodeAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../tool/MainEditorAssetMaterialNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var IMGUICustomImageTextureContentMapTool$WonderEditor = require("../../tool/IMGUICustomImageTextureContentMapTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");
var ContainerGameObjectInspectorCanvasEditorService$WonderEditor = require("../../../../../src/service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->remove texture", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("select texture;\n                click remove-button;\n            ", (function (param) {
                return Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
              }));
        Wonder_jest.describe("\n              test upload two textures with the same image\n              ", (function (param) {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                      }));
                Wonder_jest.testPromise("\n                  remove one of them;\n\n                  the base64 should not remove from basicSourceTextureImageDataMap;\n                  ", undefined, (function (param) {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var textureData1 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                    var textureData2 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId1, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        textureData1[/* imageDataIndex */3],
                                                                        Js_option.isSome(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(textureData2[/* imageDataIndex */3], editorState))
                                                                      ]), /* tuple */[
                                                                    textureData2[/* imageDataIndex */3],
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.testPromise("\n                  remove all of them;\n\n                  the base64 should remove from basicSourceTextureImageDataMap;\n                  ", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var textureData1 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                          var textureData2 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId1, /* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId2, /* () */0);
                                                          var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              textureData1[/* imageDataIndex */3],
                                                                              Js_option.isNone(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(textureData2[/* imageDataIndex */3], editorState$1))
                                                                            ]), /* tuple */[
                                                                          textureData2[/* imageDataIndex */3],
                                                                          true
                                                                        ]));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("\n              load one texture t1;\n              add two material m1, m2;\n              drag texture to set m1 and m2 material map;\n              select texture;\n              click remove-button;\n              ", (function (param) {
                var _createNewMaterial = function (param) {
                  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                  var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                  return /* tuple */[
                          addedMaterialNodeId,
                          materialComponent
                        ];
                };
                beforeEach((function () {
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                              }));
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                      }));
                Wonder_jest.testPromise("should redraw m1,m2 snapshot to basicSourceTextureImageDataMap", undefined, (function (param) {
                        var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                        var imgCanvasFakeBase64Str = match[2];
                        var match$1 = _createNewMaterial(/* () */0);
                        var materialComponent1 = match$1[1];
                        var addedMaterialNodeId1 = match$1[0];
                        var match$2 = _createNewMaterial(/* () */0);
                        var materialComponent2 = match$2[1];
                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent1, uploadedTextureNodeId, /* () */0);
                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent2, uploadedTextureNodeId, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var materialNodeData1 = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId1, editorState));
                                      var materialNodeData2 = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId1, editorState));
                                      var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(materialNodeData1[/* snapshotImageDataIndex */2], editorState);
                                      var param$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(materialNodeData2[/* snapshotImageDataIndex */2], editorState);
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                          OptionService$WonderEditor.unsafeGet(param[/* base64 */0]),
                                                          OptionService$WonderEditor.unsafeGet(param$1[/* base64 */0])
                                                        ]), /* tuple */[
                                                      imgCanvasFakeBase64Str,
                                                      imgCanvasFakeBase64Str
                                                    ]));
                                    }));
                      }));
                return Wonder_jest.testPromise("should dispose inspectorEngine container gameObject all children ", undefined, (function (param) {
                              MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                              var match = _createNewMaterial(/* () */0);
                              var materialComponent1 = match[1];
                              var match$1 = _createNewMaterial(/* () */0);
                              var materialComponent2 = match$1[1];
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                            MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent1, uploadedTextureNodeId, /* () */0);
                                            MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent2, uploadedTextureNodeId, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var containerGameObject = ContainerGameObjectInspectorCanvasEditorService$WonderEditor.unsafeGetContainerGameObject(editorState);
                                            var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(containerGameObject, inspectorEngineState).length), 0));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test dispose texture content data", (function (param) {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                      }));
                return Wonder_jest.describe("if type is IMGUICustomImage", (function (param) {
                              Wonder_jest.testPromise("remove texture content", undefined, (function (param) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                    TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                    var textureContentIndex = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                          }));
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUICustomImageTextureContentMapTool$WonderEditor.hasContent(textureContentIndex, undefined, /* () */0)), false));
                                                  }));
                                    }));
                              return Wonder_jest.describe("remove related skin data", (function (param) {
                                            return Wonder_jest.describe("remove related button skin data", (function (param) {
                                                          return Wonder_jest.describe("remove by custom image id", (function (param) {
                                                                        var _test = function (judgeFunc) {
                                                                          var addedSkinNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                                                                          var addedSkinNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                                                        TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId1, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                        var customImageId1 = "i1";
                                                                                        TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId1, undefined, customImageId1, undefined, undefined, undefined, undefined, /* () */0);
                                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                                                                      TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId2, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                                      var customImageId2 = "i2";
                                                                                                      TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId2, undefined, customImageId2, undefined, undefined, undefined, undefined, /* () */0);
                                                                                                      StateEditorService$WonderEditor.setState(IMGUISkinInspectorTool$WonderEditor.setNodeData(addedSkinNodeId1, undefined, IMGUISkinInspectorTool$WonderEditor.createButtonSkinData(undefined, undefined, undefined, Caml_option.some(customImageId1), undefined, Caml_option.some(customImageId2), undefined, undefined, /* () */0), undefined, undefined, /* () */0));
                                                                                                      StateEditorService$WonderEditor.setState(IMGUISkinInspectorTool$WonderEditor.setNodeData(addedSkinNodeId2, undefined, IMGUISkinInspectorTool$WonderEditor.createButtonSkinData(undefined, undefined, undefined, Caml_option.some(customImageId2), Caml_option.some(customImageId1), undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0));
                                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId1, /* () */0);
                                                                                                      return Curry._2(judgeFunc, /* tuple */[
                                                                                                                  addedSkinNodeId1,
                                                                                                                  addedSkinNodeId2
                                                                                                                ], /* tuple */[
                                                                                                                  customImageId1,
                                                                                                                  customImageId2
                                                                                                                ]);
                                                                                                    }));
                                                                                      }));
                                                                        };
                                                                        Wonder_jest.testPromise("remove from editor data", undefined, (function (param) {
                                                                                return _test((function (param, param$1) {
                                                                                              var customImageId2 = param$1[1];
                                                                                              var addedSkinNodeId2 = param[1];
                                                                                              var addedSkinNodeId1 = param[0];
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                  /* tuple */[
                                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                              return IMGUISkinNodeAssetEditorService$WonderEditor.getButtonSkinData(addedSkinNodeId1, param);
                                                                                                                            }))[/* buttonImage */3],
                                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                              return IMGUISkinNodeAssetEditorService$WonderEditor.getButtonSkinData(addedSkinNodeId1, param);
                                                                                                                            }))[/* clickButtonImage */5]
                                                                                                                  ],
                                                                                                                  /* tuple */[
                                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                              return IMGUISkinNodeAssetEditorService$WonderEditor.getButtonSkinData(addedSkinNodeId2, param);
                                                                                                                            }))[/* buttonImage */3],
                                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                              return IMGUISkinNodeAssetEditorService$WonderEditor.getButtonSkinData(addedSkinNodeId2, param);
                                                                                                                            }))[/* clickButtonImage */5]
                                                                                                                  ]
                                                                                                                ]), /* tuple */[
                                                                                                              /* tuple */[
                                                                                                                undefined,
                                                                                                                customImageId2
                                                                                                              ],
                                                                                                              /* tuple */[
                                                                                                                customImageId2,
                                                                                                                undefined
                                                                                                              ]
                                                                                                            ]));
                                                                                            }));
                                                                              }));
                                                                        return Wonder_jest.testPromise("should update imgui skin inspector->button skin data", undefined, (function (param) {
                                                                                      return _test((function (param, param$1) {
                                                                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectIMGUISkinNode(param[0], undefined, undefined, /* () */0);
                                                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("should remove it from engineState", (function (param) {
                      Wonder_jest.describe("select texture;\n                drag texture to set gameObject material map;\n                select texture;\n                click remove-button;\n            ", (function (param) {
                              beforeEach((function () {
                                      var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                            }));
                                      return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                    }));
                              return Wonder_jest.describe("should remove it from scene->materials", (function (param) {
                                            return Wonder_jest.describe("test remove lightMaterial->diffuseMap", (function (param) {
                                                          var _drag = function (assetTreeData) {
                                                            return MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                          };
                                                          var _remove = function (assetTreeData) {
                                                            return MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                          };
                                                          Wonder_jest.test("test one gameObject use one material", (function (param) {
                                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                  _drag(assetTreeData);
                                                                  _remove(assetTreeData);
                                                                  MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                  var lightMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(lightMaterial, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), undefined);
                                                                }));
                                                          return Wonder_jest.describe("test two gameObjects use one material", (function (param) {
                                                                        return Wonder_jest.test("test gameObjects are in scene", (function (param) {
                                                                                      var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      var oldMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                                                      var secondCubeGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(1, engineState);
                                                                                      var engineState$1 = LightMaterialToolEngine$WonderEditor.replaceGameObjectLightMaterial(secondCubeGameObject, oldMaterial, engineState);
                                                                                      StateEngineService$WonderEditor.setState(engineState$1);
                                                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                                      _drag(assetTreeData);
                                                                                      MainEditorSceneTool$WonderEditor.setSecondCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                      _drag(assetTreeData);
                                                                                      _remove(assetTreeData);
                                                                                      var engineState$2 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      var newMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState$2);
                                                                                      var newMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(secondCubeGameObject, engineState$2);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(newMaterial1, engineState$2),
                                                                                                      LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(newMaterial2, engineState$2)
                                                                                                    ]), /* tuple */[
                                                                                                  undefined,
                                                                                                  undefined
                                                                                                ]);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("if texture has no materials, should dispose texture's engine data", (function (param) {
                              beforeEach((function () {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                      return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("texture shouldn't be alive", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                          var textureComponent = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                  return MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId1, param);
                                                                }));
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId1, /* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return BasicSourceTextureToolEngine$WonderEditor.isAlive(textureComponent, param);
                                                                                  }))), false));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test dispose imgui assets", (function (param) {
                                    Wonder_jest.describe("if type is IMGUICustomImage", (function (param) {
                                            return Wonder_jest.describe("if the custom image data has set to engine", (function (param) {
                                                          return Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                        var judgeFunc = function (customImageId) {
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                    return AssetIMGUIEngineService$WonderEditor.hasSettedAssetCustomImageData(customImageId, param);
                                                                                                  }))), false));
                                                                        };
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                      TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                      var customImageId = "i1";
                                                                                      TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                                                                      var partial_arg = AssetIMGUITool$WonderEditor.buildFakeCustomImageData(customImageId, /* () */0);
                                                                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                                              return AssetIMGUITool$WonderEditor.addSettedAssetCustomImageData(partial_arg, param);
                                                                                            }));
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                                                      return Curry._1(judgeFunc, customImageId);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("if type is BasicSource", (function (param) {
                                                  return Wonder_jest.describe("if the texture has set to engine as imgui font-> bitmap", (function (param) {
                                                                return Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                              var judgeFunc = function (bitmapName) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                          return AssetIMGUIEngineService$WonderEditor.hasSettedAssetBitmapData(bitmapName, param);
                                                                                                        }))), false));
                                                                              };
                                                                              var bitmapName = "bitmap.png";
                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, bitmapName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                            TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                            StateEngineService$WonderEditor.setState(AssetIMGUITool$WonderEditor.setSettedAssetBitmapData(FileNameService$WonderEditor.getBaseName(bitmapName), undefined, undefined, /* () */0));
                                                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                                                            return Curry._1(judgeFunc, bitmapName);
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
