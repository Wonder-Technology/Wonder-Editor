let changeMaterialValue =
    (
      value,
      (getMaterialFunc, setValueFunc),
      editorState,
      inspectorEngineState,
    ) =>
  switch (
    (editorState, inspectorEngineState)
    |> InspectorEngineGameObjectLogicService.getMaterialSphere
  ) {
  | None => inspectorEngineState
  | Some(gameObject) =>
    let materialSphereMaterialComponent =
      inspectorEngineState
      |> getMaterialFunc(gameObject)
      |> OptionService.unsafeGet;

    inspectorEngineState
    |> setValueFunc(value, materialSphereMaterialComponent);
  };