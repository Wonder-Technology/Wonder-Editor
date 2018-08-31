open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();

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

    describe("test operate treeNode", () => {
      describe("test add folder", () => {
        let _triggerAddFolderClick =
            (~component=BuildComponentTool.buildAssetComponent(), ()) =>
          BaseEventTool.triggerComponentEvent(
            BuildComponentTool.buildAssetComponent(),
            AssetTreeEventTool.triggerAddFolderClick,
          );

        describe(
          "if not select specific treeNode, add folder into root treeNode", () => {
          test("test snapshot", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            _triggerAddFolderClick();

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test logic", () => {
            test("test asset children length before add folder", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 5;
            });

            test("test asset children length after add folder", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              _triggerAddFolderClick();

              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 6;
            });
          });
        });

        test("else, add folder into specific treeNode", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);
          _triggerAddFolderClick(~component, ());

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("add material into specific treeNode", () => {
          let component = BuildComponentTool.buildAssetComponent();

          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerAddMaterialClick,
          );

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test remove tree node", () => {
        let _triggerRemoveFolderClick = component =>
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerRemoveNodeClick,
          );

        test(
          "if not select specific treeNode, remove-button's disabled props should == true ",
          () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );

        describe("else", () => {
          test("remove-button's disabled props should == false", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );

            component |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test select folder", () =>
            test(
              "click remove-button should remove folder from assetTreeRoot", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );
              _triggerRemoveFolderClick(component);

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );

          describe("test select file", () => {
            test(
              "select texture;
                click remove-button;
                should remove it from assetTreeRoot",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                _triggerRemoveFolderClick(
                  BuildComponentTool.buildAssetComponent(),
                );

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );

            test(
              "select json is currentNode;
                click remove-button;
                should remove it from assetTreeRoot",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
                |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                _triggerRemoveFolderClick(
                  BuildComponentTool.buildAssetComponent(),
                );

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );

            /* TODO should store clone gameObject in editorState */
            /* describe(
            "select wdb is currentNode;
            click remove-button;",
            () => {
              test(
              "",
              () => {
              
               }
              );
             }
            ); */
          });
        });

        describe(
          "test removed asset node, the id should recovery into removedAssetIdArray",
          () =>
          describe("test remove first folder", () => {
            test("test the folderId should add into removedAssetIdArray", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();
              let removedfirstFolderNodeId =
                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderNodeId;

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );
              _triggerRemoveFolderClick(component);

              StateEditorService.getState()
              |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
              |> expect == [|removedfirstFolderNodeId|];
            });
            test(
              "test add a new folder, use the id which was added into removedAssetIdArray before",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                let component = BuildComponentTool.buildAssetComponent();
                let removedfirstFolderNodeId =
                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderNodeId;

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
                |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                     component,
                   );
                _triggerRemoveFolderClick(component);

                BaseEventTool.triggerComponentEvent(
                  BuildComponentTool.buildAssetComponent(),
                  AssetTreeEventTool.triggerAddFolderClick,
                );

                StateEditorService.getState()
                |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                |> (root => root.children)
                |> ArrayService.getLast
                |> (assetNode => assetNode.id)
                |> expect == removedfirstFolderNodeId;
              },
            );
          })
        );
      });
    });
  });