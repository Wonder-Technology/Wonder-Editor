open WonderCommonlib;

open Contract;

let findAtomComponent = (name: string) =>
  AtomComponent.atomRecord
  |> Js.Array.filter((atom: AtomParseType.atomComponent) => atom.name === name);

let findUniquePropsArrayByAtomName = (atomName, propsArray: array(ComposableParseType.props)) =>
  propsArray
  |> Js.Array.filter((props: ComposableParseType.props) => props.name == atomName)
  |> ensureCheck(
       (r) => Contract.Operators.(test("atomComponent length is <= 1", () => Array.length(r) <= 1))
     );

let makeArgumentByProp =
    (
      componentName: string,
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
      prop: ComposableParseType.props
    ) =>
  prop
  |> (
    ({name, value, type_}) =>
      switch type_ {
      | "string" => Obj.magic(value)
      | "state" => Obj.magic(state)
      | "stateValue" =>
        Obj.magic(
          componentName
          |> SpecificStateSystem.findUniqueStateByComponentName(state)
          |> Base.getFirst
          |> (
            ({name, stateName}) =>
              SpecificStateSystem.getValueFromSpecificState(state, stateName, value)
          )
        )
      | "function" =>
        switch (mapState |> WonderCommonlib.HashMapSystem.get(value)) {
        | None => ExcepetionHandleSystem.throwMessage({j|function:$name should exist in map|j})
        | Some(func) => Obj.magic(func)
        }
      | _ => ExcepetionHandleSystem.throwMessage({j|type:$type_ should exist the propsArray|j})
      }
  );

let matchRecordProp =
    (
      componentName: string,
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
      component: ComposableParseType.composableComponent,
      atomName
    ) =>
  ComposableParseType.(
    component.props
    |> findUniquePropsArrayByAtomName(atomName)
    |> (
      (propsArray: Js.Array.t(props)) =>
        switch (propsArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          Some(propsArray |> Base.getFirst |> makeArgumentByProp(componentName, state, mapState))
        }
    )
  );

let makeComponentArgument =
    (
      componentName: string,
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
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
                    prop.name |> matchRecordProp(componentName, state, mapState, component)
                )
         )
     )
  |> ArraySystem.flatten;

let buildComponentWithArgument =
    (component: ComposableParseType.composableComponent, buildComponentByName, argumentsArray) =>
  argumentsArray
  |> buildComponentByName(component.name)
  |> (
    (reactElement) =>
      <div key=(DomHelper.getRandomKey()) className=component.className> reactElement </div>
  );

let parseSystem =
    (
      componentName: string,
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
      buildComponentByName,
      component: ComposableParseType.composableComponent
    ) =>
  component.name
  |> findAtomComponent
  |> makeComponentArgument(componentName, state, mapState, component)
  |> buildComponentWithArgument(component, buildComponentByName);