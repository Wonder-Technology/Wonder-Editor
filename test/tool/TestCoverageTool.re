let isTestCoverage = fileContent =>
  Js.String.includes(
    "stanbulignorenext",
    fileContent |> StringTool.removeNewLinesAndSpaces,
  );