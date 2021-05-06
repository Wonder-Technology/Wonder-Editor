'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var ViewToolEngine$WonderEditor = require("../../tool/engine/ViewToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var JobDataEngineService$WonderEditor = require("../../../src/service/state/engine/JobDataEngineService.js");
var SetOutlineDataJobTool$WonderEditor = require("./tool/SetOutlineDataJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("set outline data job", (function (param) {
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
        return Wonder_jest.describe("set outline data", (function (param) {
                      Wonder_jest.describe("if current scene tree node exist", (function (param) {
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
                      return Wonder_jest.describe("else", (function (param) {
                                    return Wonder_jest.test("set gameObjects need drawOutline to be empty", (function (param) {
                                                  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                                  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube));
                                                  StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                                  GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                                  StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SetOutlineDataJobTool$WonderEditor.getGameObjectsNeedDrawOutline)), /* array */[]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
