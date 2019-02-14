

import * as List from "../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as React from "react";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as AppStore$WonderEditor from "../../../../../../src/core/ui/store/AppStore.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as DomHelper$WonderEditor from "../../../../../../src/core/external/DomHelper.js";
import * as Caml_builtin_exceptions from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderEditor from "../../../../../../src/service/atom/ArrayService.js";
import * as ComponentBox$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/componentBox/ui/ComponentBox.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("componentBox", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildComponentBoxComponent = function (header, type_, isDisposable, gameObject) {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, ComponentBox$WonderEditor.make(/* tuple */[
                              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
                              TestTool$WonderEditor.getDispatch(/* () */0)
                            ], header, isDisposable, gameObject, React.createElement("div", undefined, DomHelper$WonderEditor.textEl("simulate div component")), true, type_, /* array */[])));
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
        describe("test component arguments", (function () {
                Wonder_jest.test("build componentBox component which can't be disposed should has no 'x'", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newCube", /* Transform */0, false, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                      }));
                return Wonder_jest.test("build disposable componentBox component should has 'x'", (function () {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newCube", /* Transform */0, true, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                            }));
              }));
        describe("test show component workflow", (function () {
                describe("test click triangle once to hide the common type component", (function () {
                        return Wonder_jest.test("test click close first box transform component, the component should be close", (function () {
                                      var dispatchFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
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
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
