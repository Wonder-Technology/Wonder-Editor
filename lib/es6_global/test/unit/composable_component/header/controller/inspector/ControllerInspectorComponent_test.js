

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as HeaderTool$WonderEditor from "../../tool/HeaderTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as ComponentDomTool$WonderEditor from "../../../../../tool/domIndex/ComponentDomTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../../../integration/inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../../../tool/OperateComponentEventTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("controller inspector component", (function () {
        var addCameraGroupInBoxWithOneComponent = function () {
          var boxComponentCount = ComponentDomTool$WonderEditor.getBoxComponentCount(/* () */0) + 1 | 0;
          var cameraCategoryDomIndex = ComponentDomTool$WonderEditor.getCameraCategoryDomIndex(/* () */0);
          var cameraGroupTypeDomIndex = ComponentDomTool$WonderEditor.getCameraGroupTypeDomIndex(/* () */0);
          return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(boxComponentCount, cameraCategoryDomIndex, cameraGroupTypeDomIndex);
        };
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                      }));
                return Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test add component", (function () {
                describe("test add component in edit and run engine", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                              }));
                        describe("test add arcballCameraController", (function () {
                                Wonder_jest.test("test is run, add arcballCameraController in box, and the box haven't cameraGroup, the box shouldn't bind event", (function () {
                                        ControllerTool$WonderEditor.run(/* () */0);
                                        MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode(/* () */0);
                                        AddableComponentTool$WonderEditor.addArcballCameraInBox(/* () */0);
                                        var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                        var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                        var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), editEngineState), editEngineState),
                                                        ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentSceneTreeNode, runEngineState), runEngineState)
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("test is run, add arcballCameraController in active camera, the active camera should bind event", (function () {
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
                                              var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                              var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), editEngineState), editEngineState),
                                                              ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentSceneTreeNode, runEngineState), runEngineState)
                                                            ]), /* tuple */[
                                                          false,
                                                          true
                                                        ]);
                                            }));
                              }));
                        describe("test add cameraGroup", (function () {
                                return Wonder_jest.test("test is run, if the currentGameObject has arcballCameraController, add cameraGroup should bind event", (function () {
                                              HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                              SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                              AddableComponentTool$WonderEditor.addArcballCameraInBox(/* () */0);
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              addCameraGroupInBoxWithOneComponent(/* () */0);
                                              var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                              var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), editEngineState), editEngineState),
                                                              ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentSceneTreeNode, runEngineState), runEngineState)
                                                            ]), /* tuple */[
                                                          false,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test remove component", (function () {
                describe("test remove arcballCameraController", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                              }));
                        return Wonder_jest.test("test is run, remove currentGameObject arcballCameraController, the gameObject shouldn't bind event", (function () {
                                      AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */10](/* () */0));
                                      var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                      var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                      var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), editEngineState),
                                                      GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(currentSceneTreeNode, runEngineState)
                                                    ]), /* tuple */[
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                describe("test remove cameraGroup", (function () {
                        return Wonder_jest.test("test click run, remove active cameraGroup will unbind event if it has arcballCameraController, set last cameraGroup to be active, and bind event if has arcballCameraController", (function () {
                                      var match = AddableComponentTool$WonderEditor.getTwoAddedArcballCameraControllerCamera(sandbox);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getCameraGroupFromCamera */9](/* () */0));
                                      var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[0], runEngineState), runEngineState),
                                                      ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[1], runEngineState), runEngineState)
                                                    ]), /* tuple */[
                                                  true,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
