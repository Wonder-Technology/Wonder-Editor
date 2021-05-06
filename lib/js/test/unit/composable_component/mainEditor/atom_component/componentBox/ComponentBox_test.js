'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var React = require("react");
var Sinon$1 = require("sinon");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestRenderer = require("react-test-renderer");
var AppStore$WonderEditor = require("../../../../../../src/core/ui/store/AppStore.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var DomHelper$WonderEditor = require("../../../../../../src/core/external/DomHelper.js");
var SinonTool$WonderEditor = require("../../../../../tool/SinonTool.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var ArrayService$WonderEditor = require("../../../../../../src/service/atom/ArrayService.js");
var ComponentBox$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/componentBox/ui/ComponentBox.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");

Wonder_jest.describe("componentBox", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildComponentBoxComponent = function (header, type_, isDisposable, gameObject) {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, ComponentBox$WonderEditor.make(/* tuple */[
                              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
                              TestTool$WonderEditor.getDispatch(/* () */0)
                            ], header, isDisposable, gameObject, React.createElement("div", undefined, DomHelper$WonderEditor.textEl("simulate div component")), true, type_, undefined, /* array */[])));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test component arguments", (function (param) {
                Wonder_jest.test("build componentBox component which can't be disposed should has no 'x'", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newCube", /* Transform */0, false, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                      }));
                return Wonder_jest.test("build disposable componentBox component should has 'x'", (function (param) {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newCube", /* Transform */0, true, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                            }));
              }));
        return Wonder_jest.describe("test show component workflow", (function (param) {
                      return Wonder_jest.describe("test click triangle once to hide the common type component", (function (param) {
                                    return Wonder_jest.test("test click close first box transform component, the component should be close", (function (param) {
                                                  var dispatchFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                  ComponentBox$WonderEditor.reducer(/* tuple */[
                                                          TestTool$WonderEditor.buildEmptyAppState(/* () */0),
                                                          dispatchFunc
                                                        ], /* Transform */0, /* ToggleShowComponent */0)(/* record */[
                                                        /* isShowComponent */true,
                                                        /* triangleDirection */""
                                                      ]);
                                                  var dispatchedAction = List.hd(Sinon.getArgs(Sinon.getCall(0, dispatchFunc)));
                                                  if (dispatchedAction[0] === AppStore$WonderEditor.InspectorAction) {
                                                    var action = dispatchedAction[1];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    action[0],
                                                                    action[1]
                                                                  ]), /* tuple */[
                                                                /* Transform */0,
                                                                false
                                                              ]);
                                                  } else {
                                                    throw [
                                                          Caml_builtin_exceptions.match_failure,
                                                          /* tuple */[
                                                            "ComponentBox_test.re",
                                                            95,
                                                            12
                                                          ]
                                                        ];
                                                  }
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
