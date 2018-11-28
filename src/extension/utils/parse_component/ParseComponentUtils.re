open ParseComponentType;

let _getUniqueAtomAttribute = (atomName: string) =>
  ExistAtomAttributeParseUtils.getAtomAttributeRecord()
  |> Js.Array.filter((atom: ExistAtomAttributeType.atomAttributeComponent) =>
       atom.name === atomName
     )
  |> (
    atomAttributeArr =>
      switch (atomAttributeArr |> Js.Array.length) {
      | 0 =>
        /* TODO use ConsoleUtils.error */
        WonderLog.Log.error(
          LogUtils.buildErrorMessage(
            ~description={j|the specific atom : $atomName not exist|j},
            ~reason="",
            ~solution=
              {j|check extension->panelExtension->render->$atomName should correct |j},
            ~params={j|atom name: $atomName|j},
          ),
        );
        NoMatch;
      | _ =>
        Match(WonderCommonlib.ArrayService.unsafeGet(atomAttributeArr, 0))
      }
  );

let _findUniquePropArrayByAtomName =
    (atomName, propArray: array(CustomAtomParseType.props)) =>
  propArray
  |> Js.Array.filter((props: CustomAtomParseType.props) =>
       props.name === atomName
     )
  |> WonderLog.Contract.ensureCheck(
       r => {
         open WonderLog;
         open Contract;
         open Operators;
         let len = r |> Js.Array.length;
         test(
           Log.buildAssertMessage(
             ~expect={j|propArray's length <= 1|j},
             ~actual={j|is $len|j},
           ),
           () =>
           len <= 1
         );
       },
       StateEditorService.getStateIsDebug(),
     );

let _getUniqueMapByComponentName = (state: AppStore.appState, uiComponentName) =>
  switch (state.mapState.componentsMap) {
  | None =>
    /* TODO use error instead of fatal */
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|appState->mapState->componentsMap is none|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|uiComponentName:$uiComponentName|j},
      ),
    )
  | Some(maps) =>
    switch (maps |> WonderCommonlib.HashMapService.get(uiComponentName)) {
    | None =>
      /* TODO use error instead of fatal */
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          ~description=
            {j|can't find $uiComponentName in appState->mapState->componentsMap|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|uiComponentName:$uiComponentName|j},
        ),
      )
    | Some(map) => map
    }
  };

let _createArgumentArray =
    (
      uiComponentName: string,
      state: AppStore.appState,
      prop: CustomAtomParseType.props,
    ) =>
  prop
  |> (
    ({name, value, type_}) =>
      switch (type_) {
      | "string" => Some(Obj.magic(value))
      | "function" =>
        switch (
          uiComponentName
          |> _getUniqueMapByComponentName(state)
          |> WonderCommonlib.HashMapService.get(value)
        ) {
        | None =>
          WonderLog.Log.error(
            LogUtils.buildErrorMessage(
              ~description=
                {j|the specific function $name : $value not exist in appState->mapState->componentsMap|j},
              ~reason="",
              ~solution=
                {j|check extension:$uiComponentName->panelExtension->render->($prop)->$value should exist in methodExtension|j},
              ~params={j|name: $name, value: $value|j},
            ),
          );
          None;
        | Some(func) => Some(Obj.magic(func))
        }
      | _ =>
        WonderLog.Log.error(
          LogUtils.buildErrorMessage(
            ~description=
              {j|the specific type : $type_ not exist in atomComponent's propArray|j},
            ~reason="",
            ~solution=
              {j|check extension:$uiComponentName->panelExtension->render->($prop)->$type_ should correct|j},
            ~params={j|type: $type_|j},
          ),
        );
        None;
      }
  );

let _matchRecordProp =
    (
      uiComponentName: string,
      state: AppStore.appState,
      component: CustomAtomParseType.atomComponent,
      atomName,
    ) =>
  CustomAtomParseType.(
    component.props
    |> _findUniquePropArrayByAtomName(atomName)
    |> (
      (propArray: Js.Array.t(props)) =>
        switch (propArray |> Js.Array.length) {
        | 0 => None
        | _ =>
          propArray
          |> ArrayService.unsafeGetFirst
          |> _createArgumentArray(uiComponentName, state)
        }
    )
  );

let _buildComponentArgumentArr =
    (
      uiComponentName: string,
      state: AppStore.appState,
      component: CustomAtomParseType.atomComponent,
      atomAttribute: macth,
    ) =>
  switch (atomAttribute) {
  | NoMatch => [||]
  | Match(attribute) =>
    attribute.existProps
    |> Js.Array.map((prop: ExistAtomAttributeType.prop) =>
         prop.name |> _matchRecordProp(uiComponentName, state, component)
       )
  };

let _buildComponentWithArgument =
    (component: CustomAtomParseType.atomComponent, argumentArray) =>
  argumentArray
  |> BuildAtomComponentUtils.buildComponentByName(component.name)
  |> (
    reactElement =>
      <div key=(DomHelper.getRandomKey()) className=component.className>
        reactElement
      </div>
  );

let _parseSystem =
    (
      uiComponentName: string,
      state: AppStore.appState,
      atomComponent: CustomAtomParseType.atomComponent,
    ) =>
  atomComponent.name
  |> _getUniqueAtomAttribute
  |> _buildComponentArgumentArr(uiComponentName, state, atomComponent)
  |> _buildComponentWithArgument(atomComponent);

let buildSpecificComponents =
    (jsonData, uiComponentName, state: AppStore.appState) =>
  jsonData
  |> CustomAtomParseUtils.convertDataToRecord
  |> Js.Array.map(atomComponent =>
       atomComponent |> _parseSystem(uiComponentName, state)
     );