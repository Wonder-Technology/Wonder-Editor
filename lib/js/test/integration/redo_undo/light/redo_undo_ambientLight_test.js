'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var PickColorTool$WonderEditor = require("../../../tool/PickColorTool.js");
var BuildCanvasTool$WonderEditor = require("../../../tool/BuildCanvasTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var HeaderSettingTool$WonderEditor = require("../../../unit/composable_component/header/tool/HeaderSettingTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("redo_undo: ambientLight", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColorAndPushUndoStack = function (value) {
          var sourceColor = Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Ambient */0][/* getColor */0], /* () */0);
          Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Ambient */0][/* changeColor */1], value);
          return Curry._4(HeaderSettingTool$WonderEditor.Scene[/* Ambient */0][/* closeColorPicker */2], sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeAmbientLight = function (param) {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(color1);
          return _changeColorAndPushUndoStack(color2);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n               [\n           {\n             \"name\": \"default\",\n             \"jobs\": [\n               {\n                 \"name\": \"init_transform_gizmos\"\n               }\n             ]\n           }\n         ]\n               ", undefined, undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.prepareGl(sandbox);
                StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeAmbientLight,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], (function (param) {
                      return HeaderSettingTool$WonderEditor.UI[/* buildSetting */0](undefined, undefined, undefined, true, undefined, undefined, /* () */0);
                    }));
      }));

/*  Not a pure module */
