open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open AssetNodeType;

open MainEditorAsset;

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
    /* describe("test should update", () => {
      open CurrentNodeDataType;

      let _buildSimpleAssetTreeRoot = () => {
        id: 0,
        type_: Folder,
        children: [||],
      };
      let _buildFakeFolderNodeMap = () => [|{name: "newFolder"}|];
      let _buildFakeTextureNodeMap = () => [|{textureIndex: 0}|];
      let _buildFakeJsonNodeMap = () => [|
        {name: "newJson", jsonResult: "json result"},
      |];
      let _buildCurrentFolder = () => {currentNodeId: 1, nodeType: Folder};

      test("if retainedProps not change, should not update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == false
      );
      test("else if currentNodeParentId change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: Some(1),
              currentTextureNodeName: None,
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
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: Some(_buildSimpleAssetTreeRoot()),
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
      test("else if currentNodeData change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: Some(_buildCurrentFolder()),
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
          ),
        )
        |> expect == true
      );
      test("else if CurrentTextureNodeName change, should update", () =>
        MainEditorAsset.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: Some("texture1"),
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
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
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
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
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
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              jsonNodeMap: [||],
              textureNodeMap: [||],
            },
            {
              assetTreeRoot: None,
              currentNodeData: None,
              currentNodeParentId: None,
              currentTextureNodeName: None,
              folderNodeMap: [||],
              textureNodeMap: [||],
              jsonNodeMap: _buildFakeJsonNodeMap(),
            },
          ),
        )
        |> expect == true
      );
    }); */
  });