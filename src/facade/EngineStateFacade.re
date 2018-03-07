let deepCopyStateForRestore = EngineStateLogicSingleService.deepCopyStateForRestore;

let restoreState = EngineStateLogicSingleService.restoreState;

let getState = EngineStateLogicSingleService.getState;

let setState = EngineStateLogicSingleService.setState;

let undo = (historyState, engineState) =>
  engineState
  |> EngineStateLogicSingleService.undo(historyState)
  |> EngineStateLogicSingleService.restoreState(engineState);

let redo = (historyState, engineState) =>
  engineState
  |> EngineStateLogicSingleService.redo(historyState)
  |> EngineStateLogicSingleService.restoreState(engineState);

let storeState = (engineState, historyState) =>
  historyState
  |> EngineStateLogicSingleService.storeEngineState(
       engineState |> EngineStateLogicSingleService.deepCopyStateForRestore
     );