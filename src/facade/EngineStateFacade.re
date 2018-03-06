let deepCopyStateForRestore = EngineStateLogicService.deepCopyStateForRestore;

let restoreState = EngineStateLogicService.restoreState;

let getState = EngineStateLogicService.getState;

let setState = EngineStateLogicService.setState;

let undo = (historyState, engineState) =>
  engineState
  |> EngineStateLogicService.undo(historyState)
  |> EngineStateLogicService.restoreState(engineState);

let redo = (historyState, engineState) =>
  engineState
  |> EngineStateLogicService.redo(historyState)
  |> EngineStateLogicService.restoreState(engineState);

let storeState = (engineState, historyState) =>
  historyState
  |> EngineStateLogicService.storeEngineState(
       engineState |> EngineStateLogicService.deepCopyStateForRestore
     );