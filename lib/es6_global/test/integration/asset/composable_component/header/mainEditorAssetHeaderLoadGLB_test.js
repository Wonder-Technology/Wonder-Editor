

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$WonderEditor from "../../../../tool/GLBTool.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as LoadWDBTool$WonderEditor from "../../../tool/LoadWDBTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../tool/MainEditorAssetWDBNodeTool.js";

describe("MainEditorAssetHeader->load glb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var cubeTexturedGLBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                cubeTexturedGLBArrayBuffer[0] = GLBTool$WonderEditor.getGLBArrayBuffer("CubeTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test load glb", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                return Wonder_jest.testPromise("convert glb to wdb and load", (function () {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(cubeTexturedGLBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                            var __x = LoadWDBTool$WonderEditor.getCubeTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                  editorState,
                                                  engineState
                                                ]);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.getGameObjectName(__x, engineState)), "Mesh"));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
