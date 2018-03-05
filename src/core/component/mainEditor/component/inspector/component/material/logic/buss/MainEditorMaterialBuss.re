let getCurrentGameObjectBasicMaterialColor = (currentGameObjectMaterial, (_, engineState)) =>
  engineState |> MainEditorBasicMaterialOper.getBasicMaterialColor(currentGameObjectMaterial);

let setCurrentGameObjectBasicMaterialColor =
    (currentGameObjectMaterial, color, (editorState, engineState)) => (
  editorState,
  engineState
  |> MainEditorBasicMaterialOper.setBasicMaterialColor(currentGameObjectMaterial, color)
);