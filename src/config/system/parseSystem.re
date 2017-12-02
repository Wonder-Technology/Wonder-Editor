let _getSpecificRecordByComponentName = (componentName) =>
  switch componentName {
  | "app" => AppComposableComponent.JsonData.appRecord
  | "main_editor" => MainEditorComposableComponent.JsonData.mainEditorRecord
  | _ =>
    ExcepetionHandleSystem.throwMessage(
      {j|getSpecificRecordByComponentName:$componentName appoint record is not find|j}
    )
  };

let buildSpecificComponents = (componentName, state: AppStore.appState, buildComponentByName) =>
  _getSpecificRecordByComponentName(componentName)
  |> Array.map(
       (component) =>
         component |> ComponentParseSystem.parseSystem(componentName, state, buildComponentByName)
     );