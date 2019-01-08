open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("redo_undo: leftHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test(
          {|
            1.add cube;
            2.undo;

            scene tree should has no cube.
            |},
          () => {
            MainEditorLeftHeaderTool.addCube();

            RedoUndoTool.undoHistoryState();

            BuildComponentTool.buildSceneTree(
              TestTool.buildEmptyAppState(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          },
        )
      )
    );
  });