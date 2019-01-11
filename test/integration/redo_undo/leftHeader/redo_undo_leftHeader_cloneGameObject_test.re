open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo:leftHeader clone gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceCloneGameObject = () => {
      MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();
      MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();
    };
    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceCloneGameObject, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildSceneTree,
    );
  });