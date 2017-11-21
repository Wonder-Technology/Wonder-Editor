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
  getSpecificRecordByComponentName(componentName)
  |> Array.map(
       (component) =>
         component
         |> ComponentParseSystem.parseSystem(componentName, state, buildComponentByName)
     );