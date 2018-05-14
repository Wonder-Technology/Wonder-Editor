open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetHeader",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate treeNode",
        () => {
          describe(
            "test add folder",
            () => {
              let triggerAddFolderClick = (domChildren) => {
                let headerItem = _getFromArray(domChildren, 0);
                let button = _getFromArray(headerItem##children, 0);
                BaseEventTool.triggerClickEvent(button)
              };
              beforeEach(
                () =>
                  AssetEditorService.clearCurrentTreeNode |> StateLogicService.getAndSetEditorState
              );
              test(
                "if not set specific treeNode, add folder into root treeNode",
                () => {
                  let component = BuildComponentTool.buildAssetHeaderComponent();
                  BaseEventTool.triggerComponentEvent(component, triggerAddFolderClick);
                  BuildComponentTool.buildAssetTreeComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, add folder into specific treeNode",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
                  let component = BuildComponentTool.buildAssetHeaderComponent();
                  BaseEventTool.triggerComponentEvent(component, triggerAddFolderClick);
                  BuildComponentTool.buildAssetTreeComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          );
          describe(
            "test remove folder",
            () => {
              let triggerRemoveFolderClick = (domChildren) => {
                let headerItem = _getFromArray(domChildren, 1);
                let button = _getFromArray(headerItem##children, 0);
                BaseEventTool.triggerClickEvent(button)
              };
              beforeEach(
                () =>
                  AssetEditorService.clearCurrentTreeNode |> StateLogicService.getAndSetEditorState
              );
              test(
                "if not set specific treeNode, removeFolder button's disabled props should == true ",
                () =>
                  BuildComponentTool.buildAssetHeaderComponent()
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "else if set rootTreeNode is currentTreeNode, removeFolder button's disabled props should == true",
                () => {
                  MainEditorAssetTool.setRootToBeCurrentTreeNode();
                  BuildComponentTool.buildAssetHeaderComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "else",
                () => {
                  test(
                    "removeFolder button's disabled props should == false",
                    () => {
                      MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
                      BuildComponentTool.buildAssetHeaderComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "click removeFolder button should remove folder from assetTree",
                    () => {
                      MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
                      let component = BuildComponentTool.buildAssetHeaderComponent();
                      BaseEventTool.triggerComponentEvent(component, triggerRemoveFolderClick);
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
        "test operate file",
        () =>
          describe(
            "test remove file",
            () => {
              let triggerRemoveFileClick = (domChildren) => {
                let headerItem = _getFromArray(domChildren, 2);
                let button = _getFromArray(headerItem##children, 0);
                BaseEventTool.triggerClickEvent(button)
              };
              beforeEach(() => MainEditorAssetTool.setFolder2ToBeCurrentTreeNode());
              test(
                "if not set specific file, removeFile button's disabled props should == true ",
                () =>
                  BuildComponentTool.buildAssetHeaderComponent()
                  |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "else",
                () => {
                  test(
                    "removeFile button's disabled props should == false",
                    () => {
                      MainEditorAssetTool.setImgFileToBeCurrentFile();
                      BuildComponentTool.buildAssetHeaderComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "click removeFile button should remove file from assetTree",
                    () => {
                      MainEditorAssetTool.setImgFileToBeCurrentFile();
                      let component = BuildComponentTool.buildAssetHeaderComponent();
                      BaseEventTool.triggerComponentEvent(component, triggerRemoveFileClick);
                      BuildComponentTool.buildAssetFileContentComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              )
            }
          )
      )
    }
  );