

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../../../asset/tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetFolderNodeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("folder inspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test rename", (function () {
                return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function () {
                              var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var addedFolderNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var folder1Name = StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId1, param);
                                    }));
                              var folder2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId2, param);
                                    }));
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */4](undefined, undefined, addedFolderNodeId2, folder1Name, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                                      return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId1, param);
                                                    })),
                                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                                      return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId2, param);
                                                    }))
                                            ]), /* tuple */[
                                          folder1Name,
                                          folder2OldName
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
