

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Result$WonderEditor from "../../../src/module/Result.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as RenameNodeAssetLogicService$WonderEditor from "../../../src/service/stateTuple/logic/asset/RenameNodeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

describe("RenameNodeAssetLogicService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("renameNode", (function () {
                Wonder_jest.test("test1", (function () {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                        var result = RenameNodeAssetLogicService$WonderEditor.renameNode(textureNodeId, "zzz", /* tuple */[
                              editorState,
                              engineState
                            ]);
                        var match = Result$WonderEditor.SameDataResult[/* getData */3](result);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NodeNameAssetLogicService$WonderEditor.getNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(textureNodeId, match[0]), match[1])), "zzz");
                      }));
                return Wonder_jest.test("test2", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                              var result = RenameNodeAssetLogicService$WonderEditor.renameNode(nodeId, "zzz", /* tuple */[
                                    editorState,
                                    engineState
                                  ]);
                              var match = Result$WonderEditor.SameDataResult[/* getData */3](result);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NodeNameAssetLogicService$WonderEditor.getNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, match[0]), match[1])), "zzz");
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
