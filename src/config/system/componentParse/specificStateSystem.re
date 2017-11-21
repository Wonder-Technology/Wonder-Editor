open Contract;

let findSpecificStateByComponentName = (state: AppStore.appState, componentName) =>
  ComposableComponentMeta.metaRecord
  |> Js.Array.filter(
       (metaItem: ComposableParseType.composableMeta) => metaItem.name == componentName
     )
  |> ensureCheck(
       (r) =>
         Contract.Operators.(test("specific state length is <= 1", () => Array.length(r) <= 1))
     );

let getValueFromSpecificState = (state: AppStore.appState, stateName, field) =>
  switch stateName {
  | "stringState" =>
    switch field {
    | "text" => state.stringState.text
    | _ => ExcepetionHandleSystem.throwMessage({j|field:$field should exist in $stateName|j})
    }
  | _ => ExcepetionHandleSystem.throwMessage({j|state:$stateName should exist in appStore|j})
  };