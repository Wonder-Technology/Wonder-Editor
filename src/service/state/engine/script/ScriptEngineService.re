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

let unsafeGetScriptAttributeEntries = ScriptAPI.unsafeGetScriptAttributeEntries;

let unsafeGetScriptAttribute = ScriptAPI.unsafeGetScriptAttribute;

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