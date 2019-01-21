module EmptyEventHandler = {
  let handleSelfLogic = ((uiState, dispatchFunc), prepareTuple, dataTuple) =>
    ();

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), prepareTuple, dataTuple) =>
    StateEngineService.unsafeGetState();
};