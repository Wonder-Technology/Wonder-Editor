open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("Header AssetBundle", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test generate single rab", () => {
      let truckWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        truckWDBArrayBuffer := WDBTool.convertGLBToWDB("CesiumMilkTruck")
      );

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      describe("test buildSelectTreeForGenerateSingleRAB", () => {
        /* TODO add more tests */

        testPromise("test1", () => {
          let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          MainEditorAssetUploadTool.loadOneTexture(
            ~imgName="image1.png",
            ~imgSrc="newImgBase64",
            (),
          )
          |> then_(uploadedTextureNodeId =>
               MainEditorAssetUploadTool.loadOneWDB(
                 ~fileName="Truck",
                 ~arrayBuffer=truckWDBArrayBuffer^,
                 (),
               )
               |> then_(uploadedWDBNodeId =>
                    HeaderAssetBundleTool.GenerateSingleRAB.buildGenerateSingleRABModal(
                      ~selectTree=
                        HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                        |> StateLogicService.getStateToGetData,
                      ~send=SinonTool.createOneLengthStub(sandbox^),
                      (),
                    )
                    |> BuildComponentTool.buildUI
                    |> ReactTestTool.createSnapshotAndMatch
                    |> resolve
                  )
             );
        });
        test("test2", () => {
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          HeaderAssetBundleTool.GenerateSingleRAB.buildGenerateSingleRABModal(
            ~selectTree=
              HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
              |> StateLogicService.getStateToGetData,
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          )
          |> BuildComponentTool.buildUI
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("build resource data", () =>
        describe(
          "build selected assets from selectTree to be resource data", () => {
          describe("test resource data->imageDataMap", () =>
            testPromise("test", () => {
              let imageBase64 = Base64Tool.buildFakeBase64_1();

              MainEditorAssetUploadTool.loadOneTexture(
                ~imgName="image1.png",
                ~imgSrc=imageBase64,
                (),
              )
              |> then_(uploadedTextureNodeId1 => {
                   let selectTree =
                     HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                     |> StateLogicService.getStateToGetData
                     |> HeaderAssetBundleTool.setSelectForSelectTree(
                          true,
                          MainEditorAssetTextureNodeTool.getTextureName(
                            ~nodeId=uploadedTextureNodeId1,
                            (),
                          ),
                        );

                   let (
                     basicMaterials,
                     lightMaterials,
                     textures,
                     geometrys,
                     scriptEventFunctionDataArr,
                     scriptAttributeDataArr,
                     imageDataMap,
                   ) =
                     HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                       selectTree,
                     )
                     |> StateLogicService.getStateToGetData;

                   let editorState = StateEditorService.getState();
                   let imageDataIndex1 =
                     MainEditorAssetTextureNodeTool.getTextureImageDataIndex(
                       uploadedTextureNodeId1,
                       editorState,
                     );
                   let {uint8Array, name, mimeType}: ImageDataType.imageData =
                     ImageDataMapAssetEditorService.unsafeGetData(
                       imageDataIndex1,
                       editorState,
                     );
                   imageDataMap
                   |> expect
                   == (
                        WonderCommonlib.ImmutableSparseMapService.createEmpty()
                        |> WonderCommonlib.ImmutableSparseMapService.set(
                             imageDataIndex1,
                             {
                               uint8Array:
                                 BufferUtils.convertBase64ToUint8Array(
                                   imageBase64,
                                 ),
                               name,
                               mimeType,
                             }: HeaderAssetBundleType.imageData,
                           )
                      )
                   |> resolve;
                 });
            })
          );

          describe("add lightMaterial contained textureData to textures", () =>
            testPromise(
              "if selectTree->textures not has selectTree->lightMaterials contained textureData, resourceData->textures should has them",
              () => {
                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let addedMaterialNodeId2 =
                  MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                MainEditorAssetTreeTool.Select.selectFolderNode(
                  ~nodeId=addedFolderNodeId1,
                  (),
                );

                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgName="image1.png",
                  ~imgSrc=Base64Tool.buildFakeBase64_1(),
                  (),
                )
                |> then_(uploadedTextureNodeId1 =>
                     MainEditorAssetUploadTool.loadOneTexture(
                       ~imgName="image2.png",
                       ~imgSrc=Base64Tool.buildFakeBase64_2(),
                       (),
                     )
                     |> then_(uploadedTextureNodeId2 => {
                          MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                            ~currentNodeId=addedMaterialNodeId2,
                            ~textureNodeId=uploadedTextureNodeId2,
                            ~material=
                              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                                ~nodeId=addedMaterialNodeId2,
                                (),
                              ),
                            (),
                          );

                          let selectTree =
                            HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                            |> StateLogicService.getStateToGetData
                            |> HeaderAssetBundleTool.setSelectForSelectTree(
                                 true,
                                 MainEditorAssetMaterialNodeTool.getMaterialName(
                                   ~nodeId=addedMaterialNodeId2,
                                   (),
                                 ),
                               )
                            |> HeaderAssetBundleTool.setSelectForSelectTree(
                                 true,
                                 MainEditorAssetTextureNodeTool.getTextureName(
                                   ~nodeId=uploadedTextureNodeId1,
                                   (),
                                 ),
                               );

                          let (
                            basicMaterials,
                            lightMaterials,
                            textures,
                            geometrys,
                            scriptEventFunctionDataArr,
                            scriptAttributeDataArr,
                            imageDataMap,
                          ) =
                            HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                              selectTree,
                            )
                            |> StateLogicService.getStateToGetData;

                          let editorState = StateEditorService.getState();
                          (lightMaterials, textures)
                          |> expect
                          == (
                               [|
                                 MainEditorAssetMaterialNodeTool.getMaterialComponent(
                                   ~nodeId=addedMaterialNodeId2,
                                   (),
                                 ),
                               |],
                               [|
                                 HeaderAssetBundleTool.GenerateSingleRAB.buildTextureData(
                                   MainEditorAssetTextureNodeTool.getTextureComponent(
                                     uploadedTextureNodeId1,
                                     editorState,
                                   ),
                                   MainEditorAssetTextureNodeTool.getTextureImageDataIndex(
                                     uploadedTextureNodeId1,
                                     editorState,
                                   ),
                                 ),
                                 HeaderAssetBundleTool.GenerateSingleRAB.buildTextureData(
                                   MainEditorAssetTextureNodeTool.getTextureComponent(
                                     uploadedTextureNodeId2,
                                     editorState,
                                   ),
                                   MainEditorAssetTextureNodeTool.getTextureImageDataIndex(
                                     uploadedTextureNodeId2,
                                     editorState,
                                   ),
                                 ),
                               |],
                             )
                          |> resolve;
                        })
                   );
              },
            )
          );

          describe("test resource data->geometrys", () =>
            testPromise("test", () =>
              MainEditorAssetUploadTool.loadOneWDB(
                ~fileName="Truck",
                ~arrayBuffer=truckWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let selectTree =
                     HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                     |> StateLogicService.getStateToGetData
                     |> HeaderAssetBundleTool.setSelectForSelectTree(
                          true,
                          HeaderAssetBundleTool.GenerateSingleRAB.buildWDBGeometryFolderName(
                            MainEditorAssetWDBNodeTool.getWDBName(
                              ~nodeId=uploadedWDBNodeId,
                              (),
                            ),
                          ),
                        );

                   let (
                     basicMaterials,
                     lightMaterials,
                     textures,
                     geometrys,
                     scriptEventFunctionDataArr,
                     scriptAttributeDataArr,
                     imageDataMap,
                   ) =
                     HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                       selectTree,
                     )
                     |> StateLogicService.getStateToGetData;

                   geometrys |> expect == [|3, 4, 5, 2|] |> resolve;
                 })
            )
          );
        })
      );
    });
  });