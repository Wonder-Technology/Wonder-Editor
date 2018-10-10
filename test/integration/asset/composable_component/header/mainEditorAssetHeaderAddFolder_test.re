open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

let _ =
  describe("MainEditorAssetHeader->add folder", () => {
    let sandbox = getSandboxDefaultVal();

    let _triggerAddFolderClick = MainEditorAssetHeaderOperateNodeTool.triggerAddFolderClick;

    let _triggerRemoveNodeClick = MainEditorAssetHeaderOperateNodeTool.triggerRemoveNodeClick;

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(sandbox, () => ());
    });

    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });

    describe(
      "if not select specific treeNode, add folder into root treeNode", () => {
      test("test snapshot", () => {
        MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

        _triggerAddFolderClick();

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("test logic", () => {
        test("the added folder parentNodeId should be root treeNode id", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

          _triggerAddFolderClick();

          let {parentNodeId}: AssetNodeType.folderResultType =
            MainEditorAssetTreeNodeTool.getAddedFolderResult(
              assetTreeDomRecord,
            );

          parentNodeId
          |> OptionService.unsafeGet
          |>
          expect == (
                      StateEditorService.getState()
                      |> AssetTreeRootEditorService.getRootTreeNodeId
                    );
        });

        test("test add same name folder, the name should add postfix", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTreeNodeTool.clickAssetTreeNodeToSetCurrentNode(
               component,
             );
          _triggerRemoveNodeClick(component);

          _triggerAddFolderClick();
          _triggerAddFolderClick();
          _triggerAddFolderClick();

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test(
          "test remove first folder;
              add three folder;
              the new name should has removed-folder's name;
            ",
          () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTreeNodeTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );
            _triggerRemoveNodeClick(component);

            _triggerAddFolderClick();
            _triggerAddFolderClick();
            _triggerAddFolderClick();

            BuildComponentTool.buildAssetTree()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
      });
    });
    describe("else", () =>
      test("add folder into specific treeNode", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let component = BuildComponentTool.buildAssetComponent();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
        |> MainEditorAssetTreeNodeTool.clickAssetTreeNodeToSetCurrentNode(
             component,
           );

        _triggerAddFolderClick(~component, ());

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );
    /*
     TODO test
     test("add material into specific treeNode", () => {
       let component = BuildComponentTool.buildAssetComponent();

       BaseEventTool.triggerComponentEvent(
         component,
         AssetTreeEventTool.triggerAddMaterialClick,
       );

       BuildComponentTool.buildAssetComponent()
       |> ReactTestTool.createSnapshotAndMatch;
     }); */
  });