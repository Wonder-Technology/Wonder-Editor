let deepCopyStateForRestore = EngineStateOper.deepCopyStateForRestore;

let restoreState = EngineStateOper.restoreState;

let getEngineState = EngineStateOper.getState;

let setEngineState = EngineStateOper.setState;

let undo = (historyState, engineState) =>
  engineState |> EngineStateOper.undo(historyState) |> EngineStateOper.restoreState(engineState);

let redo = (historyState, engineState) =>
  engineState |> EngineStateOper.redo(historyState) |> EngineStateOper.restoreState(engineState);

let storeEngineState = (engineState, historyState) =>
  historyState
  |> EngineStateOper.storeEngineState(engineState |> EngineStateOper.deepCopyStateForRestore);