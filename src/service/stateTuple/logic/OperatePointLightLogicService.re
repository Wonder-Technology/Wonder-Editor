open DiffType;

let createPointLight = (editEngineState, runEngineState) => {
  let (editEngineState, _editLight) =
    editEngineState |> PointLightEngineService.create;
  let (runEngineState, runLight) =
    runEngineState |> PointLightEngineService.create;

  LightService.checkEditAndRunLightWithDiff(
    (_editLight, runLight),
    DiffType.PointLight,
    editEngineState,
    runEngineState,
  );
};

let disposePointLight =
    (gameObject, lightComponent, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|lightComponent|], type_: PointLight},
       |],
       GameObjectComponentEngineService.disposePointLightComponent,
     );

let addPointLight =
    (gameObject, lightComponent, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|lightComponent|], type_: PointLight},
       |],
       GameObjectComponentEngineService.addPointLightComponent,
     );