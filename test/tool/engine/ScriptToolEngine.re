let getScriptAttributeEntries = (script, attributeName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttribute(
    script,
    attributeName,
    engineState,
  )
  |> ScriptAttributeEngineService.getScriptAttributeEntries;

let getScriptAttributeFieldNames = (script, attributeName, engineState) =>
  getScriptAttributeEntries(script, attributeName, engineState)
  |> Js.Array.map(((name, _)) => name);