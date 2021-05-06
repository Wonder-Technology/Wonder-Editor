'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestRenderer = require("react-test-renderer");
var WDBTool$WonderEditor = require("../../../../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../../../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var DragWDBTool$WonderEditor = require("../../../../../../tool/DragWDBTool.js");
var LoadWDBTool$WonderEditor = require("../../../../../../tool/LoadWDBTool.js");
var InspectorTool$WonderEditor = require("../../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../../asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorMaterialMapTool$WonderEditor = require("../tool/MainEditorMaterialMapTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var TextureNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/textureNode/TextureNodeAssetEditorService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var BasicSourceTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/textureNode/BasicSourceTypeTextureNodeAssetEditorService.js");

Wonder_jest.describe("test MainEditorMaterialMap", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepare = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
          StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
          CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
          Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
          LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
          LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
          LoadTool$WonderEditor.buildFakeLoadImage();
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.testPromise("load asset wdb;\n      drag wdb;\n      select wdb;\n\n      inspector->material map should show its map", undefined, (function (param) {
                _prepare(/* () */0);
                return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                            "BoxTextured",
                            WDBTool$WonderEditor.convertGLBToWDB("BoxTextured")
                          ], (function (shaderSourceCountBeforeDrag, shaderSourceCountAfterDrag, glShaderSource) {
                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                            }));
              }));
        Wonder_jest.describe("test select texture group -> show order", (function (param) {
                beforeEach((function () {
                        sandbox[0] = Sinon$1.sandbox.create();
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                afterEach((function () {
                        return Curry._1(Sinon.restoreSandbox, sandbox[0]);
                      }));
                return Wonder_jest.test("\n        order should be:\n        sort texture assets by firstname alphabetically\n        ", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), "BTexture", /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData), "ATexture", /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterialMap(undefined, undefined, true, undefined, /* () */0));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      beforeEach((function () {
                              sandbox[0] = Sinon$1.sandbox.create();
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                              Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      afterEach((function () {
                              return Curry._1(Sinon.restoreSandbox, sandbox[0]);
                            }));
                      return Wonder_jest.test("test if has current texture component;\n         show texture group;\n        the current texture dom className should be select-item-active\n      ", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                                    var firstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                    var match = StateLogicService$WonderEditor.getEditorState((function (param) {
                                            return TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(firstTextureNodeId, param);
                                          }));
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(MainEditorMaterialMapTool$WonderEditor.renderTextureGroup(/* record */[
                                                        /* style */{
                                                          opacity: "1"
                                                        },
                                                        /* isShowAssetGroup */true,
                                                        /* currentAssetDataOpt */Caml_option.some(match[/* textureComponent */2])
                                                      ], (function (param) {
                                                          return /* () */0;
                                                        }), BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes)));
                                  }));
                    }));
      }));

/*  Not a pure module */
