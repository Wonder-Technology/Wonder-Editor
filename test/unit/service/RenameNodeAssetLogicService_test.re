open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("RenameNodeAssetLogicService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("renameNode", () => {
      test("test1", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let textureNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );

        let result =
          RenameNodeAssetLogicService.renameNode(
            textureNodeId,
            "zzz",
            (editorState, engineState),
          );
        let (editorState, engineState) =
          Result.SameDataResult.getData(result);

        NodeNameAssetLogicService.getNodeName(
          OperateTreeAssetEditorService.unsafeFindNodeById(
            textureNodeId,
            editorState,
          ),
          engineState,
        )
        |> expect == "zzz";
      });
      test("test2", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
            assetTreeData,
          );

        let result =
          RenameNodeAssetLogicService.renameNode(
            nodeId,
            "zzz",
            (editorState, engineState),
          );
        let (editorState, engineState) =
          Result.SameDataResult.getData(result);

        NodeNameAssetLogicService.getNodeName(
          OperateTreeAssetEditorService.unsafeFindNodeById(
            nodeId,
            editorState,
          ),
          engineState,
        )
        |> expect == "zzz";
      });
    });
  });