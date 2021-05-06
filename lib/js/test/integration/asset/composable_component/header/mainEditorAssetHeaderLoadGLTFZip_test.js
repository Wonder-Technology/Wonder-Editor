'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var GLTFZipTool$WonderEditor = require("../../../../tool/GLTFZipTool.js");
var LoadWDBTool$WonderEditor = require("../../../tool/LoadWDBTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../tool/MainEditorAssetWDBNodeTool.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadTool.js");
var MainEditorAssetHeaderLoadZipTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadZipTool.js");

Wonder_jest.describe("MainEditorAssetHeader->load gltf zip", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load gltf zip", (function (param) {
                      var _buildFakeZipData = function (getArrayBufferFunc){
  return [
    ["BoxTextured0.bin",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(getArrayBufferFunc("boxTextured/BoxTextured0.bin"))
          ))
      },
    }],
    ["BoxTextured.gltf",{
      async: function(){
          return new Promise((resolve, _) => resolve(JSON.stringify(
            {
              "asset": {
                  "generator": "COLLADA2GLTF",
                  "version": "2.0"
              },
              "scene": 0,
              "scenes": [
                  {
                      "nodes": [
                          0
                      ]
                  }
              ],
              "nodes": [
                  {
                      "children": [
                          1
                      ],
                      "matrix": [
                          1.0,
                          0.0,
                          0.0,
                          0.0,
                          0.0,
                          0.0,
                          -1.0,
                          0.0,
                          0.0,
                          1.0,
                          0.0,
                          0.0,
                          0.0,
                          0.0,
                          0.0,
                          1.0
                      ]
                  },
                  {
                      "mesh": 0
                  }
              ],
              "meshes": [
                  {
                      "primitives": [
                          {
                              "attributes": {
                                  "NORMAL": 1,
                                  "POSITION": 2,
                                  "TEXCOORD_0": 3
                              },
                              "indices": 0,
                              "mode": 4,
                              "material": 0
                          }
                      ],
                      "name": "Mesh"
                  }
              ],
              "accessors": [
                  {
                      "bufferView": 0,
                      "byteOffset": 0,
                      "componentType": 5123,
                      "count": 36,
                      "max": [
                          23
                      ],
                      "min": [
                          0
                      ],
                      "type": "SCALAR"
                  },
                  {
                      "bufferView": 1,
                      "byteOffset": 0,
                      "componentType": 5126,
                      "count": 24,
                      "max": [
                          1.0,
                          1.0,
                          1.0
                      ],
                      "min": [
                          -1.0,
                          -1.0,
                          -1.0
                      ],
                      "type": "VEC3"
                  },
                  {
                      "bufferView": 1,
                      "byteOffset": 288,
                      "componentType": 5126,
                      "count": 24,
                      "max": [
                          0.5,
                          0.5,
                          0.5
                      ],
                      "min": [
                          -0.5,
                          -0.5,
                          -0.5
                      ],
                      "type": "VEC3"
                  },
                  {
                      "bufferView": 2,
                      "byteOffset": 0,
                      "componentType": 5126,
                      "count": 24,
                      "max": [
                          6.0,
                          1.0
                      ],
                      "min": [
                          0.0,
                          0.0
                      ],
                      "type": "VEC2"
                  }
              ],
              "materials": [
                  {
                      "pbrMetallicRoughness": {
                          "baseColorTexture": {
                              "index": 0
                          },
                          "metallicFactor": 0.0
                      },
                      "name": "Texture"
                  }
              ],
              "textures": [
                  {
                      "sampler": 0,
                      "source": 0
                  }
              ],
              "images": [
                  {
                      "uri": "CesiumLogoFlat.png"
                  }
              ],
              "samplers": [
                  {
                      "magFilter": 9729,
                      "minFilter": 9986,
                      "wrapS": 10497,
                      "wrapT": 10497
                  }
              ],
              "bufferViews": [
                  {
                      "buffer": 0,
                      "byteOffset": 768,
                      "byteLength": 72,
                      "target": 34963
                  },
                  {
                      "buffer": 0,
                      "byteOffset": 0,
                      "byteLength": 576,
                      "byteStride": 12,
                      "target": 34962
                  },
                  {
                      "buffer": 0,
                      "byteOffset": 576,
                      "byteLength": 192,
                      "byteStride": 8,
                      "target": 34962
                  }
              ],
              "buffers": [
                  {
                      "byteLength": 840,
                      "uri": "BoxTextured0.bin"
                  }
              ]
          }
            )))
      },
    }],
    ["textures/CesiumLogoFlat.png",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(getArrayBufferFunc("boxTextured/CesiumLogoFlat.png"))
          ))
      },
    }],
  ]
};
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      return Wonder_jest.testPromise("convert gltf zip to glb to wdb and load", undefined, (function (param) {
                                    var obj = MainEditorAssetHeaderLoadZipTool$WonderEditor.buildImportFakeJsZipCreateFunc(sandbox[0], _buildFakeZipData(GLTFZipTool$WonderEditor.getArrayBuffer));
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneGLTFZip(sandbox, (function (param) {
                                                    return obj;
                                                  }), undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                  var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                        editorState,
                                                        engineState
                                                      ]);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.getGameObjectName(__x, engineState)), "Mesh"));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
