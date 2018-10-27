open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("assetTree inspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree,
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.Asset,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      afterEach(() =>
        StateEditorService.getState()
        |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
        |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
        |> StateEditorService.setState
        |> ignore
      );

      describe("test component snapshot", () => {
        test("if hasn't current node, show nothing", () => {
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });

        describe("else", () => {
          test("test set folder to be current node", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            MainEditorAssetChildrenNodeTool.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test set texture to be current node", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

            MainEditorAssetChildrenNodeTool.selectTextureNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              (),
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          /* test("test set json to be current node", () => {
               let assetTreeData =
                 MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

               assetTreeData
               |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
               |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

               BuildComponentTool.buildInspectorComponent(
                 TestTool.buildEmptyAppState(),
                 InspectorTool.buildFakeAllShowComponentConfig(),
               )
               |> ReactTestTool.createSnapshotAndMatch;
             }); */
        });
      });

      describe("test rename folder node", () => {
        test("test rename to specific name", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
          let nodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
              assetTreeData,
            );

          AssetTreeInspectorTool.Rename.renameAssetFolderNode(
            ~nodeId,
            ~name="mickeyFolder",
            (),
          );
          MainEditorAssetTreeTool.Select.selectFolderNode(~nodeId, ());

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });

        describe("test the root folder can't be rename", () =>
          test("the root treeNode->rename-input->disabled should be true", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getRootNodeId(
                assetTreeData,
              );

            AssetTreeInspectorTool.Rename.isFolderNameDisabled(nodeId)
            |> expect == true;
          })
        );

        describe("test rename asset tree children node", () =>
          describe("if node has ext name", () => {
            test("rename input should show it", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
              let nodeId =
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                );

              MainEditorAssetFolderNodeTool.setFolderName(
                nodeId,
                "folder1.aaa",
              )
              |> StateLogicService.getAndSetEditorState;
              MainEditorAssetTreeTool.Select.selectFolderNode(~nodeId, ());

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("if rename success, the newName should include ext name", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
              let nodeId =
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                );

              AssetTreeInspectorTool.Rename.renameAssetFolderNode(
                ~nodeId,
                ~name="folder.aaa",
                (),
              );
              MainEditorAssetTreeTool.Select.selectFolderNode(~nodeId, ());

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch;
            });
          })
        );
        describe("deal with specific case", () =>
          test(
            "key in '', trigger onBlur, the input value should be original name",
            () => {
            open AssetTreeInspector;
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              );
            let state = {inputValue: "", originalName: "bbb"};

            let reasonStateUpdate =
              AssetTreeInspectorTool.reducer(
                ~nodeId,
                ~nodeType=AssetNodeType.Folder,
                ~action=AssetTreeInspector.Blur,
                ~state,
                (),
              )
              |> ReactTool.getUpdateState;

            reasonStateUpdate.inputValue |> expect == state.originalName;
          })
        );
      });

      describe("test rename texture node", () =>
        describe("test rename asset tree children node", () =>
          describe("if node has ext name", () =>
            test("rename input shouldn't show it", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
              let nodeId =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                );

              MainEditorAssetTextureNodeTool.setTextureName(
                nodeId,
                "texture1.png",
              )
              |> StateLogicService.getAndSetEditorState;
              MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          )
        )
      );
    });
  });