'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../asset/tool/LoadTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var JobEngineService$WonderEditor = require("../../../../../src/service/state/engine/job/JobEngineService.js");
var ImportPackageTool$WonderEditor = require("../../../header/import_package/tool/ImportPackageTool.js");
var InitScriptJobTool$WonderEditor = require("../../../job/tool/InitScriptJobTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("./tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("./atom_component/texture_inspector/tool/textureInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightMaterialEngineService.js");
var MaterialInspectorCanvasTool$WonderEditor = require("./atom_component/material_inspector/tool/MaterialInspectorCanvasTool.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var BasicSourceTextureToolEngine$WonderEditor = require("../../../../tool/engine/BasicSourceTextureToolEngine.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTextureNodeTool.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var CloneMaterialEngineLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/engine/CloneMaterialEngineLogicService.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("./atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("inspector canvas->clone material", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("clone texture and add to material", (function (param) {
                      var _cloneLightMaterialToOtherEngineState = function (clonedMaterialComponent) {
                        var match = CloneMaterialEngineLogicService$WonderEditor.cloneLightMaterialToOtherEngineState(clonedMaterialComponent, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0), StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0));
                        StateEditorService$WonderEditor.setState(match[1]);
                        StateInspectorEngineService$WonderEditor.setState(match[2]);
                        return match[0];
                      };
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              InspectorCanvasTool$WonderEditor.prepareInspectorAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                              return /* () */0;
                            }));
                      Wonder_jest.describe("fix bug", (function (param) {
                              var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
                              beforeAll((function () {
                                      boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                                      return /* () */0;
                                    }));
                              beforeEach((function () {
                                      LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                      return LoadTool$WonderEditor.buildFakeLoadImage(/* () */0);
                                    }));
                              return Wonder_jest.testPromise("load wdb->extract material assets shouldn't dispose texture", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                        StateLogicService$WonderEditor.getAndSetEngineState(JobEngineService$WonderEditor.execDisposeJob);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(BasicSourceTextureToolEngine$WonderEditor.hasDisposedTexture)), false));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("remove texture asset should remove texture cache", (function (param) {
                              return Wonder_jest.testPromise("\n              load texture t1;\n              add material m1;\n              drag t1 to set m1->map;\n              clone m1 to be tm1;\n              remove t1;\n              load texture t2;\n              drag t2 to set m1->map;\n              clone m1 to be tm2;\n\n              tm2->map should be t2->cloned texture;\n            ", undefined, (function (param) {
                                            var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                            var materialComponent = match[1];
                                            var addedMaterialNodeId = match[0];
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "i1.png", undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                          MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId1, undefined, undefined, materialComponent, /* () */0);
                                                          _cloneLightMaterialToOtherEngineState(materialComponent);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId1, /* () */0);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "i2.png", undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                                        MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId2, undefined, undefined, materialComponent, /* () */0);
                                                                        var targetMaterialComponent2 = _cloneLightMaterialToOtherEngineState(materialComponent);
                                                                        var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(targetMaterialComponent2, inspectorEngineState), inspectorEngineState)), "i2"));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("change texture asset->wrap/filter should remove texture cache", (function (param) {
                              return Wonder_jest.testPromise("\n              load texture t1;\n              add material m1;\n              drag t1 to set m1->map;\n              clone m1 to be tm1;\n              change t1->wrapS to s1;\n              clone m1 to be tm2;\n\n              tm2->map->wrapS should === s1;\n            ", undefined, (function (param) {
                                            var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                            var materialComponent = match[1];
                                            var addedMaterialNodeId = match[0];
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "i1.png", undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                          MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId1, undefined, undefined, materialComponent, /* () */0);
                                                          _cloneLightMaterialToOtherEngineState(materialComponent);
                                                          TextureInspectorTool$WonderEditor.changeWrapS(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                      return MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId1, param);
                                                                    })), 2, undefined, undefined, /* () */0);
                                                          var targetMaterialComponent2 = _cloneLightMaterialToOtherEngineState(materialComponent);
                                                          var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(targetMaterialComponent2, inspectorEngineState), inspectorEngineState)), /* Repeat */2));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("import package should clear texture cache", (function (param) {
                              return Wonder_jest.testPromise("\n            import package;\n\n            texture cache should be empty;\n            ", undefined, (function (param) {
                                            ImportPackageTool$WonderEditor.prepareLoad(sandbox);
                                            InspectorCanvasTool$WonderEditor.TextureCache[/* setFakeCaches */0](/* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(InspectorCanvasTool$WonderEditor.TextureCache[/* isCacheMapEmpty */1])), true));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
                      return Wonder_jest.describe("test init script api", (function (param) {
                                    beforeEach((function () {
                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                          }));
                                    return Wonder_jest.describe("disposeGameObject", (function (param) {
                                                  return Wonder_jest.testPromise("should remove texture cache", undefined, (function (param) {
                                                                var disposeGameObjectFunc = InitScriptJobTool$WonderEditor.createRewritedScriptAPIJsObj(/* () */0).disposeGameObject;
                                                                var gameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                var match = MaterialInspectorCanvasTool$WonderEditor.createNewMaterial(/* () */0);
                                                                var materialComponent = match[1];
                                                                var addedMaterialNodeId = match[0];
                                                                MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMaterial(/* () */0), /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "i1.png", undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                                              MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId1, undefined, undefined, materialComponent, /* () */0);
                                                                              _cloneLightMaterialToOtherEngineState(materialComponent);
                                                                              StateEngineService$WonderEditor.setState(disposeGameObjectFunc(gameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(InspectorCanvasTool$WonderEditor.TextureCache[/* isCacheMapEmpty */1])), true));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
