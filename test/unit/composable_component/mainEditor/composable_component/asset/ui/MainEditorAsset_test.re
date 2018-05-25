/* open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  assetTreeRoot: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentAssetChildrenNodeParent: option(int),
  currentNodeId: option(int),
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
                "if have no assetTreeRoot, return a new assetTreeRoot",
                () => {
                  let editorState = StateEditorService.getState();
                  editorState
                  |> AssetEditorService.clearAssetTreeRoot
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
                "if have assetTreeRoot, return the assetTreeRoot",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
                  );
                  let editorState = StateEditorService.getState();
                  editorState
                  |> AssetTreeRootEditorService.getAssetTreeRoot
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
            "if (assetTreeRoot,currentAssetChildrenNodeParent,currentNodeId,nodeMap) not change, should not update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  }
                )
              )
              |> expect == false
          );
          test(
            "else if assetTreeRoot change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildTwoLayerAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
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
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(2),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  }
                )
              )
              |> expect == true
          );
          test(
            "else if currentNodeId change, should update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(4),
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
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(MainEditorAssetTool.buildSimpleAssetTree()),
                    currentAssetChildrenNodeParent: Some(1),
                    currentNodeId: Some(4),
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