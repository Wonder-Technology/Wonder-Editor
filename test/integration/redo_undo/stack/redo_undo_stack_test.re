open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: test stack", () => {
    let sandbox = getSandboxDefaultVal();

    let _addGameObjectWithCount = count =>
      Array.make(count, 0)
      |> Array.iter(_ => MainEditorSceneTreeHeaderTool.addCube());

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("limit stack to max size", () => {
      beforeEach(() =>
        SettingTool.setMaxStackSize(2)
        |> StateLogicService.getAndSetEditorState
      );

      test("should only store max size stacks to undo stack", () => {
        _addGameObjectWithCount(3);

        RedoUndoTool.undoHistoryState();
        RedoUndoTool.undoHistoryState();
        RedoUndoTool.undoHistoryState();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 1;
      });
      test("not affect redo operation", () => {
        _addGameObjectWithCount(3);

        RedoUndoTool.undoHistoryState();
        RedoUndoTool.undoHistoryState();
        RedoUndoTool.redoHistoryState();
        RedoUndoTool.undoHistoryState();
        RedoUndoTool.redoHistoryState();
        RedoUndoTool.undoHistoryState();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 1;
      });

      describe("test controller", () => {
        beforeEach(() => {
          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.stubCancelAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
        });

        describe("test stop", () =>
          test(
            "can undo to stack stored when play which is exceed max stack size",
            () => {
            _addGameObjectWithCount(1);

            ControllerTool.run();
            _addGameObjectWithCount(3);
            ControllerTool.stop();

            StateEngineService.unsafeGetState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length
            |> expect == 1;
          })
        );
      });
    });
  });