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
      () =>
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

        BuildComponentTool.buildAssetTree()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );

    describe(
      {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        remove m1;
        |},
      () => {
        test(
          "select material group shouldn't contain removed material assets", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
          let engineState = StateEngineService.unsafeGetState();
          let gameObject1 = MainEditorSceneTool.getFirstBox(engineState);
          let sourceMaterial1 =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
              gameObject1,
              engineState,
            );

          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let {materialComponent}: AssetNodeType.materialResultType =
            StateEditorService.getState()
            |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                 addedMaterialNodeId,
               );
          MainEditorMaterialTool.changeMaterial(
            ~sourceMaterial=sourceMaterial1,
            ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
            ~targetMaterial=materialComponent,
            ~targetMaterialType=AssetMaterialDataType.LightMaterial,
            ~gameObject=gameObject1,
            ~materialNodeId=Some(addedMaterialNodeId),
            (),
          );

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~materialNodeId=addedMaterialNodeId,
            (),
          );

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
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
            let engineState = StateEngineService.unsafeGetState();
            let gameObject1 = MainEditorSceneTool.getFirstBox(engineState);
            let sourceMaterial1 =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject1,
                engineState,
              );

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let {materialComponent}: AssetNodeType.materialResultType =
              StateEditorService.getState()
              |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                   addedMaterialNodeId,
                 );
            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial=sourceMaterial1,
              ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=AssetMaterialDataType.LightMaterial,
              ~gameObject=gameObject1,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
              ~materialNodeId=addedMaterialNodeId,
              (),
            );

            gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

            BuildComponentTool.buildMaterial(
              ~gameObject=gameObject1,
              ~isShowMaterialGroup=true,
              (),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("g1's material component shouldn't be m1", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
            let engineState = StateEngineService.unsafeGetState();
            let gameObject1 = MainEditorSceneTool.getFirstBox(engineState);
            let sourceMaterial1 =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject1,
                engineState,
              );

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let {materialComponent}: AssetNodeType.materialResultType =
              StateEditorService.getState()
              |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                   addedMaterialNodeId,
                 );
            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial=sourceMaterial1,
              ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=AssetMaterialDataType.LightMaterial,
              ~gameObject=gameObject1,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
              ~materialNodeId=addedMaterialNodeId,
              (),
            );

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
  });