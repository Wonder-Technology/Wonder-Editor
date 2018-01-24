open Immutable;

/* TODO add HistoryState to store all stacks(immutable) */
/* TODO add src/state/ folder
   TODO add AllStateData, HistoryState */
let markRedoUndoStack:
  ref(
    Immutable.Stack.t(
      (AppStore.appState, EditorStateDataTypeEdit.editorState, Wonderjs.StateDataType.state)
    )
  ) =
  ref(Stack.empty());

let _storeMarkRedoUndoState = (uiState) => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let newEngineState = engineState |> EngineStateView.deepCopyStateForRestore;
  markRedoUndoStack := Stack.addFirst((uiState, editorState, newEngineState), markRedoUndoStack^)
};

let markRedoUndoEventHandler = (uiState) =>
  switch (Stack.first(markRedoUndoStack^)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    markRedoUndoStack := Stack.removeFirstOrRaise(markRedoUndoStack^);
    StateHistoryView.storeAllState(lastUIState, lastEditorState, lastEngineState);
    _storeMarkRedoUndoState(uiState)
  | None => _storeMarkRedoUndoState(uiState)
  };

let clearMarkRedoUndoStack = () => markRedoUndoStack := Stack.empty();