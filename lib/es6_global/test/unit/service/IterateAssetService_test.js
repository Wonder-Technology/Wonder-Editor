

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as NodeAssetService$WonderEditor from "../../../src/service/record/editor/asset/NodeAssetService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as TreeAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../src/service/record/editor/asset/IterateTreeAssetService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../integration/asset/tool/MainEditorAssetTreeTool.js";

describe("IterateAssetService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("findOne", (function () {
                return Wonder_jest.test("find one matched node", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), (function (node) {
                                                        return NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(node), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData));
                                                      }), undefined, undefined, undefined, /* () */0))), true);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
