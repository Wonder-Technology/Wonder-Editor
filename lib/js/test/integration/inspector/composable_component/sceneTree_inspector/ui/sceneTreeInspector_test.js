'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../../../../src/service/state/engine/SceneEngineService.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var SceneTreeEditorService$WonderEditor = require("../../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var SceneTreeInspectorTool$WonderEditor = require("../tool/SceneTreeInspectorTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var GameObjectEngineService$WonderEditor = require("../../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../../unit/tool/MainEditorSceneTreeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");

Wonder_jest.describe("SceneTreeInspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("prepare currentSelectSource is SceneTree", (function (param) {
                      beforeEach((function () {
                              var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                              return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                            return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                          }));
                            }));
                      Wonder_jest.describe("test rename gameObject", (function (param) {
                              beforeEach((function () {
                                      return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                    }));
                              Wonder_jest.describe("test logic", (function (param) {
                                      return Wonder_jest.describe("test engine", (function (param) {
                                                    return Wonder_jest.test("test rename gameObject ", (function (param) {
                                                                  var newName = "gameObjectNewName";
                                                                  SceneTreeInspectorTool$WonderEditor.renameGameObject(newName, undefined, undefined, undefined, /* () */0);
                                                                  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                        return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(partial_arg, param);
                                                                                      }))), newName);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test rename scene", (function (param) {
                                            return Wonder_jest.test("ui->scene tree->scene node->name should be updated", (function (param) {
                                                          SceneTreeInspectorTool$WonderEditor.renameGameObject("gameObjectNewName", StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test show Scene inspector", (function (param) {
                                    return Wonder_jest.test("should show component ui", (function (param) {
                                                  MainEditorSceneTool$WonderEditor.addSceneGameObjectComponentTypeToMap(/* () */0);
                                                  MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
