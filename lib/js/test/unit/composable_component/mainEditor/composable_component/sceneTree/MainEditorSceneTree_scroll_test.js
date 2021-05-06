'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneTreeNodeScrollUtils$WonderEditor = require("../../../../../../src/core/atom_component/dragTree/component/treeNode/utils/SceneTreeNodeScrollUtils.js");
var MainEditorSceneTreeScrollTool$WonderEditor = require("./tool/MainEditorSceneTreeScrollTool.js");

Wonder_jest.describe("MainEditorSceneTree scroll", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test set x axis scroll value", (function (param) {
                Wonder_jest.describe("test x axis scroll left", (function (param) {
                        return Wonder_jest.describe("if selected sceneTreeNode dom Beyond a certain range on the left of the parent container", (function (param) {
                                      return Wonder_jest.test("set scroll left to be half of the sceneTree container dom offset width", (function (param) {
                                                    var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(145, undefined, 230, undefined, /* () */0);
                                                    var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(150, undefined, /* () */0);
                                                    SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollLeft), 150 - 230 / 2);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test x axis scroll right", (function (param) {
                              return Wonder_jest.describe("if selected sceneTreeNode dom Beyond a certain range on the right of the parent container", (function (param) {
                                            return Wonder_jest.test("set scroll left to be the selected sceneTreeNode dom offset left - (the half of the sceneTree container dom offsetWidth)", (function (param) {
                                                          var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(145, undefined, 230, undefined, /* () */0);
                                                          var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(345, undefined, /* () */0);
                                                          SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollLeft), 345 - 230 / 2);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test set y axis scroll value", (function (param) {
                      Wonder_jest.describe("test y axis scroll top", (function (param) {
                              return Wonder_jest.describe("if selected sceneTreeNode dom Beyond a certain range on the top of the parent container", (function (param) {
                                            return Wonder_jest.test("set scroll top to be half of the sceneTree container dom offset height", (function (param) {
                                                          var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(undefined, 545, undefined, 330, /* () */0);
                                                          var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(undefined, 565, /* () */0);
                                                          SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollTop), 565 - 330 / 2);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test y axis scroll bottom", (function (param) {
                                    return Wonder_jest.describe("if selected sceneTreeNode dom Beyond a certain range on the bottom of the parent container", (function (param) {
                                                  return Wonder_jest.test("set scroll top to be the selected sceneTreeNode dom offset top - (the half of the sceneTree container dom offsetHeight)", (function (param) {
                                                                var sceneTreeContainerJsObj = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeContainerJsObj(undefined, 145, undefined, 330, /* () */0);
                                                                var sceneTreeNodeDomClientRect = MainEditorSceneTreeScrollTool$WonderEditor.buildSceneTreeNodeDomClientRect(undefined, 445, /* () */0);
                                                                SceneTreeNodeScrollUtils$WonderEditor.scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sceneTreeContainerJsObj.scrollTop), 445 - 330 / 2);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
