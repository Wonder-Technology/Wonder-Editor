

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Result$WonderEditor from "../../../src/module/Result.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";

describe("OperateTreeAssetLogicService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("checkNodeRelation", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                return Wonder_jest.test("if target node is folder node, success", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                              var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                              var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Result$WonderEditor.RelationResult[/* isSuccess */2](StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                        return OperateTreeAssetLogicService$WonderEditor.checkNodeRelation(thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, param);
                                                      })))), true);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
