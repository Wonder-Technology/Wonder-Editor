module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (Wonderjs.MaterialType.material, int);
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), (materialComponent, currentNodeId), value) => {
    StateEditorService.getState()
    |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByNodeId(
         DomHelper.getElementById("inspector-canvas"),
         DomHelper.getElementById("img-canvas"),
         currentNodeId,
       )
    |> StateEditorService.setState;

    let engineState =
      StateEngineService.unsafeGetState()
      |> StateEngineService.deepCopyForRestore
      |> BasicMaterialEngineService.setColor(
           value |> Color.convert16HexToRGBArr,
           materialComponent,
         );

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;

    engineState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);