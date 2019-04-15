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
