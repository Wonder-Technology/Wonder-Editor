/* open Wonder_jest;

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
          MainEditorSceneTool.initStateAndGl(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test drag treeNode to treeNode",
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
        "test drag file to treeNode",
        () => {
          let _triggerFileDragStartEvent = (index, domChildren) => {
            let fileArticle = _getFromArray(domChildren, index);
            let file = _getFromArray(fileArticle##children, 0);
            BaseEventTool.triggerDragStartEvent(file, BaseEventTool.buildDragEvent())
          };
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
              );
              MainEditorAssetTool.setFolder2ToBeCurrentAssetChildrenNodeParent()
            }
          );
          test(
            "if not drag file to folder1, show it snapshot",
            () => {
              MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
            }
          );
          test(
            "drag file into folder1, show it snapshot",
            () => {
              let fileContentComponent = BuildComponentTool.buildAssetFileContentComponent();
              let assetTreeComponent = BuildComponentTool.buildAssetTreeComponent();
              BaseEventTool.triggerComponentEvent(
                fileContentComponent,
                _triggerFileDragStartEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                assetTreeComponent,
                AssetTreeEventTool.triggerFirstLayerDragEnterEvent(1)
              );
              BaseEventTool.triggerComponentEvent(
                assetTreeComponent,
                AssetTreeEventTool.triggerFirstLayerDropEvent(1)
              );
              MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      );
      describe(
        "test set currentAssetChildrenNodeParent",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
              );
              AssetEditorService.clearCurrentAssetChildrenNodeParent |> StateLogicService.getEditorState |> ignore
            }
          );
          test(
            "click treeNode to set currentAssetChildrenNodeParent",
            () => {
              let component = BuildComponentTool.buildAssetTreeComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerClickEvent(1)
              );
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentAssetChildrenNodeParent
              |> expect == MainEditorAssetTool.folderId1
            }
          );
          test(
            "click treeNode should clear currentAssetTreeNode",
            () => {
              let component = BuildComponentTool.buildAssetTreeComponent();
              MainEditorAssetTool.setImgFileToBeCurrentAssetTreeNode();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerFirstLayerClickEvent(2)
              );
              StateEditorService.getState() |> AssetEditorService.getCurrentAssetTreeNode |> expect == None
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
              |> AssetEditorService.clearCurrentAssetChildrenNodeParent
              |> AssetEditorService.clearCurrentAssetTreeNode
              |> StateEditorService.setState
              |> ignore
          );
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
  ); */