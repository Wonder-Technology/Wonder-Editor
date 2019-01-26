open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo:leftHeader add gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateAddCubeAndEmptyGameObject = () => {
      MainEditorLeftHeaderTool.addCube();
      MainEditorLeftHeaderTool.addEmptyGameObject();
    };
    let _simulateTwiceAddSphere = () => {
      MainEditorLeftHeaderTool.addSphere();
      MainEditorLeftHeaderTool.addSphere();
    };
    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "add cube and empty gameObject;
      prepare first step: set currentSceneTreeNode",
      (_simulateAddCubeAndEmptyGameObject, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildSceneTree,
    );

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "add sphere;
      prepare first step: set currentSceneTreeNode",
      (_simulateTwiceAddSphere, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildSceneTree,
    );
  });