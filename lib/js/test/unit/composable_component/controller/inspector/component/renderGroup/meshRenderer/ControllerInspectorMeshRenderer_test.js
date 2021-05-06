'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MeshRendererEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/MeshRendererEngineService.js");
var MainEditorMeshRendererTool$WonderEditor = require("../../../../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/meshRenderer/tool/MainEditorMeshRendererTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("controller inspector meshRenderer", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        return Wonder_jest.describe("test set value into engineState", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                              return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                            return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                          }));
                            }));
                      return Wonder_jest.describe("test meshRenderer change drawMode", (function (param) {
                                    Wonder_jest.test("test set drawMode to Lines", (function (param) {
                                            var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                            MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
                                            var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), lineType);
                                          }));
                                    return Wonder_jest.describe("test set drawMode to Triangle_fan", (function (param) {
                                                  return Wonder_jest.test("test logic", (function (param) {
                                                                var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                                                MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
                                                                var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), triangleFanType);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
