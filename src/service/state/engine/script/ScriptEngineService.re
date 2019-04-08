open Wonderjs;

/* TODO move implemention to wonder.js */

let create = ScriptAPI.createScript;

let unsafeGetScriptGameObject = ScriptAPI.unsafeGetScriptGameObject;

let addScriptEventFunctionData = ScriptAPI.addScriptEventFunctionData;

let removeScriptEventFunctionData = ScriptAPI.removeScriptEventFunctionData;

/* let replaceScriptEventFunctionData = OperateScriptDataMainService.replaceScriptEventFunctionData; */

let replaceScriptEventFunctionData =
    (
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) =>
  removeScriptEventFunctionData(
    script,
    sourceScriptEventFunctionDataName,
    state,
  )
  |> addScriptEventFunctionData(
       script,
       targetScriptEventFunctionDataName,
       targetScriptEventFunctionData,
     );

let unsafeGetScriptEventFunctionDataEntries = ScriptAPI.unsafeGetScriptEventFunctionDataEntries;

let addScriptAttribute = ScriptAPI.addScriptAttribute;

let removeScriptAttribute = ScriptAPI.removeScriptAttribute;

/* let replaceScriptAttribute = OperateScriptDataMainService.replaceScriptAttribute; */

let replaceScriptAttribute =
    (
      script,
      (sourceScriptAttributeName, targetScriptAttributeName),
      targetScriptAttribute,
      state,
    ) =>
  removeScriptAttribute(script, sourceScriptAttributeName, state)
  |> addScriptAttribute(
       script,
       targetScriptAttributeName,
       targetScriptAttribute,
     );

let unsafeGetScriptAttributeEntries = ScriptAPI.unsafeGetScriptAttributeEntries;

let unsafeGetScriptAttribute = ScriptAPI.unsafeGetScriptAttribute;

let unsafeGetScriptAttributeFieldDefaultValue =
    (script, scriptAttributeName, fieldName, engineState) =>
  unsafeGetScriptAttribute(script, scriptAttributeName, engineState)
  |> ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
       fieldName,
     );

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