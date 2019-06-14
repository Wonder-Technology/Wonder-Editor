module EmptyEventHandler = {
  let handleSelfLogic = ((uiState, dispatchFunc), prepareTuple, dataTuple) =>
    ();

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), prepareTuple, dataTuple) =>
    StateEngineService.unsafeGetState();

  let setUndoValueToCopiedEngineStateForPromise =
      ((uiState, dispatchFunc), prepareTuple, dataTuple) =>
    Js.Promise.make((~resolve, ~reject) =>
      resolve(. StateEngineService.unsafeGetState())
    );
};