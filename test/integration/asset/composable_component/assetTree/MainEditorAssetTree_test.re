open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          ()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test drag assetTreeNode to assetTreeNode",
        () => {
          test(
            "test simple assetTreeRoot which haven't children case",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(() => ())
              );
              BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
            }
          );
          describe(
            "test has children case",
            () => {
              describe(
                "have first layer children",
                () => {
                  beforeEach(
                    () =>
                      MainEditorSceneTool.createDefaultScene(
                        sandbox,
                        MainEditorAssetTool.initAssetTree(
                          MainEditorAssetTool.buildTwoLayerAssetTreeRoot
                        )
                      )
                  );
                  test(
                    "no drag",
                    () =>
                      BuildComponentTool.buildAssetComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                  );
                  test(
                    "drag treeNode into borther treeNode",
                    () => {
                      let component = BuildComponentTool.buildAssetComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(2)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerFirstLayerDropEvent(1)
                      );
                      BuildComponentTool.buildAssetComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              );
              describe(
                "have second layer children",
                () => {
                  beforeEach(
                    () =>
                      MainEditorSceneTool.createDefaultScene(
                        sandbox,
                        MainEditorAssetTool.initAssetTree(
                          MainEditorAssetTool.buildThreeLayerAssetTreeRoot
                        )
                      )
                  );
                  test(
                    "no drag",
                    () =>
                      BuildComponentTool.buildAssetComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                  );
                  test(
                    "drag second treeNode into root treeNode",
                    () => {
                      let component = BuildComponentTool.buildAssetComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerSecondLayerDragStartEvent(2, 1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerRootDragEnterEvent
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeDragEventTool.triggerRootDropEvent
                      );
                      BuildComponentTool.buildAssetComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "test drag assetChildrenNode to assetTreeNode",
        () => {
          let _triggerFileDragStartEvent = (index, domChildren) => {
            let content = _getFromArray(domChildren, 1);
            let fileArticle = _getFromArray(content##children, index);
            let file = _getFromArray(fileArticle##children, 0);
            BaseEventTool.triggerDragStartEvent(file, BaseEventTool.buildDragEvent())
          };
          beforeEach(
            () =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildThreeLayerAssetTreeRoot)
              )
          );
          test(
            "test no drag",
            () => BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
          );
          test(
            "test drag img file into it's parent brother folder",
            () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(2)
              );
              BaseEventTool.triggerComponentEvent(component, _triggerFileDragStartEvent(2));
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDropEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(1)
              );
              component |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      );
      describe(
        "deal with the specific case",
        () => {
          beforeEach(
            () =>
              StateEditorService.getState()
              |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
              |> StateEditorService.setState
              |> ignore
          );
          test(
            "if drag treeNode into itself, keep not change",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTreeRoot)
              );
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDragEnterEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDropEvent(1)
              );
              BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
            }
          );
          test(
            "if drag treeNode into it's chidlren, keep not change",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildThreeLayerAssetTreeRoot)
              );
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerFirstLayerDragStartEvent(2)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerSecondLayerDragEnterEvent(2, 1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeDragEventTool.triggerSecondLayerDropEvent(2, 1)
              );
              BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      )
    }
  );