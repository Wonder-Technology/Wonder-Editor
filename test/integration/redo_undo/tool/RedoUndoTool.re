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

                    StateHistoryToolEditor.undo();

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

                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.redo();

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

                    StateHistoryToolEditor.undo();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );
                describe("test undo two step", () =>
                  test("step which from second to zero", () => {
                    simulateFunc();

                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.undo();

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

                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.redo();

                    component() |> ReactTestTool.createSnapshotAndMatch;
                  })
                );

                describe("test redo two step", () =>
                  test(
                    "undo step which from second to zero,redo step which from zero to second",
                    () => {
                    simulateFunc();

                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.undo();
                    StateHistoryToolEditor.redo();
                    StateHistoryToolEditor.redo();

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