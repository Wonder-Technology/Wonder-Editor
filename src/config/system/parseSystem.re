let buildSpecificComponents = (jsonData, componentName, state: AppStore.appState) =>
  jsonData
  |> ComposableParseSystem.convertDataToRecord
  |> Array.map((component) => component |> ComponentParseSystem.parseSystem(componentName, state));