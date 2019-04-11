open Wonderjs;

let create = ScriptAPI.createScript;

let unsafeGetScriptGameObject = ScriptAPI.unsafeGetScriptGameObject;

let addScriptEventFunctionData = ScriptAPI.addScriptEventFunctionData;

let removeScriptEventFunctionData = ScriptAPI.removeScriptEventFunctionData;

let replaceScriptEventFunctionData = ScriptAPI.replaceScriptEventFunctionData;

let getScriptEventFunctionDataEntries = OperateScriptDataMainService.getScriptEventFunctionDataEntries;

let unsafeGetScriptEventFunctionDataEntries = ScriptAPI.unsafeGetScriptEventFunctionDataEntries;

let addScriptAttribute = ScriptAPI.addScriptAttribute;

let removeScriptAttribute = ScriptAPI.removeScriptAttribute;

let replaceScriptAttribute = ScriptAPI.replaceScriptAttribute;

let getScriptAttributeEntries = OperateScriptDataMainService.getScriptAttributeEntries;

let unsafeGetScriptAttributeEntries = ScriptAPI.unsafeGetScriptAttributeEntries;

let unsafeGetScriptAttribute = ScriptAPI.unsafeGetScriptAttribute;

let unsafeGetScriptAttributeFieldDefaultValue = ScriptAPI.unsafeGetScriptAttributeFieldDefaultValue;

let setScriptAttributeFieldDefaultValueAndValue = ScriptAPI.setScriptAttributeFieldDefaultValueAndValue;

let getScriptAllEventFunctionEntries =
    (script, ({scriptRecord}: StateDataMainType.state) as engineState) => {
  let {scriptEventFunctionDataMap}: StateDataMainType.scriptRecord = scriptRecord;

  switch (
    scriptEventFunctionDataMap
    |> WonderCommonlib.ImmutableSparseMapService.get(script)
  ) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some(eventFunctionDataMap) =>
    eventFunctionDataMap
    |> WonderCommonlib.ImmutableHashMapService.getValidEntries
  };
};

let hasScriptEventFunctionData =
    (
      script,
      scriptEventFunctionName,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptEventFunctionDataMap}: StateDataMainType.scriptRecord = scriptRecord;

  scriptEventFunctionDataMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script)
  |> Js.Option.andThen((. eventFunctionDataMap) =>
       eventFunctionDataMap
       |> WonderCommonlib.ImmutableHashMapService.has(scriptEventFunctionName) ?
         Some() : None
     )
  |> Js.Option.isSome;
};

let getScriptAllAttributeEntries =
    (script, ({scriptRecord}: StateDataMainType.state) as engineState) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  switch (
    scriptAttributeMap
    |> WonderCommonlib.ImmutableSparseMapService.get(script)
  ) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some(attributeMap) =>
    attributeMap |> WonderCommonlib.ImmutableHashMapService.getValidEntries
  };
};

let hasScriptAttributeData =
    (
      script,
      scriptAttributeName,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  scriptAttributeMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script)
  |> Js.Option.andThen((. attributeMap) =>
       attributeMap
       |> WonderCommonlib.ImmutableHashMapService.has(scriptAttributeName) ?
         Some() : None
     )
  |> Js.Option.isSome;
};

let _replaceScriptDataByEntriesMap =
    (
      script,
      scriptDataMap,
      scriptDataEntriesMap,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) =>
  switch (
    scriptDataMap |> WonderCommonlib.ImmutableSparseMapService.get(script)
  ) {
  | None => scriptDataMap
  | Some(dataMap) =>
    scriptDataMap
    |> WonderCommonlib.ImmutableSparseMapService.set(
         script,
         scriptDataEntriesMap
         /* |> WonderCommonlib.ImmutableHashMapService.getValidEntries
            |> WonderCommonlib.SparseMapType.arrayNotNullableToArrayNullable */
         |> WonderCommonlib.ImmutableSparseMapService.reduceValid(
              (. dataMap, (name, newData)) =>
                dataMap |> WonderCommonlib.ImmutableHashMapService.has(name) ?
                  dataMap
                  |> WonderCommonlib.ImmutableHashMapService.set(
                       name,
                       newData,
                     ) :
                  dataMap,
              dataMap,
            ),
       )
  };

let replaceScriptEventFunctionDataByEntriesMap =
    (
      script,
      scriptEventFunctionEntriesMap,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptEventFunctionDataMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        _replaceScriptDataByEntriesMap(
          script,
          scriptEventFunctionDataMap,
          scriptEventFunctionEntriesMap,
          engineState,
        ),
    },
  };
  /* switch (
       scriptEventFunctionDataMap
       |> WonderCommonlib.ImmutableSparseMapService.get(script)
     ) {
     | None => engineState
     | Some(eventFunctionDataMap) =>
       let eventFunctionDataMap =
         scriptEventFunctionEntriesMap
         |> WonderCommonlib.ImmutableSparseMapService.reduceValid(
              (. eventFunctionDataMap, (name, newEventFunctionData)) =>
                eventFunctionDataMap
                |> WonderCommonlib.ImmutableHashMapService.has(name) ?
                  eventFunctionDataMap
                  |> WonderCommonlib.ImmutableHashMapService.set(
                       name,
                       newEventFunctionData,
                     ) :
                  eventFunctionDataMap,
              eventFunctionDataMap,
            );

       {
         ...engineState,
         scriptRecord: {
           ...scriptRecord,
           scriptEventFunctionDataMap:
             scriptEventFunctionDataMap
             |> WonderCommonlib.ImmutableSparseMapService.set(
                  script,
                  eventFunctionDataMap,
                ),
         },
       };
     }; */
};

let replaceScriptAttributeByEntriesMap =
    (
      script,
      scriptAttributeEntriesMap,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        _replaceScriptDataByEntriesMap(
          script,
          scriptAttributeMap,
          scriptAttributeEntriesMap,
          engineState,
        ),
    },
  };
};

let _updateScriptDataMapInAllScriptComponents =
    (dataName, newData, scriptDataMap) =>
  scriptDataMap
  |> WonderCommonlib.ImmutableSparseMapService.mapValid((. dataMap) =>
       dataMap |> WonderCommonlib.ImmutableHashMapService.has(dataName) ?
         dataMap
         |> WonderCommonlib.ImmutableHashMapService.set(dataName, newData) :
         dataMap
     );

let updateAttributeInAllScriptComponents =
    (
      attributeName,
      newAttribute,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        _updateScriptDataMapInAllScriptComponents(
          attributeName,
          newAttribute,
          scriptAttributeMap,
        ),
    },
  };
};

let updateEventFunctionInAllScriptComponents =
    (
      eventFunctionName,
      newEventFunctionData,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptEventFunctionDataMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        _updateScriptDataMapInAllScriptComponents(
          eventFunctionName,
          newEventFunctionData,
          scriptEventFunctionDataMap,
        ),
    },
  };
};

let _removeScriptDataMapInAllScriptComponents = (dataName, scriptDataMap) =>
  scriptDataMap
  |> WonderCommonlib.ImmutableSparseMapService.filterValid((. dataMap) =>
       !(dataMap |> WonderCommonlib.ImmutableHashMapService.has(dataName))
     );

let removeEventFunctionInAllScriptComponents =
    (
      eventFunctionName,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) => {
  let {scriptEventFunctionDataMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        _removeScriptDataMapInAllScriptComponents(
          eventFunctionName,
          scriptEventFunctionDataMap,
        ),
    },
  };
};

let removeAttributeInAllScriptComponents =
    (attributeName, ({scriptRecord}: StateDataMainType.state) as engineState) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  {
    ...engineState,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        _removeScriptDataMapInAllScriptComponents(
          attributeName,
          scriptAttributeMap,
        ),
    },
  };
};

let getAllScriptsWithAttribute =
    (({scriptRecord}: StateDataMainType.state) as engineState) => {
  let {scriptAttributeMap}: StateDataMainType.scriptRecord = scriptRecord;

  scriptAttributeMap |> WonderCommonlib.ImmutableSparseMapService.getValidKeys;
};

let replaceAttributeInAllScriptComponents =
    (
      (oldAttributeName, newAttributeName),
      newAttribute,
      ({scriptRecord}: StateDataMainType.state) as engineState,
    ) =>
  getAllScriptsWithAttribute(engineState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, script) =>
         engineState
         |> replaceScriptAttribute(
              script,
              (oldAttributeName, newAttributeName),
              newAttribute,
            ),
       engineState,
     );