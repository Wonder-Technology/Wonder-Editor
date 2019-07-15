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
          describe("test resource data->basicSourceTextureImageDataMap", () =>
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
                     |> SelectTreeTool.setSelectForSelectTree(
                          true,
                          MainEditorAssetTextureNodeTool.getTextureName(
                            ~nodeId=uploadedTextureNodeId1,
                            (),
                          ),
                        );

                   let (
                     basicMaterials,
                     lightMaterials,
                     basicSourceTextures,
                     cubemapTextures,
                     geometrys,
                     scriptEventFunctionDataArr,
                     scriptAttributeDataArr,
                     basicSourceTextureImageDataMap,
                     cubemapTextureImageDataMap,
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
                     BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
                       imageDataIndex1,
                       editorState,
                     );
                   basicSourceTextureImageDataMap
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

          describe("test resource data->cubemapTextureImageDataMap", () =>
            testPromise("test", () => {
              let (
                (source1, source2, source3, source4, source5, source6),
                (base64_1, base64_2, base64_3, base64_4, base64_5, base64_6),
                nodeId,
              ) =
                ImportPackageTool.Cubemap.prepareForAddOneCubemapAsset(
                  sandbox,
                );

              let selectTree =
                HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                |> StateLogicService.getStateToGetData
                |> SelectTreeTool.setSelectForSelectTree(
                     true,
                     MainEditorAssetCubemapNodeTool.getCubemapName(
                       ~nodeId,
                       (),
                     ),
                   );

              let (
                basicMaterials,
                lightMaterials,
                basicSourceTextures,
                cubemapTextures,
                geometrys,
                scriptEventFunctionDataArr,
                scriptAttributeDataArr,
                basicSourceTextureImageDataMap,
                cubemapTextureImageDataMap,
              ) =
                HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                  selectTree,
                )
                |> StateLogicService.getStateToGetData;

              let editorState = StateEditorService.getState();
              let imageDataIndex1 =
                MainEditorAssetCubemapNodeTool.getImageDataIndex(
                  ~nodeId,
                  ~editorState,
                  (),
                );
              let data =
                CubemapTextureImageDataMapAssetEditorService.unsafeGetData(
                  imageDataIndex1,
                  editorState,
                );

              cubemapTextureImageDataMap
              |> expect
              == (
                   WonderCommonlib.ImmutableSparseMapService.createEmpty()
                   |> WonderCommonlib.ImmutableSparseMapService.set(
                        imageDataIndex1,
                        {
                          pxImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_1,
                                  ),
                                name: ImageUtils.getImageName(source1),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source1),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                          nxImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_2,
                                  ),
                                name: ImageUtils.getImageName(source2),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source2),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                          pyImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_3,
                                  ),
                                name: ImageUtils.getImageName(source3),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source3),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                          nyImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_4,
                                  ),
                                name: ImageUtils.getImageName(source4),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source4),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                          pzImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_5,
                                  ),
                                name: ImageUtils.getImageName(source5),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source5),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                          nzImageData:
                            Some(
                              {
                                uint8Array:
                                  BufferUtils.convertBase64ToUint8Array(
                                    base64_6,
                                  ),
                                name: ImageUtils.getImageName(source6),
                                mimeType:
                                  ImageUtils.getImageMimeType(
                                    FileNameService.getExtName(
                                      ImageUtils.getImageName(source6),
                                    ),
                                  )
                                  |> StateLogicService.getEditorState,
                              }: HeaderAssetBundleType.imageData,
                            ),
                        }: HeaderAssetBundleType.cubemapTextureImageData,
                      )
                 )
              |> resolve;
            })
          );

          describe("test resource data->material data", () => {
            describe(
              "add light material contained textureData to textures", () =>
              testPromise(
                "if selectTree->textures not has selectTree->lightMaterials contained textureData, resourceData->textures should has them",
                () => {
                  let addedMaterialNodeId1 =
                    MainEditorAssetIdTool.getNewAssetId();
                  MainEditorAssetHeaderOperateNodeTool.addMaterial();

                  let addedMaterialNodeId2 =
                    MainEditorAssetIdTool.getNewAssetId();
                  MainEditorAssetHeaderOperateNodeTool.addMaterial();

                  let addedFolderNodeId1 =
                    MainEditorAssetIdTool.getNewAssetId();
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
                              |> SelectTreeTool.setSelectForSelectTree(
                                   true,
                                   MainEditorAssetMaterialNodeTool.getMaterialName(
                                     ~nodeId=addedMaterialNodeId2,
                                     (),
                                   ),
                                 )
                              |> SelectTreeTool.setSelectForSelectTree(
                                   true,
                                   MainEditorAssetTextureNodeTool.getTextureName(
                                     ~nodeId=uploadedTextureNodeId1,
                                     (),
                                   ),
                                 );

                            let (
                              basicMaterials,
                              lightMaterials,
                              basicSourceTextures,
                              cubemapTextures,
                              geometrys,
                              scriptEventFunctionDataArr,
                              scriptAttributeDataArr,
                              basicSourceTextureImageDataMap,
                              cubemapTextureImageDataMap,
                            ) =
                              HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                                selectTree,
                              )
                              |> StateLogicService.getStateToGetData;

                            let editorState = StateEditorService.getState();
                            (lightMaterials, basicSourceTextures)
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

            describe("fix bug", () =>
              test(
                "added light material shouldn't add to basic material resource data",
                () => {
                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let selectTree =
                  HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
                  |> StateLogicService.getStateToGetData
                  |> SelectTreeTool.setSelectForSelectTree(
                       true,
                       MainEditorAssetMaterialNodeTool.getMaterialName(
                         ~nodeId=addedMaterialNodeId1,
                         (),
                       ),
                     );

                let (
                  basicMaterials,
                  lightMaterials,
                  basicSourceTextures,
                  cubemapTextures,
                  geometrys,
                  scriptEventFunctionDataArr,
                  scriptAttributeDataArr,
                  basicSourceTextureImageDataMap,
                  cubemapTextureImageDataMap,
                ) =
                  HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRABResourceData(
                    selectTree,
                  )
                  |> StateLogicService.getStateToGetData;

                basicMaterials |> expect == [||];
              })
            );
          });

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
                     |> SelectTreeTool.setSelectForSelectTree(
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
                     basicSourceTextures,
                     cubemapTextures,
                     geometrys,
                     scriptEventFunctionDataArr,
                     scriptAttributeDataArr,
                     basicSourceTextureImageDataMap,
                     cubemapTextureImageDataMap,
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