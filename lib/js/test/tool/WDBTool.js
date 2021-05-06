'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var GLBTool$WonderEditor = require("./GLBTool.js");
var ConverterAPI$Wonderjs = require("wonder.js/lib/js/src/api/asset/ConverterAPI.js");
var LoadTool$WonderEditor = require("../integration/asset/tool/LoadTool.js");
var SinonTool$WonderEditor = require("./SinonTool.js");
var LoadWDBTool$WonderEditor = require("../integration/tool/LoadWDBTool.js");
var ArrayService$WonderEditor = require("../../src/service/atom/ArrayService.js");
var InitEditorJob$WonderEditor = require("../../src/core/job/init/InitEditorJob.js");
var FakeGlToolEngine$WonderEditor = require("./engine/FakeGlToolEngine.js");
var CameraLogicService$WonderEditor = require("../../src/service/stateTuple/logic/CameraLogicService.js");
var StateEditorService$WonderEditor = require("../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("./MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../src/service/state/engine/script/ScriptEngineService.js");
var GameObjectToolEngine$WonderEditor = require("./engine/GameObjectToolEngine.js");
var GeometryEngineService$WonderEditor = require("../../src/service/state/engine/GeometryEngineService.js");
var PrimitiveLogicService$WonderEditor = require("../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var ExecIMGUIEngineService$WonderEditor = require("../../src/service/state/engine/imgui/ExecIMGUIEngineService.js");
var FlyCameraEngineService$WonderEditor = require("../../src/service/state/engine/FlyCameraEngineService.js");
var GameObjectLogicService$WonderEditor = require("../../src/service/stateTuple/logic/GameObjectLogicService.js");
var TransformEngineService$WonderEditor = require("../../src/service/state/engine/TransformEngineService.js");
var CubemapNodeAssetService$WonderEditor = require("../../src/service/record/editor/asset/CubemapNodeAssetService.js");
var GameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var PointLightEngineService$WonderEditor = require("../../src/service/state/engine/PointLightEngineService.js");
var CubemapTextureToolEngine$WonderEditor = require("./engine/CubemapTextureToolEngine.js");
var HeaderExportSceneWDBUtils$WonderEditor = require("../../src/core/composable_component/header/utils/export/HeaderExportSceneWDBUtils.js");
var ArcballCameraEngineService$WonderEditor = require("../../src/service/state/engine/ArcballCameraEngineService.js");
var LightMaterialEngineService$WonderEditor = require("../../src/service/state/engine/LightMaterialEngineService.js");
var CubemapTextureEngineService$WonderEditor = require("../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("./engine/NoWorkerJobConfigToolEngine.js");
var BasicCameraViewEngineService$WonderEditor = require("../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var BasicSourceTextureToolEngine$WonderEditor = require("./engine/BasicSourceTextureToolEngine.js");
var Uint8ArrayAssetEditorService$WonderEditor = require("../../src/service/state/editor/asset/Uint8ArrayAssetEditorService.js");
var CubemapNodeAssetEditorService$WonderEditor = require("../../src/service/state/editor/asset/CubemapNodeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var FlyCameraControllerLogicService$WonderEditor = require("../../src/service/stateTuple/logic/FlyCameraControllerLogicService.js");
var GenerateSceneGraphEngineService$WonderEditor = require("../../src/service/state/engine/GenerateSceneGraphEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ArcballCameraControllerLogicService$WonderEditor = require("../../src/service/stateTuple/logic/ArcballCameraControllerLogicService.js");

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
  var engineState$1 = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(/* record */[/* contents */sandbox], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function _buildFakeCanvas(sandbox, base64) {
  var toDataURLStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  Sinon.returns(base64, toDataURLStub);
  return {
          width: 0,
          height: 0,
          getContext: (function (param) {
              return {
                      drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                      clearRect: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
                    };
            }),
          toDataURL: toDataURLStub
        };
}

function buildCubemapAllFaceSourceBase64(param) {
  return /* tuple */[
          "data:image/png;base64,aaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaacccccccccccccccccccccccaaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaccccccccccccccccccccccc",
          "data:image/jpeg;base64,bbb",
          "data:image/png;base64,aaa",
          "data:image/png;base64,ccc",
          "data:image/png;base64,ddd",
          "data:image/jpeg;base64,ccc"
        ];
}

function prepareFakeCanvas(sandbox) {
  var match = buildCubemapAllFaceSourceBase64(/* () */0);
  var base64_6 = match[5];
  var base64_5 = match[4];
  var base64_4 = match[3];
  var base64_3 = match[2];
  var base64_2 = match[1];
  var base64_1 = match[0];
  var base64_7 = "data:image/png;base64,azc";
  var base64_8 = "data:image/jpeg;base64,bb2";
  var base64_9 = "data:image/png;base64,aa1";
  var base64_10 = "data:image/png;base64,c3c";
  var base64_11 = "data:image/png;base64,d4d";
  var base64_12 = "data:image/jpeg;base64,5cc";
  var base64_13 = "data:image/png;base64,a6c";
  var base64_more = "data:image/png;base64,a9c";
  var canvas1 = _buildFakeCanvas(sandbox, base64_1);
  var canvas2 = _buildFakeCanvas(sandbox, base64_2);
  var canvas3 = _buildFakeCanvas(sandbox, base64_3);
  var canvas4 = _buildFakeCanvas(sandbox, base64_4);
  var canvas5 = _buildFakeCanvas(sandbox, base64_5);
  var canvas6 = _buildFakeCanvas(sandbox, base64_6);
  var canvas7 = _buildFakeCanvas(sandbox, base64_7);
  var canvas8 = _buildFakeCanvas(sandbox, base64_8);
  var canvas9 = _buildFakeCanvas(sandbox, base64_9);
  var canvas10 = _buildFakeCanvas(sandbox, base64_10);
  var canvas11 = _buildFakeCanvas(sandbox, base64_11);
  var canvas12 = _buildFakeCanvas(sandbox, base64_12);
  var canvas13 = _buildFakeCanvas(sandbox, base64_13);
  var canvas_more = _buildFakeCanvas(sandbox, base64_more);
  var createElementStub = Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "createElement");
  Sinon.returns(canvas_more, Sinon.withOneArg("canvas", createElementStub));
  Sinon.returns(canvas13, Sinon.onCall(12, Sinon.returns(canvas12, Sinon.onCall(11, Sinon.returns(canvas11, Sinon.onCall(10, Sinon.returns(canvas10, Sinon.onCall(9, Sinon.returns(canvas9, Sinon.onCall(8, Sinon.returns(canvas8, Sinon.onCall(7, Sinon.returns(canvas7, Sinon.onCall(6, Sinon.returns(canvas6, Sinon.onCall(5, Sinon.returns(canvas5, Sinon.onCall(4, Sinon.returns(canvas4, Sinon.onCall(3, Sinon.returns(canvas3, Sinon.onCall(2, Sinon.returns(canvas2, Sinon.onCall(1, Sinon.returns(canvas1, Sinon.onCall(0, Sinon.withOneArg("canvas", createElementStub)))))))))))))))))))))))))));
  return /* tuple */[
          base64_1,
          base64_2,
          base64_3,
          base64_4,
          base64_5,
          base64_6,
          base64_7,
          base64_8,
          base64_9,
          base64_10,
          base64_11,
          base64_12,
          base64_13,
          base64_more
        ];
}

function generateWDB(buildWDBGameObjectFunc) {
  var match = _createStateTuple(/* () */0);
  var sandbox = /* record */[/* contents */Sinon$1.sandbox.create()];
  prepareFakeCanvas(sandbox);
  var match$1 = Curry._2(buildWDBGameObjectFunc, match[0], match[1]);
  var match$2 = match$1[1];
  LoadTool$WonderEditor.buildFakeTextEncoder();
  var match$3 = HeaderExportSceneWDBUtils$WonderEditor.generateWDB(/* tuple */[
        match$1[0],
        true,
        Uint8ArrayAssetEditorService$WonderEditor.buildBasicSourceTextureImageUint8ArrayMap(match$2[0])
      ], GenerateSceneGraphEngineService$WonderEditor.generateSceneWDB, match$2[1]);
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

function _generateWDBWithCameraType(createCameraControllerFunc, bindEventFunc, addCameraControllerFunc) {
  return generateWDB((function (editorState, engineState) {
                var engineState$1 = ExecIMGUIEngineService$WonderEditor.addExecFuncData("e1", null, 0, (function (param, apiJsObj, engineState) {
                        var label = apiJsObj.label;
                        var color = /* array */[
                          1,
                          1,
                          1
                        ];
                        return label(/* tuple */[
                                    100,
                                    30,
                                    300,
                                    200
                                  ], "imgui", /* tuple */[
                                    color,
                                    0
                                  ], engineState);
                      }), engineState);
                var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState$1);
                var geometry = match[1];
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                var lightMaterial = match$1[1];
                var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                      geometry,
                      lightMaterial
                    ], editorState, match$1[0]);
                var cube1 = match$2[2];
                var match$3 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                      geometry,
                      lightMaterial
                    ], match$2[0], match$2[1]);
                var match$4 = CameraLogicService$WonderEditor.createCamera(match$3[0], match$3[1]);
                var camera = match$4[2];
                var match$5 = CameraLogicService$WonderEditor.createCamera(match$4[0], match$4[1]);
                var camera2 = match$5[2];
                var match$6 = Curry._1(createCameraControllerFunc, match$5[1]);
                var cameraController = match$6[1];
                var engineState$2 = match$6[0];
                var basicCameraViewComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera, engineState$2);
                var engineState$3 = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraViewComponent, Curry._2(bindEventFunc, cameraController, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                              20,
                              0,
                              100
                            ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(camera2, engineState$2), engineState$2)));
                var match$7 = Curry._3(addCameraControllerFunc, camera, cameraController, /* tuple */[
                      match$5[0],
                      engineState$3
                    ]);
                var match$8 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$7[0], match$7[1]);
                var match$9 = GameObjectEngineService$WonderEditor.create(match$8[1]);
                var rootGameObject = match$9[1];
                var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$8[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, camera, HierarchyGameObjectEngineService$WonderEditor.addChild(cube1, camera2, HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, cube1, match$9[0]))));
                return /* tuple */[
                        rootGameObject,
                        /* tuple */[
                          match$8[0],
                          engineState$4
                        ]
                      ];
              }));
}

function generateSceneWDBWithArcballCameraController(param) {
  return _generateWDBWithCameraType(ArcballCameraEngineService$WonderEditor.create, ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView, GameObjectLogicService$WonderEditor.addArcballCameraController);
}

function generateSceneWDBWithFlyCameraController(param) {
  return _generateWDBWithCameraType(FlyCameraEngineService$WonderEditor.create, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, GameObjectLogicService$WonderEditor.addFlyCameraController);
}

function getScriptGameObjectName(param) {
  return "ScriptGameObject";
}

function generateScriptEventFunctionWDB(scriptEventFunctionDataName, scriptEventFunctionData) {
  return generateWDB((function (editorState, engineState) {
                var match = GameObjectEngineService$WonderEditor.create(engineState);
                var rootGameObject = match[1];
                var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
                var gameObject1 = match$1[1];
                var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("ScriptGameObject", gameObject1, match$1[0]);
                var match$2 = ScriptEngineService$WonderEditor.create(engineState$1);
                var script = match$2[1];
                var engineState$2 = GameObjectComponentEngineService$WonderEditor.addScriptComponent(gameObject1, script, match$2[0]);
                var engineState$3 = ScriptEngineService$WonderEditor.addScriptEventFunctionData(script, scriptEventFunctionDataName, scriptEventFunctionData, engineState$2);
                var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, gameObject1, engineState$3);
                return /* tuple */[
                        rootGameObject,
                        /* tuple */[
                          editorState,
                          engineState$4
                        ]
                      ];
              }));
}

function getScriptGameObject(engineState) {
  return LoadWDBTool$WonderEditor.findGameObjectByName("ScriptGameObject", engineState);
}

function getScriptGameObjectByWDBGameObject(rootGameObject, engineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(GameObjectToolEngine$WonderEditor.findGameObjectByName("ScriptGameObject", rootGameObject, engineState));
}

var ScriptEventFunction = /* module */[
  /* getScriptGameObjectName */getScriptGameObjectName,
  /* generateScriptEventFunctionWDB */generateScriptEventFunctionWDB,
  /* getScriptGameObject */getScriptGameObject,
  /* getScriptGameObjectByWDBGameObject */getScriptGameObjectByWDBGameObject
];

function getScriptGameObjectName$1(param) {
  return "ScriptGameObject";
}

function createRootGameObjectForGenerateScriptAttributeWDB(scriptAttributeName, scriptAttribute, engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var rootGameObject = match[1];
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var gameObject1 = match$1[1];
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("ScriptGameObject", gameObject1, match$1[0]);
  var match$2 = ScriptEngineService$WonderEditor.create(engineState$1);
  var script = match$2[1];
  var engineState$2 = GameObjectComponentEngineService$WonderEditor.addScriptComponent(gameObject1, script, match$2[0]);
  var engineState$3 = ScriptEngineService$WonderEditor.addScriptAttribute(script, scriptAttributeName, scriptAttribute, engineState$2);
  var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, gameObject1, engineState$3);
  return /* tuple */[
          rootGameObject,
          engineState$4
        ];
}

function createRootGameObjectForGenerateScriptAttributeWDB2(scriptAttributeName, scriptAttribute, engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var rootGameObject = match[1];
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var gameObject1 = match$1[1];
  var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("ScriptGameObject", gameObject1, match$2[0]);
  var match$3 = ScriptEngineService$WonderEditor.create(engineState$1);
  var script = match$3[1];
  var engineState$2 = GameObjectComponentEngineService$WonderEditor.addScriptComponent(gameObject1, script, match$3[0]);
  var engineState$3 = ScriptEngineService$WonderEditor.addScriptAttribute(script, scriptAttributeName, scriptAttribute, engineState$2);
  var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, gameObject1, engineState$3);
  var engineState$5 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[1], engineState$4);
  return /* tuple */[
          rootGameObject,
          engineState$5
        ];
}

function generateScriptAttributeWDB(scriptAttributeName, scriptAttribute) {
  return generateWDB((function (editorState, engineState) {
                var match = createRootGameObjectForGenerateScriptAttributeWDB(scriptAttributeName, scriptAttribute, engineState);
                return /* tuple */[
                        match[0],
                        /* tuple */[
                          editorState,
                          match[1]
                        ]
                      ];
              }));
}

function getScriptGameObject$1(engineState) {
  return LoadWDBTool$WonderEditor.findGameObjectByName("ScriptGameObject", engineState);
}

var ScriptAttribute = /* module */[
  /* getScriptGameObjectName */getScriptGameObjectName$1,
  /* createRootGameObjectForGenerateScriptAttributeWDB */createRootGameObjectForGenerateScriptAttributeWDB,
  /* createRootGameObjectForGenerateScriptAttributeWDB2 */createRootGameObjectForGenerateScriptAttributeWDB2,
  /* generateScriptAttributeWDB */generateScriptAttributeWDB,
  /* getScriptGameObject */getScriptGameObject$1
];

function _createCubemapAndSetToSceneSkybox(engineState) {
  var match = MainEditorSceneTool$WonderEditor.Skybox[/* createCubemapAndSetToSceneSkybox */0](engineState);
  var cubemap = match[1];
  var match$1 = CubemapTextureToolEngine$WonderEditor.setAllSources(match[0], cubemap, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var engineState$1 = CubemapTextureEngineService$WonderEditor.setCubemapTextureName("sceneSkyboxCubemap", cubemap, match$1[0]);
  return /* tuple */[
          engineState$1,
          cubemap
        ];
}

function generateWDBWithBasicSourceTextureAndSkyboxCubemap(param) {
  return generateWDB((function (editorState, engineState) {
                var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                var lightMaterial = match$1[1];
                var match$2 = BasicSourceTextureEngineService$WonderEditor.create(match$1[0]);
                var texture = match$2[1];
                var engineState$1 = BasicSourceTextureEngineService$WonderEditor.setSource(BasicSourceTextureToolEngine$WonderEditor.buildSource(undefined, undefined, undefined, undefined, /* () */0), texture, match$2[0]);
                var engineState$2 = BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName("texture1", texture, engineState$1);
                var engineState$3 = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(texture, lightMaterial, engineState$2);
                var match$3 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                      match[1],
                      lightMaterial
                    ], editorState, engineState$3);
                var match$4 = CubemapTextureEngineService$WonderEditor.create(match$3[1]);
                var match$5 = _createCubemapAndSetToSceneSkybox(match$4[0]);
                var engineState$4 = CubemapTextureEngineService$WonderEditor.setCubemapTextureName("cubemap1", match$4[1], match$5[0]);
                var match$6 = GameObjectEngineService$WonderEditor.create(engineState$4);
                var rootGameObject = match$6[1];
                var engineState$5 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$3[2], match$6[0]);
                return /* tuple */[
                        rootGameObject,
                        /* tuple */[
                          match$3[0],
                          engineState$5
                        ]
                      ];
              }));
}

function findSkyboxCubemapFromLoadedWDB(editorState) {
  return ArrayService$WonderEditor.unsafeGetFirst(CubemapNodeAssetEditorService$WonderEditor.findAllCubemapNodes(editorState).map((function (node) {
                    return CubemapNodeAssetService$WonderEditor.getNodeData(node)[/* textureComponent */0];
                  })));
}

var Cubemap = /* module */[
  /* _createCubemapAndSetToSceneSkybox */_createCubemapAndSetToSceneSkybox,
  /* generateWDBWithBasicSourceTextureAndSkyboxCubemap */generateWDBWithBasicSourceTextureAndSkyboxCubemap,
  /* findSkyboxCubemapFromLoadedWDB */findSkyboxCubemapFromLoadedWDB
];

exports.convertGLBToWDB = convertGLBToWDB;
exports._createPointLight = _createPointLight;
exports._createStateTuple = _createStateTuple;
exports._buildFakeCanvas = _buildFakeCanvas;
exports.buildCubemapAllFaceSourceBase64 = buildCubemapAllFaceSourceBase64;
exports.prepareFakeCanvas = prepareFakeCanvas;
exports.generateWDB = generateWDB;
exports.buildSource = buildSource;
exports.generateDirectionPointLightsAndCubeWDB = generateDirectionPointLightsAndCubeWDB;
exports._generateWDBWithCameraType = _generateWDBWithCameraType;
exports.generateSceneWDBWithArcballCameraController = generateSceneWDBWithArcballCameraController;
exports.generateSceneWDBWithFlyCameraController = generateSceneWDBWithFlyCameraController;
exports.ScriptEventFunction = ScriptEventFunction;
exports.ScriptAttribute = ScriptAttribute;
exports.Cubemap = Cubemap;
/* Sinon Not a pure module */
