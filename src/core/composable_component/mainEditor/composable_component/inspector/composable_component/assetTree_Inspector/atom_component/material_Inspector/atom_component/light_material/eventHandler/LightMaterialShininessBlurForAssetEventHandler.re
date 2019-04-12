module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      (
        (uiState, dispatchFunc),
        (materialComponent, currentNodeId),
        shininessValue,
      ) => {
    StateEditorService.getState()
    |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMap(
         DomHelper.getElementById("inspector-canvas"),
         DomHelper.getElementById("img-canvas"),
         currentNodeId,
       )
    |> StateEditorService.setState;

    let engineState =
      StateEngineService.unsafeGetState()
      |> StateEngineService.deepCopyForRestore
      |> LightMaterialEngineService.setLightMaterialShininess(
           shininessValue,
           materialComponent,
         );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;

    engineState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);