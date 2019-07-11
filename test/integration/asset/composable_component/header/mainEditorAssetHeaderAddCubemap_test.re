open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader->add cubemap", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareAndExecAndGetCubemapNode = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
      let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addCubemap();

      (
        assetTreeData,
        StateEditorService.getState()
        |> OperateTreeAssetEditorService.unsafeFindNodeById(
             addedCubemapNodeId,
           ),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if not select specific treeNode", () =>
      describe("should add cubemap into root treeNode", () => {
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          MainEditorAssetHeaderOperateNodeTool.addCubemap();

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("the added cubemap's parent node should be root", () => {
          let (assetTreeData, node) = _prepareAndExecAndGetCubemapNode();

          MainEditorAssetTreeTool.findNodeParentId(
            node,
            StateEditorService.getState(),
          )
          |> OptionService.unsafeGet
          |> expect
          == MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getRootNodeId(
               assetTreeData,
             );
        });
      })
    );

    describe("else", () =>
      describe("add cubemap into specific treeNode", () =>
        test("test snapshot", () => {
          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addCubemap();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    test("create new cubemap", () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
      let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
      let newCubemap = CubemapTextureToolEngine.getNewCubemap();

      MainEditorAssetHeaderOperateNodeTool.addCubemap();

      let cubemapComponent =
        MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
          ~nodeId=addedCubemapNodeId,
          (),
        );

      cubemapComponent |> expect == newCubemap;
    });

    test("init new cubemap", () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
      let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
      let newCubemap = CubemapTextureToolEngine.getNewCubemap();

      let glTexture = Obj.magic(1);
      let createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
      createTexture |> onCall(0) |> returns(glTexture);

      FakeGlToolEngine.setFakeGl(
        FakeGlToolEngine.buildFakeGl(~sandbox, ~createTexture, ()),
      )
      |> StateLogicService.getAndSetEngineState;

      MainEditorAssetHeaderOperateNodeTool.addCubemap();

      CubemapTextureToolEngine.unsafeGetGlTexture(
        MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
          ~nodeId=addedCubemapNodeId,
          (),
        ),
      )
      |> StateLogicService.getEngineStateToGetData
      |> expect == glTexture;
    });

    /* test("set face source imageDataIndex to None", () => {
         let assetTreeData =
           MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
         let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();

         MainEditorAssetHeaderOperateNodeTool.addCubemap();

         let editorState = StateEditorService.getState();

         let {
           pxImageDataIndex,
           nxImageDataIndex,
           pyImageDataIndex,
           nyImageDataIndex,
           pzImageDataIndex,
           nzImageDataIndex,
         }: NodeAssetType.cubemapNodeData =
           OperateTreeAssetEditorService.unsafeFindNodeById(
             addedCubemapNodeId,
             editorState,
           )
           |> CubemapNodeAssetService.getNodeData;

         (
           pxImageDataIndex,
           nxImageDataIndex,
           pyImageDataIndex,
           nyImageDataIndex,
           pzImageDataIndex,
           nzImageDataIndex,
         )
         |> expect == (None, None, None, None, None, None);
       }); */

    describe("test name", () => {
      test("test default name", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

        MainEditorAssetHeaderOperateNodeTool.addCubemap();

        BuildComponentTool.buildAssetComponent()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test(
        {|remove first cubemap which use default name;
             add three cubemap;

             the first new one's name should be removed-cubemap's name;
                     |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
          let nodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
              assetTreeData,
            );
          AssetInspectorTool.Rename.renameAssetCubemapNode(
            ~nodeId,
            ~name=OperateCubemapLogicService.getDefaultName(),
            (),
          );

          MainEditorAssetHeaderOperateNodeTool.removeCubemapNode(
            ~cubemapNodeId=nodeId,
            (),
          );
          MainEditorAssetHeaderOperateNodeTool.addCubemap();
          MainEditorAssetHeaderOperateNodeTool.addCubemap();
          MainEditorAssetHeaderOperateNodeTool.addCubemap();
          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getRootNodeId(
                assetTreeData,
              ),
            (),
          );

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });