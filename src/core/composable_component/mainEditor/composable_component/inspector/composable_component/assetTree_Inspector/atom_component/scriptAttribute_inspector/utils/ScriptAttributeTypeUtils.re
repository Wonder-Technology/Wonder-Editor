open Wonderjs;

open ScriptAttributeType;

external convertScriptAttributeTypeToInt: scriptAttributeType => int =
  "%identity";

external convertIntToScriptAttributeType: int => scriptAttributeType =
  "%identity";

external convertScriptAttributeValueToFloat: scriptAttributeValue => float =
  "%identity";

external convertScriptAttributeValueToString: scriptAttributeValue => string =
  "%identity";

external convertScriptAttributeValueToInt: scriptAttributeValue => int =
  "%identity";

external convertFloatToScriptAttributeValue: float => scriptAttributeValue =
  "%identity";

external convertIntToScriptAttributeValue: int => scriptAttributeValue =
  "%identity";
