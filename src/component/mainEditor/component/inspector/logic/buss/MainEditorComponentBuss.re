let createSourceInstanceComponent = ((editorState, engineState)) => { 
   let (engineState, sourceInstanceComponent) = engineState |> MainEditorSourceInstanceOper.createSourceInstanceComponent;
   (sourceInstanceComponent,(editorState, engineState))
  };