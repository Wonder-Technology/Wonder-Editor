'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var BuildCanvasTool$WonderEditor = require("../../../../tool/BuildCanvasTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../../../tool/engine/DirectorToolEngine.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../../tool/BuildComponentForCurryTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MainEditorDirectionLightTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js");

Wonder_jest.describe("redo_undo: directionLight color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColor = function (color) {
          var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0);
          var sourceColor = MainEditorDirectionLightTool$WonderEditor.getColor(currentGameObjectDirectionLightComponent);
          MainEditorDirectionLightTool$WonderEditor.changeColor(currentGameObjectDirectionLightComponent, color);
          return MainEditorDirectionLightTool$WonderEditor.closeColorPicker(currentGameObjectDirectionLightComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function (param) {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var color1 = {
            hex: "#7df1e8",
            rgb: {
              r: 125,
              g: 241,
              b: 232
            }
          };
          var color2 = {
            hex: "#1918e8",
            rgb: {
              r: 25,
              g: 24,
              b: 232
            }
          };
          _changeColor(color1);
          return _changeColor(color2);
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
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildDirectionLight);
      }));

/*  Not a pure module */
