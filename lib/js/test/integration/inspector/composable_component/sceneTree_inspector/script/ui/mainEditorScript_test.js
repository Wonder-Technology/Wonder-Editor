'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../../../../../tool/SinonTool.js");
var ArrayService$WonderEditor = require("../../../../../../../src/service/atom/ArrayService.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/script/ScriptEngineService.js");
var MainEditorScriptTool$WonderEditor = require("../tool/MainEditorScriptTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptAttributeFieldTool$WonderEditor = require("../tool/ScriptAttributeFieldTool.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../../asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../tool/MainEditorScriptAttributeTool.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../../asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../tool/MainEditorScriptEventFunctionTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("MainEditorScript", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                            }));
                      Wonder_jest.describe("test script event function", (function (param) {
                              Wonder_jest.describe("test add script event function", (function (param) {
                                      Wonder_jest.test("if has no script event function asset, warn", (function (param) {
                                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                              MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                            }));
                                      Wonder_jest.test("if has no unused script event function asset, warn", (function (param) {
                                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                              MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                              MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                              MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                            }));
                                      Wonder_jest.describe("show script event function group for add", (function (param) {
                                              return Wonder_jest.test("show all unused ones", (function (param) {
                                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                            var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                            var state = MainEditorScriptEventFunctionTool$WonderEditor.getUpdateState(MainEditorScriptEventFunctionTool$WonderEditor.buildState(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                    var param$1 = param;
                                                                    var param$2 = undefined;
                                                                    var param$3 = undefined;
                                                                    var param$4 = undefined;
                                                                    var param$5 = /* () */0;
                                                                    return MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(partial_arg, param$1, param$2, param$3, param$4, param$5);
                                                                  }));
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptEventFunctionComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("test remove script event function", (function (param) {
                                                    var _prepare = function (param) {
                                                      var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                      var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                      MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                      var eventFunctionName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                              return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                                                            }));
                                                      return /* tuple */[
                                                              script,
                                                              eventFunctionName
                                                            ];
                                                    };
                                                    Wonder_jest.test("remove from script", (function (param) {
                                                            var match = _prepare(/* () */0);
                                                            var eventFunctionName = match[1];
                                                            var script = match[0];
                                                            MainEditorScriptEventFunctionTool$WonderEditor.removeScriptEventFunction(script, eventFunctionName, undefined, undefined, /* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return ScriptEngineService$WonderEditor.hasScriptEventFunctionData(script, eventFunctionName, param);
                                                                                }))), false);
                                                          }));
                                                    return Wonder_jest.test("dispatch inspector", (function (param) {
                                                                  var match = _prepare(/* () */0);
                                                                  var dispatchFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                                  MainEditorScriptEventFunctionTool$WonderEditor.removeScriptEventFunction(match[0], match[1], undefined, dispatchFunc, /* () */0);
                                                                  var dispatchedAction = List.hd(Sinon.getArgs(Sinon.getCall(0, dispatchFunc)));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ReactTool$WonderEditor.getDispatchUpdateActionArr(dispatchedAction)), /* array */[/* Inspector */2]);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test change script event function", (function (param) {
                                            Wonder_jest.describe("show script event function group for change", (function (param) {
                                                    return Wonder_jest.test("should contain self and all unused ones", (function (param) {
                                                                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                  MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                                  var arg = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                              return MainEditorScriptTool$WonderEditor.getScriptAllEventFunctionNodeIds(script, param);
                                                                            })));
                                                                  var state = MainEditorScriptEventFunctionTool$WonderEditor.getUpdateState(MainEditorScriptEventFunctionTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                          return MainEditorScriptEventFunctionTool$WonderEditor.sendShowScriptEventFunctionGroupForChange(param, script, arg, undefined, undefined, /* () */0);
                                                                        }));
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptEventFunctionComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test change", (function (param) {
                                                          return Wonder_jest.test("script event function group should be sorted", (function (param) {
                                                                        var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                                        MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                                        var targetScriptEventFunctionNodeId = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                    return MainEditorScriptEventFunctionTool$WonderEditor.getUnUsedScriptEventFunctionNodeIds(script, param);
                                                                                  })));
                                                                        var arg = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                    return MainEditorScriptTool$WonderEditor.getScriptAllEventFunctionNodeIds(script, param);
                                                                                  })));
                                                                        MainEditorScriptEventFunctionTool$WonderEditor.getUpdateState(MainEditorScriptEventFunctionTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                                var param$1 = param;
                                                                                var param$2 = arg;
                                                                                var param$3 = targetScriptEventFunctionNodeId;
                                                                                var param$4 = undefined;
                                                                                var param$5 = undefined;
                                                                                var param$6 = /* () */0;
                                                                                return MainEditorScriptEventFunctionTool$WonderEditor.handleChangeScriptEventFunction(script, param$1, param$2, param$3, param$4, param$5, param$6);
                                                                              }));
                                                                        var state = MainEditorScriptEventFunctionTool$WonderEditor.getUpdateState(MainEditorScriptEventFunctionTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                                return MainEditorScriptEventFunctionTool$WonderEditor.sendShowScriptEventFunctionGroupForChange(param, script, targetScriptEventFunctionNodeId, undefined, undefined, /* () */0);
                                                                              }));
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptEventFunctionComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test script attribute", (function (param) {
                                    Wonder_jest.describe("test add script attribute", (function (param) {
                                            Wonder_jest.test("if has no script attribute asset, warn", (function (param) {
                                                    var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                    MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                                  }));
                                            Wonder_jest.test("if has no unused script attribute asset, warn", (function (param) {
                                                    var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                    MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                    MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                    MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                    MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                                  }));
                                            Wonder_jest.describe("show script attribute group for add", (function (param) {
                                                    return Wonder_jest.test("show all unused ones", (function (param) {
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                  var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                  var state = MainEditorScriptAttributeTool$WonderEditor.getUpdateState(MainEditorScriptAttributeTool$WonderEditor.buildState(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                          var param$1 = param;
                                                                          var param$2 = undefined;
                                                                          var param$3 = undefined;
                                                                          var param$4 = undefined;
                                                                          var param$5 = /* () */0;
                                                                          return MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(partial_arg, param$1, param$2, param$3, param$4, param$5);
                                                                        }));
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptAttributeComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test remove script attribute", (function (param) {
                                                          var _prepare = function (param) {
                                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                            MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                                  }));
                                                            return /* tuple */[
                                                                    script,
                                                                    attributeName
                                                                  ];
                                                          };
                                                          Wonder_jest.test("remove from script", (function (param) {
                                                                  var match = _prepare(/* () */0);
                                                                  var attributeName = match[1];
                                                                  var script = match[0];
                                                                  MainEditorScriptAttributeTool$WonderEditor.removeScriptAttribute(script, attributeName, undefined, undefined, /* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                        return ScriptEngineService$WonderEditor.hasScriptAttributeData(script, attributeName, param);
                                                                                      }))), false);
                                                                }));
                                                          return Wonder_jest.test("dispatch inspector", (function (param) {
                                                                        var match = _prepare(/* () */0);
                                                                        var dispatchFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                                        MainEditorScriptAttributeTool$WonderEditor.removeScriptAttribute(match[0], match[1], undefined, dispatchFunc, /* () */0);
                                                                        var dispatchedAction = List.hd(Sinon.getArgs(Sinon.getCall(0, dispatchFunc)));
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ReactTool$WonderEditor.getDispatchUpdateActionArr(dispatchedAction)), /* array */[/* Inspector */2]);
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test change script attribute", (function (param) {
                                            Wonder_jest.describe("show script attribute group for change", (function (param) {
                                                    return Wonder_jest.test("should contain self and all unused ones", (function (param) {
                                                                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                                  var arg = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                              return MainEditorScriptTool$WonderEditor.getScriptAllAttributeNodeIds(script, param);
                                                                            })));
                                                                  var state = MainEditorScriptAttributeTool$WonderEditor.getUpdateState(MainEditorScriptAttributeTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                          return MainEditorScriptAttributeTool$WonderEditor.sendShowScriptAttributeGroupForChange(param, script, arg, undefined, undefined, /* () */0);
                                                                        }));
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptAttributeComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test change", (function (param) {
                                                          return Wonder_jest.test("script attribute group should be sorted", (function (param) {
                                                                        var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                        MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                                        var targetScriptAttributeNodeId = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                    return MainEditorScriptTool$WonderEditor.getUnUsedScriptAttributeNodeIds(script, param);
                                                                                  })));
                                                                        var arg = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                    return MainEditorScriptTool$WonderEditor.getScriptAllAttributeNodeIds(script, param);
                                                                                  })));
                                                                        MainEditorScriptAttributeTool$WonderEditor.getUpdateState(MainEditorScriptAttributeTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                                var param$1 = param;
                                                                                var param$2 = arg;
                                                                                var param$3 = targetScriptAttributeNodeId;
                                                                                var param$4 = undefined;
                                                                                var param$5 = undefined;
                                                                                var param$6 = /* () */0;
                                                                                return MainEditorScriptAttributeTool$WonderEditor.handleChangeScriptAttributeForChange(script, param$1, param$2, param$3, param$4, param$5, param$6);
                                                                              }));
                                                                        var state = MainEditorScriptAttributeTool$WonderEditor.getUpdateState(MainEditorScriptAttributeTool$WonderEditor.buildState(script, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                                return MainEditorScriptAttributeTool$WonderEditor.sendShowScriptAttributeGroupForChange(param, script, targetScriptAttributeNodeId, undefined, undefined, /* () */0);
                                                                              }));
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.renderScriptAttributeComponent(sandbox, state, undefined, undefined, undefined, /* () */0));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test script attribute field", (function (param) {
                                                  Wonder_jest.describe("show attribute's fields", (function (param) {
                                                          Wonder_jest.test("test float type", (function (param) {
                                                                  ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptComponent(script, undefined, undefined, /* () */0));
                                                                }));
                                                          return Wonder_jest.test("test int type", (function (param) {
                                                                        var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                                        ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(match[1], /* tuple */[
                                                                              match[2],
                                                                              ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("int", 0)
                                                                            ]);
                                                                        var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptComponent(script, undefined, undefined, /* () */0));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test set field's defaultValue", (function (param) {
                                                                Wonder_jest.describe("test float type", (function (param) {
                                                                        var _prepare = function (param) {
                                                                          var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                                          var addedNodeId = match[1];
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var attributeName = ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, engineState);
                                                                          var attribute = ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, engineState);
                                                                          return /* tuple */[
                                                                                  addedNodeId,
                                                                                  match[0],
                                                                                  attributeName,
                                                                                  match[2],
                                                                                  attribute,
                                                                                  1.1,
                                                                                  engineState
                                                                                ];
                                                                        };
                                                                        var _prepareAndExec = function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var newDefaultValue = match[5];
                                                                          var attribute = match[4];
                                                                          var fieldName = match[3];
                                                                          var attributeName = match[2];
                                                                          var script = match[1];
                                                                          StateEngineService$WonderEditor.setState(match[6]);
                                                                          MainEditorScriptAttributeTool$WonderEditor.changeScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, newDefaultValue);
                                                                          return /* tuple */[
                                                                                  match[0],
                                                                                  script,
                                                                                  attributeName,
                                                                                  fieldName,
                                                                                  attribute,
                                                                                  newDefaultValue,
                                                                                  StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                                ];
                                                                        };
                                                                        Wonder_jest.test("update script->attribute->field->defaultValue", (function (param) {
                                                                                var match = _prepareAndExec(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(match[1], match[2], match[3], match[6])), ScriptAttributeFieldTool$WonderEditor.buildFloatValue(match[5]));
                                                                              }));
                                                                        Wonder_jest.test("shouldn't update script attribute asset->field->defaultValue", (function (param) {
                                                                                var match = _prepareAndExec(/* () */0);
                                                                                var fieldName = match[3];
                                                                                var addedNodeId = match[0];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ScriptAttributeInspectorTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(addedNodeId, fieldName, param);
                                                                                                    }))), ScriptAttributeFieldTool$WonderEditor.buildFloatValue(0));
                                                                              }));
                                                                        return Wonder_jest.test("test show attribute's fields", (function (param) {
                                                                                      var match = _prepareAndExec(/* () */0);
                                                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptComponent(match[1], undefined, undefined, /* () */0));
                                                                                    }));
                                                                      }));
                                                                return Wonder_jest.describe("test int type", (function (param) {
                                                                              var _prepare = function (param) {
                                                                                var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                                                var fieldName = match[2];
                                                                                var addedNodeId = match[1];
                                                                                ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                                                                                      fieldName,
                                                                                      ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("int", 0)
                                                                                    ]);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var attributeName = ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, engineState);
                                                                                var attribute = ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, engineState);
                                                                                return /* tuple */[
                                                                                        addedNodeId,
                                                                                        match[0],
                                                                                        attributeName,
                                                                                        fieldName,
                                                                                        attribute,
                                                                                        2,
                                                                                        engineState
                                                                                      ];
                                                                              };
                                                                              var _prepareAndExec = function (param) {
                                                                                var match = _prepare(/* () */0);
                                                                                var newDefaultValue = match[5];
                                                                                var attribute = match[4];
                                                                                var fieldName = match[3];
                                                                                var attributeName = match[2];
                                                                                var script = match[1];
                                                                                StateEngineService$WonderEditor.setState(match[6]);
                                                                                MainEditorScriptAttributeTool$WonderEditor.changeScriptAttributeFieldDefaultValueInt(script, attributeName, fieldName, attribute, newDefaultValue);
                                                                                return /* tuple */[
                                                                                        match[0],
                                                                                        script,
                                                                                        attributeName,
                                                                                        fieldName,
                                                                                        attribute,
                                                                                        newDefaultValue,
                                                                                        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                                      ];
                                                                              };
                                                                              return Wonder_jest.test("update script->attribute->field->defaultValue", (function (param) {
                                                                                            var match = _prepareAndExec(/* () */0);
                                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(match[1], match[2], match[3], match[6])), ScriptAttributeFieldTool$WonderEditor.buildIntValue(match[5]));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
