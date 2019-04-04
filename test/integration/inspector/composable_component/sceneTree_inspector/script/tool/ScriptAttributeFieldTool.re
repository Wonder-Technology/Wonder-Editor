let getScriptAttributeFieldDefaultValue =
    (script, scriptAttributeName, fieldName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    engineState,
  )
  |> ScriptAttributeEngineService.unsafeGetScriptAttributeFieldDefaultValue(
       fieldName,
     );

let buildFloatValue = value =>
  value |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue;