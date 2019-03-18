

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../src/service/state/engine/DeviceManagerEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("restore job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"restore\" }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n{\"name\": \"restore\" }\n             ]\n             ", /* () */0), undefined, undefined, false, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        var _updateView = function () {
          StateEditorService$WonderEditor.setState(GameViewEditorService$WonderEditor.updateViewRect(110, 20, 50, 200, SceneViewEditorService$WonderEditor.updateViewRect(10, 20, 100, 200, StateEditorService$WonderEditor.getState(/* () */0))));
          return /* tuple */[
                  /* tuple */[
                    10,
                    20,
                    100,
                    200
                  ],
                  /* tuple */[
                    110,
                    20,
                    50,
                    200
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("set viewport", (function () {
                return Wonder_jest.test("restore to view", (function () {
                              _prepareState(/* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              var match = _updateView(/* () */0);
                              var match$1 = match[0];
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          match$1[0],
                                          match$1[1],
                                          match$1[2] + match[1][2] | 0,
                                          match$1[3]
                                        ]);
                            }));
              }));
        return Wonder_jest.test("disable scissor test", (function () {
                      _prepareState(/* () */0);
                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                      _updateView(/* () */0);
                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                              return DeviceManagerEngineService$WonderEditor.setScissorTest(true, param);
                            }));
                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                      var disable = gl.disable;
                      FakeGlToolEngine$WonderEditor.setScissorTest(3, gl);
                      StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(3, disable)));
                    }));
      }));

export {
  
}
/*  Not a pure module */
