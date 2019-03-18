

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as GLSLToolEngine$WonderEditor from "../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as ImportPackageTool$WonderEditor from "./tool/ImportPackageTool.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("header import package->test light", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                Curry._1(LoadTool$WonderEditor.buildFakeAtob, /* () */0);
                Curry._1(LoadTool$WonderEditor.buildFakeBtoa, /* () */0);
                Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                Curry._1(LoadTool$WonderEditor.buildFakeLoadImage, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.testPromise("\n        create direction light gameObject g1 to scene tree;\n        export;\n        import;\n\n        should reInit default basicMaterial's and default lightMaterial's shader when import.\n        ", (function () {
                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                      var glShaderSource = gl.shaderSource;
                      var newGameObject = GameObjectTool$WonderEditor.getNewGameObjectUid(undefined, /* () */0);
                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(newGameObject);
                      MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                      var shaderSourceCountBeforeImport = GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource);
                      return ImportPackageTool$WonderEditor.testImportPackage((function () {
                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        GLSLToolEngine$WonderEditor.getShaderSourceCallCount(glShaderSource) - shaderSourceCountBeforeImport | 0,
                                                        GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSourceByCount(glShaderSource, shaderSourceCountBeforeImport + 1 | 0), "#define DIRECTION_LIGHTS_COUNT 1")
                                                      ]), /* tuple */[
                                                    2,
                                                    true
                                                  ]));
                                  }), undefined, undefined, undefined, undefined, /* () */0);
                    }));
      }));

export {
  
}
/*  Not a pure module */
