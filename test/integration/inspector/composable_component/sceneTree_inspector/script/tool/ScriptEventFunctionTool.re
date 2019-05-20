let getEventFunctionDataJsObjStr = (eventFunctionData) =>
  ScriptEventFunctionInspector.Method.convertEventFunctionDataToJsObjStr(
    eventFunctionData,
  )
  |> StringTool.removeNewLinesAndSpaces;