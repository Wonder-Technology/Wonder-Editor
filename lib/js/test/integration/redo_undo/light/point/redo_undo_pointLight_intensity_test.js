'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorLightTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/light/tool/MainEditorLightTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var PointLightEngineService$WonderEditor = require("../../../../../src/service/state/engine/PointLightEngineService.js");
var MainEditorPointLightTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../../tool/BuildComponentForCurryTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("redo_undo: pointLight intensity", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeIntensity = function (value) {
          var light = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
          return MainEditorPointLightTool$WonderEditor.changeIntensityAndBlur(light, PointLightEngineService$WonderEditor.getPointLightIntensity(light, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), value, /* () */0);
        };
        var _simulateTwiceChangeIntensity = function (param) {
          MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
          _changeIntensity(10.1);
          return _changeIntensity(12.12);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                }));
          return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
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
                  ], BuildComponentForCurryTool$WonderEditor.buildPointLight);
      }));

/*  Not a pure module */
