'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLToolEngine$WonderEditor = require("../../../tool/engine/GLSLToolEngine.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../tool/engine/FakeGlToolEngine.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("header import package->test light", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                ImportPackageTool$WonderEditor.prepareLoad(sandbox);
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.testPromise("\n        create direction light gameObject g1 to scene tree;\n        export;\n        import;\n\n        should reInit default basicMaterial's and default lightMaterial's shader when import.\n        ", undefined, (function (param) {
                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                      var glShaderSource = gl.shaderSource;
                      var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(newGameObject);
                      MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                      var shaderSourceCountBeforeImport = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource) - shaderSourceCountBeforeImport | 0,
                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeImport + 1 | 0), "#define DIRECTION_LIGHTS_COUNT 1")
                                                      ]), /* tuple */[
                                                    2,
                                                    true
                                                  ]));
                                  }), undefined, undefined, undefined, undefined, /* () */0);
                    }));
      }));

/*  Not a pure module */
