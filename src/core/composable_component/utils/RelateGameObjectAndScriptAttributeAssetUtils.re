let replaceToScriptAttributeAssetAttribute =
    (gameObject, scriptAttributeEntriesMap, engineState) =>
  switch (
    GameObjectComponentEngineService.getScriptComponent(
      gameObject,
      engineState,
    )
  ) {
  | None => engineState
  | Some(script) =>
    ScriptEngineService.replaceScriptAttributeByEntriesMap(
      script,
      scriptAttributeEntriesMap,
      engineState,
    )
  };