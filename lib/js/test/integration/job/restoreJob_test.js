'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var SceneViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var DeviceManagerEngineService$WonderEditor = require("../../../src/service/state/engine/DeviceManagerEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("restore job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"restore\" }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n{\"name\": \"restore\" }\n             ]\n             ", /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        var _updateView = function (param) {
          StateEditorService$WonderEditor.setState(GameViewEditorService$WonderEditor.updateViewRect(/* tuple */[
                    110,
                    20,
                    50,
                    200
                  ], SceneViewEditorService$WonderEditor.updateViewRect(/* tuple */[
                        10,
                        20,
                        100,
                        200
                      ], StateEditorService$WonderEditor.getState(/* () */0))));
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
        Wonder_jest.describe("set viewport", (function (param) {
                return Wonder_jest.test("restore to view", (function (param) {
                              _prepareState(/* () */0);
                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              var match = _updateView(/* () */0);
                              var match$1 = match[0];
                              StateLogicService$WonderEditor.getAndSetEngineState(DirectorToolEngine$WonderEditor.runWithDefaultTime);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          match$1[0],
                                          match$1[1],
                                          match$1[2] + match[1][2] | 0,
                                          match$1[3]
                                        ]);
                            }));
              }));
        return Wonder_jest.test("disable scissor test", (function (param) {
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

/*  Not a pure module */
