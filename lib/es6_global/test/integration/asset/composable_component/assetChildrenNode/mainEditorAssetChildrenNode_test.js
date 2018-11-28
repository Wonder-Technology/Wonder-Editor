

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CamlinternalOO from "../../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Timeout$WonderEditor from "../../../../../src/core/external/Timeout.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

var class_tables = [
  0,
  0,
  0
];

var class_tables$1 = [
  0,
  0,
  0
];

var class_tables$2 = [
  0,
  0,
  0
];

var class_tables$3 = [
  0,
  0,
  0
];

var class_tables$4 = [
  0,
  0,
  0
];

var class_tables$5 = [
  0,
  0,
  0
];

var class_tables$6 = [
  0,
  0,
  0
];

describe("MainEditorAssetChildrenNode", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test set current node", (function () {
                Wonder_jest.test("click texture file to be current node", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                        var match = AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        match[/* currentNodeId */0],
                                        match[/* nodeType */1]
                                      ]), /* tuple */[
                                    MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureNodeId */14](assetTreeDomRecord),
                                    /* Texture */2
                                  ]);
                      }));
                Wonder_jest.test("click json file to be current node", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */10](assetTreeDomRecord));
                        var match = AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        match[/* currentNodeId */0],
                                        match[/* nodeType */1]
                                      ]), /* tuple */[
                                    MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonNodeId */16](assetTreeDomRecord),
                                    /* Json */1
                                  ]);
                      }));
                describe("test click folder", (function () {
                        describe("test single click", (function () {
                                Wonder_jest.testPromise("test set folder to be current node", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                        BuildComponentTool$WonderEditor.buildAssetChildrenNode(10);
                                        if (!class_tables$6[0]) {
                                          var $$class = CamlinternalOO.create_table(0);
                                          var env_init = function () {
                                            return CamlinternalOO.create_object_opt(0, $$class);
                                          };
                                          CamlinternalOO.init_class($$class);
                                          class_tables$6[0] = env_init;
                                        }
                                        Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$6[0], 0));
                                        return new Promise((function (resolve, _) {
                                                      return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                    if (!class_tables$5[0]) {
                                                                      var $$class = CamlinternalOO.create_table(0);
                                                                      var env_init = function () {
                                                                        return CamlinternalOO.create_object_opt(0, $$class);
                                                                      };
                                                                      CamlinternalOO.init_class($$class);
                                                                      class_tables$5[0] = env_init;
                                                                    }
                                                                    Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$5[0], 0));
                                                                    var match = AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0));
                                                                    return resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        match[/* currentNodeId */0],
                                                                                        match[/* nodeType */1]
                                                                                      ]), /* tuple */[
                                                                                    MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getSecondFolderNodeId */13](assetTreeDomRecord),
                                                                                    /* Folder */0
                                                                                  ]));
                                                                  }), 20);
                                                    }));
                                      }));
                                return Wonder_jest.testPromise("test snapshot", (function () {
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                              BuildComponentTool$WonderEditor.buildAssetChildrenNode(10);
                                              if (!class_tables$4[0]) {
                                                var $$class = CamlinternalOO.create_table(0);
                                                var env_init = function () {
                                                  return CamlinternalOO.create_object_opt(0, $$class);
                                                };
                                                CamlinternalOO.init_class($$class);
                                                class_tables$4[0] = env_init;
                                              }
                                              Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$4[0], 0));
                                              return new Promise((function (resolve, _) {
                                                            return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                          if (!class_tables$3[0]) {
                                                                            var $$class = CamlinternalOO.create_table(0);
                                                                            var env_init = function () {
                                                                              return CamlinternalOO.create_object_opt(0, $$class);
                                                                            };
                                                                            CamlinternalOO.init_class($$class);
                                                                            class_tables$3[0] = env_init;
                                                                          }
                                                                          Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$3[0], 0));
                                                                          return resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                        }), 20);
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.testPromise("double click folder, set folder to be currentAssetNodeParent and currentNode(are the same)", (function () {
                                      MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                      var fakeDom = Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                      BuildComponentTool$WonderEditor.buildAssetChildrenNode(10);
                                      if (!class_tables$2[0]) {
                                        var $$class = CamlinternalOO.create_table(0);
                                        var env_init = function () {
                                          return CamlinternalOO.create_object_opt(0, $$class);
                                        };
                                        CamlinternalOO.init_class($$class);
                                        class_tables$2[0] = env_init;
                                      }
                                      Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$2[0], 0));
                                      return new Promise((function (resolve, _) {
                                                    return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                  if (!class_tables$1[0]) {
                                                                    var $$class = CamlinternalOO.create_table(0);
                                                                    var env_init = function () {
                                                                      return CamlinternalOO.create_object_opt(0, $$class);
                                                                    };
                                                                    CamlinternalOO.init_class($$class);
                                                                    class_tables$1[0] = env_init;
                                                                  }
                                                                  Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables$1[0], 0));
                                                                  return Curry._2(Timeout$WonderEditor.$$setTimeout, (function () {
                                                                                if (!class_tables[0]) {
                                                                                  var $$class = CamlinternalOO.create_table(0);
                                                                                  var env_init = function () {
                                                                                    return CamlinternalOO.create_object_opt(0, $$class);
                                                                                  };
                                                                                  CamlinternalOO.init_class($$class);
                                                                                  class_tables[0] = env_init;
                                                                                }
                                                                                Curry._3(EventListenerTool$WonderEditor.triggerEvent, fakeDom, "mousedown", Curry._1(class_tables[0], 0));
                                                                                var currentNodeId = MainEditorAssetNodeTool$WonderEditor.getCurrentNodeId(/* () */0);
                                                                                var currentNodeParentId = StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeParentIdEditorService$WonderEditor.unsafeGetCurrentNodeParentId);
                                                                                return resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](currentNodeId), currentNodeParentId));
                                                                              }), 20);
                                                                }), 5);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
