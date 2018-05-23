/* open Wonder_jest;

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
                  AssetEditorService.clearCurrentAssetChildrenNodeParent |> StateLogicService.getAndSetEditorState
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
                  MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
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
                  AssetEditorService.clearCurrentAssetChildrenNodeParent |> StateLogicService.getAndSetEditorState
              );
              test(
                "if not set specific treeNode, removeFolder button's disabled props should == true ",
                () =>
                  BuildComponentTool.buildAssetHeaderComponent()
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "else if set rootTreeNode is currentAssetChildrenNodeParent, removeFolder button's disabled props should == true",
                () => {
                  MainEditorAssetTool.setRootToBeCurrentAssetChildrenNodeParent();
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
                      MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
                      BuildComponentTool.buildAssetHeaderComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "click removeFolder button should remove folder from assetTree",
                    () => {
                      MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent();
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
              beforeEach(() => MainEditorAssetTool.setFolder2ToBeCurrentAssetChildrenNodeParent());
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
                      MainEditorAssetTool.setImgFileToBeCurrentAssetTreeNode();
                      BuildComponentTool.buildAssetHeaderComponent()
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "click removeFile button should remove file from assetTree",
                    () => {
                      MainEditorAssetTool.setImgFileToBeCurrentAssetTreeNode();
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
      );
      describe(
        "test load file",
        () => {
          beforeEach(() => MainEditorAssetTool.setFolder1ToBeCurrentAssetChildrenNodeParent());
          testPromise(
            "test load file into assetTree",
            () => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent()
              )
              |> Js.Promise.then_(
                   (_) => {
                     WonderLog.Log.logJson(
                       StateEditorService.getState() |> AssetEditorService.unsafeGetAssetTree
                     );
                     BuildComponentTool.buildAssetFileContentComponent()
                     |> ReactTestTool.createSnapshotAndMatch
                     |> Js.Promise.resolve
                   }
                 )
            }
          )
        }
      )
    }
  ); */