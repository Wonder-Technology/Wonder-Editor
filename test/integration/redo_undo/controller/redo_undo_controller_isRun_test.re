open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: controller isRun", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("undo to the state before run", () => {
      test("isRun should still be true", () => {
        MainEditorSceneTreeHeaderTool.addCube();

        ControllerTool.run();

        RedoUndoTool.undoHistoryState();

        ControllerTool.getIsRun() |> expect == true;
      });

      describe("test stop", () => {
        test("isRun should be false", () => {
          MainEditorSceneTreeHeaderTool.addCube();

          ControllerTool.run();
          RedoUndoTool.undoHistoryState();
          ControllerTool.stop();

          ControllerTool.getIsRun() |> expect == false;
        });
        test("the cancelAnimationFrame is called", () => {
          let cancel = createEmptyStubWithJsObjSandbox(sandbox);
          ControllerTool.stubCancelAnimationFrame(cancel);
          MainEditorSceneTreeHeaderTool.addCube();

          ControllerTool.run();
          RedoUndoTool.undoHistoryState();
          ControllerTool.stop();

          cancel |> expect |> toCalledOnce;
        });
      });

      describe("test redo to the state after run", () =>
        test("isRun should still be true", () => {
          MainEditorSceneTreeHeaderTool.addCube();

          ControllerTool.run();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          ControllerTool.getIsRun() |> expect == true;
        })
      );
    });
  });