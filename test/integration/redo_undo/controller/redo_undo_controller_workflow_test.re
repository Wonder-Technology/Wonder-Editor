open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: controller workflow", () => {
    let sandbox = getSandboxDefaultVal();

    let _addGameObjectWithCount = count =>
      Array.make(count, 0) |> Array.iter(_ => MainEditorSceneTreeHeaderTool.addBox());

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.stubCancelAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });

    test("init default scene", () =>
      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 4
    );
    test("add two gameObject", () => {
      _addGameObjectWithCount(2);

      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 6;
    });
    test("undo one step", () => {
      _addGameObjectWithCount(2);

      RedoUndoTool.undoHistoryState();

      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 5;
    });
    test("click run button(which store all stack), add three gameObject", () => {
      _addGameObjectWithCount(2);

      RedoUndoTool.undoHistoryState();

      ControllerTool.run();

      _addGameObjectWithCount(3);

      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 8;
    });
    test("undo one step", () => {
      _addGameObjectWithCount(2);

      RedoUndoTool.undoHistoryState();

      ControllerTool.run();

      _addGameObjectWithCount(3);

      RedoUndoTool.undoHistoryState();

      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 7;
    });
    test("redo one step", () => {
      _addGameObjectWithCount(2);
      RedoUndoTool.undoHistoryState();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      RedoUndoTool.undoHistoryState();
      RedoUndoTool.redoHistoryState();
      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 8;
    });
    test("click stop button(which restore all stack)", () => {
      _addGameObjectWithCount(2);

      RedoUndoTool.undoHistoryState();

      ControllerTool.run();

      _addGameObjectWithCount(3);

      RedoUndoTool.undoHistoryState();
      RedoUndoTool.redoHistoryState();

      ControllerTool.stop();
      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 5;
    });
    test("undo one step(which back to the initial state)", () => {
      _addGameObjectWithCount(2);
      RedoUndoTool.undoHistoryState();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      RedoUndoTool.undoHistoryState();
      RedoUndoTool.redoHistoryState();
      ControllerTool.stop();
      RedoUndoTool.undoHistoryState();
      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 4;
    });
    test("redo two step", () => {
      _addGameObjectWithCount(2);
      RedoUndoTool.undoHistoryState();
      ControllerTool.run();
      _addGameObjectWithCount(3);
      RedoUndoTool.undoHistoryState();
      RedoUndoTool.redoHistoryState();
      ControllerTool.stop();
      RedoUndoTool.redoHistoryState();
      RedoUndoTool.redoHistoryState();
      StateEngineService.unsafeGetState()
      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
      |> Js.Array.length
      |> expect == 6;
    });
  });