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
        |> OperateTreeAssetEditorService.unsafeFindNodeById(
             addedMaterialNodeId,
           ),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
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
          let (assetTreeData, node) = _prepareAndExecAndGetMaterialNode();

          MainEditorAssetTreeTool.findNodeParentId(
            node,
            StateEditorService.getState(),
          )
          |> OptionService.unsafeGet
          |> expect
          == MainEditorAssetTreeTool.BuildAssetTree.Material.getRootNodeId(
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

      let materialComponent =
        MainEditorAssetMaterialNodeTool.getMaterialComponent(
          ~nodeId=addedMaterialNodeId,
          (),
        );

      materialComponent |> expect == newLightMaterial;
    });

    test("create new imageDataIndex and new imageData", () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
      let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
      let newImageDataMapIndex = ImageDataMapTool.getNewImageDataMapIndex();

      MainEditorAssetHeaderOperateNodeTool.addMaterial();

      let editorState = StateEditorService.getState();

      let {snapshotImageDataIndex}: NodeAssetType.materialNodeData =
        OperateTreeAssetEditorService.unsafeFindNodeById(
          addedMaterialNodeId,
          editorState,
        )
        |> MaterialNodeAssetService.getNodeData;

      (
        snapshotImageDataIndex,
        editorState
        |> ImageDataMapAssetEditorService.getData(snapshotImageDataIndex)
        |> Js.Option.isSome,
      )
      |> expect == (newImageDataMapIndex, true);
    });

    test("material type should be LightMaterial", () => {
      let (assetTreeData, node) = _prepareAndExecAndGetMaterialNode();

      MaterialNodeAssetService.getNodeData(node).type_
      |> expect == MaterialDataAssetType.LightMaterial;
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
          AssetInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId,
            ~name=OperateMaterialLogicService.getDefaultName(),
            (),
          );

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~materialNodeId=nodeId,
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