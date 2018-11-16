module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (float, float, float);
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), transformComponent, (x, y, z)) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> TransformEngineService.setLocalEulerAngles(
         (x, y, z),
         transformComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);