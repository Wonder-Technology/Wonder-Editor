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
  currentNodeParentId: option(int),
  folderNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.folderResultType),
  textureNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.textureResultType),
  jsonNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.jsonResultType),
};

/* TODO fix "rename texture" bug
make test wrong first */

let _ =
  describe("MainEditorAsset", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test should update", () => {
      let _buildSimpleAssetTreeRoot = () => {
        id: 0,
        type_: Folder,
        children: [||],
      };
      let _buildTwoLayerAssetTreeRoot = () => {
        id: 0,
        type_: Folder,
        children: [|{id: 1,type_: Folder , children: [||]}|],
      };
      let _buildFakeFolderNodeMap = () => [|{name: "newFolder"}|];
      let _buildFakeTextureNodeMap = () => [|{textureIndex: 0}|];
      let _buildFakeJsonNodeMap = () => [|
        {name: "newJson", jsonResult: "json result"},
      |];

      test(
        "if (assetTreeRoot,currentAssetChildrenNodeParent,currentNodeId,nodeMap) not change, should not update",
        () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == false
      );
      test("else if currentNodeParent change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(6),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
      test("else if assetTreeRoot change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildTwoLayerAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
      test("else if currentNodeId change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(4),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
      test("else if folder nodeMap change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: _buildFakeFolderNodeMap(),
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );

      test("else if texture nodeMap change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: _buildFakeTextureNodeMap(),
            },
          ),
        )
        |> expect == true
      );

      test("else if json nodeMap change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeId: Some(2),
              currentNodeParentId: Some(4),
              folderNodeMap: [||],
              jsonNodeMap: _buildFakeJsonNodeMap(),
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
    });
  });