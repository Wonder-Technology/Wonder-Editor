open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open CurrentNodeDataType;

let _ =
  describe("MainEditorAssetTree", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentNode and currentNodeParent", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        )
      );
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      describe("click assetTree node", () =>
        test("currentNodeId and currentNodeParentId should be same", () => {
          MainEditorAssetTreeTool.triggerClickAssetTreeNode(2);

          let assetState = StateAssetService.getState();
          let {currentNodeId, nodeType} =
            assetState |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

          let currentNodeParentId =
            assetState
            |> CurrentNodeParentIdAssetService.getCurrentNodeParentId;

          expect(currentNodeId)
          == (currentNodeParentId |> OptionService.unsafeGet);
        })
      );
    });

    describe("test drag assetTreeNode to assetTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        )
      );
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      describe("test has children case", () => {
        describe("have first layer children", () => {
          test("no drag", () =>
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch
          );

          test("drag treeNode into brother treeNode", () => {
            let component = BuildComponentTool.buildAssetComponent();
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(2),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDropEvent(1),
            );
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("have second layer children", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorAssetTool.initAssetTree(
                MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
              ),
            )
          );
          afterEach(() =>
            StateAssetService.getState()
            |> CurrentNodeDataAssetService.clearCurrentNodeData
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );

          test("no drag", () =>
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch
          );

          test("drag second treeNode into root treeNode", () => {
            let component = BuildComponentTool.buildAssetComponent();
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerSecondLayerDragStartEvent(2, 1),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerRootDragEnterEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerRootDropEvent,
            );
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });
    });

    describe("test drag assetChildrenNode to assetTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        )
      );
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      test("test no drag", () =>
        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch
      );

      test("test drag folder into it's parent's brother folder", () => {
        MainEditorAssetTreeTool.triggerClickAssetTreeNode(2);

        let component =
          MainEditorAssetTreeTool.triggerAssetChildrenNodeDragEvent(1, 1, 1);

        component |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's parent's brother folder", () => {
        MainEditorAssetTreeTool.triggerClickAssetTreeNode(2);
        let component =
          MainEditorAssetTreeTool.triggerAssetChildrenNodeDragEvent(2, 1, 1);

        component |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's brother folder", () => {
        MainEditorAssetTreeTool.triggerClickAssetTreeNode(2);

        let component = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFileDragStartEvent(2),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFolderDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFolderDragLeaveEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFolderDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFolderDragDropEvent(1),
        );
        component |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("deal with the specific case", () => {
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );
      test("if drag treeNode into itself, keep not change", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        );
        let component = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDropEvent(1),
        );
        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("if drag treeNode into it's chidlren, keep not change", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        );
        let component = BuildComponentTool.buildAssetComponent();

        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(2),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerSecondLayerDragEnterEvent(2, 1),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerSecondLayerDropEvent(2, 1),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("fix bug: drag assetTree node into sceneTree div", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        );
        let assetComponent = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent,
          AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(1),
        );

        let component =
          BuildComponentTool.buildSceneTree(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );
        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerDragEnterDiv(3),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerDragDropDiv(3),
        );
        BuildComponentTool.buildSceneTree(
          TestTool.buildAppStateSceneGraphFromEngine(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });