open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open CurrentNodeDataType;

let _ =
  describe("MainEditorAssetTree", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));

      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test set currentNode and currentNodeParent", () =>
      describe("click assetTree node", () =>
        test("currentNodeId and currentNodeParentId should be same", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );

          let editorState = StateEditorService.getState();
          let {currentNodeId} =
            editorState
            |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;

          let currentNodeParentId =
            editorState
            |> AssetCurrentNodeParentIdEditorService.unsafeGetCurrentNodeParentId;

          expect(currentNodeId) == currentNodeParentId;
        })
      )
    );

    describe("test drag assetTreeNode to assetTreeNode", () =>
      describe("test has children case", () => {
        describe("have first layer children", () => {
          test("no drag", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("drag treeNode into brother treeNode", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildTwoFolderAssetTree();
            let firstFolderNodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              );
            let secondFolderNodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getSecondFolderNodeId(
                assetTreeData,
              );

            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
              secondFolderNodeId,
              firstFolderNodeId,
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("have second layer children", () => {
          test("no drag", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("drag third layer first folderNode into root treeNode", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getThirdLayerFirstFolderNodeId(
                assetTreeData,
              );
            MainEditorAssetFolderNodeTool.setFolderName(nodeId, "a1")
            |> StateLogicService.getAndSetEditorState;

            MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
              nodeId,
              MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getRootNodeId(
                assetTreeData,
              ),
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      })
    );

    describe("test drag assetChildrenNode to assetTreeNode", () => {
      test("test no drag", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag folder into it's parent's brother folder", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();
        let secondLayerFirstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getSecondLayerFirstFolderNodeId(
            assetTreeData,
          );
        let secondLayerSecondFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getSecondLayerSecondFolderNodeId(
            assetTreeData,
          );
        let thirdLayerFirstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getThirdLayerFirstFolderNodeId(
            assetTreeData,
          );

        /* MainEditorAssetTreeTool.Select.selectFolderNode(
             ~nodeId=secondLayerSecondFolderNodeId,
             (),
           ); */
        MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
          thirdLayerFirstFolderNodeId,
          secondLayerFirstFolderNodeId,
        );
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=secondLayerFirstFolderNodeId,
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's parent's brother folder", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAssetTree();
        let secondLayerFirstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getSecondLayerFirstFolderNodeId(
            assetTreeData,
          );
        let thirdLayerFirstTextureNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
            assetTreeData,
          );

        MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
          thirdLayerFirstTextureNodeId,
          secondLayerFirstFolderNodeId,
        );
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=secondLayerFirstFolderNodeId,
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's brother folder", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAssetTree();
        let thirdLayerFirstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstFolderNodeId(
            assetTreeData,
          );

        MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
            assetTreeData,
          ),
          thirdLayerFirstFolderNodeId,
        );
        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=thirdLayerFirstFolderNodeId,
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("deal with the specific case", () => {
      test("if drag treeNode into itself, keep not change", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
        let firstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
            assetTreeData,
          );

        MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
          firstFolderNodeId,
          firstFolderNodeId,
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("if drag treeNode into it's chidlren, keep not change", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();

        MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getSecondLayerSecondFolderNodeId(
            assetTreeData,
          ),
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getThirdLayerFirstFolderNodeId(
            assetTreeData,
          ),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });