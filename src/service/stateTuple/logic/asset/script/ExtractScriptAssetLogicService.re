let _getScriptDataEntriesArrNotInScriptAssets =
    (scriptDataEntriesMap, scriptAssetDataEntriesMap) =>
  switch (scriptDataEntriesMap) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some(scriptDataEntriesMap) =>
    scriptDataEntriesMap
    |> Js.Array.filter(((name, _)) =>
         !(
           scriptAssetDataEntriesMap
           |> WonderCommonlib.ImmutableHashMapService.has(name)
         )
       )
  };

let getScriptEventFunctionDataEntriesArrNotInScriptAssets =
    (script, scriptAssetEventFunctionEntriesMap, engineState) =>
  _getScriptDataEntriesArrNotInScriptAssets(
    ScriptEngineService.getScriptEventFunctionDataEntries(
      script,
      engineState,
    ),
    scriptAssetEventFunctionEntriesMap,
  );

let getScriptAttributeEntriesArrNotInScriptAssets =
    (script, scriptAssetAttributeEntriesMap, engineState) =>
  _getScriptDataEntriesArrNotInScriptAssets(
    ScriptEngineService.getScriptAttributeEntries(script, engineState),
    scriptAssetAttributeEntriesMap,
  );