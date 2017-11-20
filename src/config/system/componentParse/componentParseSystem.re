open WonderCommonlib;

let findAtomComponent = (name: string) =>
  AtomComponent.atomRecord
  |> Js.Array.filter((atom: AtomParseType.atomComponent) => atom.name === name);

let findAppointStateByValue = (state: AppStore.appState, stateName) =>
  switch stateName {
  | "stringState" => Obj.magic(state.stringState)
  | "appState" => Obj.magic(state)
  | _ => ExcepetionHandleSystem.throwMessage({j|error:appoint state $stateName is not find|j})
  };

let matchRecordProp =
    (
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
      component: ComposableParseType.composableComponent,
      atomName
    ) =>
  ComposableParseType.(
    component.props
    |> Js.Array.filter((props: props) => props.name == atomName)
    |> (
      (propsArray: Js.Array.t(ComposableParseType.props)) =>
        switch (propsArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          Some(
            propsArray[0]
            |> (
              ({name, value, type_}) =>
                switch type_ {
                | "string" => Obj.magic(value)
                | "state" => Obj.magic(findAppointStateByValue(state, value))
                | "function" =>
                  switch (mapState |> WonderCommonlib.HashMapSystem.get(value)) {
                  | None =>
                    ExcepetionHandleSystem.throwMessage({j|function:$name should exist in map|j})
                  | Some(func) => Obj.magic(func)
                  }
                | _ =>
                  ExcepetionHandleSystem.throwMessage(
                    {j|type:$type_ should exist the propsArray|j}
                  )
                }
            )
          )
        }
    )
  );

let makeComponentArgument =
    (
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
                    prop.name |> matchRecordProp(state, mapState, component)
                )
         )
     )
  |> ArraySystem.flatten;

let buildComponentWithArgument =
    (component: ComposableParseType.composableComponent, argumentsArray) =>
  argumentsArray
  |> BuildComponent.buildComponentByName(component.name)
  |> (
    (reactElement) => {
      let key = string_of_float(Js.Date.now() *. Js.Math.random());
      <div key className=component.className> reactElement </div>
    }
  );

let parseSystem =
    (
      state: AppStore.appState,
      mapState: MapStore.componentMapType,
      component: ComposableParseType.composableComponent
    ) =>
  component.name
  |> findAtomComponent
  |> makeComponentArgument(state, mapState, component)
  |> buildComponentWithArgument(component);