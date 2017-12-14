open WonderCommonlib;

open Contract;

let _findAtomComponent = (name: string) =>
  AtomComponentData.atomRecord
  |> Js.Array.filter((atom: AtomParseType.atomComponent) => atom.name === name);

let _findUniquePropsArrayByAtomName = (atomName, propsArray: array(ComposableParseType.props)) =>
  propsArray
  |> Js.Array.filter((props: ComposableParseType.props) => props.name == atomName)
  |> ensureCheck(
       (r) => Contract.Operators.(test("atomComponent length is <= 1", () => Array.length(r) <= 1))
     );

let _getUniqueMapByComponentName = (state: AppStore.appState, componentName) =>
  switch state.mapState.componentsMap {
  | None => ExcepetionHandleSystem.throwMessage({j|componentsMap:the mapState is empty|j})
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapSystem.get(componentName)) {
    | None =>
      ExcepetionHandleSystem.throwMessage(
        {j|appointMap:$componentName appoint map should exist in the mapState|j}
      )
    | Some(map) => map
    }
  };

let _makeArgumentByProp =
    (componentName: string, state: AppStore.appState, prop: ComposableParseType.props) =>
  prop
  |> (
    ({name, value, type_}) =>
      switch type_ {
      | "string" => Obj.magic(value)
      /* | "state" => Obj.magic(state)
         | "stateValue" =>
           Obj.magic(
             componentName
             |> SpecificStateSystem.findUniqueStateByComponentName(state)
             |> BaseUtil.getFirst
             |> (
               ({name, stateName}) =>
                 SpecificStateSystem.getValueFromSpecificState(state, stateName, value)
             )
           ) */
      | "function" =>
        switch (
          componentName
          |> _getUniqueMapByComponentName(state)
          |> WonderCommonlib.HashMapSystem.get(value)
        ) {
        | None => ExcepetionHandleSystem.throwMessage({j|function:$name should exist in map|j})
        | Some(func) => Obj.magic(func)
        }
      | _ => ExcepetionHandleSystem.throwMessage({j|type:$type_ should exist the propsArray|j})
      }
  );

let _matchRecordProp =
    (
      componentName: string,
      state: AppStore.appState,
      component: ComposableParseType.composableComponent,
      atomName
    ) =>
  ComposableParseType.(
    component.props
    |> _findUniquePropsArrayByAtomName(atomName)
    |> (
      (propsArray: Js.Array.t(props)) =>
        switch (propsArray |> Js.Array.length) {
        | 0 => None
        | _ => Some(propsArray |> BaseUtil.getFirst |> _makeArgumentByProp(componentName, state))
        }
    )
  );

let _makeComponentArgument =
    (
      componentName: string,
      state: AppStore.appState,
      component: ComposableParseType.composableComponent,
      atomList: Js.Array.t(AtomParseType.atomComponent)
    ) =>
  atomList
  |> Js.Array.map(
       (atom: AtomParseType.atomComponent) =>
         atom.existProps
         |> (
           (propsArray) =>
             propsArray
             |> Array.map(
                  (prop: AtomParseType.prop) =>
                    prop.name |> _matchRecordProp(componentName, state, component)
                )
         )
     )
  |> ArraySystem.flatten;

let _buildComponentWithArgument =
    (component: ComposableParseType.composableComponent, argumentsArray) =>
  argumentsArray
  |> BuildAtomComponentSystem.buildComponentByName(component.name)
  |> (
    (reactElement) =>
      <div key=(DomHelper.getRandomKey()) className=component.className> reactElement </div>
  );

let parseSystem =
    (
      componentName: string,
      state: AppStore.appState,
      component: ComposableParseType.composableComponent
    ) =>
  component.name
  |> _findAtomComponent
  |> _makeComponentArgument(componentName, state, component)
  |> _buildComponentWithArgument(component);

let buildSpecificComponents = (jsonData, uiComponentName, state: AppStore.appState) =>
  jsonData
  |> ComposableParseSystem.convertDataToRecord
  |> Array.map(
       (component) => component |> parseSystem(uiComponentName, state)
     );