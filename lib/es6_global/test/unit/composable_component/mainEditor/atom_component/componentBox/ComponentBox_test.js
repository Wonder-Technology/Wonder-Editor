

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as React from "react";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as DomHelper$WonderEditor from "../../../../../../src/core/external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../src/service/atom/ArrayService.js";
import * as ComponentBox$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/atom_component/componentBox/ui/ComponentBox.js";
import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("componentBox", (function () {
        var _buildComponentBoxComponent = function (header, type_, isDisposable, gameObject) {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, ComponentBox$WonderEditor.make(/* tuple */[
                              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
                              TestTool$WonderEditor.getDispatch(/* () */0)
                            ], header, isDisposable, gameObject, React.createElement("div", undefined, DomHelper$WonderEditor.textEl("simulate div component")), true, type_, /* array */[])));
        };
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test component arguments", (function () {
                Wonder_jest.test("build componentBox component which can't be disposed should has no 'x'", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newBox", /* Transform */0, false, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                      }));
                return Wonder_jest.test("build disposable componentBox component should has 'x'", (function () {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(_buildComponentBoxComponent("newBox", /* Transform */0, true, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)));
                            }));
              }));
        describe("test show component workflow", (function () {
                var _triggerClickTransformTriangle = function (domChildren) {
                  var inspector = ArrayService$WonderEditor.unsafeGetNth(0, domChildren);
                  var array = inspector.children;
                  var transformArcticle = ArrayService$WonderEditor.unsafeGetNth(1, array);
                  var array$1 = transformArcticle.children;
                  var headerDiv = ArrayService$WonderEditor.unsafeGetNth(0, array$1);
                  var array$2 = headerDiv.children;
                  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.unsafeGetNth(0, array$2));
                };
                describe("test click triangle once to hide the common type component", (function () {
                        Wonder_jest.test("test click close first box transform component, the component should be close", (function () {
                                var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickTransformTriangle);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphAndInspectorState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        return Wonder_jest.test("test the other gameObject transform component should be close", (function () {
                                      var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickTransformTriangle);
                                      MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphAndInspectorState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
