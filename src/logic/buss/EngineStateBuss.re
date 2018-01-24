let deepCopyStateForRestore = EngineStateOper.deepCopyStateForRestore;

let restoreState = EngineStateOper.restoreState;

let getEngineState = EngineStateOper.getState;

let setEngineState = EngineStateOper.setState;

let goBack = (allState, engineState) =>
  engineState |> EngineStateOper.goBack(allState) |> EngineStateOper.restoreState(engineState);

let goForward = (allState, engineState) =>
  engineState |> EngineStateOper.goForward(allState) |> EngineStateOper.restoreState(engineState);

let storeEngineState = (engineState, allState) =>
  allState
  |> EngineStateOper.storeEngineState(engineState |> EngineStateOper.deepCopyStateForRestore);