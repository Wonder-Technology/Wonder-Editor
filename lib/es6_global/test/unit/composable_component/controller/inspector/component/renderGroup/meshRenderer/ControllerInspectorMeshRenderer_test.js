

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as MainEditorMeshRendererTool$WonderEditor from "../../../../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/meshRenderer/tool/MainEditorMeshRendererTool.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

describe("controller inspector meshRenderer", (function () {
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
        describe("test set value into engineState", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                describe("test meshRenderer change drawMode", (function () {
                        Wonder_jest.test("test set drawMode to Lines", (function () {
                                var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
                                MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
                                var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), lineType);
                              }));
                        describe("test set drawMode to Triangle_fan", (function () {
                                return Wonder_jest.test("test logic", (function () {
                                              var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
                                              MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
                                              var meshRenderer = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeMeshRenderer(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(meshRenderer, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), triangleFanType);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
