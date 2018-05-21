open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentAssetTreeNode: option(int),
  currentAssetFileNode: option(int),
  fileMap: array(FileType.fileResultType)
};

let _ =
  describe(
    "MainEditorAsset",
    () => {
      let sandbox = getSandboxDefaultVal();
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
        "test show component",
        () => {
          beforeEach(
            () =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
              )
          );
          test(
            "show MainEditorAsset snapshot",
            () => BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
          )
        }
      );
      describe(
        "test AssetUtils",
        () =>
          describe(
            "test function initRootAssetTree ",
            () => {
              test(
                "if have no assetTree, return a new assetTree",
                () => {
                  let editorState = StateEditorService.getState();
                  editorState
                  |> AssetEditorService.clearAssetTree
                  |> AssetUtils.initRootAssetTree
                  |>
                  expect == [|
                              AssetUtils.buildAssetTreeNodeByIndex(
                                editorState |> AssetEditorService.getIndex
                              )
                            |]
                }
              );
              test(
                "if have assetTree, return the assetTree",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
                  );
                  let editorState = StateEditorService.getState();
                  editorState
                  |> AssetEditorService.getAssetTree
                  |> Js.Option.getExn
                  |> expect == (editorState |> AssetUtils.initRootAssetTree)
                }
              )
            }
          )
      );
      describe(
        "test should update",
        () => {
          test(
            "if (assetTree,currentAssetTreeNode,currentAssetFileNode,fileMap) not change, should not update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  }
                )
              )
              |> expect == false
          );
          test(
            "else if assetTree change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildTwoLayerAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentAssetTreeNode change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(2),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentAssetFileNode change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(4),
                    fileMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if fileMap change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetTreeNode: Some(1),
                    currentAssetFileNode: Some(4),
                    fileMap: MainEditorAssetTool.buildFakeFileMap([||])
                  }
                )
              )
              |> expect == true
          )
        }
      )
    }
  );