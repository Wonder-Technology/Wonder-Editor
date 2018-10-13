open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

let _ =
  describe("MainEditorAssetHeader->add folder", () => {
    let sandbox = getSandboxDefaultVal();

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
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

        MainEditorAssetHeaderOperateNodeTool.addFolder();

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("test logic", () => {
        test("the added folder parent node should be root", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
          let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          let {parentNodeId}: AssetNodeType.folderResultType =
            StateEditorService.getState()
            |> AssetFolderNodeMapEditorService.getFolderNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(addedFolderNodeId);
          parentNodeId
          |> OptionService.unsafeGet
          |>
          expect == MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                      assetTreeData,
                    );
        });

        test("test add same name folder, the name should add postfix", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addFolder();
          MainEditorAssetHeaderOperateNodeTool.addFolder();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test(
          {|remove first folder;
            add three folder;

            the new name should be removed-folder's name;
            |},
          () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
              ~folderNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.addFolder();
            MainEditorAssetHeaderOperateNodeTool.addFolder();
            MainEditorAssetHeaderOperateNodeTool.addFolder();

            BuildComponentTool.buildAssetTree()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
      });
    });
    describe("else", () =>
      test("add folder into specific treeNode", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
              assetTreeData,
            ),
          (),
        );
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        BuildComponentTool.buildAssetTree()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );
  });