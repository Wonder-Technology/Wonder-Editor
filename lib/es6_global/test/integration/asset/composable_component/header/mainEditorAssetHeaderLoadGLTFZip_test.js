

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as GLTFZipTool$WonderEditor from "../../../../tool/GLTFZipTool.js";
import * as LoadWDBTool$WonderEditor from "../../../tool/LoadWDBTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../tool/MainEditorAssetUploadTool.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../tool/MainEditorAssetWDBNodeTool.js";

describe("MainEditorAssetHeader->load gltf zip", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test load gltf zip", (function (param) {
                var _buildImportFakeJsZipCreateFunc = function (sandbox,zipData){
        var obj = {
           loadAsync: sandbox.stub(),
        };

        var obj2 = {
           forEach: function(handleFunc){
             zipData.forEach((data) => {
               handleFunc(data[0],data[1]);
             })
           },
           async: function() {
             return obj2
           }
        };

        obj.loadAsync = (zip, a) => {
          return new Promise((resolve, _) => resolve(obj2))
        };

        return obj;

};
                var _buildFakeZipData = function (getArrayBufferFunc){
  return [
    ["BoxTextured0.bin",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(getArrayBufferFunc("BoxTextured/BoxTextured0.bin"))
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
new Uint8Array(getArrayBufferFunc("BoxTextured/CesiumLogoFlat.png"))
          ))
      },
    }],
  ]
};
                beforeEach((function (param) {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                return Wonder_jest.testPromise("convert gltf zip to glb to wdb and load", (function (param) {
                              var obj = _buildImportFakeJsZipCreateFunc(sandbox[0], _buildFakeZipData(GLTFZipTool$WonderEditor.getArrayBuffer));
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
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.getGameObjectName(__x, engineState)), "Mesh"));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
