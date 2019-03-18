

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as ViewToolEngine$WonderEditor from "../../tool/engine/ViewToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as JobDataEngineService$WonderEditor from "../../../src/service/state/engine/JobDataEngineService.js";
import * as SetOutlineDataJobTool$WonderEditor from "./tool/SetOutlineDataJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("set outline data job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n            {\n                \"name\": \"set_outline_data\"\n            }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n            {\n                \"name\": \"set_outline_data\"\n            }\n             ]\n             ", /* () */0), undefined, undefined, false, "\n            {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": true,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n            ", /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("gl context->stencil should be true", (function (param) {
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ViewToolEngine$WonderEditor.unsafeGetContext(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* record */[
                            /* alpha */true,
                            /* depth */true,
                            /* stencil */true,
                            /* antialias */true,
                            /* premultipliedAlpha */true,
                            /* preserveDrawingBuffer */false
                          ]);
              }));
        describe("set outline data", (function () {
                describe("if current scene tree node exist", (function () {
                        Wonder_jest.test("set outline color", (function (param) {
                                StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube));
                                StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(JobDataEngineService$WonderEditor.getOutlineColor)), SetOutlineDataJobTool$WonderEditor.getOutlineColor(/* () */0));
                              }));
                        return Wonder_jest.test("set current scene tree node and its children to be gameObjects need drawOutline", (function (param) {
                                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var firstCube = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                      var secondCube = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                      var engineState$1 = GameObjectTool$WonderEditor.addChild(firstCube, secondCube, engineState);
                                      StateEngineService$WonderEditor.setState(engineState$1);
                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(firstCube);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SetOutlineDataJobTool$WonderEditor.getGameObjectsNeedDrawOutline)), /* array */[
                                                  firstCube,
                                                  secondCube
                                                ]);
                                    }));
                      }));
                describe("else", (function () {
                        return Wonder_jest.test("set gameObjects need drawOutline to be empty", (function (param) {
                                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube));
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SetOutlineDataJobTool$WonderEditor.getGameObjectsNeedDrawOutline)), /* array */[]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
