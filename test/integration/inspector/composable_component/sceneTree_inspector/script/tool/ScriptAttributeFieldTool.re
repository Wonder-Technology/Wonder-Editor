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

let getScriptAttributeFieldType =
    (script, scriptAttributeName, fieldName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    engineState,
  )
  |> ScriptAttributeEngineService.unsafeGetScriptAttributeFieldType(fieldName);

let buildFloatValue = value =>
  value |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue;