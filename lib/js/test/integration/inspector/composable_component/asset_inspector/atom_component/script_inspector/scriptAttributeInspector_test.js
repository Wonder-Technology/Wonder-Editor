'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SinonTool$WonderEditor = require("../../../../../../tool/SinonTool.js");
var ArrayService$WonderEditor = require("../../../../../../../src/service/atom/ArrayService.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var ScriptToolEngine$WonderEditor = require("../../../../../../tool/engine/ScriptToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptAttributeFieldTool$WonderEditor = require("../../../sceneTree_inspector/script/tool/ScriptAttributeFieldTool.js");
var ScriptAttributeInspectorTool$WonderEditor = require("./tool/ScriptAttributeInspectorTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../../sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var ScriptAttributeNodeNameAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/ScriptAttributeNodeNameAssetService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("script attribute inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test snapshot", (function (param) {
                return Wonder_jest.test("test add one field", (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                              ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(addedNodeId, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  })), Caml_option.some(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                        return ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, param);
                                                      }))), undefined, undefined, undefined, /* () */0));
                            }));
              }));
        Wonder_jest.describe("test add field", (function (param) {
                Wonder_jest.test("test add two field", (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                            })).length), 2);
                      }));
                return Wonder_jest.describe("test update script attribute in all script components", (function (param) {
                              beforeEach((function () {
                                      return ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                    }));
                              return Wonder_jest.test("test update one script component", (function (param) {
                                            var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                            var addedNodeId = match[1];
                                            var script = match[0];
                                            ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  }));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return ScriptToolEngine$WonderEditor.getScriptAttributeEntries(script, attributeName, param);
                                                                })).length), 2);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test set field data", (function (param) {
                Wonder_jest.test("test change field type from int to float", (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                  })));
                        ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                              match[0],
                              ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("float", 0.1)
                            ]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                })))), /* tuple */[
                                    ScriptAttributeNodeNameAssetService$WonderEditor.getNewFieldName(/* () */0),
                                    ScriptAttributeInspectorTool$WonderEditor.buildField(/* Float */1, 0.1)
                                  ]);
                      }));
                return Wonder_jest.describe("test update script attribute in all script components", (function (param) {
                              beforeEach((function () {
                                      return ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                    }));
                              Wonder_jest.test("if only change field default value, not update", (function (param) {
                                      var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                      var fieldName = match[2];
                                      var addedNodeId = match[1];
                                      var script = match[0];
                                      ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                                            fieldName,
                                            ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj(ScriptAttributeInspectorTool$WonderEditor.getDefaultFieldType(/* () */0), 0.1)
                                          ]);
                                      var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                            }));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(script, attributeName, fieldName, param);
                                                          }))), ScriptAttributeInspectorTool$WonderEditor.getDefaultFieldDefaultValue(/* () */0));
                                    }));
                              return Wonder_jest.describe("if change field type, update", (function (param) {
                                            Wonder_jest.test("test update one script component", (function (param) {
                                                    var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                    var fieldName = match[2];
                                                    var addedNodeId = match[1];
                                                    var script = match[0];
                                                    ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                                                          fieldName,
                                                          ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("int", 0)
                                                        ]);
                                                    var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                          }));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return ScriptAttributeFieldTool$WonderEditor.getScriptAttributeFieldType(script, attributeName, fieldName, param);
                                                                        }))), /* Int */0);
                                                  }));
                                            return Wonder_jest.test("test update two script components", (function (param) {
                                                          var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForTwoScriptComponents */3](sandbox);
                                                          var fieldName = match[2];
                                                          var addedNodeId = match[1];
                                                          var match$1 = match[0];
                                                          var script2 = match$1[1];
                                                          var script1 = match$1[0];
                                                          ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                                                                fieldName,
                                                                ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("int", 0)
                                                              ]);
                                                          var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                                }));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return ScriptAttributeFieldTool$WonderEditor.getScriptAttributeFieldType(script1, attributeName, fieldName, param);
                                                                                })),
                                                                          StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return ScriptAttributeFieldTool$WonderEditor.getScriptAttributeFieldType(script2, attributeName, fieldName, param);
                                                                                }))
                                                                        ]), /* tuple */[
                                                                      /* Int */0,
                                                                      /* Int */0
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test remove field", (function (param) {
                Wonder_jest.test("test remove one field", (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                  })));
                        ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByRemoveFieldData(sandbox, addedNodeId, match[0], undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                            })).length), 1);
                      }));
                return Wonder_jest.describe("test update script attribute in all script components", (function (param) {
                              beforeEach((function () {
                                      return ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                    }));
                              return Wonder_jest.test("test update one script component", (function (param) {
                                            var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                            var addedNodeId = match[1];
                                            var script = match[0];
                                            ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByRemoveFieldData(sandbox, addedNodeId, match[2], undefined, /* () */0);
                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  }));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return ScriptToolEngine$WonderEditor.getScriptAttributeEntries(script, attributeName, param);
                                                                })).length), 0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test rename field", (function (param) {
                var _prepare = function (sandbox) {
                  var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                  ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                  var entries = StateLogicService$WonderEditor.getEditorState((function (param) {
                          return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                        }));
                  var match = ArrayService$WonderEditor.unsafeGetFirst(entries);
                  var match$1 = ArrayService$WonderEditor.unsafeGetNth(1, entries);
                  return /* tuple */[
                          addedNodeId,
                          match[0],
                          match$1[0],
                          warn
                        ];
                };
                Wonder_jest.test("if name not change, shouldn't warn", (function (param) {
                        var match = _prepare(sandbox);
                        var field1Name = match[1];
                        ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, match[0], field1Name, field1Name, undefined, /* () */0);
                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[3])));
                      }));
                Wonder_jest.describe("if rename to the existed field name of the attribute", (function (param) {
                        Wonder_jest.test("if rename to the existed field name of the attribute, should fail", (function (param) {
                                var match = _prepare(sandbox);
                                ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, match[0], match[1], match[2], undefined, /* () */0);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[3]));
                              }));
                        return Wonder_jest.test("if rename to the existed field name of the attribute, should send", (function (param) {
                                      var match = _prepare(sandbox);
                                      var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                      ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, match[0], match[1], match[2], send, /* () */0);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](send));
                                    }));
                      }));
                Wonder_jest.test("sort attribute entries by field name", (function (param) {
                        var match = _prepare(sandbox);
                        var addedNodeId = match[0];
                        ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, addedNodeId, match[1], "zzz", undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(addedNodeId, StateLogicService$WonderEditor.getEditorState((function (param) {
                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                            })), Caml_option.some(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, param);
                                                }))), undefined, undefined, undefined, /* () */0));
                      }));
                return Wonder_jest.describe("test update script attribute in all script components", (function (param) {
                              return Wonder_jest.test("test update one script component", (function (param) {
                                            ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                            var match = _prepare(sandbox);
                                            var addedNodeId = match[0];
                                            MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            var newName = "zzz";
                                            ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, addedNodeId, match[1], newName, undefined, /* () */0);
                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  }));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ScriptToolEngine$WonderEditor.getScriptAttributeFieldNames(script, attributeName, param);
                                                                  })).sort()), /* array */[
                                                          newName,
                                                          match[2]
                                                        ].sort());
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test rename attribute", (function (param) {
                      return Wonder_jest.describe("test update script attribute in all script components", (function (param) {
                                    beforeEach((function () {
                                            return ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                          }));
                                    return Wonder_jest.test("test update one script component", (function (param) {
                                                  var match = ScriptAttributeInspectorTool$WonderEditor.TestUpdateScriptAttributeInAllScriptComponents[/* prepareForOneScriptComponent */2](sandbox);
                                                  var script = match[0];
                                                  var newAttributeName = "zzz";
                                                  AssetInspectorTool$WonderEditor.Rename[/* renameAssetScriptAttributeNode */2](undefined, undefined, match[1], newAttributeName, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return ScriptToolEngine$WonderEditor.getScriptAttributeEntries(script, newAttributeName, param);
                                                                      })).length), 1);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
