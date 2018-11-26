open Immutable;

open HistoryType;

let rec limitStackMaxSize = (maxStackSize, stack) =>
  Stack.sliceToFirst(maxStackSize, stack);

let clearAllStack =
    (
      {
        uiRedoStack,
        uiUndoStack,
        editorRedoStack,
        editorUndoStack,
        engineRedoStack,
        engineUndoStack,
      } as historyState,
    ) =>
  {
    copiedRedoUndoStackRecord: None,
    uiRedoStack: Stack.empty(),
    uiUndoStack: Stack.empty(),
    editorRedoStack: Stack.empty(),
    editorUndoStack: Stack.empty(),
    engineRedoStack: Stack.empty(),
    engineUndoStack: Stack.empty(),
  }
  |> AllStateData.setHistoryState;