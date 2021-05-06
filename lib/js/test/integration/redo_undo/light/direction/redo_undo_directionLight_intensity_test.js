'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../../tool/BuildComponentForCurryTool.js");
var DirectionLightEngineService$WonderEditor = require("../../../../../src/service/state/engine/DirectionLightEngineService.js");
var MainEditorDirectionLightTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js");

Wonder_jest.describe("redo_undo: directionLight intensity", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeIntensity = function (value) {
          var light = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0);
          return MainEditorDirectionLightTool$WonderEditor.changeIntensityAndBlur(light, DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(light, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), value, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeIntensity = function (param) {
          _changeIntensity(10.1);
          return _changeIntensity(12.12);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeIntensity,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildDirectionLight);
      }));

/*  Not a pure module */
