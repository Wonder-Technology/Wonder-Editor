open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

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
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test set currentNode and selectedFolderNodeInAssetTree", () =>
      describe("click assetTree node", () =>
        test(
          "currentNode and selectedFolderNodeInAssetTree should be same", () => {
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

          NodeAssetService.isNodeEqualById(
            ~sourceNode=
              MainEditorAssetNodeTool.unsafeGetCurrentNode(editorState),
            ~targetNode=
              MainEditorAssetNodeTool.unsafeGetSelectedFolderNodeInAssetTree(
                editorState,
              ),
          )
          |> expect == true;
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

            MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
              ~startNodeId=secondFolderNodeId,
              ~targetNodeId=firstFolderNodeId,
              (),
            );

            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );
            BuildComponentTool.buildAssetTree()
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
              ~startNodeId=nodeId,
              ~targetNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getRootNodeId(
                  assetTreeData,
                ),
              (),
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

      describe("test drag folder", () =>
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
            ~startNodeId=thirdLayerFirstFolderNodeId,
            ~targetNodeId=secondLayerFirstFolderNodeId,
            (),
          );
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=secondLayerFirstFolderNodeId,
            (),
          );

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test drag texture", () => {
        test("test drag texture file into it's parent's brother folder", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();
          let secondLayerFirstFolderNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getSecondLayerFirstFolderNodeId(
              assetTreeData,
            );
          let thirdLayerFirstTextureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
              assetTreeData,
            );

          MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
            ~startNodeId=thirdLayerFirstTextureNodeId,
            ~targetNodeId=secondLayerFirstFolderNodeId,
            (),
          );
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=secondLayerFirstFolderNodeId,
            (),
          );

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test drag texture file into it's brother folder", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();
          let thirdLayerFirstFolderNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstFolderNodeId(
              assetTreeData,
            );

          MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
            ~startNodeId=
              MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
                assetTreeData,
              ),
            ~targetNodeId=thirdLayerFirstFolderNodeId,
            (),
          );
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=thirdLayerFirstFolderNodeId,
            (),
          );

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test drag material", () =>
        test("test drag material file into it's parent's brother folder", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();
          let secondLayerFirstFolderNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getSecondLayerFirstFolderNodeId(
              assetTreeData,
            );
          let thirdLayerFirstTextureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
              assetTreeData,
            );

          MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
            ~startNodeId=thirdLayerFirstTextureNodeId,
            ~targetNodeId=secondLayerFirstFolderNodeId,
            (),
          );
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=secondLayerFirstFolderNodeId,
            (),
          );

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
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
          ~startNodeId=firstFolderNodeId,
          ~targetNodeId=firstFolderNodeId,
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("if drag treeNode into it's chidlren, keep not change", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.buildFourFolderAssetTree();

        MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
          ~startNodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getSecondLayerSecondFolderNodeId(
              assetTreeData,
            ),
          ~targetNodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Folder.ThreeLayer.getThirdLayerFirstFolderNodeId(
              assetTreeData,
            ),
          (),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("test asse tree node->isShowChildren", () => {
      test("default node->isShowChildren should be false except root node", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addFolder();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=addedFolderNodeId1,
          (),
        );

        let addedFolderNodeId2 = addedFolderNodeId1 |> succ;

        MainEditorAssetHeaderOperateNodeTool.addFolder();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=
            MainEditorAssetTreeTool.getRootNodeId
            |> StateLogicService.getEditorState,
          (),
        );

        BuildComponentTool.buildAssetTree()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("test drag treeNode to target treeNode", () =>
        test("target treeNode->isShowChildren should set to true", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          let addedFolderNodeId2 = addedFolderNodeId1 |> succ;

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          OperateTreeAssetEditorService.setNodeIsShowChildren(
            addedFolderNodeId1,
            false,
          )
          |> StateLogicService.getAndSetEditorState;

          MainEditorAssetTreeTool.Drag.dragAssetTreeNode(
            ~startNodeId=addedFolderNodeId2,
            ~targetNodeId=addedFolderNodeId1,
            (),
          );

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.getRootNodeId
              |> StateLogicService.getEditorState,
            (),
          );

          MainEditorAssetFolderNodeTool.getIsShowChildren(addedFolderNodeId1)
          |> StateLogicService.getEditorState
          |> expect == true;
        })
      );

      describe("test add treeNode to target treeNode", () =>
        test("target treeNode->isShowChildren should not change", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          let addedFolderNodeId2 = addedFolderNodeId1 |> succ;

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.getRootNodeId
              |> StateLogicService.getEditorState,
            (),
          );

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });

    describe("test show order", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);

        MainEditorAssetTool.buildFakeImage();
      });

      test("sort the same layer folder by firstname alphabetically", () => {
        let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        let addedMaterialNodeId1 = addedFolderNodeId1 |> succ;
        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        let addedFolderNodeId2 = addedMaterialNodeId1 |> succ;
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=addedFolderNodeId2,
          (),
        );

        OperateTreeAssetEditorService.setNodeIsShowChildren(
          addedFolderNodeId2,
          true,
        )
        |> StateLogicService.getAndSetEditorState;

        let addedFolderNodeId3 = addedFolderNodeId2 |> succ;
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        let addedFolderNodeId4 = addedFolderNodeId3 |> succ;
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        AssetInspectorTool.Rename.renameAssetFolderNode(
          ~nodeId=addedFolderNodeId1,
          ~name="FFolder",
          (),
        );
        AssetInspectorTool.Rename.renameAssetFolderNode(
          ~nodeId=addedFolderNodeId2,
          ~name="BFolder",
          (),
        );
        AssetInspectorTool.Rename.renameAssetFolderNode(
          ~nodeId=addedFolderNodeId3,
          ~name="ZFolder",
          (),
        );
        AssetInspectorTool.Rename.renameAssetFolderNode(
          ~nodeId=addedFolderNodeId4,
          ~name="AFolder",
          (),
        );

        BuildComponentTool.buildAssetTree()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("fix bug", () =>
      describe("fix show children arrow", () => {
        test("if node->children has no folder node, not show arrow", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("else, show arrow", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          BuildComponentTool.buildAssetTree()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      })
    );
  });