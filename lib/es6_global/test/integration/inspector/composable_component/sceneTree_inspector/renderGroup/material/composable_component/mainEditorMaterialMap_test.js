

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as WDBTool$WonderEditor from "../../../../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../../../../../asset/tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as DragWDBTool$WonderEditor from "../../../../../../tool/DragWDBTool.js";
import * as LoadWDBTool$WonderEditor from "../../../../../../tool/LoadWDBTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../../assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorMaterialMapTool$WonderEditor from "../tool/MainEditorMaterialMapTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("test MainEditorMaterialMap", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepare = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
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
        Wonder_jest.testPromise("load asset wdb;\n      drag wdb;\n      select wdb;\n\n      inspector->material map should show its map", (function () {
                _prepare(/* () */0);
                return DragWDBTool$WonderEditor.testDragWDB(sandbox, /* tuple */[
                            "CubeTextured",
                            WDBTool$WonderEditor.convertGLBToWDB("CubeTextured")
                          ], (function (_, _$1, _$2) {
                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                            }));
              }));
        describe("test select texture group -> show order", (function () {
                beforeEach((function () {
                        sandbox[0] = Sinon$1.sandbox.create();
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                afterEach((function () {
                        return Curry._1(Sinon.restoreSandbox, sandbox[0]);
                      }));
                return Wonder_jest.test("\n        order should be:\n        sort texture assets by firstname alphabetically\n        ", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), "BTexture", /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData), "ATexture", /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterialMap(undefined, undefined, true, undefined, /* () */0));
                            }));
              }));
        describe("fix bug", (function () {
                beforeEach((function () {
                        sandbox[0] = Sinon$1.sandbox.create();
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                afterEach((function () {
                        return Curry._1(Sinon.restoreSandbox, sandbox[0]);
                      }));
                return Wonder_jest.test("test if has current texture component;\n         show texture group;\n        the current texture dom className should be select-item-active\n      ", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                              var firstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                              var match = StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(firstTextureNodeId, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(MainEditorMaterialMapTool$WonderEditor.renderTextureGroup(/* record */[
                                                  /* style */{
                                                    opacity: "1"
                                                  },
                                                  /* isShowTextureGroup */true,
                                                  /* currentTextureComponent */match[/* textureComponent */0]
                                                ], (function () {
                                                    return /* () */0;
                                                  }))));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
