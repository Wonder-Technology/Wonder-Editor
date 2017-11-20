let getSpecificRecordByComponentName = (componentName) =>
  switch componentName {
  | "app" => AppComposableComponent.appRecord
  /* | "mainEditor" => MainEditorComposableComponent.mainEditorRecord */
  | _ => ExcepetionHandleSystem.throwMessage({j|error:$componentName appoint record is not find|j})
  };

let buildSpecificComponents = (componentName, state: AppStore.appState) =>
  switch state.mapState.componentsMap {
  | None => ExcepetionHandleSystem.throwMessage({j|componentsMap:the mapState is empty|j})
  | Some(maps) =>
    switch (WonderCommonlib.HashMapSystem.get(componentName, maps)) {
    | None =>
      ExcepetionHandleSystem.throwMessage(
        {j|appointMap:$componentName appoint map should exist in the mapState|j}
      )
    | Some(map) =>
      getSpecificRecordByComponentName(componentName)
      |> Array.map((component) => component |> ComponentParseSystem.parseSystem(state, map))
    }
  };