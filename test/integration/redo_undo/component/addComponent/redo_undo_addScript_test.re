open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add script component", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulate = () =>
      MainEditorInspectorAddComponentTool.addScriptComponent();

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
          let addedNodeId = _simulate();

          RedoUndoTool.undoHistoryState();

          GameObjectComponentEngineService.hasScriptComponent(
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        })
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          "undo step which from first to zero, redo step which from zero to first",
          () => {
          let addedNodeId = _simulate();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          GameObjectComponentEngineService.hasScriptComponent(
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        })
      )
    );
  });