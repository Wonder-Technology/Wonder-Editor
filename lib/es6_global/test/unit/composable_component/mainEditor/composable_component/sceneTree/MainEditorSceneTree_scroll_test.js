

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneTreeNodeScrollUtils$WonderEditor from "../../../../../../src/core/atom_component/dragTree/component/treeNode/utils/SceneTreeNodeScrollUtils.js";
import * as MainEditorSceneTreeScrollTool$WonderEditor from "./tool/MainEditorSceneTreeScrollTool.js";

describe("MainEditorSceneTree scroll", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set x axis scroll value", (function () {
                describe("test x axis scroll left", (function () {
                        describe("if selected sceneTreeNode dom Beyond a certain range on the left of the parent container", (function () {
                                return Wonder_jest.test("set scroll left to be half of the sceneTree container dom offset width", (function () {
                                              var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(145, undefined, 230, undefined, /* () */0);
                                              var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(150, undefined, /* () */0);
                                              SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollLeft), 150 - 230 / 2);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test x axis scroll right", (function () {
                        describe("if selected sceneTreeNode dom Beyond a certain range on the right of the parent container", (function () {
                                return Wonder_jest.test("set scroll left to be the selected sceneTreeNode dom offset left - (the half of the sceneTree container dom offsetWidth)", (function () {
                                              var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(145, undefined, 230, undefined, /* () */0);
                                              var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(345, undefined, /* () */0);
                                              SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollLeft), 345 - 230 / 2);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test set y axis scroll value", (function () {
                describe("test y axis scroll top", (function () {
                        describe("if selected sceneTreeNode dom Beyond a certain range on the top of the parent container", (function () {
                                return Wonder_jest.test("set scroll top to be half of the sceneTree container dom offset height", (function () {
                                              var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(undefined, 545, undefined, 330, /* () */0);
                                              var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(undefined, 565, /* () */0);
                                              SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollTop), 565 - 330 / 2);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test y axis scroll bottom", (function () {
                        describe("if selected sceneTreeNode dom Beyond a certain range on the bottom of the parent container", (function () {
                                return Wonder_jest.test("set scroll top to be the selected sceneTreeNode dom offset top - (the half of the sceneTree container dom offsetHeight)", (function () {
                                              var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(undefined, 145, undefined, 330, /* () */0);
                                              var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(undefined, 445, /* () */0);
                                              SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollTop), 445 - 330 / 2);
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
