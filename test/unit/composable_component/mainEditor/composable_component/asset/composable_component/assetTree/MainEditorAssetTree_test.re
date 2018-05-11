open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test show component",
        () => {
          test(
            "test simple assetTree which haven't children case",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildSimpleAssetTree)
              );
              BuildComponentTool.buildAssetTreeComponent() |> ReactTestTool.createSnapshotAndMatch
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
                          MainEditorAssetTool.buildTwoLayerAssetTree
                        )
                      )
                  );
                  test(
                    "no drag",
                    () =>
                      BuildComponentTool.buildAssetTreeComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                  );
                  test(
                    "drag treeNode into borther treeNode",
                    () => {
                      let component = BuildComponentTool.buildAssetTreeComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerFirstLayerDragStartEvent(2)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerFirstLayerDragEnterEvent(1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerFirstLayerDropEvent(1)
                      );
                      BuildComponentTool.buildAssetTreeComponent()
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
                          MainEditorAssetTool.buildThreeLayerAssetTree
                        )
                      )
                  );
                  test(
                    "no drag",
                    () =>
                      BuildComponentTool.buildAssetTreeComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                  );
                  test(
                    "drag second treeNode into root treeNode",
                    () => {
                      let component = BuildComponentTool.buildAssetTreeComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerSecondLayerDragStartEvent(1, 1)
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerRootDragEnterEvent
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.triggerRootDropEvent
                      );
                      BuildComponentTool.buildAssetTreeComponent()
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
        "deal with the specific case",
        () => {
          test(
            "if drag treeNode into itself, keep not change",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
              );
              let component = BuildComponentTool.buildAssetTreeComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerDragStartEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerDragEnterEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerDropEvent(1)
              );
              BuildComponentTool.buildAssetTreeComponent() |> ReactTestTool.createSnapshotAndMatch
            }
          );
          test(
            "if drag treeNode into it's chidlren, keep not change",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildThreeLayerAssetTree)
              );
              let component = BuildComponentTool.buildAssetTreeComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerDragStartEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerSecondLayerDragEnterEvent(1, 1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerSecondLayerDropEvent(1, 1)
              );
              BuildComponentTool.buildAssetTreeComponent() |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      )
    }
  );