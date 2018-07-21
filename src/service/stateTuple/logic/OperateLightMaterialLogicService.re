let createLightMaterial = (editEngineState, runEngineState) => {
  let (editEngineState, _editMaterial) =
    editEngineState |> LightMaterialEngineService.create;
  let (runEngineState, runMaterial) =
    runEngineState |> LightMaterialEngineService.create;

  MaterialService.checkEditAndRunMaterialWithDiff(
    (_editMaterial, runMaterial),
    DiffType.LightMaterial,
    editEngineState,
    runEngineState,
  );
};

let disposeLightMaterial =
    (gameObject, material, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|material|], type_: LightMaterial},
       |],
       GameObjectEngineService.disposeGameObjectLightMaterialComponent,
     );

let addLightMaterial =
    (gameObject, material, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|material|], type_: LightMaterial},
       |],
       GameObjectComponentEngineService.addLightMaterialComponent,
     );