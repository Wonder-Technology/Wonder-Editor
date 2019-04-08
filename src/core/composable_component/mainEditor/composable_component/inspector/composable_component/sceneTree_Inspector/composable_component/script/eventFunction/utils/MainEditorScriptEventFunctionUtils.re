let getUnUsedScriptEventFunctionNodes = (script, (editorState, engineState)) => {
  let allScriptEventFunctionNodes =
    ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes(
      editorState,
    );

  let scriptAllEventFunctionEntries =
    ScriptEngineService.getScriptAllEventFunctionEntries(script, engineState);

  let allEventFunctionNames =
    scriptAllEventFunctionEntries
    |> Js.Array.map(((eventFunctionName, _)) => eventFunctionName);

  ArrayService.excludeWithFunc(
    scriptAllEventFunctionEntries,
    (scriptAllEventFunctionEntries, scriptEventFunctionNode) =>
      allEventFunctionNames
      |> Js.Array.includes(
           ScriptEventFunctionNodeAssetService.getNodeName(
             scriptEventFunctionNode,
           ),
         ),
    allScriptEventFunctionNodes,
  );
};

let getUnUsedScriptEventFunctionNodeIds =
    (script, (editorState, engineState)) =>
  getUnUsedScriptEventFunctionNodes(script, (editorState, engineState))
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));