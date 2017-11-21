let getSpecificRecordByComponentName = (componentName) =>
  switch componentName {
  | "app" => AppComposableComponent.appRecord
  | "main_editor" => MainEditorComposableComponent.mainEditorRecord
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|getSpecificRecordByComponentName:$componentName appoint record is not find|j}
    )
  };

let buildSpecificComponents = (componentName, state: AppStore.appState, buildComponentByName) =>
  switch state.mapState.componentsMap {
  | None => ExcepetionHandleSystem.throwMessage({j|componentsMap:the mapState is empty|j})
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapSystem.get(componentName)) {
    | None =>
      ExcepetionHandleSystem.throwMessage(
        {j|appointMap:$componentName appoint map should exist in the mapState|j}
      )
    | Some(map) =>
      getSpecificRecordByComponentName(componentName)
      |> Array.map(
           (component) =>
             component
             |> ComponentParseSystem.parseSystem(componentName, state, map, buildComponentByName)
         )
    }
  };