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

      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "if not select specific treeNode, add folder into root treeNode", () =>
      describe("should add folder into root treeNode", () => {
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("the added folder parent node should be root", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
          let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          let {parentNodeId}: AssetNodeType.folderResultType =
            StateEditorService.getState()
            |> AssetFolderNodeMapEditorService.unsafeGetResult(
                 addedFolderNodeId,
               );

          parentNodeId
          |> OptionService.unsafeGet
          |>
          expect == MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                      assetTreeData,
                    );
        });
      })
    );

    describe("else", () =>
      describe("add folder into specific treeNode", () =>
        test("test snapshot", () => {
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
      )
    );

    describe("test name", () => {
      test("test add the same name folder, the name should add postfix", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

        MainEditorAssetHeaderOperateNodeTool.addFolder();
        MainEditorAssetHeaderOperateNodeTool.addFolder();
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        BuildComponentTool.buildAssetTree()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test(
        {|remove first folder which use default name;
          add three folder;

          the first new one's name should be removed-folder's name;
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