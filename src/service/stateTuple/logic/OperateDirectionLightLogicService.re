open DiffType;

let createDirectionLight = (editEngineState, runEngineState) => {
  let (editEngineState, _editLight) =
    editEngineState |> DirectionLightEngineService.create;
  let (runEngineState, runLight) =
    runEngineState |> DirectionLightEngineService.create;

  LightService.checkEditAndRunLightWithDiff(
    (_editLight, runLight),
    DiffType.DirectionLight,
    editEngineState,
    runEngineState,
  );
};

let disposeDirectionLight =
    (gameObject, lightComponent, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|lightComponent|], type_: DirectionLight},
       |],
       GameObjectComponentEngineService.disposeDirectionLightComponent,
     );

let addDirectionLight =
    (gameObject, lightComponent, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|lightComponent|], type_: DirectionLight},
       |],
       GameObjectComponentEngineService.addDirectionLightComponent,
     );
