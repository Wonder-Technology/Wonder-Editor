open WonderCommonlib;

open Contract;

open ParseComponentType;

let _getUniqueAtomAttribute = (atomName: string) =>
  AtomAttributeParseSystem.getAtomAttributeRecord()
  |> Js.Array.filter((atom: AtomAttributeType.atomAttributeComponent) => atom.name === atomName)
  |> (
    (atomAttributeArr) =>
      switch (atomAttributeArr |> Js.Array.length) {
      | 0 =>
        WonderCommonlib.LogUtils.warn({j|atom component:$atomName is not find|j});
        NoMatch
      | _ => Match(WonderCommonlib.ArraySystem.unsafeGet(atomAttributeArr, 0))
      }
  );

let _findUniquePropArrayByAtomName = (atomName, propsArray: array(AtomParseType.props)) =>
  propsArray
  |> Js.Array.filter((props: AtomParseType.props) => props.name === atomName)
  |> ensureCheck(
       (r) => Contract.Operators.(test("atomComponent length is <= 1", () => Array.length(r) <= 1))
     );

let _getUniqueMapByComponentName = (state: AppStore.appState, uiComponentName) => {
  Js.log(state.mapState.componentsMap);
  switch state.mapState.componentsMap {
  | None =>
    ExcepetionHandleSystem.throwMessage({j|appState:the extension componentsMap is empty|j})
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapSystem.get(uiComponentName)) {
    | None =>
      ExcepetionHandleSystem.throwMessage(
        {j|appointMap:$uiComponentName appoint map should exist in the mapState|j}
      )
    | Some(map) => map
    }
  }
};

let _createArgumentArray =
    (uiComponentName: string, state: AppStore.appState, prop: AtomParseType.props) =>
  prop
  |> (
    ({name, value, type_}) =>
      switch type_ {
      | "string" => Some(Obj.magic(value))
      | "function" =>
        switch (
          uiComponentName
          |> _getUniqueMapByComponentName(state)
          |> WonderCommonlib.HashMapSystem.get(value)
        ) {
        | None =>
          WonderCommonlib.LogUtils.warn({j|function:$name $value should exist in map|j});
          None
        | Some(func) => Some(Obj.magic(func))
        }
      | _ =>
        WonderCommonlib.LogUtils.warn(
          {j|type:$type_ should exist in atomComponent's propsArray|j}
        );
        None
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
          propsArray |> OperateArrayUtils.getFirst |> _createArgumentArray(uiComponentName, state)
        }
    )
  );

let _buildComponentArgumentArr =
    (
      uiComponentName: string,
      state: AppStore.appState,
      component: AtomParseType.atomComponent,
      atomAttribute: macth
    ) =>
  switch atomAttribute {
  | NoMatch => [||]
  | Match(attribute) =>
    attribute.existProps
    |> Array.map(
         (prop: AtomAttributeType.prop) =>
           prop.name |> _matchRecordProp(uiComponentName, state, component)
       )
  };

let _buildComponentWithArgument = (component: AtomParseType.atomComponent, argumentArray) =>
  argumentArray
  |> BuildAtomComponentSystem.buildComponentByName(component.name)
  |> (
    (reactElement) =>
      <div key=(DomHelper.getRandomKey()) className=component.className> reactElement </div>
  );

let _parseSystem =
    (uiComponentName: string, state: AppStore.appState, atomComponent: AtomParseType.atomComponent) =>
  atomComponent.name
  |> _getUniqueAtomAttribute
  |> _buildComponentArgumentArr(uiComponentName, state, atomComponent)
  |> _buildComponentWithArgument(atomComponent);

let buildSpecificComponents = (jsonData, uiComponentName, state: AppStore.appState) =>
  jsonData
  |> AtomParseSystem.convertDataToRecord
  |> Array.map((atomComponent) => atomComponent |> _parseSystem(uiComponentName, state));