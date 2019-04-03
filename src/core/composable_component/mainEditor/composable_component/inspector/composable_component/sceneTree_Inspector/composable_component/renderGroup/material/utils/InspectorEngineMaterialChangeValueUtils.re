let changeMaterialValue =
    (value, (getMaterialFunc, setValueFunc), inspectorEngineState) =>
  switch (
    inspectorEngineState |> SceneInspectorEngineService.getMaterialSphere
  ) {
  | None => ()
  | Some(gameObject) =>
    let materialSphereMaterialComponent =
      inspectorEngineState
      |> getMaterialFunc(gameObject)
      |> OptionService.unsafeGet;

    inspectorEngineState
    |> setValueFunc(value, materialSphereMaterialComponent)
    |> StateLogicService.refreshInspectorEngineState;
  };