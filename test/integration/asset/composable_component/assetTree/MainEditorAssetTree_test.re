open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

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

      describe("click assetTree node", () =>
        test("currentNodeId and currentNodeParentId should be same", () => {
          let component1 = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component1,
            AssetTreeEventTool.clickAssetTreeNode(2),
          );

          let editorState = StateEditorService.getState();
          let currentNodeId =
            editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId;

          let currentNodeParentId =
            editorState
            |> AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId;

          expect(currentNodeId |> OptionService.unsafeGet)
          == (currentNodeParentId |> OptionService.unsafeGet);
        })
      );
    });

    describe("test drag assetTreeNode to assetTreeNode", () => {
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

      describe("test has children case", () => {
        describe("have first layer children", () => {
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
          beforeEach(() => {
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorAssetTool.initAssetTree(
                MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
              ),
            );
            StateEditorService.getState()
            |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
            |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
            |> StateEditorService.setState
            |> ignore;
          });

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
      let _triggerFileDragStartEvent = (index, domChildren) => {
        let content = _getFromArray(domChildren, 1);
        let fileArticle = _getFromArray(content##children, index);
        let file = _getFromArray(fileArticle##children, 0);
        BaseEventTool.triggerDragStartEvent(
          file,
          BaseEventTool.buildDragEvent(),
        );
      };
      let _triggerFolderDragEnterEvent = (index, domChildren) => {
        let content = _getFromArray(domChildren, 1);
        let fileArticle = _getFromArray(content##children, index);
        let div = _getFromArray(fileArticle##children, 0);
        BaseEventTool.triggerDragEnterEvent(
          div,
          BaseEventTool.buildDragEvent(),
        );
      };
      let _triggerFolderDragLeaveEvent = (index, domChildren) => {
        let content = _getFromArray(domChildren, 1);
        let fileArticle = _getFromArray(content##children, index);
        let div = _getFromArray(fileArticle##children, 0);
        BaseEventTool.triggerDragLeaveEvent(
          div,
          BaseEventTool.buildDragEvent(),
        );
      };
      let _triggerFolderDragDropEvent = (index, domChildren) => {
        let content = _getFromArray(domChildren, 1);
        let fileArticle = _getFromArray(content##children, index);
        let div = _getFromArray(fileArticle##children, 0);
        BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
      };

      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
          ),
        );
        StateEditorService.getState()
        |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
        |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
        |> StateEditorService.setState
        |> ignore;
      });

      test("test no drag", () =>
        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch
      );

      test("test drag folder into it's parent's brother folder", () => {
        let component1 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component1,
          AssetTreeEventTool.clickAssetTreeNode(2),
        );
        let component2 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFileDragStartEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeDragEventTool.triggerFirstLayerDropEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeEventTool.clickAssetTreeNode(1),
        );
        component2 |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's parent's brother folder", () => {
        let component1 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component1,
          AssetTreeEventTool.clickAssetTreeNode(2),
        );
        let component2 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFileDragStartEvent(2),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeDragEventTool.triggerFirstLayerDropEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          AssetTreeEventTool.clickAssetTreeNode(1),
        );
        component2 |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's brother folder", () => {
        let component1 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component1,
          AssetTreeEventTool.clickAssetTreeNode(2),
        );
        let component2 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFileDragStartEvent(2),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFolderDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFolderDragLeaveEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFolderDragEnterEvent(1),
        );
        BaseEventTool.triggerComponentEvent(
          component2,
          _triggerFolderDragDropEvent(1),
        );
        component2 |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("deal with the specific case", () => {
      beforeEach(() =>
        StateEditorService.getState()
        |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
        |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
        |> StateEditorService.setState
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
            SceneTreeTool.buildAppStateSceneGraphFromEngine(),
          );
        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerDragEnterDiv(3),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          SceneTreeEventTool.triggerDragDropDiv(3),
        );
        let component2 =
          BuildComponentTool.buildSceneTree(
            SceneTreeTool.buildAppStateSceneGraphFromEngine(),
          );
        component2 |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });