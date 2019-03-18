

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as GLBTool$WonderEditor from "./GLBTool.js";
import * as ConverterAPI$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/api/asset/ConverterAPI.js";
import * as LoadTool$WonderEditor from "../integration/asset/tool/LoadTool.js";
import * as InitEditorJob$WonderEditor from "../../src/core/job/init/InitEditorJob.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as CameraLogicService$WonderEditor from "../../src/service/stateTuple/logic/CameraLogicService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "./MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as PrimitiveLogicService$WonderEditor from "../../src/service/stateTuple/logic/PrimitiveLogicService.js";
import * as GameObjectLogicService$WonderEditor from "../../src/service/stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../src/service/state/engine/PointLightEngineService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../src/service/state/engine/ManageIMGUIEngineService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "../../src/core/composable_component/header/utils/export/HeaderExportSceneWDBUtils.js";
import * as ArcballCameraEngineService$WonderEditor from "../../src/service/state/engine/ArcballCameraEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../src/service/state/engine/LightMaterialEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./engine/NoWorkerJobConfigToolEngine.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../src/service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../src/service/state/engine/GenerateSceneGraphEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../src/service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function convertGLBToWDB(glbName) {
  var glbArrayBuffer = GLBTool$WonderEditor.getGLBArrayBuffer(glbName);
  LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
  LoadTool$WonderEditor.buildFakeTextEncoder();
  return ConverterAPI$Wonderjs.convertGLBToWDB(glbArrayBuffer);
}

function _createPointLight(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = PointLightEngineService$WonderEditor.create(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Point Light", obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addPointLight(obj, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          obj
        ];
}

function _createStateTuple(param) {
  var sandbox = Sinon$1.sandbox.create();
  MainEditorSceneTool$WonderEditor.initStateWithJob(/* record */[/* contents */sandbox], NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), undefined, false, undefined, undefined, /* () */0);
  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState = InitEditorJob$WonderEditor.initEditorJob(/* array */[], StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState$1 = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(/* record */[/* contents */sandbox], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function _buildFakeCanvas(sandbox, base64, callIndex) {
  var toDataURLStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  Sinon.returns(base64, toDataURLStub);
  return {
          width: 0,
          height: 0,
          getContext: (function (param) {
              return {
                      drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
                    };
            }),
          toDataURL: toDataURLStub
        };
}

function _prepareFakeCanvas(sandbox) {
  var base64_1 = "data:image/png;base64,aaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaacccccccccccccccccccccccaaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaccccccccccccccccccccccc";
  var base64_2 = "data:image/jpeg;base64,bbb";
  var canvas1 = _buildFakeCanvas(sandbox, base64_1, 0);
  var canvas2 = _buildFakeCanvas(sandbox, base64_2, 1);
  var createElementStub = Curry._3(Sinon.createMethodStub, sandbox[0], document, "createElement");
  Sinon.returns(canvas2, Sinon.onCall(1, Sinon.returns(canvas1, Sinon.onCall(0, Sinon.withOneArg("canvas", createElementStub)))));
  return /* tuple */[
          base64_1,
          base64_2
        ];
}

function generateWDB(buildWDBGameObjectFunc) {
  var match = _createStateTuple(/* () */0);
  var sandbox = /* record */[/* contents */Sinon$1.sandbox.create()];
  _prepareFakeCanvas(sandbox);
  var match$1 = Curry._2(buildWDBGameObjectFunc, match[0], match[1]);
  var match$2 = match$1[1];
  LoadTool$WonderEditor.buildFakeTextEncoder();
  var match$3 = HeaderExportSceneWDBUtils$WonderEditor.generateWDB(/* tuple */[
        match$1[0],
        true,
        Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(match$2[0])
      ], GenerateSceneGraphEngineService$WonderEditor.generateWDB, match$2[1]);
  Curry._1(Sinon.restoreSandbox, sandbox[0]);
  return match$3[1];
}

function buildSource($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 1;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
  var name = $staropt$star$2 !== undefined ? $staropt$star$2 : "image.png";
  return {
          width: width,
          height: height,
          name: name
        };
}

function generateDirectionPointLightsAndCubeWDB(param) {
  return generateWDB((function (editorState, engineState) {
                var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                      match[1],
                      match$1[1]
                    ], editorState, match$1[0]);
                var match$3 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$2[0], match$2[1]);
                var match$4 = _createPointLight(match$3[0], match$3[1]);
                var match$5 = GameObjectEngineService$WonderEditor.create(match$4[1]);
                var rootGameObject = match$5[1];
                var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$4[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$3[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[2], match$5[0])));
                return /* tuple */[
                        rootGameObject,
                        /* tuple */[
                          match$4[0],
                          engineState$1
                        ]
                      ];
              }));
}

function generateSceneWDB(param) {
  return generateWDB((function (editorState, engineState) {
                var engineState$1 = ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(null, (function (param, apiJsObj, engineState) {
                        var label = apiJsObj.label;
                        return label(/* tuple */[
                                    100,
                                    30,
                                    300,
                                    200
                                  ], "imgui", 0, engineState);
                      }), engineState);
                var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState$1);
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                      match[1],
                      match$1[1]
                    ], editorState, match$1[0]);
                var match$3 = CameraLogicService$WonderEditor.createCamera(match$2[0], match$2[1]);
                var camera = match$3[2];
                var match$4 = ArcballCameraEngineService$WonderEditor.create(match$3[1]);
                var arcballCameraController = match$4[1];
                var engineState$2 = match$4[0];
                var basicCameraViewComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera, engineState$2);
                var engineState$3 = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraViewComponent, ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView(arcballCameraController, engineState$2));
                var match$5 = GameObjectLogicService$WonderEditor.addArcballCameraController(camera, arcballCameraController, /* tuple */[
                      match$3[0],
                      engineState$3
                    ]);
                var match$6 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$5[0], match$5[1]);
                var match$7 = GameObjectEngineService$WonderEditor.create(match$6[1]);
                var rootGameObject = match$7[1];
                var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$6[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, camera, HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[2], match$7[0])));
                return /* tuple */[
                        rootGameObject,
                        /* tuple */[
                          match$6[0],
                          engineState$4
                        ]
                      ];
              }));
}

export {
  convertGLBToWDB ,
  _createPointLight ,
  _createStateTuple ,
  _buildFakeCanvas ,
  _prepareFakeCanvas ,
  generateWDB ,
  buildSource ,
  generateDirectionPointLightsAndCubeWDB ,
  generateSceneWDB ,
  
}
/* Sinon Not a pure module */
