

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AssetTreeUtils$WonderEditor from "../../../../../../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../../../../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorAssetTreeNodeTool$WonderEditor from "../../../../../../../../../integration/asset/tool/MainEditorAssetTreeNodeTool.js";

describe("AssetTreeUtils", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("isTreeNodeRelationError", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
                        return /* () */0;
                      }));
                Wonder_jest.test("if source and target node is the same node, return true", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                              return AssetTreeUtils$WonderEditor.isTreeNodeRelationError(true, 10, 10, param);
                                            }))), true);
                      }));
                describe("else", (function () {
                        Wonder_jest.test("if source node is target node's parent, return true", (function () {
                                var match = MainEditorAssetTreeTool$WonderEditor._increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
                                var rootId = match[0];
                                var match$1 = MainEditorAssetTreeTool$WonderEditor._increaseIndex(match[1]);
                                var id1 = match$1[0];
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                      /* nodeId */rootId,
                                      /* children : array */[],
                                      /* type_ : Folder */0,
                                      /* isShowChildren */true
                                    ], match$1[1]);
                                var editorState = StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                          /* nodeId */rootId,
                                          /* children : array */[/* record */[
                                              /* nodeId */id1,
                                              /* children : array */[],
                                              /* type_ : Texture */1,
                                              /* isShowChildren */true
                                            ]],
                                          /* type_ : Folder */0,
                                          /* isShowChildren */true
                                        ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id1, rootId, "texture1", MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState))));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeUtils$WonderEditor.isTreeNodeRelationError(true, id1, rootId, /* tuple */[
                                                    editorState,
                                                    engineState
                                                  ])), true);
                              }));
                        describe("else", (function () {
                                Wonder_jest.test("if target node is source node's parent, return true", (function () {
                                        var match = MainEditorAssetTreeTool$WonderEditor._increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
                                        var rootId = match[0];
                                        var match$1 = MainEditorAssetTreeTool$WonderEditor._increaseIndex(match[1]);
                                        var id1 = match$1[0];
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                              /* nodeId */rootId,
                                              /* children : array */[],
                                              /* type_ : Folder */0,
                                              /* isShowChildren */true
                                            ], match$1[1]);
                                        var editorState = StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                  /* nodeId */rootId,
                                                  /* children : array */[/* record */[
                                                      /* nodeId */id1,
                                                      /* children : array */[],
                                                      /* type_ : Texture */1,
                                                      /* isShowChildren */true
                                                    ]],
                                                  /* type_ : Folder */0,
                                                  /* isShowChildren */true
                                                ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id1, rootId, "texture1", MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState))));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeUtils$WonderEditor.isTreeNodeRelationError(true, rootId, id1, /* tuple */[
                                                            editorState,
                                                            engineState
                                                          ])), true);
                                      }));
                                return Wonder_jest.test("else if target node's children has the node which has the same name with source node, return true", (function () {
                                              var match = MainEditorAssetTreeTool$WonderEditor._increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
                                              var rootId = match[0];
                                              var match$1 = MainEditorAssetTreeTool$WonderEditor._increaseIndex(match[1]);
                                              var id1 = match$1[0];
                                              var match$2 = MainEditorAssetTreeTool$WonderEditor._increaseIndex(match$1[1]);
                                              var id2 = match$2[0];
                                              var match$3 = MainEditorAssetTreeTool$WonderEditor._increaseIndex(match$2[1]);
                                              var id3 = match$3[0];
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                    /* nodeId */rootId,
                                                    /* children : array */[],
                                                    /* type_ : Folder */0,
                                                    /* isShowChildren */true
                                                  ], match$3[1]);
                                              var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState);
                                              var editorState = StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                        /* nodeId */rootId,
                                                        /* children : array */[
                                                          /* record */[
                                                            /* nodeId */id1,
                                                            /* children : array */[/* record */[
                                                                /* nodeId */id3,
                                                                /* children : array */[],
                                                                /* type_ : Texture */1,
                                                                /* isShowChildren */true
                                                              ]],
                                                            /* type_ : Folder */0,
                                                            /* isShowChildren */true
                                                          ],
                                                          /* record */[
                                                            /* nodeId */id2,
                                                            /* children : array */[],
                                                            /* type_ : Texture */1,
                                                            /* isShowChildren */true
                                                          ]
                                                        ],
                                                        /* type_ : Folder */0,
                                                        /* isShowChildren */true
                                                      ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id3, id1, "texture2", TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                                /* nodeId */rootId,
                                                                /* children : array */[
                                                                  /* record */[
                                                                    /* nodeId */id1,
                                                                    /* children : array */[],
                                                                    /* type_ : Folder */0,
                                                                    /* isShowChildren */true
                                                                  ],
                                                                  /* record */[
                                                                    /* nodeId */id2,
                                                                    /* children : array */[],
                                                                    /* type_ : Texture */1,
                                                                    /* isShowChildren */true
                                                                  ]
                                                                ],
                                                                /* type_ : Folder */0,
                                                                /* isShowChildren */true
                                                              ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id2, rootId, "texture2", MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState))))));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeUtils$WonderEditor.isTreeNodeRelationError(true, id1, id2, /* tuple */[
                                                                  editorState,
                                                                  engineState
                                                                ])), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
