/* open Contract;

let findUniqueStateByComponentName = (state: AppStore.appState, componentName) =>
  ComposableComponentMeta.metaRecord
  |> Js.Array.filter(
       (metaItem: ComposableParseType.composableMeta) => metaItem.name == componentName
     )
  |> ensureCheck(
       (r) =>
         Contract.Operators.(test("specific state length should == 1", () => Array.length(r) == 1))
     );

let getValueFromSpecificState = (state: AppStore.appState, stateName, field) => state; */