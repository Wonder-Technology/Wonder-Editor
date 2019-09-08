open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->remove texture", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      InspectorCanvasTool.prepareInspectorEngineState(sandbox);

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      {|select texture;
                click remove-button;
            |}, () =>
      test("should remove it from assetTreeRoot", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
          ~textureNodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
              assetTreeData,
            ),
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );

    describe(
      {j|
              test upload two textures with the same image
              |j},
      () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });

        testPromise(
          {j|
                  remove one of them;

                  the base64 should not remove from basicSourceTextureImageDataMap;
                  |j},
          () =>
          NodeAssetType.(
            MainEditorAssetUploadTool.loadOneTexture()
            |> Js.Promise.then_(uploadedTextureNodeId1 =>
                 MainEditorAssetUploadTool.loadOneTexture()
                 |> Js.Promise.then_(uploadedTextureNodeId2 => {
                      let editorState = StateEditorService.getState();

                      let textureData1 =
                        TextureNodeAssetEditorService.unsafeGetNodeData(
                          uploadedTextureNodeId1,
                          editorState,
                        );
                      let textureData2 =
                        TextureNodeAssetEditorService.unsafeGetNodeData(
                          uploadedTextureNodeId1,
                          editorState,
                        );

                      MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                        ~textureNodeId=uploadedTextureNodeId1,
                        (),
                      );

                      (
                        textureData1.imageDataIndex,
                        editorState
                        |> BasicSourceTextureImageDataMapAssetEditorService.getData(
                             textureData2.imageDataIndex,
                           )
                        |> Js.Option.isSome,
                      )
                      |> expect == (textureData2.imageDataIndex, true)
                      |> Js.Promise.resolve;
                    })
               )
          )
        );
        testPromise(
          {j|
                  remove all of them;

                  the base64 should remove from basicSourceTextureImageDataMap;
                  |j},
          () =>
          NodeAssetType.(
            MainEditorAssetUploadTool.loadOneTexture()
            |> Js.Promise.then_(uploadedTextureNodeId1 =>
                 MainEditorAssetUploadTool.loadOneTexture()
                 |> Js.Promise.then_(uploadedTextureNodeId2 => {
                      let editorState = StateEditorService.getState();

                      let textureData1 =
                        TextureNodeAssetEditorService.unsafeGetNodeData(
                          uploadedTextureNodeId1,
                          editorState,
                        );
                      let textureData2 =
                        TextureNodeAssetEditorService.unsafeGetNodeData(
                          uploadedTextureNodeId1,
                          editorState,
                        );

                      MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                        ~textureNodeId=uploadedTextureNodeId1,
                        (),
                      );
                      MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                        ~textureNodeId=uploadedTextureNodeId2,
                        (),
                      );

                      let editorState = StateEditorService.getState();

                      (
                        textureData1.imageDataIndex,
                        editorState
                        |> BasicSourceTextureImageDataMapAssetEditorService.getData(
                             textureData2.imageDataIndex,
                           )
                        |> Js.Option.isNone,
                      )
                      |> expect == (textureData2.imageDataIndex, true)
                      |> Js.Promise.resolve;
                    })
               )
          )
        );
      },
    );

    describe(
      {|
              load one texture t1;
              add two material m1, m2;
              drag texture to set m1 and m2 material map;
              select texture;
              click remove-button;
              |},
      () => {
        let _createNewMaterial = () => {
          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let materialComponent =
            MainEditorAssetMaterialNodeTool.getMaterialComponent(
              ~nodeId=addedMaterialNodeId,
              (),
            );

          (addedMaterialNodeId, materialComponent);
        };

        beforeEach(() => {
          CurrentSelectSourceEditorService.setCurrentSelectSource(
            SceneTreeWidgetService.getWidget(),
          )
          |> StateLogicService.getAndSetEditorState;

          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });

        testPromise(
          "should redraw m1,m2 snapshot to basicSourceTextureImageDataMap", () => {
          let (
            addedMaterialNodeId,
            newMaterialComponent,
            imgCanvasFakeBase64Str,
            (inspectorCanvasDom, imgCanvasDom),
          ) =
            MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
              ~sandbox,
              (),
            );

          let (addedMaterialNodeId1, materialComponent1) =
            _createNewMaterial();
          let (addedMaterialNodeId2, materialComponent2) =
            _createNewMaterial();

          MainEditorAssetUploadTool.loadOneTexture()
          |> Js.Promise.then_(uploadedTextureNodeId => {
               MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                 ~textureNodeId=uploadedTextureNodeId,
                 ~material=materialComponent1,
                 (),
               );
               MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                 ~textureNodeId=uploadedTextureNodeId,
                 ~material=materialComponent2,
                 (),
               );
               MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                 ~textureNodeId=uploadedTextureNodeId,
                 (),
               );

               let editorState = StateEditorService.getState();
               let materialNodeData1 =
                 editorState
                 |> OperateTreeAssetEditorService.unsafeFindNodeById(
                      addedMaterialNodeId1,
                    )
                 |> MaterialNodeAssetService.getNodeData;
               let materialNodeData2 =
                 editorState
                 |> OperateTreeAssetEditorService.unsafeFindNodeById(
                      addedMaterialNodeId1,
                    )
                 |> MaterialNodeAssetService.getNodeData;

               (
                 editorState
                 |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
                      materialNodeData1.snapshotImageDataIndex,
                    )
                 |> (({base64}) => base64 |> OptionService.unsafeGet),
                 editorState
                 |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
                      materialNodeData2.snapshotImageDataIndex,
                    )
                 |> (({base64}) => base64 |> OptionService.unsafeGet),
               )
               |> expect == (imgCanvasFakeBase64Str, imgCanvasFakeBase64Str)
               |> resolve;
             });
        });

        testPromise(
          "should dispose inspectorEngine container gameObject all children ",
          () => {
          let (
            addedMaterialNodeId,
            newMaterialComponent,
            imgCanvasFakeBase64Str,
            (inspectorCanvasDom, imgCanvasDom),
          ) =
            MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
              ~sandbox,
              (),
            );

          let (addedMaterialNodeId1, materialComponent1) =
            _createNewMaterial();
          let (addedMaterialNodeId2, materialComponent2) =
            _createNewMaterial();

          MainEditorAssetUploadTool.loadOneTexture()
          |> Js.Promise.then_(uploadedTextureNodeId => {
               MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                 ~textureNodeId=uploadedTextureNodeId,
                 ~material=materialComponent1,
                 (),
               );
               MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                 ~textureNodeId=uploadedTextureNodeId,
                 ~material=materialComponent2,
                 (),
               );
               MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                 ~textureNodeId=uploadedTextureNodeId,
                 (),
               );

               let editorState = StateEditorService.getState();

               let containerGameObject =
                 ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject(
                   editorState,
                 );

               let inspectorEngineState =
                 StateInspectorEngineService.unsafeGetState();

               inspectorEngineState
               |> HierarchyGameObjectEngineService.getChildren(
                    containerGameObject,
                  )
               |> Js.Array.length
               |> expect == 0
               |> resolve;
             });
        });
      },
    );

    describe("test dispose texture content data", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeImage();
        MainEditorAssetTool.buildFakeFileReader();
      });

      describe("if type is IMGUICustomImage", () =>
        testPromise("remove texture content", () =>
          MainEditorAssetUploadTool.loadOneTexture()
          |> then_(uploadedTextureNodeId => {
               TextureInspectorTool.changeType(
                 ~nodeId=uploadedTextureNodeId,
                 ~type_=NodeAssetType.IMGUICustomImage,
                 (),
               );

               let textureContentIndex =
                 IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                   uploadedTextureNodeId,
                 )
                 |> StateLogicService.getEditorState;

               MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                 ~textureNodeId=uploadedTextureNodeId,
                 (),
               );

               IMGUICustomImageTextureContentMapTool.hasContent(
                 ~textureContentIndex,
                 (),
               )
               |> expect == false
               |> resolve;
             })
        )
      );
    });

    describe("should remove it from engineState", () => {
      describe(
        {|select texture;
                drag texture to set gameObject material map;
                select texture;
                click remove-button;
            |},
        () => {
          beforeEach(() => {
            CurrentSelectSourceEditorService.setCurrentSelectSource(
              SceneTreeWidgetService.getWidget(),
            )
            |> StateLogicService.getAndSetEditorState;
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
          });

          describe("should remove it from scene->materials", () =>
            describe("test remove lightMaterial->diffuseMap", () => {
              let _drag = assetTreeData =>
                MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );

              let _remove = assetTreeData =>
                MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );

              test("test one gameObject use one material", () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

                _drag(assetTreeData);
                _remove(assetTreeData);

                MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
                let lightMaterial =
                  GameObjectTool.getCurrentSceneTreeNodeLightMaterial();

                StateEngineService.unsafeGetState()
                |> LightMaterialEngineService.getLightMaterialDiffuseMap(
                     lightMaterial,
                   )
                |> expect == None;
              });

              describe("test two gameObjects use one material", () =>
                test("test gameObjects are in scene", () => {
                  let currentGameObject =
                    GameObjectTool.unsafeGetCurrentSceneTreeNode();
                  let engineState = StateEngineService.unsafeGetState();
                  let oldMaterial =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         currentGameObject,
                       );
                  let secondCubeGameObject =
                    engineState |> MainEditorSceneTool.getCubeByIndex(1);
                  let engineState =
                    engineState
                    |> LightMaterialToolEngine.replaceGameObjectLightMaterial(
                         secondCubeGameObject,
                         oldMaterial,
                       );
                  engineState |> StateEngineService.setState |> ignore;

                  let assetTreeData =
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
                  _drag(assetTreeData);
                  MainEditorSceneTool.setSecondCubeToBeCurrentSceneTreeNode();
                  _drag(assetTreeData);
                  _remove(assetTreeData);

                  let engineState = StateEngineService.unsafeGetState();
                  let newMaterial1 =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         currentGameObject,
                       );
                  let newMaterial2 =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         secondCubeGameObject,
                       );

                  (
                    LightMaterialEngineService.getLightMaterialDiffuseMap(
                      newMaterial1,
                      engineState,
                    ),
                    LightMaterialEngineService.getLightMaterialDiffuseMap(
                      newMaterial2,
                      engineState,
                    ),
                  )
                  |> expect == (None, None);
                })
              );
            })
          );
        },
      );

      describe(
        "if texture has no materials, should dispose texture's engine data", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });

        testPromise("texture shouldn't be alive", () =>
          MainEditorAssetUploadTool.loadOneTexture()
          |> Js.Promise.then_(uploadedTextureNodeId1 => {
               let textureComponent =
                 MainEditorAssetTextureNodeTool.getTextureComponent(
                   uploadedTextureNodeId1,
                 )
                 |> StateLogicService.getEditorState;

               MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                 ~textureNodeId=uploadedTextureNodeId1,
                 (),
               );

               BasicSourceTextureToolEngine.isAlive(textureComponent)
               |> StateLogicService.getEngineStateToGetData
               |> expect == false
               |> resolve;
             })
        );
      });

      describe("test dispose imgui assets", () => {
        describe("if type is IMGUICustomImage", () =>
          describe("if the custom image data has set to engine", () => {
            let _test = judgeFunc =>
              MainEditorAssetUploadTool.loadOneTexture()
              |> then_(uploadedTextureNodeId => {
                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.IMGUICustomImage,
                     (),
                   );

                   let customImageId = "i1";

                   TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                     ~nodeId=uploadedTextureNodeId,
                     ~customImageId,
                     (),
                   )
                   |> StateLogicService.setState;

                   AssetIMGUITool.addSettedAssetCustomImageData(
                     AssetIMGUITool.buildFakeCustomImageData(
                       ~imageId=customImageId,
                       (),
                     ),
                   )
                   |> StateLogicService.getAndSetEngineState;

                   MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                     ~textureNodeId=uploadedTextureNodeId,
                     (),
                   );

                   judgeFunc(customImageId);
                 });

            testPromise("remove it", () =>
              _test(customImageId =>
                AssetIMGUIEngineService.hasSettedAssetCustomImageData(
                  customImageId,
                )
                |> StateLogicService.getEngineStateToGetData
                |> expect == false
                |> resolve
              )
            );
          })
        );

        describe("if type is BasicSource", () =>
          describe(
            "if the texture has set to engine as imgui font-> bitmap", () => {
            let _test = judgeFunc => {
              let bitmapName = "bitmap.png";

              MainEditorAssetUploadTool.loadOneTexture(
                ~imgName=bitmapName,
                (),
              )
              |> then_(uploadedTextureNodeId => {
                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.IMGUICustomImage,
                     (),
                   );

                   AssetIMGUITool.setSettedAssetBitmapData(
                     ~name=bitmapName |> FileNameService.getBaseName,
                     (),
                   )
                   |> StateEngineService.setState
                   |> ignore;

                   MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                     ~textureNodeId=uploadedTextureNodeId,
                     (),
                   );

                   judgeFunc(bitmapName);
                 });
            };

            testPromise("remove it", () =>
              _test(bitmapName =>
                AssetIMGUIEngineService.hasSettedAssetBitmapData(bitmapName)
                |> StateLogicService.getEngineStateToGetData
                |> expect == false
                |> resolve
              )
            );
          })
        );
      });
    });
  });