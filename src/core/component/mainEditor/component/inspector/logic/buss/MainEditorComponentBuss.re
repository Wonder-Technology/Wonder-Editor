let createSourceInstanceComponent = ((editorState, engineState)) => {
  let (engineState, sourceInstanceComponent) = engineState |> SourceInstanceEngineService.create;
  (sourceInstanceComponent, (editorState, engineState))
};