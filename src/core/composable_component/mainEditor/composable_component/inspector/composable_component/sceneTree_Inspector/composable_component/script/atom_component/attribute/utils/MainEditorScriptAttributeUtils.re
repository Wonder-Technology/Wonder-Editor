let getUnUsedScriptAttributeNodes = (script, (editorState, engineState)) => {
  let allScriptAttributeNodes =
    ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes(
      editorState,
    );

  let scriptAllAttributeEntries =
    ScriptEngineService.getScriptAllAttributeEntries(script, engineState);

  let allAttributeNames =
    scriptAllAttributeEntries
    |> Js.Array.map(((attributeName, _)) => attributeName);

  ArrayService.excludeWithFunc(
    scriptAllAttributeEntries,
    (scriptAllAttributeEntries, scriptAttributeNode) =>
      allAttributeNames
      |> Js.Array.includes(
           ScriptAttributeNodeAssetService.getNodeName(scriptAttributeNode),
         ),
    allScriptAttributeNodes,
  );
};

let getUnUsedScriptAttributeNodeIds = (script, (editorState, engineState)) =>
  getUnUsedScriptAttributeNodes(script, (editorState, engineState))
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));