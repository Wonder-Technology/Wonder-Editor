open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open AssetNodeType;

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType)
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
          ();
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test should update",
        () => {
          let _buildSimpleAssetTreeRoot = () => {id: 0, children: [||]};
          let _buildTwoLayerAssetTreeRoot = () => {id: 0, children: [|{id: 1, children: [||]}|]};
          let _buildFakeNodeMap = () => [|
            {name: "img", type_: AssetNodeType.Image, result: None}
          |];
          test(
            "if (assetTreeRoot,currentAssetChildrenNodeParent,currentNodeId,nodeMap) not change, should not update",
            () =>
              MainEditorAsset.shouldUpdate(
                OldNewSelfTool.buildOldNewSelf(
                  {
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
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
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(_buildTwoLayerAssetTreeRoot()),
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
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
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
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
                    currentNodeId: Some(2),
                    nodeMap: [||]
                  },
                  {
                    assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
                    currentNodeId: Some(2),
                    nodeMap: _buildFakeNodeMap()
                  }
                )
              )
              |> expect == true
          )
        }
      )
    }
  );