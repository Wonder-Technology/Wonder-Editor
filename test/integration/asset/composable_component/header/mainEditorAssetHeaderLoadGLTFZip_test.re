open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load gltf zip", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load gltf zip", () => {
      let _buildImportFakeJsZipCreateFunc = [%bs.raw
        (sandbox, zipData) => {|
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

|}
      ];

      let _buildFakeZipData = [%bs.raw
        getArrayBufferFunc => {|
  return [
    ["CubeTextured0.bin",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(getArrayBufferFunc("CubeTextured/CubeTextured0.bin"))
          ))
      },
    }],
    ["CubeTextured.gltf",{
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
                      "uri": "CubeTextured0.bin"
                  }
              ]
          }
            )))
      },
    }],
    ["textures/CesiumLogoFlat.png",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(getArrayBufferFunc("CubeTextured/CesiumLogoFlat.png"))
          ))
      },
    }],
  ]
|}
      ];

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeTextEncoder();
        LoadTool.buildFakeURL(sandbox^);
        LoadTool.buildFakeLoadImage(.);
      });

      testPromise("convert gltf zip to glb to wdb and load", () => {
        let obj =
          _buildImportFakeJsZipCreateFunc(
            sandbox^,
            _buildFakeZipData(GLTFZipTool.getArrayBuffer),
          );

        MainEditorAssetUploadTool.loadOneGLTFZip(
          ~sandbox,
          ~createJsZipFunc=() => obj,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let editorState = StateEditorService.getState();
             let engineState = StateEngineService.unsafeGetState();
             let wdbGameObject =
               MainEditorAssetWDBNodeTool.getWDBGameObject(
                 uploadedWDBNodeId,
                 editorState,
               );

             LoadWDBTool.getCubeTexturedMeshGameObjectFromAssetNode(
               uploadedWDBNodeId,
               (editorState, engineState),
             )
             |> GameObjectEngineService.getGameObjectName(_, engineState)
             |> expect == Some("Mesh")
             |> resolve;
           });
      });
    });
  });