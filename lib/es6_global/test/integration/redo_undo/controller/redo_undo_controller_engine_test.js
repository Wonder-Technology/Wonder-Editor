

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as HeaderTool$WonderEditor from "../../../unit/composable_component/header/tool/HeaderTool.js";
import * as ControllerTool$WonderEditor from "../tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../src/core/utils/engine/GameObjectUtils.js";
import * as DiffComponentTool$WonderEditor from "../../../tool/DiffComponentTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as TransformEventTool$WonderEditor from "../../../tool/TransformEventTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as StateHistoryToolEditor$WonderEditor from "../tool/StateHistoryToolEditor.js";
import * as TransformEngineService$WonderEditor from "../../../../src/service/state/engine/TransformEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("redo_undo: controller engine", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return TestTool$WonderEditor.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return TestTool$WonderEditor.openContractCheck(/* () */0);
              }));
        describe("test undo operate", (function () {
                describe("test add gameObject", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return ControllerTool$WonderEditor.run(/* () */0);
                              }));
                        return Wonder_jest.test("test undo one step which from second to first", (function () {
                                      HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                      HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0)).length,
                                                      GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0)).length
                                                    ]), /* tuple */[
                                                  7,
                                                  5
                                                ]);
                                    }));
                      }));
                describe("test dispose gameObject from engine", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return ControllerTool$WonderEditor.run(/* () */0);
                              }));
                        return Wonder_jest.test("test undo one step which from second to first", (function () {
                                      HeaderTool$WonderEditor.triggerDisposeBox(/* () */0);
                                      MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode(/* () */0);
                                      HeaderTool$WonderEditor.triggerDisposeBox(/* () */0);
                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0)).length,
                                                      GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0)).length
                                                    ]), /* tuple */[
                                                  5,
                                                  3
                                                ]);
                                    }));
                      }));
                describe("test transform", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return ControllerTool$WonderEditor.run(/* () */0);
                              }));
                        return Wonder_jest.test("test undo one step which from second to first", (function () {
                                      GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      TransformEventTool$WonderEditor.simulateTwiceChangePosition("155", "200", /* () */0);
                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformEngineService$WonderEditor.getLocalPosition(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                                      TransformEngineService$WonderEditor.getLocalPosition(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0))
                                                    ]), /* tuple */[
                                                  /* tuple */[
                                                    155,
                                                    0,
                                                    0
                                                  ],
                                                  /* tuple */[
                                                    155,
                                                    0,
                                                    0
                                                  ]
                                                ]);
                                    }));
                      }));
                describe("fix bug", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return ControllerTool$WonderEditor.run(/* () */0);
                              }));
                        return Wonder_jest.test("the undo operate should deep copy current editEngineState and runEngineState", (function () {
                                      GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      TransformEventTool$WonderEditor.simulateTwiceChangePosition("150", "200", /* () */0);
                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformEngineService$WonderEditor.getLocalPosition(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                                      TransformEngineService$WonderEditor.getLocalPosition(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0))
                                                    ]), /* tuple */[
                                                  /* tuple */[
                                                    150,
                                                    200,
                                                    0
                                                  ],
                                                  /* tuple */[
                                                    150,
                                                    200,
                                                    0
                                                  ]
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
