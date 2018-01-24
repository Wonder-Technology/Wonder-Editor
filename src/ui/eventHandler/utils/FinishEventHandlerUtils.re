open Immutable;

/* TODO add HistoryState to store all stacks(immutable) */
/* TODO add src/state/ folder
TODO add AllStateData, HistoryState */
let finishStack:
  ref(
    Immutable.Stack.t(
      (AppStore.appState, EditorStateDataTypeEdit.editorState, Wonderjs.StateDataType.state)
    )
  ) =
  ref(Stack.empty());

let _storeFinishState = (uiState) => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let newEngineState = engineState |> EngineStateView.deepCopyStateForRestore;
  finishStack := Stack.addFirst((uiState, editorState, newEngineState), finishStack^)
};

let finishEventHandler = (uiState) =>
  switch (Stack.first(finishStack^)) {
  | Some((lastUIState, lastEditorState, lastEngineState)) =>
    finishStack := Stack.removeFirstOrRaise(finishStack^);
    StateHistoryView.storeAllState(lastUIState, lastEditorState, lastEngineState);
    _storeFinishState(uiState)
  | None => _storeFinishState(uiState)
  };

let clearFinishStack = () => finishStack := Stack.empty();