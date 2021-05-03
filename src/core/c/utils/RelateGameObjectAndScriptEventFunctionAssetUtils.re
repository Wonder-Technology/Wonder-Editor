

let replaceToScriptEventFunctionAssetEventFunctionData =
    (gameObject, scriptEventFunctionEntriesMap, engineState) =>
  switch (
    GameObjectComponentEngineService.getScriptComponent(
      gameObject,
      engineState,
    )
  ) {
  | None => engineState
  | Some(script) =>
    ScriptEngineService.replaceScriptEventFunctionDataByEntriesMap(
      script,
      scriptEventFunctionEntriesMap,
      engineState,
    )
  };
