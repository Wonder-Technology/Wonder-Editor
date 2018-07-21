let createBasicMaterial = (editEngineState, runEngineState) => {
  let (editEngineState, _editMaterial) =
    editEngineState |> BasicMaterialEngineService.create;
  let (runEngineState, runMaterial) =
    runEngineState |> BasicMaterialEngineService.create;

  MaterialService.checkEditAndRunMaterialWithDiff(
    (_editMaterial, runMaterial),
    DiffType.BasicMaterial,
    editEngineState,
    runEngineState,
  );
};

let disposeBasicMaterial =
    (gameObject, material, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|material|], type_: BasicMaterial},
       |],
       GameObjectEngineService.disposeGameObjectBasicMaterialComponent,
     );

let addBasicMaterial =
    (gameObject, material, (editEngineState, runEngineState)) =>
  (editEngineState, runEngineState)
  |> StateLogicService.handleFuncWithDiff(
       [|
         {arguments: [|gameObject|], type_: GameObject},
         {arguments: [|material|], type_: BasicMaterial},
       |],
       GameObjectComponentEngineService.addBasicMaterialComponent,
     );