

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = string;

  let setUndoValueToCopiedEngineState = ((store, dispatchFunc), (), value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> SceneEngineService.setAmbientLightColor(
         value |> Color.convert16HexToRGBArr,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);