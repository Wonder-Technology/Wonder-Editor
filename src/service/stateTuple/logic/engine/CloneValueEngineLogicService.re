let cloneValueByGetValueFunc =
    (
      unsafeGetValueFunc,
      setValueFunc,
      targetComponent,
      (clonedComponent, clonedEngineState),
      targetEngineState,
    ) =>
  targetEngineState
  |> setValueFunc(
       clonedEngineState |> unsafeGetValueFunc(clonedComponent),
       targetComponent,
     );

let cloneValueByGetOptionValueFunc =
    (
      getValueFunc,
      setValueFunc,
      targetComponent,
      (clonedComponent, clonedEngineState),
      targetEngineState,
    ) =>
  switch (clonedEngineState |> getValueFunc(clonedComponent)) {
  | None => targetEngineState
  | Some(value) => targetEngineState |> setValueFunc(value, targetComponent)
  };