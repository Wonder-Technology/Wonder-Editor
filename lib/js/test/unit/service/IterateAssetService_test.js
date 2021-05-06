'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var NodeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/NodeAssetService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var TreeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/TreeAssetEditorService.js");
var IterateTreeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/IterateTreeAssetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetTreeTool.js");

Wonder_jest.describe("IterateAssetService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("findOne", (function (param) {
                      return Wonder_jest.test("find one matched node", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), (function (node) {
                                                              return NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(node), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData));
                                                            }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0))), true);
                                  }));
                    }));
      }));

/*  Not a pure module */
