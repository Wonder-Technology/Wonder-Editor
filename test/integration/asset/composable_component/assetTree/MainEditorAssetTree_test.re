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
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));

      StateAssetService.getState()
      |> CurrentNodeDataAssetService.clearCurrentNodeData
      |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
      |> StateAssetService.setState
      |> ignore;
    });

    describe("test set currentNode and currentNodeParent", () =>
      describe("click assetTree node", () =>
        test("currentNodeId and currentNodeParentId should be same", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
               BuildComponentTool.buildAssetComponent(),
             );

          let assetState = StateAssetService.getState();
          let {currentNodeId} =
            assetState |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

          let currentNodeParentId =
            assetState
            |> CurrentNodeParentIdAssetService.unsafeGetCurrentNodeParentId;

          expect(currentNodeId) == currentNodeParentId;
        })
      )
    );

    describe("test drag assetTreeNode to assetTreeNode", () =>
      describe("test has children case", () => {
        describe("have first layer children", () => {
          test("no drag", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("drag treeNode into brother treeNode", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let firstFolderInAssetTree =
              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree;
            let secondFolderInAssetTree =
              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getSecondFolderDomIndexForAssetTree;
            let component = BuildComponentTool.buildAssetComponent();

            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(
                secondFolderInAssetTree,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(
                firstFolderInAssetTree,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerFirstLayerDropEvent(
                firstFolderInAssetTree,
              ),
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("have second layer children", () => {
          test("no drag", () => {
            MainEditorAssetTool.buildThreeLayerAssetTreeRoot() |> ignore;
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("drag second treeNode into root treeNode", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildThreeLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();
            let firstLayerSecondFolderDomIndex =
              MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserSecondFolderDomIndex(
                assetTreeDomRecord,
              );
            let secondLayerFirstFolderDomIndexForAssetTree =
              MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserFirstFolderDomIndexForAssetTree(
                assetTreeDomRecord,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeDragEventTool.triggerSecondLayerDragStartEvent(
                firstLayerSecondFolderDomIndex,
                secondLayerFirstFolderDomIndexForAssetTree,
              ),
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
      })
    );

    describe("test drag assetChildrenNode to assetTreeNode", () => {
      test("test no drag", () => {
        MainEditorAssetTool.buildThreeLayerAssetTreeRoot() |> ignore;

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag folder into it's parent's brother folder", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildThreeLayerAssetTreeRoot();
        let firstLayerFirstFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserFirstFolderDomIndex(
            assetTreeDomRecord,
          );
        let firstLayerSecondFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserSecondFolderDomIndex(
            assetTreeDomRecord,
          );
        let secondLayerFirstFolderDomIndexForAssetChildren =
          MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserFirstFolderDomIndexForAssetChildren(
            assetTreeDomRecord,
          );

        firstLayerSecondFolderDomIndex
        |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
             BuildComponentTool.buildAssetComponent(),
           );
        MainEditorAssetTreeTool.triggerAssetChildrenDragIntoAssetTree(
          secondLayerFirstFolderDomIndexForAssetChildren,
          firstLayerFirstFolderDomIndex,
        );
        BaseEventTool.triggerComponentEvent(
          BuildComponentTool.buildAssetComponent(),
          AssetTreeEventTool.clickAssetTreeNode(
            firstLayerFirstFolderDomIndex,
          ),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's parent's brother folder", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildThreeLayerAssetTreeRoot();
        let firstLayerFirstFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserFirstFolderDomIndex(
            assetTreeDomRecord,
          );
        let firstLayerSecondFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserSecondFolderDomIndex(
            assetTreeDomRecord,
          );
        let secondLayserSecondTextureDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserSecondTextureDomIndex(
            assetTreeDomRecord,
          );

        firstLayerSecondFolderDomIndex
        |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
             BuildComponentTool.buildAssetComponent(),
           );
        MainEditorAssetTreeTool.triggerAssetChildrenDragIntoAssetTree(
          secondLayserSecondTextureDomIndex,
          firstLayerFirstFolderDomIndex,
        );
        BaseEventTool.triggerComponentEvent(
          BuildComponentTool.buildAssetComponent(),
          AssetTreeEventTool.clickAssetTreeNode(
            firstLayerFirstFolderDomIndex,
          ),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test drag texture file into it's brother folder", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildThreeLayerAssetTreeRoot();
        let firstLayerSecondFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserSecondFolderDomIndex(
            assetTreeDomRecord,
          );
        let secondLayerFirstFolderDomIndexForAssetChildren =
          MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserFirstFolderDomIndexForAssetChildren(
            assetTreeDomRecord,
          );
        let secondLayserSecondTextureDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserSecondTextureDomIndex(
            assetTreeDomRecord,
          );

        firstLayerSecondFolderDomIndex
        |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
             BuildComponentTool.buildAssetComponent(),
           );
        MainEditorAssetTreeTool.triggerAssetChildrenDragIntoChildrenFolder(
          secondLayserSecondTextureDomIndex,
          secondLayerFirstFolderDomIndexForAssetChildren,
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("deal with the specific case", () => {
      test("if drag treeNode into itself, keep not change", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let component = BuildComponentTool.buildAssetComponent();
        let firstFolderDomIndex =
          MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree(
            assetTreeDomRecord,
          );

        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(
            firstFolderDomIndex,
          ),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(
            firstFolderDomIndex,
          ),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDropEvent(
            firstFolderDomIndex,
          ),
        );
        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("if drag treeNode into it's chidlren, keep not change", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildThreeLayerAssetTreeRoot();
        let firstLayerSecondFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getFirstLayserSecondFolderDomIndex(
            assetTreeDomRecord,
          );
        let secondLayerFirstFolderDomIndex =
          MainEditorAssetNodeTool.OperateThreeLayer.getSecondLayserFirstFolderDomIndexForAssetTree(
            assetTreeDomRecord,
          );
        let component = BuildComponentTool.buildAssetComponent();

        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(
            firstLayerSecondFolderDomIndex,
          ),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerSecondLayerDragEnterEvent(
            firstLayerSecondFolderDomIndex,
            secondLayerFirstFolderDomIndex,
          ),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeDragEventTool.triggerSecondLayerDropEvent(
            firstLayerSecondFolderDomIndex,
            secondLayerFirstFolderDomIndex,
          ),
        );

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });