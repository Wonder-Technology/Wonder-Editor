open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset remove script event function", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateOnceRemoveScriptEventFunction = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
      let addedScriptEventFunctionNodeId1 =
        MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
      MainEditorAssetHeaderOperateNodeTool.removeScriptEventFunctionNode(
        ~scriptEventFunctionNodeId=addedScriptEventFunctionNodeId1,
        (),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test("step which from first to zero", () => {
          _simulateOnceRemoveScriptEventFunction();

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
          _simulateOnceRemoveScriptEventFunction();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          BuildComponentTool.buildAssetChildrenNode()
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );
  });