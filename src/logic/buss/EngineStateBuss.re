let deepCopyStateForRestore = EngineStateOper.deepCopyStateForRestore;

let restoreState = EngineStateOper.restoreState;

let getEngineState = EngineStateOper.getState;

let setEngineState = EngineStateOper.setState;

let goBack = (engineState) =>
  engineState
  |> EngineStateOper.deepCopyStateForRestore
  |> EngineStateOper.goBack
  |> EngineStateOper.restoreState(engineState);

let goForward = (engineState) =>
  engineState |> EngineStateOper.goForward |> EngineStateOper.restoreState(engineState);

let storeEngineState = (engineState) =>
  engineState |> EngineStateOper.deepCopyStateForRestore |> EngineStateOper.storeEngineState;