open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Result.RelationResult;

let _ =
  describe("OperateTreeAssetLogicService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("checkNodeRelation", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.prepareScene(sandbox);
      });

      test("if target node is folder node, success", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree();
        let secondLayerFirstFolderNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getSecondLayerFirstFolderNodeId(
            assetTreeData,
          );
        let thirdLayerFirstTextureNodeId =
          MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.getThirdLayerFirstTextureNodeId(
            assetTreeData,
          );

        OperateTreeAssetLogicService.checkNodeRelation(
          thirdLayerFirstTextureNodeId,
          secondLayerFirstFolderNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> isSuccess
        |> expect == true;
      });
    });
  });