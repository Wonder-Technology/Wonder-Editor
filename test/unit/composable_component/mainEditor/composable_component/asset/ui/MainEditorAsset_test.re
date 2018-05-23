/* open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentAssetChildrenNodeParent: option(int),
  currentAssetTreeNode: option(int),
  nodeMap: array(FileType.fileResultType)
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
                              AssetUtils.buildAssetChildrenNodeParentByIndex(
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
            "if (assetTree,currentAssetChildrenNodeParent,currentAssetTreeNode,nodeMap) not change, should not update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
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
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildTwoLayerAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentAssetChildrenNodeParent change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(2),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
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
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(4),
                    nodeMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if nodeMap change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTree: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentAssetTreeNode: Some(4),
                    nodeMap: MainEditorAssetTool.buildFakeNodeMap([||])
                  }
                )
              )
              |> expect == true
          )
        }
      )
    }
  ); */