let createGeometry = (editEngineState, runEngineState) => {
  let (editEngineState, editMaterial) =
    editEngineState |> BasicMaterialEngineService.create;
  let (runEngineState, runMaterial) =
    runEngineState |> BasicMaterialEngineService.create;

  (editMaterial, runMaterial, editEngineState, runEngineState);
  /* TODO check: editMaterial,runMaterial should diff 0 */
};