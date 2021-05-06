'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Result$WonderEditor = require("../../../src/module/Result.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetTreeTool.js");
var OperateTreeAssetLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js");

Wonder_jest.describe("OperateTreeAssetLogicService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("checkNodeRelation", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                            }));
                      return Wonder_jest.test("if target node is folder node, success", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                    var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                    var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Result$WonderEditor.RelationResult[/* isSuccess */3](StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                              return OperateTreeAssetLogicService$WonderEditor.checkNodeRelation(thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, param);
                                                            })))), true);
                                  }));
                    }));
      }));

/*  Not a pure module */
