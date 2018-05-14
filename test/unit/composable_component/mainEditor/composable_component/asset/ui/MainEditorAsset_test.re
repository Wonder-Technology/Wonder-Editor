open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentTreeNode: option(int),
  currentFile: option(int),
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
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test show component",
        () =>
          test(
            "show MainEditorAsset snapshot",
            () => BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
          )
      );
      describe(
        "test should update",
        () => {
          test(
            "if (assetTree,currentTreeNode,currentFile,fileMap) not change, should not update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
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
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildTwoLayerAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentTreeNode change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(2),
                    currentFile: Some(2),
                    fileMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentFile change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(4),
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
                    currentTreeNode: Some(1),
                    currentFile: Some(2),
                    fileMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentTreeNode: Some(1),
                    currentFile: Some(4),
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