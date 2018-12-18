open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset remove material", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateOnceRemoveMaterial = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
      let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addMaterial();
      MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
        ~materialNodeId=addedMaterialNodeId1,
        (),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test("step which from first to zero", () => {
          _simulateOnceRemoveMaterial();

          RedoUndoTool.undoHistoryState();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          "undo step which from first to zero, redo step which from zero to first",
          () => {
          _simulateOnceRemoveMaterial();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );
  });