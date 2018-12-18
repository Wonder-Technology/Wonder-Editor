

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as SceneEditorService$WonderEditor from "../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeInspectorTool$WonderEditor from "../tool/SceneTreeInspectorTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("SceneTreeInspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource is SceneTree", (function (param) {
                beforeEach((function (param) {
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test rename gameObject", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        describe("test logic", (function (param) {
                                describe("test engine", (function (param) {
                                        return Wonder_jest.test("test rename gameObject ", (function (param) {
                                                      var newName = "gameObjectNewName";
                                                      SceneTreeInspectorTool$WonderEditor.renameGameObject(newName, undefined, undefined, undefined, /* () */0);
                                                      var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(partial_arg, param);
                                                                          }))), newName);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test show Scene inspector", (function (param) {
                        return Wonder_jest.test("should show nothing", (function (param) {
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
