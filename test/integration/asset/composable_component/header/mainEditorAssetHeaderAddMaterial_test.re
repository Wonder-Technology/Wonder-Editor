open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->add material", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareAndExecAndGetMaterialNode = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
      let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addMaterial();

      (
        assetTreeData,
        StateEditorService.getState()
        |> AssetMaterialNodeMapEditorService.unsafeGetResult(
             addedMaterialNodeId,
           ),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(sandbox, () => ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if not select specific treeNode", () =>
      describe("should add material into root treeNode", () => {
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("the added material parent node should be root", () => {
          let (
            assetTreeData,
            {parentNodeId}: AssetNodeType.materialResultType,
          ) =
            _prepareAndExecAndGetMaterialNode();

          parentNodeId
          |> OptionService.unsafeGet
          |>
          expect == MainEditorAssetTreeTool.BuildAssetTree.Material.getRootNodeId(
                      assetTreeData,
                    );
        });
      })
    );

    describe("else", () =>
      describe("add material into specific treeNode", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getSecondLayerFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    test("create new material", () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
      let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
      let newLightMaterial = LightMaterialToolEngine.getNewLightMaterial();

      MainEditorAssetHeaderOperateNodeTool.addMaterial();

      let {materialComponent}: AssetNodeType.materialResultType =
        StateEditorService.getState()
        |> AssetMaterialNodeMapEditorService.unsafeGetResult(
             addedMaterialNodeId,
           );

      materialComponent |> expect == newLightMaterial;
    });

    test("material type should be LightMaterial", () => {
      let (assetTreeData, {type_}: AssetNodeType.materialResultType) =
        _prepareAndExecAndGetMaterialNode();

      type_ |> expect == AssetMaterialDataType.LightMaterial;
    });

    describe("test name", () => {
      test("test default name", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();

        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test(
        {|remove first material which use default name;
          add three material;

          the first new one's name should be removed-material's name;
                  |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
          let nodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Material.getFirstMaterialNodeId(
              assetTreeData,
            );
          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId,
            ~name=OperateLightMaterialLogicService.getMaterialDefaultName(),
            (),
          );

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~nodeId,
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Material.getRootNodeId(
                assetTreeData,
              ),
            (),
          );

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });