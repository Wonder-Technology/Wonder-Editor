let undoHistoryState =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  AllHistoryService.undoHistoryState(
    store,
    dispatchFunc,
    (editorState, engineState),
  )
  |> StateHistoryService.refreshStateForHistory;

let redoHistoryState =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  AllHistoryService.redoHistoryState(
    store,
    dispatchFunc,
    (editorState, engineState),
  )
  |> StateHistoryService.refreshStateForHistory;

let testRedoUndoOneStep =
    (
      sandbox,
      describeName,
      (simulateFunc, beforeEachFunc, afterEachFunc),
      component,
    ) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          describe(
            describeName,
            () => {
              beforeEach(() => beforeEachFunc());
              afterEach(() => afterEachFunc());
              describe("test undo operate", () => {
                test("test not undo", () => {
                  simulateFunc();

                  component() |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("test undo one step", () =>
                  test("undo step which from first to zero", () => {
                    simulateFunc();

                    undoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );
              });
              describe("test redo operate", () =>
                describe("test redo one step", () =>
                  test(
                    "undo step which from first to zero, redo step which from zero to first",
                    () => {
                    simulateFunc();

                    undoHistoryState();
                    redoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                )
              );
            },
          )
        )
      )
    )
  );

let testRedoUndoTwoStep =
    (
      sandbox,
      describeName,
      (simulateFunc, beforeEachFunc, afterEachFunc),
      component,
    ) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          describe(
            describeName,
            () => {
              beforeEach(() => beforeEachFunc());
              afterEach(() => afterEachFunc());

              describe("test undo operate", () => {
                test("test not undo", () => {
                  simulateFunc();

                  component() |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("test undo one step", () =>
                  test("step which from second to first", () => {
                    simulateFunc();

                    undoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );
                describe("test undo two step", () =>
                  test("step which from second to zero", () => {
                    simulateFunc();

                    undoHistoryState();
                    undoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );
              });
              describe("test redo operate", () => {
                describe("test redo one step", () =>
                  test(
                    "undo step which from second to zero, redo step which from zero to first",
                    () => {
                    simulateFunc();

                    undoHistoryState();
                    undoHistoryState();
                    redoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );

                describe("test redo two step", () =>
                  test(
                    "undo step which from second to zero,redo step which from zero to second",
                    () => {
                    simulateFunc();

                    undoHistoryState();
                    undoHistoryState();
                    redoHistoryState();
                    redoHistoryState();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );
              });
            },
          )
        )
      )
    )
  );