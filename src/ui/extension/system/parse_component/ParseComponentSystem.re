open WonderCommonlib;

open ParseComponentType;

let _getUniqueAtomAttribute = (atomName: string) =>
  AtomAttributeParseSystem.getAtomAttributeRecord()
  |> Js.Array.filter((atom: AtomAttributeType.atomAttributeComponent) => atom.name === atomName)
  |> (
    (atomAttributeArr) =>
      switch (atomAttributeArr |> Js.Array.length) {
      | 0 =>
        WonderLog.Log.error(
          WonderLog.Log.buildErrorMessage(
            ~title="_getUniqueAtomAttribute",
            ~description={j|the specific atom : $atomName not exist|j},
            ~reason="",
            ~solution={j|check extension->panelExtension->render->$atomName should correct |j},
            ~params={j|atom name: $atomName|j}
          )
        );
        NoMatch
      | _ => Match(WonderCommonlib.ArraySystem.unsafeGet(atomAttributeArr, 0))
      }
  );

let _findUniquePropArrayByAtomName = (atomName, propArray: array(AtomParseType.props)) =>
  propArray
  |> Js.Array.filter((props: AtomParseType.props) => props.name === atomName)
  |> WonderLog.Contract.ensureCheck(
       (r) => {
         open WonderLog;
         open Contract;
         open Operators;
         let len = r |> Js.Array.length;
         test(
           Log.buildAssertMessage(~expect={j|propArray's length <= 1|j}, ~actual={j|is $len|j}),
           () => len <= 1
         )
       },
       EditorStateDataEdit.getStateIsDebug()
     );

let _getUniqueMapByComponentName = (state: AppStore.appState, uiComponentName) =>
  switch state.mapState.componentsMap {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getUniqueMapByComponentName",
        ~description={j|appState->mapState->componentsMap is none|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|uiComponentName:$uiComponentName|j}
      )
    )
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapSystem.get(uiComponentName)) {
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_getUniqueMapByComponentName",
          ~description={j|can't find $uiComponentName in appState->mapState->componentsMap|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|uiComponentName:$uiComponentName|j}
        )
      )
    | Some(map) => map
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
          WonderLog.Log.error(
            WonderLog.Log.buildErrorMessage(
              ~title="_createArgumentArray",
              ~description={j|the specific function $name : $value not exist in appState->mapState->componentsMap|j},
              ~reason="",
              ~solution={j|check extension:$uiComponentName->panelExtension->render->($prop)->$value should exist in methodExtension|j},
              ~params={j|name: $name, value: $value|j}
            )
          );
          None
        | Some(func) => Some(Obj.magic(func))
        }
      | _ =>
        WonderLog.Log.error(
          WonderLog.Log.buildErrorMessage(
            ~title="_createArgumentArray",
            ~description={j|the specific type : $type_ not exist in atomComponent's propArray|j},
            ~reason="",
            ~solution={j|check extension:$uiComponentName->panelExtension->render->($prop)->$type_ should correct|j},
            ~params={j|type: $type_|j}
          )
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
      (propArray: Js.Array.t(props)) =>
        switch (propArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          propArray |> OperateArrayUtils.getFirst |> _createArgumentArray(uiComponentName, state)
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