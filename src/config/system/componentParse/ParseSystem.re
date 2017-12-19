open WonderCommonlib;

open Contract;

let _getUniqueAtomAttribute = (atomName: string) =>
  AtomAttributeParseSystem.atomAttributeRecord
  |> Js.Array.filter((atom: AtomAttributeType.atomAttributeComponent) => atom.name === atomName)
  |> ensureCheck(
       (r) => Contract.Operators.(test("the atom name is unique", () => Array.length(r) <= 1))
     );

let _findUniquePropArrayByAtomName = (atomName, propsArray: array(AtomParseType.props)) =>
  propsArray
  |> Js.Array.filter((props: AtomParseType.props) => props.name == atomName)
  |> ensureCheck(
       (r) => Contract.Operators.(test("atomComponent length is <= 1", () => Array.length(r) <= 1))
     );

     
let _getUniqueMapByComponentName = (state: AppStore.appState, uiComponentName) =>
  switch state.mapState.componentsMap {
  | None => ExcepetionHandleSystem.throwMessage({j|componentsMap:the mapState is empty|j})
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapSystem.get(uiComponentName)) {
    | None =>
      ExcepetionHandleSystem.throwMessage(
        {j|appointMap:$uiComponentName appoint map should exist in the mapState|j}
      )
    | Some(map) => map
    }
  };

let _makeArgumentByProps =
    (uiComponentName: string, state: AppStore.appState, prop: AtomParseType.props) =>
  prop
  |> (
    ({name, value, type_}) =>
      switch type_ {
      | "string" => Obj.magic(value)
      | "function" =>
        switch (
          uiComponentName
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
      uiComponentName: string,
      state: AppStore.appState,
      component: AtomParseType.atomComponent,
      atomName
    ) =>
  AtomParseType.(
    component.props
    |> _findUniquePropArrayByAtomName(atomName)
    |> (
      (propsArray: Js.Array.t(props)) =>
        switch (propsArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          Some(
            propsArray |> ArrayOperUtils.getFirst |> _makeArgumentByProps(uiComponentName, state)
          )
        }
    )
  );

let _makeComponentArgumentArr =
    (
      uiComponentName: string,
      state: AppStore.appState,
      component: AtomParseType.atomComponent,
      atomAttributeArr: Js.Array.t(AtomAttributeType.atomAttributeComponent)
    ) =>
  atomAttributeArr
  |> ArrayOperUtils.getFirst
  |> (
    (atom: AtomAttributeType.atomAttributeComponent) =>
      atom.existProps
      |> Array.map(
           (prop: AtomAttributeType.prop) =>
             prop.name |> _matchRecordProp(uiComponentName, state, component)
         )
  );

let _buildComponentWithArgument = (component: AtomParseType.atomComponent, argumentArray) =>
  argumentArray
  |> BuildAtomComponentSystem.buildComponentByName(component.name)
  |> (
    (reactElement) =>
      <div key=(DomHelper.getRandomKey()) className=component.className> reactElement </div>
  );

let parseSystem =
    (uiComponentName: string, state: AppStore.appState, atomComponent: AtomParseType.atomComponent) =>
  atomComponent.name
  |> _getUniqueAtomAttribute
  |> _makeComponentArgumentArr(uiComponentName, state, atomComponent)
  |> _buildComponentWithArgument(atomComponent);

let buildSpecificComponents = (jsonData, uiComponentName, state: AppStore.appState) =>
  jsonData
  |> AtomParseSystem.convertDataToRecord
  |> Array.map((atomComponent) => atomComponent |> parseSystem(uiComponentName, state));