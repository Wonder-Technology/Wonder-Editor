open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test operate treeNode", () => {
      describe("test add folder", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
            ),
          );
          StateEditorService.getState()
          |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> StateEditorService.setState
          |> ignore;
        });
        describe(
          "if not select specific treeNode, add folder into root treeNode", () => {
          test("test snapshot", () => {
            let component = BuildComponentTool.buildAssetComponent();
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeEventTool.triggerAddFolderClick,
            );
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
          describe("test logic", () => {
            test("test asset children length before add folder", () =>
              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 4
            );

            test("test asset children length after add folder", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerAddFolderClick,
              );
              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 5;
            });
          });
        });

        test("else, add folder into specific treeNode", () => {
          let component = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.clickAssetTreeNode(1),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerAddFolderClick,
          );
          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test remove tree node", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
            ),
          );
          StateEditorService.getState()
          |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> StateEditorService.setState
          |> ignore;
        });
        test(
          "if not select specific treeNode, remove-button's disabled props should == true ",
          () =>
          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch
        );
        describe("else", () => {
          describe("test snapshot", () => {
            test("remove-button's disabled props should == false", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(1),
              );
              component |> ReactTestTool.createSnapshotAndMatch;
            });
            describe("test select folder", () =>
              test(
                "click remove-button should remove folder from assetTreeRoot",
                () => {
                let component = BuildComponentTool.buildAssetComponent();
                BaseEventTool.triggerComponentEvent(
                  component,
                  AssetTreeEventTool.clickAssetTreeNode(1),
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  AssetTreeEventTool.triggerRemoveNodeClick,
                );
                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
            describe("test select file", () => {
              test(
                "select img;
                click remove-button;
                should remove it from assetTreeRoot",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeChildrenNode(2),
                  );
                  let component2 = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component2,
                    AssetTreeEventTool.triggerRemoveNodeClick,
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
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeChildrenNode(3),
                  );
                  let component2 = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component2,
                    AssetTreeEventTool.triggerRemoveNodeClick,
                  );
                  BuildComponentTool.buildAssetComponent()
                  |> ReactTestTool.createSnapshotAndMatch;
                },
              );
            });
          });

          describe("test logic", () => {
            beforeEach(() => {
              StateEditorService.getState()
              |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
              |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
              |> AssetNodeMapEditorService.clearNodeMap
              |> StateEditorService.setState
              |> ignore;
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(
                  MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
                ),
              );
            });
            test("test assetTree root length before remove", () =>
              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 2
            );
            test("test remove node from aseetTreeRoot", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(1),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerRemoveNodeClick,
              );
              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 1;
            });
            test("test remove node shouldn't change nodeMap", () => {
              let normalNodeMap =
                StateEditorService.getState()
                |> AssetNodeMapEditorService.unsafeGetNodeMap;


              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(2),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerRemoveNodeClick,
              );

              let newNodeMap =
                StateEditorService.getState()
                |> AssetNodeMapEditorService.unsafeGetNodeMap;

              normalNodeMap |> expect != newNodeMap;
            });
          });
        });
      });
    });
    describe("test load file", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        );
        StateEditorService.getState()
        |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
        |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
        |> StateEditorService.setState
        |> ignore;
      });
      testPromise("test snapshot", () => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetHeader.Method._fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildFileEvent(),
        )
        |> Js.Promise.then_(_ =>
             BuildComponentTool.buildAssetComponent()
             |> ReactTestTool.createSnapshotAndMatch
             |> Js.Promise.resolve
           );
      });
      testPromise("test logic", () => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetHeader.Method._fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildFileEvent(),
        )
        |> Js.Promise.then_(_ =>
             StateEditorService.getState()
             |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
             |> (root => root.children)
             |> Js.Array.length
             |> expect == 6
             |> Js.Promise.resolve
           );
      });
    });
  });