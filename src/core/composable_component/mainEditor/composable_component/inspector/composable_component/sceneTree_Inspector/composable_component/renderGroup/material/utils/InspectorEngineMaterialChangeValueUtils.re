let changeMaterialValue =
    (value, (getMaterialFunc, setValueFunc), inspectorEngineState) =>
  switch (
    (StateEditorService.getState(), inspectorEngineState)
    |> InspectorEngineGameObjectLogicService.getMaterialSphere
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