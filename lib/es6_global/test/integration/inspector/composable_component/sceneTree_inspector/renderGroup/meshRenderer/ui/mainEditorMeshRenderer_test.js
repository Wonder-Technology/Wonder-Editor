

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as MainEditorMeshRendererTool$WonderEditor from "../tool/MainEditorMeshRendererTool.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("mainEditor meshRenderer", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test meshRenderer change drawMode", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                      }));
                describe("test set drawMode to Lines", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(lineType);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("test logic", (function () {
                                      var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                      MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(lineType);
                                      var meshRenderer = GameObjectTool$WonderEditor.getCurrentGameObjectMeshRenderer(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                          }))), lineType);
                                    }));
                      }));
                describe("test set drawMode to Points", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                var pointType = MainEditorMeshRendererTool$WonderEditor.getDrawModePointType(/* () */0);
                                MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(pointType);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("test logic", (function () {
                                      var pointType = MainEditorMeshRendererTool$WonderEditor.getDrawModePointType(/* () */0);
                                      MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(pointType);
                                      var meshRenderer = GameObjectTool$WonderEditor.getCurrentGameObjectMeshRenderer(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                          }))), pointType);
                                    }));
                      }));
                describe("test set drawMode to Triangle_fan", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(triangleFanType);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMeshRenderer(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("test logic", (function () {
                                      var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                      MainEditorMeshRendererTool$WonderEditor.triggerChangeDrawModeEvent(triangleFanType);
                                      var meshRenderer = GameObjectTool$WonderEditor.getCurrentGameObjectMeshRenderer(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, param);
                                                          }))), triangleFanType);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
