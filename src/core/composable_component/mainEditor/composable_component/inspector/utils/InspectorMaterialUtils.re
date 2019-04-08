open Color;

open ColorType;

let getBasicMaterialColor = (materialComponent, ()) =>
  BasicMaterialEngineService.getColor(materialComponent)
  |> StateLogicService.getEngineStateToGetData
  |> getHexString;

let getLightMaterialColor = (materialComponent, ()) =>
  LightMaterialEngineService.getLightMaterialDiffuseColor(materialComponent)
  |> StateLogicService.getEngineStateToGetData
  |> getHexString;


let dragToSetLightMaterialTexture = LightMaterialDragTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

let removeTexture = ((uiState, dispatchFunc), (), materialComponent) =>
  switch (
    LightMaterialEngineService.getLightMaterialDiffuseMap(materialComponent)
    |> StateLogicService.getEngineStateToGetData
  ) {
  | None => ()
  | Some(_mapId) =>
    LightMaterialRemoveTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
      (uiState, dispatchFunc),
      (),
      materialComponent,
    )
  };
