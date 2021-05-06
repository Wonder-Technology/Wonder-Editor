'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var PickColorTool$WonderEditor = require("../../../../../../../../../tool/PickColorTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../../../unit/tool/EventListenerTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../../../tool/MainEditorSceneTool.js");
var BasicMaterialEngineService$WonderEditor = require("../../../../../../../../../../src/service/state/engine/BasicMaterialEngineService.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../../../tool/MainEditorBasicMaterialForGameObjectTool.js");

Wonder_jest.describe("MainEditorBasicMaterialForGameObject component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              return MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                            }));
                      return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, /* tuple */[
                                  GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicMaterial,
                                  MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeColor,
                                  BasicMaterialEngineService$WonderEditor.getColor
                                ]);
                    }));
      }));

/*  Not a pure module */
