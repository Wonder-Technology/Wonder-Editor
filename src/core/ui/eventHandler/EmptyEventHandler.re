module EmptyEventHandler = {
  let handleSelfLogic =
      ((store, dispatchFunc), prepareTuple, dataTuple) =>
    ();

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), prepareTuple, dataTuple) => (
    StateLogicService.getEditEngineState(),
    StateLogicService.getRunEngineState(),
  );
};