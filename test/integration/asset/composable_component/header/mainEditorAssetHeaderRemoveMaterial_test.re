open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->remove material", () => {
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
      {|
        select material;
        click remove-button;
            |},
      () => {
      test("should remove it from assetTreeRoot", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();

        MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
          ~materialNodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Material.getFirstMaterialNodeId(
              assetTreeData,
            ),
          (),
        );

        BuildComponentTool.buildAssetChildrenNode()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("should remove its imageData from imageDataMap", () => {
        open NodeAssetType;

        let materialNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        let {imageDataIndex} =
          StateEditorService.getState()
          |> OperateTreeAssetEditorService.unsafeFindNodeById(materialNodeId)
          |> MaterialNodeAssetService.getNodeData;

        MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
          ~materialNodeId,
          (),
        );

        StateEditorService.getState()
        |> ImageDataMapAssetEditorService.getData(imageDataIndex)
        |> Js.Option.isNone
        |> expect == true;
      });
    });

    describe("if material has no gameObjects, dispose material", () => {
      beforeEach(() => {
        NoWorkerJobTool.initStateWithDisposeJob(~sandbox, ());
        MainEditorSceneTool.prepareScene(sandbox);
      });

      describe("test basic material", () =>
        test("material shouldn't be alive", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let materialComponent =
            MainEditorAssetMaterialNodeTool.getMaterialComponent(
              ~nodeId=addedMaterialNodeId,
              (),
            );

          MaterialInspectorTool.changeMaterialType(
            ~material=materialComponent,
            ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
            ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
            ~materialNodeId=addedMaterialNodeId,
            (),
          );

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~materialNodeId=addedMaterialNodeId,
            (),
          );

          BasicMaterialToolEngine.isAlive(materialComponent)
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        })
      );

      describe("test light material", () => {
        test("material shouldn't be alive", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let materialComponent =
            MainEditorAssetMaterialNodeTool.getMaterialComponent(
              ~nodeId=addedMaterialNodeId,
              (),
            );

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~materialNodeId=addedMaterialNodeId,
            (),
          );

          LightMaterialToolEngine.isAlive(materialComponent)
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        });

        describe("should remove instead of dispose material->maps ", () => {
          open Js.Promise;

          beforeEach(() => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();
          });

          testPromise("test", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 let addedMaterialNodeId =
                   MainEditorAssetIdTool.getNewAssetId();
                 MainEditorAssetHeaderOperateNodeTool.addMaterial();

                 let materialComponent =
                   MainEditorAssetMaterialNodeTool.getMaterialComponent(
                     ~nodeId=addedMaterialNodeId,
                     (),
                   );

                 MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                   ~textureNodeId=uploadedTextureNodeId,
                   ~material=materialComponent,
                   (),
                 );

                 MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
                   ~materialNodeId=addedMaterialNodeId,
                   (),
                 );

                 let texture =
                   MainEditorAssetTextureNodeTool.getTextureComponent(
                     uploadedTextureNodeId,
                   )
                   |> StateLogicService.getEditorState;

                 BasicSourceTextureToolEngine.isAlive(texture)
                 |> StateLogicService.getEngineStateToGetData
                 |> expect == true
                 |> resolve;
               });
          });
        });
      });
    });

    describe(
      "else, replace material's gameObjects' material to default material", () => {
      describe(
        {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        remove m1;
        |},
        () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
            let engineState = StateEngineService.unsafeGetState();
            let gameObject1 = MainEditorSceneTool.getFirstCube(engineState);
            let sourceMaterial1 =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject1,
                engineState,
              );

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let materialComponent =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );

            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial=sourceMaterial1,
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=MaterialDataAssetType.LightMaterial,
              ~gameObject=gameObject1,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
              ~materialNodeId=addedMaterialNodeId,
              (),
            );

            (gameObject1, materialComponent);
          };

          test(
            "select material group shouldn't contain removed material assets",
            () => {
            let (gameObject1, materialComponent) = _prepareAndExec();
            gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

            BuildComponentTool.buildMaterial(
              ~gameObject=gameObject1,
              ~isShowMaterialGroup=true,
              (),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("g1 should use default light material", () => {
            test("test snapshot", () => {
              let (gameObject1, materialComponent) = _prepareAndExec();
              gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

              BuildComponentTool.buildMaterial(
                ~gameObject=gameObject1,
                ~isShowMaterialGroup=true,
                (),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("g1's material component shouldn't be m1", () => {
              let (gameObject1, materialComponent) = _prepareAndExec();

              let engineState = StateEngineService.unsafeGetState();
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject1,
                engineState,
              )
              |> expect
              |> not_
              |> toEqual(materialComponent);
            });
          });
        },
      );

      describe("should remove instead of dispose material->maps ", () => {
        open Js.Promise;

        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();
        });

        testPromise("test", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          MainEditorAssetUploadTool.loadOneTexture()
          |> then_(uploadedTextureNodeId => {
               let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
               MainEditorAssetHeaderOperateNodeTool.addMaterial();

               let targetMaterial =
                 MainEditorAssetMaterialNodeTool.getMaterialComponent(
                   ~nodeId=addedMaterialNodeId,
                   (),
                 );

               let engineState = StateEngineService.unsafeGetState();
               let gameObject1 =
                 MainEditorSceneTool.getFirstCube(engineState);
               let sourceMaterial =
                 GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                   gameObject1,
                   engineState,
                 );

               MainEditorMaterialTool.changeMaterial(
                 ~sourceMaterial,
                 ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                 ~targetMaterial,
                 ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                 ~gameObject=gameObject1,
                 ~materialNodeId=Some(addedMaterialNodeId),
                 (),
               );

               MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                 ~textureNodeId=uploadedTextureNodeId,
                 ~material=targetMaterial,
                 (),
               );

               MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
                 ~materialNodeId=addedMaterialNodeId,
                 (),
               );
               JobEngineService.execDisposeJob
               |> StateLogicService.getAndSetEngineState;

               let texture =
                 MainEditorAssetTextureNodeTool.getTextureComponent(
                   uploadedTextureNodeId,
                 )
                 |> StateLogicService.getEditorState;

               BasicSourceTextureToolEngine.isAlive(texture)
               |> StateLogicService.getEngineStateToGetData
               |> expect == true
               |> resolve;
             });
        });
      });
    });
  });